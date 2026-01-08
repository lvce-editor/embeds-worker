import { type Rpc, MessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import { sendMessagePortToEmbedsProcess } from '../SendMessagePortToEmbedsProcess/SendMessagePortToEmbedsProcess.ts'

export const createEmbedsProcessRpc = async (): Promise<Rpc> => {
  try {
    const { port1, port2 } = GetPortTuple.getPortTuple()
    await sendMessagePortToEmbedsProcess(port2)
    port1.start()
    const rpc = await MessagePortRpcParent.create({
      commandMap: {},
      isMessagePortOpen: true,
      messagePort: port1,
    })
    // TODO createMessageportRpcParent should call port start
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create embeds process rpc`)
  }
}
