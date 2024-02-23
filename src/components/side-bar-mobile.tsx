'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Session } from 'next-auth'
import { Drawer } from 'vaul'

import Icon from '@/common/icons'

import Sidebar from './sidebar'

import { Button } from './ui/button'

import { Logo } from '../../public'
type SidebarMobileProps = {
  user: Session['user']
}
export default function SidebarMobile({ user }: SidebarMobileProps) {
  const [open, setOpen] = useState(false)
  return (
    <header className="flex items-center justify-between border border-b px-4 py-2 lg:hidden">
      <Image src={Logo} alt="Branch" width={40} height={40} sizes="100vw" />

      <Drawer.Root
        open={open}
        onOpenChange={setOpen}
        direction="left"
        shouldScaleBackground
      >
        <Drawer.Trigger>
          <Button variant="outline" size={'sm'}>
            <Icon name="Hamburger" size={20} />
          </Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full flex-col bg-zinc-100 md:w-[60%]">
            <Sidebar user={user} onClose={() => setOpen(false)} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </header>
  )
}
