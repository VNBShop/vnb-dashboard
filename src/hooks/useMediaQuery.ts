import { useEffect, useState } from 'react'

import useEventListener from './useEventListener'

export default function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
    null
  )

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener(
    'change',
    (e: any) => setIsMatch(e.matches),
    mediaQueryList as any
  )

  return isMatch
}
