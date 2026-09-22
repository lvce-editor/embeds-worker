import * as MainProcess from '../MainProcess/MainProcess.ts'

export const setZoomLevel = (id: string, zoomLevel: number): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.setZoomLevel', id, zoomLevel)
}
