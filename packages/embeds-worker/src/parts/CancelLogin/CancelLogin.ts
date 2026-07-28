import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const cancelLogin = (requestId: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.cancelLogin', requestId)
}
