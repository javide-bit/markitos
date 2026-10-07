import { describe, expect, it, vi, beforeEach } from 'vitest'
import { getSave } from '@/contextMenu/tabs/menuItems'
import * as actions from '@/contextMenu/tabs/actions'
import bus from '@/bus'

describe('tab context menu save and close behaviors', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('defines getSave menu item with saveTab id and localized label', () => {
    const item = getSave()
    expect(item.id).toBe('saveTab')
    expect(item.label).toBeDefined()
    expect(typeof item.label).toBe('string')
    expect(typeof item.click).toBe('function')
  })

  it('clicking save menu item emits TABS::save with tabId', () => {
    const emitSpy = vi.spyOn(bus, 'emit')
    const item = getSave()
    item.click({ _tabId: 'test-tab-123' })
    expect(emitSpy).toHaveBeenCalledWith('TABS::save', 'test-tab-123')
  })

  it('actions.save emits TABS::save bus event', () => {
    const emitSpy = vi.spyOn(bus, 'emit')
    actions.save('test-tab-456')
    expect(emitSpy).toHaveBeenCalledWith('TABS::save', 'test-tab-456')
  })
})
