'use client'

import * as React from 'react'

import { addDays, format } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { DateRange } from 'react-day-picker'

import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/libs/utils'

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange?: DateRange
  dayCount?: number
  align?: 'center' | 'start' | 'end'
}

export function DateRangePicker({
  dateRange,
  dayCount,
  align = 'start',
  className,
  ...props
}: DateRangePickerProps) {
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

  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'xs:w-[300px] flex w-full items-center justify-start gap-2 truncate bg-white text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <Icon name="Calandar" width={20} height={20} />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-white p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
