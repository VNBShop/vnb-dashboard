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

import { OrderChart } from '@/hooks/useDashboard'
import useMediaQuery from '@/hooks/useMediaQuery'

type IProps = {
  orderChats: OrderChart[]
}

export default function Chart({ orderChats }: IProps) {
  const isSCMedium = useMediaQuery('(min-width: 768px)')

  const data = [
    {
      name: 'Jan',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Aug',
      uv: 5490,
      pv: 7300,
      amt: 2100,
    },
    {
      name: 'Sep',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Oct',
      uv: 3490,
      pv: 3300,
      amt: 2100,
    },
    {
      name: 'Nov',
      uv: 2490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Dec',
      uv: 4490,
      pv: 2300,
      amt: 2100,
    },
  ]

  return (
    <section className="mt-4 flex w-full flex-col gap-16 rounded bg-white py-2 pt-4 shadow-sm md:flex-row">
      <ResponsiveContainer width={isSCMedium ? '50%' : '100%'} height={300}>
        <LineChart
          data={data}
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
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={isSCMedium ? '50%' : '100%'} height={270}>
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
