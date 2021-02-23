const PREFIX = 'ftl'
type KeyFn = (streamID: string) => string

export const dataKey: KeyFn = id => `${PREFIX}:${id}:data`

export const previewKey: KeyFn = id => `${PREFIX}:${id}:preview`
export enum PreviewKeyField {
  Buffer = 'data',
  MIME = 'mime',
}
