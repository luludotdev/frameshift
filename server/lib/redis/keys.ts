const PREFIX = 'ftl'
type KeyFn = (streamID: string) => string

export const dataKey: KeyFn = id => `${PREFIX}:data:${id}`

export const previewKey: KeyFn = id => `${PREFIX}:preview:${id}`
export enum PreviewKeyField {
  Buffer = 'data',
  MIME = 'mime',
}
