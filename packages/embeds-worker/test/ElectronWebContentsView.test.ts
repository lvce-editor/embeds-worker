import { beforeEach, expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as AcceptLogin from '../src/parts/AcceptLogin/AcceptLogin.ts'
import * as CancelLogin from '../src/parts/CancelLogin/CancelLogin.ts'
import * as CapturePage from '../src/parts/CapturePage/CapturePage.ts'
import * as EmbedsProcess from '../src/parts/EmbedsProcess/EmbedsProcess.ts'
import * as ForwardWebContentsViewEvent from '../src/parts/ForwardWebContentsViewEvent/ForwardWebContentsViewEvent.ts'
import * as HandleLogin from '../src/parts/HandleLogin/HandleLogin.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SetFallthroughKeyBindings from '../src/parts/SetFallthroughKeyBindings/SetFallthroughKeyBindings.ts'

const state: { embedsProcessInvocations: readonly any[][]; parentInvocations: readonly any[][] } = {
  embedsProcessInvocations: [],
  parentInvocations: [],
}

EmbedsProcess.set(
  MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      state.embedsProcessInvocations = [...state.embedsProcessInvocations, [method, ...args]]
    },
  }),
)

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
