import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const toggleDevTools = (id: string): Promise<void> => {
  return EmbedsProcess.invokeAny('ElectronWebContentsView.toggleDevTools', id)
}
