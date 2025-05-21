import { createEmbedsProcessRpc } from '../CreateEmbedsProcessRpc/CreateEmbedsProcessRpc.ts'
import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const initialize = async (): Promise<void> => {
  const rpc = await createEmbedsProcessRpc()
  EmbedsProcess.set(rpc)
}
