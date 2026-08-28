import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const setZoomLevel = (id: string, zoomLevel: number): Promise<void> => {
  return EmbedsProcess.invokeAny('ElectronWebContentsView.setZoomLevel', id, zoomLevel)
}
