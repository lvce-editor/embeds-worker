import * as ForwardWebContentsViewEvent from '../ForwardWebContentsViewEvent/ForwardWebContentsViewEvent.ts'
import * as HandleLogin from '../HandleLogin/HandleLogin.ts'

const handleAudioStateChanged = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleAudioStateChanged')
const handleBrowserViewDestroyed = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleBrowserViewDestroyed')
// Direct events already contain browserViewId inside the payload; preserve the first argument.
const handleContextMenu = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleContextMenu')
const handleDidNavigate = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleDidNavigate')
const handleKeyBinding = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleKeyBinding')
const handlePageFaviconUpdated = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handlePageFaviconUpdated')
const handleTitleUpdated = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleTitleUpdated')
const handleWillNavigate = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleWillNavigate')
const handleWindowOpen = ForwardWebContentsViewEvent.forwardWebContentsViewEvent('ElectronBrowserView.handleWindowOpen')

export const commandMap = {
  'ElectronBrowserView.handleAudioStateChanged': handleAudioStateChanged,
  'ElectronBrowserView.handleBrowserViewDestroyed': handleBrowserViewDestroyed,
  'ElectronBrowserView.handleContextMenu': handleContextMenu,
  'ElectronBrowserView.handleDidNavigate': handleDidNavigate,
  'ElectronBrowserView.handleKeyBinding': handleKeyBinding,
  'ElectronBrowserView.handleLogin': HandleLogin.handleLogin,
  'ElectronBrowserView.handlePageFaviconUpdated': handlePageFaviconUpdated,
  'ElectronBrowserView.handleTitleUpdated': handleTitleUpdated,
  'ElectronBrowserView.handleWillNavigate': handleWillNavigate,
  'ElectronBrowserView.handleWindowOpen': handleWindowOpen,
}
