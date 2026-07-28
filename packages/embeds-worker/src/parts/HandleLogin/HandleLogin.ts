import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const handleLogin = (id: string, challenge: any): Promise<any> => {
  return Rpc.invoke('ElectronBrowserView.handleLogin', id, challenge)
}
