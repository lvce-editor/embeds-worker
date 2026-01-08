// based on vscode's simple browser by Microsoft (https://github.com/microsoft/vscode/blob/e8fe2d07d31f30698b9262dd5e1fcc59a85c6bb1/extensions/simple-browser/src/extension.ts, License MIT)

import * as BackgroundLoadContent from '../BackgroundLoadContent/BackgroundLoadContent.ts'
import * as CreateLoadContent from '../CreateLoadContent/CreateLoadContent.ts'
import * as DisposeLoadContent from '../DisposeLoadContent/DisposeLoadContent.ts'
import * as GoLoadContent from '../GoLoadContent/GoLoadContent.ts'
import * as HandleLoadContentDidNavigate from '../HandleLoadContentDidNavigate/HandleLoadContentDidNavigate.ts'
import * as HandleLoadContentDidNavigationCancel from '../HandleLoadContentDidNavigationCancel/HandleLoadContentDidNavigationCancel.ts'
import * as HandleLoadContentInput from '../HandleLoadContentInput/HandleLoadContentInput.ts'
import * as HandleLoadContentKeyBinding from '../HandleLoadContentKeyBinding/HandleLoadContentKeyBinding.ts'
import * as HandleLoadContentTitleUpdated from '../HandleLoadContentTitleUpdated/HandleLoadContentTitleUpdated.ts'
import * as HandleLoadContentWillNavigate from '../HandleLoadContentWillNavigate/HandleLoadContentWillNavigate.ts'
import * as HideLoadContent from '../HideLoadContent/HideLoadContent.ts'
import * as LoadContentFunction from '../LoadContentFunction/LoadContentFunction.ts'
import * as SaveLoadContentState from '../SaveLoadContentState/SaveLoadContentState.ts'
import * as SetLoadContentUrl from '../SetLoadContentUrl/SetLoadContentUrl.ts'
import * as ShowLoadContent from '../ShowLoadContent/ShowLoadContent.ts'

export const create = CreateLoadContent.createLoadContent
export const saveState = SaveLoadContentState.saveLoadContentState
export const { backgroundLoadContent } = BackgroundLoadContent
export const { loadContent } = LoadContentFunction
export const show = ShowLoadContent.showLoadContent
export const hide = HideLoadContent.hideLoadContent
export const handleInput = HandleLoadContentInput.handleLoadContentInput
export const setUrl = SetLoadContentUrl.setLoadContentUrl
export const go = GoLoadContent.goLoadContent
export const handleWillNavigate = HandleLoadContentWillNavigate.handleLoadContentWillNavigate
export const handleKeyBinding = HandleLoadContentKeyBinding.handleLoadContentKeyBinding
export const handleDidNavigate = HandleLoadContentDidNavigate.handleLoadContentDidNavigate
export const handleDidNavigationCancel = HandleLoadContentDidNavigationCancel.handleLoadContentDidNavigationCancel
export const handleTitleUpdated = HandleLoadContentTitleUpdated.handleLoadContentTitleUpdated
export const dispose = DisposeLoadContent.disposeLoadContent
