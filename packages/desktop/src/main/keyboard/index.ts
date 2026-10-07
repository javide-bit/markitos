import { shell, ipcMain } from 'electron'
import log from 'electron-log'
import EventEmitter from 'events'
import fsPromises from 'fs/promises'
import type {
  IKeyboardLayoutInfo,
  IKeyboardMapping
} from 'native-keymap'
import os from 'os'
import path from 'path'

export interface KeyboardInfo {
  layout: IKeyboardLayoutInfo
  keymap: IKeyboardMapping
}

type KeyboardInfoListener = (info: KeyboardInfo) => void

let nativeKeymap: {
  getCurrentKeyboardLayout: () => IKeyboardLayoutInfo
  getKeyMap: () => IKeyboardMapping
  onDidChangeKeyboardLayout: (callback: () => void) => void
} | null = null

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('native-keymap')
  const map = mod && typeof mod.getKeyMap === 'function' ? mod.getKeyMap() : null
  if (map && !Array.isArray(map) && Object.keys(map).length > 0) {
    nativeKeymap = mod
  } else {
    nativeKeymap = null
  }
} catch {
  nativeKeymap = null
}

let currentKeyboardInfo: KeyboardInfo | null = null
const loadKeyboardInfo = (): KeyboardInfo => {
  if (nativeKeymap) {
    try {
      currentKeyboardInfo = {
        layout: nativeKeymap.getCurrentKeyboardLayout(),
        keymap: nativeKeymap.getKeyMap()
      }
      return currentKeyboardInfo
    } catch {
      // Fall through to fallback
    }
  }
  currentKeyboardInfo = {
    layout: { id: 'default', name: 'Default' },
    keymap: {}
  }
  return currentKeyboardInfo
}

export const getKeyboardInfo = (): KeyboardInfo => {
  if (!currentKeyboardInfo) {
    return loadKeyboardInfo()
  }
  return currentKeyboardInfo
}

const KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID = 'onDidChangeKeyboardLayout'
class KeyboardLayoutMonitor extends EventEmitter {
  private _isSubscribed: boolean
  private _emitTimer: ReturnType<typeof setTimeout> | null

  constructor() {
    super()
    this._isSubscribed = false
    this._emitTimer = null
  }

  // The single-arg shape diverges from EventEmitter#addListener(eventName, listener);
  // we preserve the original JS behavior verbatim: the first positional argument is
  // always treated as the callback. Parameters are typed loosely to keep TS happy
  // with the override against the base signature.
  override addListener(eventNameOrCallback: unknown, _listener?: unknown): this {
    this._ensureNativeListener()
    this.on(KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID, eventNameOrCallback as KeyboardInfoListener)
    return this
  }

  // NOTE: Preserves the pre-existing single-argument override; the original JS
  // also delegated to `this.removeListener(channel, callback)` (recursive).
  override removeListener(eventNameOrCallback: unknown, _listener?: unknown): this {
    this.removeListener(KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID, eventNameOrCallback as KeyboardInfoListener)
    return this
  }

  _ensureNativeListener(): void {
    if (!this._isSubscribed) {
      this._isSubscribed = true
      if (nativeKeymap?.onDidChangeKeyboardLayout) {
        try {
          nativeKeymap.onDidChangeKeyboardLayout(() => {
            // The keyboard layout change event may be emitted multiple times.
            if (this._emitTimer) {
              clearTimeout(this._emitTimer)
            }
            this._emitTimer = setTimeout(() => {
              this.emit(KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID, loadKeyboardInfo())
              this._emitTimer = null
            }, 150)
          })
        } catch (err) {
          log.warn('native-keymap layout listener failed:', err)
        }
      }
    }
  }
}

// Export a single-instance of the monitor.
export const keyboardLayoutMonitor = new KeyboardLayoutMonitor()

export const registerKeyboardListeners = (): void => {
  ipcMain.handle('mt::keybinding-get-keyboard-info', async() => {
    return getKeyboardInfo()
  })
  ipcMain.on('mt::keybinding-debug-dump-keyboard-info', async() => {
    const dumpPath = path.join(os.tmpdir(), 'marktext_keyboard_info.json')
    const content = JSON.stringify(getKeyboardInfo(), null, 2)
    fsPromises
      .writeFile(dumpPath, content, 'utf8')
      .then(() => {
        shell.openPath(dumpPath)
      })
      .catch((error: unknown) => {
        log.error('Error dumping keyboard information:', error)
      })
  })
}
