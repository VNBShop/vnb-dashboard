'use client'
import React from 'react'

import { addDays, format } from 'date-fns'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'

type HomeCalendarProps = {
  dateRange?: DateRange
  dayCount?: number
}

export default function HomeCalendar({
  dateRange,
  dayCount,
}: HomeCalendarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [from, to] = React.useMemo(() => {
    let fromDay: Date | undefined
    let toDay: Date | undefined

    if (dateRange) {
      fromDay = dateRange.from
      toDay = dateRange.to
    } else if (dayCount) {
      toDay = new Date()
      fromDay = addDays(toDay, -dayCount)
    }

    return [fromDay, toDay]
  }, [dateRange, dayCount])

  const [date, setDate] = React.useState<DateRange | undefined>({ from, to })

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // Update query string
  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        from: date?.from ? format(date.from, 'yyyy-MM-dd') : null,
        to: date?.to ? format(date.to, 'yyyy-MM-dd') : null,
      })}`,
      {
        scroll: false,
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date?.from, date?.to])

  return <Calendar mode="range" date={date} onChange={setDate} />
}
