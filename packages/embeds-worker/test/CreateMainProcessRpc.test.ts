import { afterEach, expect, jest, test } from '@jest/globals'
import { MessagePortRpcClient } from '@lvce-editor/rpc'
import { createMainProcessRpc } from '../src/parts/CreateMainProcessRpc/CreateMainProcessRpc.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

const create = jest.spyOn(MessagePortRpcClient as any, 'create').mockImplementation(async () => ({}))
const invokeAndTransfer = jest.fn(async () => undefined)

afterEach(() => {
  create.mockClear()
  invokeAndTransfer.mockClear()
})

test('createMainProcessRpc uses the browser message port rpc client', async () => {
  ParentRpc.set({ invokeAndTransfer } as any)

  await createMainProcessRpc(7)

  expect(create).toHaveBeenCalledWith({
    commandMap: expect.any(Object),
    messagePort: expect.any(MessagePort),
  })
})
