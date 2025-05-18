import * as EmbedsProcess from '../EmbedsProcess/EmbedsProcess.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'
import * as LoadErrorCode from '../LoadErrorCode/LoadErrorCode.ts'

export const createWebContentsView = async (restoreId, fallThroughKeyBindings) => {
  // @ts-ignore
  const id = await EmbedsProcess.invoke('ElectronWebContentsView.createWebContentsView', restoreId, fallThroughKeyBindings)
  return id
}

export const disposeWebContentsView = (id) => {
  return EmbedsProcess.invoke('ElectronWebContentsView.disposeWebContentsView', id)
}

export const resizeWebContentsView = (id, x, y, width, height) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.resizeBrowserView', id, x, y, width, height)
}

export const setIframeSrcFallback = async (id, error) => {
  const { code, message } = error
  // @ts-ignore
  await EmbedsProcess.invoke('ElectronWebContentsView.setIframeSrcFallback', id, code, message)
}

export const setIframeSrc = async (id, iframeSrc) => {
  try {
    // @ts-ignore
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

export const focus = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.focus', id)
}

export const openDevtools = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.openDevtools', id)
}

export const reload = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.reload', id)
}

export const show = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.show', id)
}

export const hide = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.hide', id)
}

export const forward = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.forward', id)
}

export const backward = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.backward', id)
}

export const getDomTree = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.getDomTree', id)
}

export const insertCss = (id, css) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.insertCss', id, css)
}

export const insertJavaScript = (id, code) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.insertJavaScript', id, code)
}

export const cancelNavigation = (id) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.cancelNavigation', id)
}

export const inspectElement = (id, x, y) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.inspectElement', id, x, y)
}

export const copyImageAt = (id, x, y) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.copyImageAt', id, x, y)
}

export const setFallthroughKeyBindings = (id, fallthroughKeybindings) => {
  // TODO
  // return EmbedsProcess.invoke('ElectronWebContentsView.setFallthroughKeyBindings', id, fallthroughKeybindings)
}

export const getStats = (id, fallthroughKeybindings) => {
  // @ts-ignore
  return EmbedsProcess.invoke('ElectronWebContentsView.getStats', id, fallthroughKeybindings)
}

const forwardEvent =
  (key) =>
  (id, ...args) => {
    return Rpc.invoke(key, ...args)
  }

export const handleDidNavigate = forwardEvent('ElectronBrowserView.handleDidNavigate')

export const handleTitleUpdated = forwardEvent('ElectronBrowserView.handleTitleUpdated')

export const handleWillNavigate = forwardEvent('ElectronBrowserView.handleWillNavigate')

export const handleContextMenu = forwardEvent('ElectronBrowserView.handleContextMenu')
