import * as CreateMainProcessRpc from '../CreateMainProcessRpc/CreateMainProcessRpc.ts'

export const initialize = async (windowId: number): Promise<void> => {
  await CreateMainProcessRpc.createMainProcessRpc(windowId)
}
