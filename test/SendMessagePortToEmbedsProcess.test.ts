import { test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SendMessagePortToEmbedsProcess from '../src/parts/SendMessagePortToEmbedsProcess/SendMessagePortToEmbedsProcess.ts'

test('sendMessagePortToEmbedsProcess sends port to embeds process', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)
  const { port1 } = new MessageChannel()
  await SendMessagePortToEmbedsProcess.sendMessagePortToEmbedsProcess(port1)
})
