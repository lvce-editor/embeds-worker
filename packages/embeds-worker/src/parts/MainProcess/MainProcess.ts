import { MainProcess as MainProcessRpc } from '@lvce-editor/rpc-registry'

export const invokeAny = (method: string, ...params: readonly any[]): Promise<any> => (MainProcessRpc.invoke as any)(method, ...params)

export const set = (...args: Readonly<Parameters<typeof MainProcessRpc.set>>): ReturnType<typeof MainProcessRpc.set> => MainProcessRpc.set(...args)
