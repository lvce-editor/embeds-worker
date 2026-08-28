import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const setFallthroughKeyBindings = (id: string, fallthroughKeybindings: any): Promise<void> => {
  return EmbedsProcess.invokeAny('ElectronWebContentsView.setFallthroughKeyBindings', id, fallthroughKeybindings)
}
