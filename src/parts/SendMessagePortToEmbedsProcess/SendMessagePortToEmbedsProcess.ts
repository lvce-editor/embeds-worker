import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const sendMessagePortToEmbedsProcess = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  // @ts-ignore
  await ParentRpc.invokeAndTransfer('SendMessagePortToEmbedsProcess.sendMessagePortToEmbedsProcess', port, command, RpcId.EmbedsWorker)
}
