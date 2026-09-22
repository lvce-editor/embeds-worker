import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const sendMessagePortToMainProcess = async (port: MessagePort, connectionId: number): Promise<void> => {
  await (ParentRpc.invokeAndTransfer as any)(
    'SendMessagePortToMainProcess.sendMessagePortToMainProcess',
    port,
    'ElectronWebContentsView.handleMessagePort',
    connectionId,
  )
}
