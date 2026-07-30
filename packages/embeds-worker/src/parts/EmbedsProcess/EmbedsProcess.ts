import { EmbedsProcess } from '@lvce-editor/rpc-registry'

export const { invoke, set } = EmbedsProcess

export const invokeAny = invoke as (method: string, ...params: readonly any[]) => Promise<any>
