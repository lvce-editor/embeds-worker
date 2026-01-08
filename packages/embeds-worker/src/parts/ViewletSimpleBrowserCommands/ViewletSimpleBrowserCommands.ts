import * as SimpleBrowser from '../LoadContent/LoadContent/LoadContent.js'
import * as ViewletSimpleBrowserGetDomTree from '../ViewletSimpleBrowserGetDomTree/ViewletSimpleBrowserGetDomTree.js'
import * as ViewletSimpleBrowserInsertCss from '../ViewletSimpleBrowserInsertCss/ViewletSimpleBrowserInsertCss.js'
import * as ViewletSimpleBrowserInsertJavaScript from '../ViewletSimpleBrowserInsertJavaScript/ViewletSimpleBrowserInsertJavaScript.js'

export const Commands = {
  getDomTree: ViewletSimpleBrowserGetDomTree.getDomTree,
  go: SimpleBrowser.go,
  handleDidNavigate: SimpleBrowser.handleDidNavigate,
  handleDidNavigationCancel: SimpleBrowser.handleDidNavigationCancel,
  handleInput: SimpleBrowser.handleInput,
  handleKeyBinding: SimpleBrowser.handleKeyBinding,
  handleTitleUpdated: SimpleBrowser.handleTitleUpdated,
  handleWillNavigate: SimpleBrowser.handleWillNavigate,
  insertCss: ViewletSimpleBrowserInsertCss.insertCss,
  insertJavaScript: ViewletSimpleBrowserInsertJavaScript.insertJavaScript,
  setUrl: SimpleBrowser.setUrl,
}

export const LazyCommands = {
  openExternal: () => import('../ViewletSimpleBrowserOpenExternal/ViewletSimpleBrowserOpenExternal.js'),
  openBackgroundTab: () => import('../ViewletSimpleBrowserOpenBackgroundTab/ViewletSimpleBrowserOpenBackgroundTab.js'),
  handleContextMenu: () => import('../ViewletSimpleBrowserHandleContextMenu/ViewletSimpleBrowserHandleContextMenu.js'),
  inspectElement: () => import('../ViewletSimpleBrowserInspectElement/ViewletSimpleBrowserInspectElement.js'),
  copyImage: () => import('../ViewletSimpleBrowserCopyImage/ViewletSimpleBrowserCopyImage.js'),
  backward: () => import('../ViewletSimpleBrowserBackward/ViewletSimpleBrowserBackward.js'),
  forward: () => import('../ViewletSimpleBrowserForward/ViewletSimpleBrowserForward.js'),
  openDevtools: () => import('../ViewletSimpleBrowserOpenDevtools/ViewletSimpleBrowserOpenDevtools.js'),
  reload: () => import('../ViewletSimpleBrowserReload/ViewletSimpleBrowserReload.js'),
  cancelNavigation: () => import('../ViewletSimpleBrowserCancelNavigation/ViewletSimpleBrowserCancelNavigation.js'),
}

export const Events = {
  'browser-view-did-navigate': SimpleBrowser.handleDidNavigate,
  'browser-view-title-updated': SimpleBrowser.handleTitleUpdated,
  'browser-view-will-navigate': SimpleBrowser.handleWillNavigate,
}
