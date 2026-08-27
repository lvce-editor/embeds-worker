import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const createWebContentsView = async (restoreId: number, ipcId: number): Promise<any> => {
  return EmbedsProcess.invokeAny('ElectronWebContentsView.createWebContentsView', ipcId, restoreId)
}
