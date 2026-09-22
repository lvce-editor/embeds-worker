import * as MainProcess from '../MainProcess/MainProcess.ts'

export const cancelLogin = (requestId: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsView.cancelLogin', requestId)
}
