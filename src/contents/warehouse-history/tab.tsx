'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function WarehouseHistoryTab() {
  const pathname = usePathname()
  return (
    <section className="mb-4 flex items-center">
      <Link
        href="/warehouse-history/import"
        className="relative p-2 px-5 text-sm font-medium"
      >
        <p
          style={{
            color: pathname === '/warehouse-history/imported' ? '#ff2461' : '',
          }}
        >
          Imported
        </p>
        {pathname === '/warehouse-history/imported' ? (
          <div className=" absolute inset-x-0 bottom-0 h-[2px] w-full rounded bg-secondary" />
        ) : null}
      </Link>
      <Link
        href="/warehouse-history/export"
        className="relative p-2 px-5 text-sm font-medium"
      >
        <p
          style={{
            color: pathname === '/warehouse-history/exported' ? '#ff2461' : '',
          }}
        >
          Exported
        </p>
        {pathname === '/warehouse-history/exported' ? (
          <div className=" absolute inset-x-0 bottom-0 h-[2px] w-full rounded bg-secondary" />
        ) : null}
      </Link>
    </section>
  )
}
