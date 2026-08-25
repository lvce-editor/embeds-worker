import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'

export const capturePage = (id: string): Promise<string> => {
  return EmbedsProcess.invokeAny('ElectronWebContentsView.capturePage', id)
}
