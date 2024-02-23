import { useState } from 'react'

import Image from 'next/image'

import Carousel from '@/components/carousel'

type ProductTableImageProps = {
  images: string[]
}

export default function ProductWarehouseTableImage({
  images,
}: ProductTableImageProps) {
  const [gallery, setGallery] = useState<string[]>([])

  return (
    <>
      <figure className="relative h-[70px] w-[70px] self-center rounded-md">
        <Image
          src={images[0]}
          alt="product"
          fill
          sizes="100vw"
          className="rounded-md object-contain transition-all duration-300 ease-in-out hover:cursor-pointer"
          onClick={() => setGallery(images)}
        />
      </figure>

      <Carousel images={gallery} close={() => setGallery([])} />
    </>
  )
}
