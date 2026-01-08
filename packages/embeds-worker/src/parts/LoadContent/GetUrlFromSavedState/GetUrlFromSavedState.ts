export const getUrlFromSavedState = (savedState: any): any => {
  if (savedState && savedState.iframeSrc) {
    return savedState.iframeSrc
  }
  return ''
}
