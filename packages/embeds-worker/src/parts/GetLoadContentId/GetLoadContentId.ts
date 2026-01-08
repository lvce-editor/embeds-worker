export const getLoadContentId = (idPart: any): any => {
  if (!idPart) {
    return 0
  }
  return Number.parseInt(idPart)
}
