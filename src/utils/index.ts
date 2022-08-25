export * from './dto'

export const hashSlice = (hash: string): string => {
  const sliced = hash.slice(hash.indexOf('p=') + 2, hash.length)
  return sliced
}
