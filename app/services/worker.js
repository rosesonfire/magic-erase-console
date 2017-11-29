import magicErase from 'magic-erase'

export const erase = (image, erasePoint, sensitivity) =>
  magicErase({image, erasePoints: [erasePoint], sensitivity})
