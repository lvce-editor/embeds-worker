import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const capturePage = (id: string): Promise<Uint8Array> => {
  return EmbedsProcess.invokeAny('ElectronWebContentsView.capturePage', id)
}
