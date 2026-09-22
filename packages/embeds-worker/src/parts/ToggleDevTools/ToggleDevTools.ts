import * as MainProcess from '../MainProcess/MainProcess.ts'

export const toggleDevTools = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.toggleDevTools', id)
}
