'use client'

import dynamic from 'next/dynamic'

import useDashboard from '@/hooks/useDashboard'
import { cn } from '@/libs/utils'

const Chart = dynamic(() => import('@/contents/home/chart'), {
  ssr: false,
})

export default function HomePage() {
  const { order, product, user, orderChats, saleChats } = useDashboard()

  return (
    <section className="mt-1">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Welcome Back, Admin!
      </h1>

      <p className="mb-7 mt-1.5 text-sm text-gray-500">
        Your store has seen a 52% increase in traffic in the last month. Keep it
        up! 🚀
      </p>

      {/* <section className="my-4 flex justify-end">
        <HomeCalendar dayCount={30} />
      </section> */}

      <section className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-md border bg-white p-2 shadow-sm">
          <p className="text-[15px] font-medium text-gray-500">Revenue</p>
          <p className="text-lg font-medium">
            {Number(order?.totalOrder ?? 0).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <span
              className={cn(
                'flex items-center gap-1',
                (order?.orderPercentage ?? 0) >= 0
                  ? 'text-success'
                  : 'text-danger'
              )}
            >
              {(order?.orderPercentage ?? 0) >= 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              )}
              {order?.orderPercentage ?? 0}%
            </span>{' '}
            since last quarter
          </p>
        </article>

        <article className="rounded-md border bg-white p-2 shadow-sm">
          <p className="text-[15px] font-medium text-gray-500">Sales</p>
          <p className="text-lg font-medium">
            {Number(order?.totalSales ?? 0).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <span
              className={cn(
                'flex items-center gap-1',
                (order?.salesPercentage ?? 0) >= 0
                  ? 'text-success'
                  : 'text-danger'
              )}
            >
              {(order?.salesPercentage ?? 0) >= 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              )}
              {order?.salesPercentage ?? 0}%
            </span>
            since last month
          </p>
        </article>

        <article className="rounded-md border bg-white p-2 shadow-sm">
          <p className="text-[15px] font-medium text-gray-500">Cost</p>
          <p className="text-lg font-medium">
            {Number(product?.importPrice ?? 0).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <span
              className={cn(
                'flex items-center gap-1',
                (product?.importPercentages ?? 0) >= 0
                  ? 'text-success'
                  : 'text-danger'
              )}
            >
              {(product?.importPercentages ?? 0) >= 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              )}
              {product?.importPercentages ?? 0}%
            </span>
            since last month
          </p>
        </article>

        <article className="rounded-md border bg-white p-2 shadow-sm">
          <p className="text-[15px] font-medium text-gray-500">Users</p>
          <p className="text-lg font-medium">
            {Number(user?.totalUsers ?? 0).toLocaleString()}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <span
              className={cn(
                'flex items-center gap-1',
                (user?.userPercentage ?? 0) >= 0 ? 'text-success' : 'text-danger'
              )}
            >
              {(user?.userPercentage ?? 0) >= 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              )}
              {user?.userPercentage ?? 0}%
            </span>
            since last month
          </p>
        </article>
      </section>

      <Chart orderChats={orderChats} saleChats={saleChats} />
    </section>
  )
}
