'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

import Logo from './../../../public/google.png'

export default function GoogleOAuth() {
  const onSubmit = async () => {
    await signIn('google', {
      redirect: false,
    })
  }

  return (
    <>
      <Button className="gap-1 bg-white hover:bg-white" onClick={onSubmit}>
        <Image
          src={Logo}
          alt="google"
          width={40}
          height={40}
          sizes="100vw"
          className=" object-contain"
        />
        <span className="text-sm text-black">Signin width google</span>
      </Button>
    </>
  )
}
