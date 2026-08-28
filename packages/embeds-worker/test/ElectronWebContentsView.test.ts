import { beforeEach, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as AcceptLogin from '../src/parts/AcceptLogin/AcceptLogin.ts'
import * as CancelLogin from '../src/parts/CancelLogin/CancelLogin.ts'
import * as CapturePage from '../src/parts/CapturePage/CapturePage.ts'
import * as ElectronWebContentsView from '../src/parts/ElectronWebContentsView/ElectronWebContentsView.ts'
import * as EmbedsProcess from '../src/parts/EmbedsProcess/EmbedsProcess.ts'
import * as ForwardWebContentsViewEvent from '../src/parts/ForwardWebContentsViewEvent/ForwardWebContentsViewEvent.ts'
import * as HandleLogin from '../src/parts/HandleLogin/HandleLogin.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SetFallthroughKeyBindings from '../src/parts/SetFallthroughKeyBindings/SetFallthroughKeyBindings.ts'

const state: { embedsProcessInvocations: readonly any[][]; parentInvocations: readonly any[][] } = {
  embedsProcessInvocations: [],
  parentInvocations: [],
}

const setEmbedsProcessInvoke = (invoke: (method: string, ...args: readonly any[]) => Promise<any>): void => {
  EmbedsProcess.set(
    MockRpc.create({
      commandMap: {},
      invoke,
    }),
  )
}

const setDefaultEmbedsProcessInvoke = (): void => {
  setEmbedsProcessInvoke(async (method: string, ...args: readonly any[]) => {
    state.embedsProcessInvocations = [...state.embedsProcessInvocations, [method, ...args]]
  })
}

ParentRpc.set(
  MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      state.parentInvocations = [...state.parentInvocations, [method, ...args]]
    },
  }),
)

beforeEach(() => {
  state.embedsProcessInvocations = []
  state.parentInvocations = []
  setDefaultEmbedsProcessInvoke()
})

test('acceptLogin forwards credentials to the embeds process', async () => {
  await AcceptLogin.acceptLogin('12:1', 'admin', 'secret')

  expect(state.embedsProcessInvocations).toEqual([['ElectronWebContentsView.acceptLogin', '12:1', 'admin', 'secret']])
})

test('cancelLogin forwards the challenge to the embeds process', async () => {
  await CancelLogin.cancelLogin('12:1')

  expect(state.embedsProcessInvocations).toEqual([['ElectronWebContentsView.cancelLogin', '12:1']])
})

test('capturePage forwards the web contents id to the embeds process', async () => {
  await CapturePage.capturePage('12')

  expect(state.embedsProcessInvocations).toEqual([['ElectronWebContentsView.capturePage', '12']])
})

test('setAudioMuted forwards the audio state to the embeds process', async () => {
  await ElectronWebContentsView.setAudioMuted('12', true)

  expect(state.embedsProcessInvocations).toEqual([['ElectronWebContentsView.setAudioMuted', '12', true]])
})

test('web contents view commands forward their arguments to the embeds process', async () => {
  await ElectronWebContentsView.createWebContentsView('0', [2050])
  await ElectronWebContentsView.disposeWebContentsView('12')
  await ElectronWebContentsView.resizeWebContentsView('12', 1, 2, 300, 200)
  await ElectronWebContentsView.focus('12')
  await ElectronWebContentsView.openDevtools('12')
  await ElectronWebContentsView.reload('12')
  await ElectronWebContentsView.show('12')
  await ElectronWebContentsView.hide('12')
  await ElectronWebContentsView.forward('12')
  await ElectronWebContentsView.backward('12')
  await ElectronWebContentsView.getDomTree('12')
  await ElectronWebContentsView.insertCss('12', 'body {}')
  await ElectronWebContentsView.insertJavaScript('12', 'document.title')
  await ElectronWebContentsView.cancelNavigation('12')
  await ElectronWebContentsView.inspectElement('12', 10, 20)
  await ElectronWebContentsView.copyImageAt('12', 30, 40)
  await ElectronWebContentsView.getStats('12', [2050])
  await ElectronWebContentsView.setIframeSrc('12', 'https://example.com')

  expect(state.embedsProcessInvocations).toEqual([
    ['ElectronWebContentsView.createWebContentsView', '0', [2050]],
    ['ElectronWebContentsView.disposeWebContentsView', '12'],
    ['ElectronWebContentsView.resizeBrowserView', '12', 1, 2, 300, 200],
    ['ElectronWebContentsView.focus', '12'],
    ['ElectronWebContentsView.openDevtools', '12'],
    ['ElectronWebContentsView.reload', '12'],
    ['ElectronWebContentsView.show', '12'],
    ['ElectronWebContentsView.hide', '12'],
    ['ElectronWebContentsView.forward', '12'],
    ['ElectronWebContentsView.backward', '12'],
    ['ElectronWebContentsView.getDomTree', '12'],
    ['ElectronWebContentsView.insertCss', '12', 'body {}'],
    ['ElectronWebContentsView.insertJavaScript', '12', 'document.title'],
    ['ElectronWebContentsView.cancelNavigation', '12'],
    ['ElectronWebContentsView.inspectElement', '12', 10, 20],
    ['ElectronWebContentsView.copyImageAt', '12', 30, 40],
    ['ElectronWebContentsView.getStats', '12', [2050]],
    ['ElectronWebContentsView.setIframeSrc', '12', 'https://example.com'],
  ])
})

