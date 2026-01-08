import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as IsEmptyString from '../../IsEmptyString/IsEmptyString.js'

export const handleLoadContentInput = async (state: SimpleBrowserState, value: any): Promise<any> => {
  const { hasSuggestionsOverlay, suggestionsEnabled } = state
  if (suggestionsEnabled && IsEmptyString.isEmptyString(value) && hasSuggestionsOverlay) {
    return {
      ...state,
      inputValue: value,
      hasSuggestionsOverlay: false,
    }
  }
  // TODO maybe show autocomplete for urls like browsers do
  return {
    ...state,
    inputValue: value,
    hasSuggestionsOverlay: true,
  }
}
