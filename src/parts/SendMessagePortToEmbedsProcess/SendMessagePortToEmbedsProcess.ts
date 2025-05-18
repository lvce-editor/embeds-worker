import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const sendMessagePortToEmbedsProcess = async (port: MessagePort): Promise<void> => {
  const outerCommand = 'HandleMessagePortForEmbedsProcess.handleMessagePortForEmbedsProcess'
  // TODO
  // @ts-ignore
  await ParentRpc.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess', port, outerCommand, RpcId.EmbedsWorker)
}
