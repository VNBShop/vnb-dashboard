import Skeleton from 'react-loading-skeleton'

export default function SearchProductSkeleton() {
  return (
    <section className="grid">
      {Array.from({ length: 5 }).map((_, index) => (
        <section key={index} className="flex items-center gap-3">
          <Skeleton circle width={40} height={40} />
          <article>
            <Skeleton width={120} height={16} />
            <Skeleton width={40} height={16} />
          </article>
        </section>
      ))}
    </section>
  )
}
