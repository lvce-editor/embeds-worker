import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SendMessagePortToEmbedsProcess from '../src/parts/SendMessagePortToEmbedsProcess/SendMessagePortToEmbedsProcess.ts'

test('sendMessagePortToEmbedsProcess sends port to embeds process', async () => {
  const invoke = jest.fn()
  const invokeAndTransfer = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      invoke(method)
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string, ...args: readonly unknown[]) => {
      invokeAndTransfer(method, ...args)
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)
  const { port1 } = new MessageChannel()
  await SendMessagePortToEmbedsProcess.sendMessagePortToEmbedsProcess(port1)

  expect(invoke).toHaveBeenCalledTimes(0)
  expect(invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess',
    port1,
    'HandleMessagePortForEmbedsProcess.handleMessagePortForEmbedsProcess',
    208,
  )
})
