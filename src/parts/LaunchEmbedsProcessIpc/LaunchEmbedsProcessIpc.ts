import * as HandleIpc from '../HandleIpc/HandleIpc.ts'
import * as IpcParent from '../IpcParent/IpcParent.ts'
import { VError } from '@lvce-editor/verror'

export const launchEmbedsProcessIpc = async () => {
  try {
    const ipc = await IpcParent.create({
      initialCommand: 'HandleMessagePortForEmbedsProcess.handleMessagePortForEmbedsProcess',
    })
    HandleIpc.handleIpc(ipc)
    return ipc
  } catch (error) {
    throw new VError(error, `Failed to launch embeds process`)
  }
}