test.each([
  ['ERR_ABORTED', 'aborted'],
  ['ERR_FAILED', 'canceled'],
])('setIframeSrc ignores expected navigation errors: %s', async (code, message) => {
  const info = jest.spyOn(console, 'info').mockImplementation(() => {})
  const log = jest.spyOn(console, 'log').mockImplementation(() => {})
  setEmbedsProcessInvoke(async () => {
    throw { code, message }
  })

  await ElectronWebContentsView.setIframeSrc('12', 'https://example.com')

  expect(info).toHaveBeenCalledWith(`[embeds worker] navigation to https://example.com ${message}`)
  info.mockRestore()
  log.mockRestore()
})

test('setIframeSrc loads the fallback page for other navigation errors', async () => {
  const log = jest.spyOn(console, 'log').mockImplementation(() => {})
  setEmbedsProcessInvoke(async (method: string, ...args: readonly any[]) => {
    state.embedsProcessInvocations = [...state.embedsProcessInvocations, [method, ...args]]
    if (method === 'ElectronWebContentsView.setIframeSrc') {
      throw { code: 'ERR_UNKNOWN', message: 'network error' }
    }
  })

  await ElectronWebContentsView.setIframeSrc('12', 'https://example.com')

  expect(state.embedsProcessInvocations).toEqual([
    ['ElectronWebContentsView.setIframeSrc', '12', 'https://example.com'],
    ['ElectronWebContentsView.setIframeSrcFallback', '12', 'ERR_UNKNOWN', 'network error'],
  ])
  log.mockRestore()
})

test('setIframeSrc contains fallback failures', async () => {
  const log = jest.spyOn(console, 'log').mockImplementation(() => {})
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
  setEmbedsProcessInvoke(async () => {
    throw { code: 'ERR_UNKNOWN', message: 'network error' }
  })

  await ElectronWebContentsView.setIframeSrc('12', 'https://example.com')

  expect(warn).toHaveBeenCalledWith('Failed to set iframe src', { code: 'ERR_UNKNOWN', message: 'network error' })
  log.mockRestore()
  warn.mockRestore()
})

test('fallthrough keybindings are forwarded to the embeds process', async () => {
  await SetFallthroughKeyBindings.setFallthroughKeyBindings('12', [2050, 3074])

  expect(state.embedsProcessInvocations).toEqual([['ElectronWebContentsView.setFallthroughKeyBindings', '12', [2050, 3074]]])
})

test('handleLogin forwards the web contents id and challenge to the renderer worker', async () => {
  const challenge = {
    host: 'example.com',
    requestId: '12:1',
  }

  await HandleLogin.handleLogin('12', challenge)

  expect(state.parentInvocations).toEqual([['ElectronBrowserView.handleLogin', '12', challenge]])
})

test('navigation events preserve the web contents id', async () => {
  const handleDidNavigate = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleDidNavigate')

  await handleDidNavigate('12', 'https://example.com')

  expect(state.parentInvocations).toEqual([['ElectronBrowserView.handleDidNavigate', '12', 'https://example.com']])
})

test('keybinding events preserve the web contents id', async () => {
  const handleKeyBinding = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleKeyBinding')

  await handleKeyBinding('12', 2050)

  expect(state.parentInvocations).toEqual([['ElectronBrowserView.handleKeyBinding', '12', 2050]])
})

test('favicon events preserve the web contents id', async () => {
  const handlePageFaviconUpdated = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handlePageFaviconUpdated')

  await handlePageFaviconUpdated('12', ['https://example.com/favicon.png'])

  expect(state.parentInvocations).toEqual([['ElectronBrowserView.handlePageFaviconUpdated', '12', ['https://example.com/favicon.png']]])
})

test('window open events preserve the web contents id and disposition', async () => {
  const handleWindowOpen = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleWindowOpen')

  await handleWindowOpen('12', 'https://example.com/docs', 'foreground-tab')

  expect(state.parentInvocations).toEqual([['ElectronBrowserView.handleWindowOpen', '12', 'https://example.com/docs', 'foreground-tab']])
})

test('context menu events retain the existing renderer signature', async () => {
  const event = { x: 1, y: 2 }
  const handleContextMenu = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleContextMenu', false)

  await handleContextMenu('12', event)

  expect(state.parentInvocations).toEqual([['ElectronBrowserView.handleContextMenu', event]])
})
