import * as MainProcess from '../MainProcess/MainProcess.ts'

export const setFallthroughKeyBindings = (id: string, fallthroughKeybindings: any): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.setFallthroughKeyBindings', id, fallthroughKeybindings)
}
