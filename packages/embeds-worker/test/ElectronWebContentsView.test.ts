import { beforeEach, expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as AcceptLogin from '../src/parts/AcceptLogin/AcceptLogin.ts'
import * as CancelLogin from '../src/parts/CancelLogin/CancelLogin.ts'
import * as CapturePage from '../src/parts/CapturePage/CapturePage.ts'
import * as EmbedsProcess from '../src/parts/EmbedsProcess/EmbedsProcess.ts'
import * as HandleLogin from '../src/parts/HandleLogin/HandleLogin.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

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

test('handleLogin forwards the web contents id and challenge to the renderer worker', async () => {
  const challenge = {
    host: 'example.com',
    requestId: '12:1',
  }

  await HandleLogin.handleLogin('12', challenge)

  expect(state.parentInvocations).toEqual([['ElectronBrowserView.handleLogin', '12', challenge]])
})
