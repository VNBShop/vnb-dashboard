'use client'

import { useEffect, useState } from 'react'

export default function useHydration() {
  const [hydration, setHydration] = useState(true)

  useEffect(() => {
    setHydration(false)
  }, [])

  return { hydration }
}
