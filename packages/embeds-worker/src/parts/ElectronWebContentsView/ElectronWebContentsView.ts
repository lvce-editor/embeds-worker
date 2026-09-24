import * as CreateMainProcessRpc from '../CreateMainProcessRpc/CreateMainProcessRpc.ts'
import * as ForwardWebContentsViewEvent from '../ForwardWebContentsViewEvent/ForwardWebContentsViewEvent.ts'
import * as LoadErrorCode from '../LoadErrorCode/LoadErrorCode.ts'
import * as MainProcess from '../MainProcess/MainProcess.ts'

export const createWebContentsView = async (restoreId: string, fallThroughKeyBindings: any, windowId = 0): Promise<any> => {
  const connectionId = CreateMainProcessRpc.getConnectionId(windowId)
  const id = await MainProcess.invokeAny('ElectronWebContentsView.createWebContentsView', restoreId, windowId, connectionId)
  await MainProcess.invokeAny('ElectronWebContentsViewFunctions.setBackgroundColor', id, 'white')
  if (fallThroughKeyBindings) {
    await MainProcess.invokeAny('ElectronWebContentsViewFunctions.setFallthroughKeyBindings', id, fallThroughKeyBindings)
  }
  return id
}

export const detachForHotReload = (): Promise<readonly number[]> => {
  return MainProcess.invokeAny('ElectronWebContentsView.detachForHotReload')
}

export const disposeWebContentsView = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsView.disposeWebContentsView', id)
}

export const resizeWebContentsView = (id: string, x: number, y: number, width: number, height: number): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.resizeBrowserView', id, x, y, width, height)
}

const setIframeSrcFallback = async (id: string, iframeSrc: string, error: any): Promise<void> => {
  const { code, message } = error

  await MainProcess.invokeAny('ElectronWebContentsViewFunctions.setIframeSrcFallback', id, code, message, iframeSrc)
}

export const setIframeSrc = async (id: string, iframeSrc: string): Promise<void> => {
  try {
    await MainProcess.invokeAny('ElectronWebContentsViewFunctions.setIframeSrc', id, iframeSrc)
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
      await setIframeSrcFallback(id, iframeSrc, error)
    } catch (error) {
      console.warn(`Failed to set iframe src`, error)
    }
  }
}

export const setAudioMuted = (id: string, muted: boolean): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.setAudioMuted', id, muted)
}

export const focus = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.focus', id)
}

export const openDevtools = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.openDevtools', id)
}

export const reload = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.reload', id)
}

export const show = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.show', id)
}

export const hide = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.hide', id)
}

export const forward = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.forward', id)
}

export const backward = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.backward', id)
}

export const getDomTree = (id: string): Promise<any> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.getDomTree', id)
}

export const insertCss = (id: string, css: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.insertCss', id, css)
}

export const insertJavaScript = (id: string, code: string, userGesture = false): Promise<any> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.insertJavaScript', id, code, userGesture)
}

export const cancelNavigation = (id: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.cancelNavigation', id)
}

export const inspectElement = (id: string, x: number, y: number): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.inspectElement', id, x, y)
}

export const copyImageAt = (id: string, x: number, y: number): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.copyImageAt', id, x, y)
}

export const getStats = (id: string, fallthroughKeybindings: any): Promise<any> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.getStats', id, fallthroughKeybindings)
}

export const handleAudioStateChanged = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleAudioStateChanged')

export const handleBrowserViewDestroyed = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleBrowserViewDestroyed')

export const handleDidNavigate = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleDidNavigate')

export const handleKeyBinding = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleKeyBinding')

export const handlePageFaviconUpdated = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handlePageFaviconUpdated')

export const handleTitleUpdated = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleTitleUpdated')

export const handleWillNavigate = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleWillNavigate')

export const handleWindowOpen = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleWindowOpen')

export const handleContextMenu = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleContextMenu', false)

export const pressKey = (id: number, keyCode: string, modifiers: readonly string[]): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.pressKey', id, keyCode, modifiers)
}

export const navigate = (id: number, url: string): Promise<void> => {
  return MainProcess.invokeAny('ElectronWebContentsViewFunctions.setIframeSrc', id, url)
}

export const passwords = (id: number, action: string): Promise<void> =>
  MainProcess.invokeAny('ElectronWebContentsViewFunctions.passwords', id, action)
