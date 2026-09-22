import * as MainProcess from '../MainProcess/MainProcess.ts'

export const capturePage = (id: string): Promise<Uint8Array> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.capturePage', id)
}
