import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const forwardWebContentsViewEvent =
  (key: any, includeId = true): any =>
  (id: string, ...args: readonly any[]) => {
    return Rpc.invoke(key, ...(includeId ? [id, ...args] : args))
  }
