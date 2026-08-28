import * as AcceptLogin from '../AcceptLogin/AcceptLogin.ts'
import * as CancelLogin from '../CancelLogin/CancelLogin.ts'
import * as CapturePage from '../CapturePage/CapturePage.ts'
import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.ts'
import * as Exit from '../Exit/Exit.ts'
import * as HandleLogin from '../HandleLogin/HandleLogin.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as SetFallthroughKeyBindings from '../SetFallthroughKeyBindings/SetFallthroughKeyBindings.ts'

export const commandMap = {
  'ElectronWebContentsView.acceptLogin': AcceptLogin.acceptLogin,
  'ElectronWebContentsView.backward': ElectronWebContentsView.backward,
  'ElectronWebContentsView.cancelLogin': CancelLogin.cancelLogin,
  'ElectronWebContentsView.cancelNavigation': ElectronWebContentsView.cancelNavigation,
  'ElectronWebContentsView.capturePage': CapturePage.capturePage,
  'ElectronWebContentsView.copyImageAt': ElectronWebContentsView.copyImageAt,
  'ElectronWebContentsView.createWebContentsView': ElectronWebContentsView.createWebContentsView,
  'ElectronWebContentsView.disposeWebContentsView': ElectronWebContentsView.disposeWebContentsView,
  'ElectronWebContentsView.focus': ElectronWebContentsView.focus,
  'ElectronWebContentsView.forward': ElectronWebContentsView.forward,
  'ElectronWebContentsView.getDomTree': ElectronWebContentsView.getDomTree,
  'ElectronWebContentsView.getStats': ElectronWebContentsView.getStats,
  'ElectronWebContentsView.handleContextMenu': ElectronWebContentsView.handleContextMenu,
  'ElectronWebContentsView.handleDidNavigate': ElectronWebContentsView.handleDidNavigate,
  'ElectronWebContentsView.handleKeyBinding': ElectronWebContentsView.handleKeyBinding,
  'ElectronWebContentsView.handleLogin': HandleLogin.handleLogin,
  'ElectronWebContentsView.handlePageFaviconUpdated': ElectronWebContentsView.handlePageFaviconUpdated,
  'ElectronWebContentsView.handleTitleUpdated': ElectronWebContentsView.handleTitleUpdated,
  'ElectronWebContentsView.handleWillNavigate': ElectronWebContentsView.handleWillNavigate,
  'ElectronWebContentsView.handleWindowOpen': ElectronWebContentsView.handleWindowOpen,
  'ElectronWebContentsView.hide': ElectronWebContentsView.hide,
  'ElectronWebContentsView.insertCss': ElectronWebContentsView.insertCss,
  'ElectronWebContentsView.insertJavaScript': ElectronWebContentsView.insertJavaScript,
  'ElectronWebContentsView.inspectElement': ElectronWebContentsView.inspectElement,
  'ElectronWebContentsView.openDevtools': ElectronWebContentsView.openDevtools,
  'ElectronWebContentsView.reload': ElectronWebContentsView.reload,
  'ElectronWebContentsView.resizeWebContentsView': ElectronWebContentsView.resizeWebContentsView,
  'ElectronWebContentsView.setAudioMuted': ElectronWebContentsView.setAudioMuted,
  'ElectronWebContentsView.setFallthroughKeyBindings': SetFallthroughKeyBindings.setFallthroughKeyBindings,
  'ElectronWebContentsView.setIframeSrc': ElectronWebContentsView.setIframeSrc,
  'ElectronWebContentsView.show': ElectronWebContentsView.show,
  'Exit.exit': Exit.exit,
  'Initialize.initialize': Initialize.initialize,
}
