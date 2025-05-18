import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.ts'
import * as Exit from '../Exit/Exit.ts'
import * as Initialize from '../Initialize/Initialize.ts'

export const commandMap = {
  'ElectronWebContentsView.backward': ElectronWebContentsView.backward,
  'ElectronWebContentsView.cancelNavigation': ElectronWebContentsView.cancelNavigation,
  'ElectronWebContentsView.copyImageAt': ElectronWebContentsView.copyImageAt,
  'ElectronWebContentsView.createWebContentsView': ElectronWebContentsView.createWebContentsView,
  'ElectronWebContentsView.disposeWebContentsView': ElectronWebContentsView.disposeWebContentsView,
  'ElectronWebContentsView.focus': ElectronWebContentsView.focus,
  'ElectronWebContentsView.forward': ElectronWebContentsView.forward,
  'ElectronWebContentsView.getDomTree': ElectronWebContentsView.getDomTree,
  'ElectronWebContentsView.getStats': ElectronWebContentsView.getStats,
  'ElectronWebContentsView.handleContextMenu': ElectronWebContentsView.handleContextMenu,
  'ElectronWebContentsView.handleDidNavigate': ElectronWebContentsView.handleDidNavigate,
  'ElectronWebContentsView.handleTitleUpdated': ElectronWebContentsView.handleTitleUpdated,
  'ElectronWebContentsView.handleWillNavigate': ElectronWebContentsView.handleWillNavigate,
  'ElectronWebContentsView.hide': ElectronWebContentsView.hide,
  'ElectronWebContentsView.insertCss': ElectronWebContentsView.insertCss,
  'ElectronWebContentsView.insertJavaScript': ElectronWebContentsView.insertJavaScript,
  'ElectronWebContentsView.inspectElement': ElectronWebContentsView.inspectElement,
  'ElectronWebContentsView.openDevtools': ElectronWebContentsView.openDevtools,
  'ElectronWebContentsView.reload': ElectronWebContentsView.reload,
  'ElectronWebContentsView.resizeWebContentsView': ElectronWebContentsView.resizeWebContentsView,
  'ElectronWebContentsView.setFallthroughKeyBindings': ElectronWebContentsView.setFallthroughKeyBindings,
  'ElectronWebContentsView.setIframeSrc': ElectronWebContentsView.setIframeSrc,
  'ElectronWebContentsView.show': ElectronWebContentsView.show,
  'Exit.exit': Exit.exit,
  'Initialize.initialize': Initialize.initialize,
}
