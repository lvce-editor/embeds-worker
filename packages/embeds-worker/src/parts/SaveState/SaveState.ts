import * as Assert from '@lvce-editor/assert'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (uid: number): SavedState => {
  Assert.number(uid)
  return {
    url: '',
  }
}
