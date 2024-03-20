'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { OrderChart, SaleChart } from '@/hooks/useDashboard'
import useMediaQuery from '@/hooks/useMediaQuery'

type IProps = {
  orderChats: OrderChart[]
  saleChats: SaleChart[]
}

export default function Chart({ orderChats, saleChats }: IProps) {
  const isSCMedium = useMediaQuery('(min-width: 768px)')

  return (
    <section className="mt-4 flex w-full flex-col gap-16 rounded bg-white py-2 pt-4 shadow-sm md:flex-row">
      <ResponsiveContainer width={isSCMedium ? '50%' : '100%'} height={300}>
        <LineChart
          data={saleChats}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="totalImport" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={isSCMedium ? '50%' : '100%'} height={300}>
        <AreaChart
          data={orderChats}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="badminton"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="football"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="basketball"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  )
}
