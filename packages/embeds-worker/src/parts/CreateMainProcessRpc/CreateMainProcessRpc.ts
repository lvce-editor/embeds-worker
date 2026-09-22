import { ElectronMessagePortRpcClient } from '@lvce-editor/rpc'
import * as MainProcess from '../MainProcess/MainProcess.ts'
import * as MainProcessCommandMap from '../MainProcessCommandMap/MainProcessCommandMap.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

const connectionIdForWindow = (windowId: number): number => 1000 + windowId

export const createMainProcessRpc = async (windowId: number): Promise<void> => {
  const { port1, port2 } = new MessageChannel()
  const connectionId = connectionIdForWindow(windowId)
  await (ParentRpc.invokeAndTransfer as any)(
    'SendMessagePortToMainProcess.sendMessagePortToMainProcess',
    port2,
    'ElectronWebContentsView.handleMessagePort',
    connectionId,
  )
  const rpc = await ElectronMessagePortRpcClient.create({
    commandMap: MainProcessCommandMap.commandMap,
    messagePort: port1,
  })
  MainProcess.set(rpc)
}

export const getConnectionId = (windowId: number): number => connectionIdForWindow(windowId)
