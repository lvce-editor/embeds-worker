import { RendererWorker, type RendererWorkerApi } from '@lvce-editor/rpc-registry'

export const invoke = <T extends keyof RendererWorkerApi>(method: T, ...params: Parameters<RendererWorkerApi[T]>): ReturnType<RendererWorkerApi[T]> =>
  RendererWorker.invoke(method, ...params)

export const invokeAndTransfer = <T extends keyof RendererWorkerApi>(
  method: T,
  ...params: Parameters<RendererWorkerApi[T]>
): ReturnType<RendererWorkerApi[T]> => RendererWorker.invokeAndTransfer(method, ...params)

export const set = (...args: Readonly<Parameters<typeof RendererWorker.set>>): ReturnType<typeof RendererWorker.set> => RendererWorker.set(...args)

export const invokeAny = (method: string, ...params: readonly any[]): Promise<any> =>
  (RendererWorker.invoke as (method: string, ...params: readonly any[]) => Promise<any>)(method, ...params)
