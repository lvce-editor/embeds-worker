import { RendererWorker } from '@lvce-editor/rpc-registry'

export const { invoke, invokeAndTransfer, set } = RendererWorker

export const invokeAny = invoke as (method: string, ...params: readonly any[]) => Promise<any>
