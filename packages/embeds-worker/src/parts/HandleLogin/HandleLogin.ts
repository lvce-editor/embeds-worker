import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const handleLogin = (id: string, challenge: any): Promise<any> => {
  return Rpc.invokeAny('ElectronBrowserView.handleLogin', id, challenge)
}
