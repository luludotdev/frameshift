import useSWR from 'swr'
import { useContext } from './useContext'

// #region Types
interface RawStats {
  audioCodec: string
  channelID: string
  ingestServer: string
  ingestViewers: string
  lostPackets: string
  nackPackets: string
  recvPackets: string
  sourceBitrate: string
  sourcePing: string
  startTime: string
  streamTimeSeconds: string
  vendorName: string
  vendorVersion: string
  videoCodec: string
  videoHeight: string
  videoWidth: string
}

interface Stats {
  audioCodec: string
  channelID: number
  ingestServer: string
  ingestViewers: number
  lostPackets: number
  nackPackets: number
  recvPackets: number
  sourceBitrate: number
  sourcePing: number
  startTime: Date
  streamTimeSeconds: number
  vendorName: string
  vendorVersion: string
  videoCodec: string
  videoHeight: number
  videoWidth: number
}

const parseStats: (raw: RawStats) => Stats = raw => ({
  ...raw,

  channelID: Number.parseInt(raw.channelID, 10),
  ingestViewers: Number.parseInt(raw.ingestViewers, 10),
  lostPackets: Number.parseInt(raw.lostPackets, 10),
  nackPackets: Number.parseInt(raw.nackPackets, 10),
  recvPackets: Number.parseInt(raw.recvPackets, 10),
  sourceBitrate: Number.parseInt(raw.sourceBitrate, 10),
  sourcePing: Number.parseInt(raw.sourcePing, 10),
  startTime: new Date(Number.parseInt(raw.startTime, 10)),
  streamTimeSeconds: Number.parseInt(raw.streamTimeSeconds, 10),
  videoHeight: Number.parseInt(raw.videoHeight, 10),
  videoWidth: Number.parseInt(raw.videoWidth, 10),
})
// #endregion

export const useStats: () => {
  data: Stats | undefined
  error: unknown
} = () => {
  const { channelID, serverURI } = useContext()

  const uri = `${serverURI ?? ''}/api/live/${channelID}`
  const { data, error } = useSWR<RawStats, unknown>(uri, {
    refreshInterval: 5 * 1000,
  })

  if (error) return { data: undefined, error }
  if (data === undefined) return { data, error }

  return { data: parseStats(data), error }
}
