import * as MainProcess from '../MainProcess/MainProcess.ts'

export const acceptLogin = (requestId: string, username: string, password: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsView.acceptLogin', requestId, username, password)
}
