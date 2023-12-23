import { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/libs/utils'

type HeaderSectionProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  children?: PropsWithChildren
}

export default function HeaderSection({
  children,
  title,
  className,
  ...props
}: HeaderSectionProps) {
  return (
    <section
      className={cn('mt-2 flex items-center justify-between', className)}
      {...props}
    >
      <h1 className="text-lg font-medium">{title}</h1>

      {children}
    </section>
  )
}
