import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'
import * as LoadErrorCode from '../LoadErrorCode/LoadErrorCode.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const createWebContentsView = async (restoreId: string, fallThroughKeyBindings: any): Promise<any> => {
  // @ts-ignore
  const id = await EmbedsProcess.invoke('ElectronWebContentsView.createWebContentsView', restoreId, fallThroughKeyBindings)
  return id
}

export const disposeWebContentsView = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.disposeWebContentsView', id)
}

export const resizeWebContentsView = (id: string, x: number, y: number, width: number, height: number): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.resizeBrowserView', id, x, y, width, height)
}

export const setIframeSrcFallback = async (id: string, error: any): Promise<void> => {
  const { code, message } = error

  await EmbedsProcess.invoke('ElectronWebContentsView.setIframeSrcFallback', id, code, message)
}

export const setIframeSrc = async (id: string, iframeSrc: string): Promise<void> => {
  try {
    await EmbedsProcess.invoke('ElectronWebContentsView.setIframeSrc', id, iframeSrc)
  } catch (error) {
    console.log({ error })
    // TODO send error back to embeds worker,
    // embeds worker decides how to handle error

    // @ts-ignore
    if (error && error.code === LoadErrorCode.ERR_ABORTED) {
      console.info(`[embeds worker] navigation to ${iframeSrc} aborted`)
      return
    }

    // @ts-ignore
    if (error && error.code === LoadErrorCode.ERR_FAILED) {
      console.info(`[embeds worker] navigation to ${iframeSrc} canceled`)
      // ElectronWebContentsViewState.removeCanceled(webContents.id)
      return
    }
    try {
      await setIframeSrcFallback(id, error)
    } catch (error) {
      console.warn(`Failed to set iframe src`, error)
    }
  }
}

export const focus = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.focus', id)
}

export const openDevtools = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.openDevtools', id)
}

export const reload = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.reload', id)
}

export const show = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.show', id)
}

export const hide = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.hide', id)
}

export const forward = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.forward', id)
}

export const backward = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.backward', id)
}

export const getDomTree = (id: string): Promise<any> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.getDomTree', id)
}

export const insertCss = (id: string, css: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.insertCss', id, css)
}

export const insertJavaScript = (id: string, code: string): Promise<any> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.insertJavaScript', id, code)
}

export const cancelNavigation = (id: string): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.cancelNavigation', id)
}

export const inspectElement = (id: string, x: number, y: number): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.inspectElement', id, x, y)
}

export const copyImageAt = (id: string, x: number, y: number): Promise<void> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.copyImageAt', id, x, y)
}

export const setFallthroughKeyBindings = async (id: string, fallthroughKeybindings: any): Promise<void> => {
  // TODO
  // return EmbedsProcess.invoke('ElectronWebContentsView.setFallthroughKeyBindings', id, fallthroughKeybindings)
}

export const getStats = (id: string, fallthroughKeybindings: any): Promise<any> => {
  return EmbedsProcess.invoke('ElectronWebContentsView.getStats', id, fallthroughKeybindings)
}

const forwardEvent =
  (key: any): any =>
  (id: string, ...args: readonly any[]) => {
    return Rpc.invoke(key, ...args)
  }

export const handleDidNavigate = forwardEvent('ElectronBrowserView.handleDidNavigate')

export const handleTitleUpdated = forwardEvent('ElectronBrowserView.handleTitleUpdated')

export const handleWillNavigate = forwardEvent('ElectronBrowserView.handleWillNavigate')

export const handleContextMenu = forwardEvent('ElectronBrowserView.handleContextMenu')
