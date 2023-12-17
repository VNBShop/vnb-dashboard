import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/contents/home/chart'), {
  ssr: false,
})

export default function Home() {
  return (
    <section className="mt-1">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <section className="mt-4 grid grid-cols-4 gap-4">
        <article className="rounded-md bg-white p-2">
          <p className="text-[15px] font-medium text-gray-500">Revenue</p>
          <p className="text-lg font-medium">
            {Number(123000000).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
          <p className="text-sm text-gray-500">
            <span className="text-success">+15%</span> since last quarter
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
          <p className="text-sm text-gray-500">
            <span className="text-success">+23%</span> since last month
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
          <p className="text-sm text-gray-500">
            <span className="text-danger">-0.4%</span> since last month
          </p>
        </article>

        <article className="rounded-md bg-white p-2">
          <p className="text-[15px] font-medium text-gray-500">Users</p>
          <p className="text-lg font-medium">{Number(1534).toLocaleString()}</p>
          <p className="text-sm text-gray-500">
            <span className="text-success">+3%</span> since last month
          </p>
        </article>
      </section>
      <Chart />
    </section>
  )
}
