import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SendMessagePortToMainProcess from '../src/parts/SendMessagePortToMainProcess/SendMessagePortToMainProcess.ts'

test('sends the worker connection to main process with its window connection id', async () => {
  const invokeAndTransfer = jest.fn<(method: string, ...params: readonly any[]) => Promise<any>>().mockResolvedValue(undefined)
  ParentRpc.set(MockRpc.create({ commandMap: {}, invoke: jest.fn() as any, invokeAndTransfer }))
  const { port1, port2 } = new MessageChannel()

  await SendMessagePortToMainProcess.sendMessagePortToMainProcess(port1, 1007)

  expect(invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToMainProcess.sendMessagePortToMainProcess',
    port1,
    'ElectronWebContentsView.handleMessagePort',
    1007,
  )
  port1.close()
  port2.close()
})
