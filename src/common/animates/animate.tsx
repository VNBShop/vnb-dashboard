'use client'
import { ComponentPropsWithoutRef } from 'react'

import { Player } from '@lottiefiles/react-lottie-player'

export default function Animate({
  ...props
}: ComponentPropsWithoutRef<typeof Player>) {
  return <Player autoplay keepLastFrame {...props} />
}
