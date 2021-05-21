import { useEffect, useState } from 'react'

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  useEffect(() => {
    const userAgent = typeof window === 'undefined' ? '' : navigator.userAgent
    const mobile = Boolean(
      /android|blackberry|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(
        userAgent
      )
    )

    setIsMobile(mobile)
  }, [])

  return { isMobile }
}
