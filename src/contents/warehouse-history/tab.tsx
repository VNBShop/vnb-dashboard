'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

type IProps = {
  user: Session['user']
}

export default function WarehouseHistoryTab({ user }: IProps) {
  const pathname = usePathname()
  return (
    <section className="mb-4 flex items-center">
      <Link
        href="/warehouse-history/imported"
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
      {user?.roles?.includes('ADMIN') && (
        <Link
          href="/warehouse-history/exported"
          className="relative p-2 px-5 text-sm font-medium"
        >
          <p
            style={{
              color:
                pathname === '/warehouse-history/exported' ? '#ff2461' : '',
            }}
          >
            Exported
          </p>
          {pathname === '/warehouse-history/exported' ? (
            <div className=" absolute inset-x-0 bottom-0 h-[2px] w-full rounded bg-secondary" />
          ) : null}
        </Link>
      )}
    </section>
  )
}
