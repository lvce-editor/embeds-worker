import * as ParentRpc from '../Rpc/Rpc.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const sendMessagePortToEmbedsProcess = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  await ParentRpc.invokeAndTransfer('SendMessagePortToEmbedsProcess.sendMessagePortToEmbedsProcess', port, command, RpcId.EmbedsWorker)
}
