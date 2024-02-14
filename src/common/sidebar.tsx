'use client'
import Image from 'next/image'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { sidebarList } from '@/libs/constants'

import Icon, { IconName } from './icons'

export default function Sidebard() {
  const pathname = usePathname()

  return (
    <aside className="lg:col-span-[20%] hidden h-full flex-col overflow-hidden border-r py-4 pt-2 lg:flex">
      <header className="flex items-center gap-2 border-b border-b-gray-100 px-4 pb-2">
        <Image
          src="/icon.png"
          alt="Branch"
          width={40}
          height={40}
          sizes="100vw"
        />
        <p className="text-xl font-semibold">
          Dash<span className="text-secondary">board</span>
        </p>
      </header>

      <section className="mt-2 flex-1 overflow-auto px-2">
        {sidebarList.map((item) => (
          <Link
            href={item.url}
            key={item.label}
            className="flex items-center gap-2 rounded-[4px] p-2 hover:cursor-pointer lg:hover:bg-gray-100"
          >
            <Icon
              name={item.icon as IconName}
              size={20}
              color={item.url === pathname ? '#ff2461' : ''}
            />
            <p
              className={`${
                item.url === pathname ? 'text-[#ff2461]' : ''
              } text-[13px] font-medium`}
            >
              {item.label}
            </p>
          </Link>
        ))}
      </section>
      <section className="px-2">
        <section className="flex items-center justify-between rounded-lg p-2 px-2 hover:cursor-pointer hover:bg-gray-100">
          <figure className="flex items-center gap-2">
            <Image
              src="/avt.png"
              width={30}
              height={30}
              sizes="100vw"
              alt="avt"
            />

            <figcaption className="font-medium text-gray-600">
              Logout
            </figcaption>
          </figure>

          <Icon name="Logout" size={18} />
        </section>
      </section>
    </aside>
  )
}
