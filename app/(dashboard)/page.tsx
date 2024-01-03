import dynamic from 'next/dynamic'

import { Breadcrumbs } from '@/components/breadscrum'
import { DateRangePicker } from '@/components/date-rangepicker'
import HeaderSection from '@/components/header-section'

const Chart = dynamic(() => import('@/contents/home/chart'), {
  ssr: false,
})

export default function Home() {
  return (
    <section className="mt-1">

      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, Admin!</h1>

      <p className="mt-1.5 text-sm text-gray-500">
        Your store has seen a 52% increase in traffic in the last month. Keep it up! 🚀
      </p>

      <section className="my-4 flex justify-end">
        <DateRangePicker dayCount={30} />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-md bg-white p-2">
          <p className="text-[15px] font-medium text-gray-500">Revenue</p>
          <p className="text-lg font-medium">
            {Number(123000000).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="text-success flex items-center gap-1"><svg
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
            </svg>15%</span> since last quarter
          </p>
        </article>

        <article className="rounded-md bg-white p-2">
          <p className="text-[15px] font-medium text-gray-500">Sales</p>
          <p className="text-lg font-medium">
            {Number(56400000).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="text-success flex items-center gap-1"><svg
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
            </svg>23%</span> since last month
          </p>
        </article>

        <article className="rounded-md bg-white p-2">
          <p className="text-[15px] font-medium text-gray-500">Cost</p>
          <p className="text-lg font-medium">
            {Number(150000000).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="text-danger flex items-center gap-1"> <svg
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
            </svg> 0.4%</span> since last month
          </p>

        </article>

        <article className="rounded-md bg-white p-2">
          <p className="text-[15px] font-medium text-gray-500">Users</p>
          <p className="text-lg font-medium">{Number(1534).toLocaleString()}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="text-success flex items-center gap-1"><svg
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
            </svg>3%</span> since last month
          </p>
        </article>
      </section>

      <Chart />
    </section>
  )
}
