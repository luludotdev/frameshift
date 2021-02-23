const PREFIX = 'ftl'
type KeyFn = (streamID: string) => string

export const dataKey: KeyFn = id => `${PREFIX}:data:${id}`
