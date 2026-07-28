import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const acceptLogin = (requestId: string, username: string, password: string): Promise<void> => {
  return EmbedsProcess.invokeAny('ElectronWebContentsView.acceptLogin', requestId, username, password)
}
