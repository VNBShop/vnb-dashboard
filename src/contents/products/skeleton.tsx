import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductTableSkeleton() {
  return (
    <table className="mt-7 w-full rounded-lg border">
      <tbody>
        {Array.from({ length: 9 }).map((_, index) => (
          <tr key={index} className=" animate-pulse">
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index} className="p-2">
                <Skeleton height={40} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
