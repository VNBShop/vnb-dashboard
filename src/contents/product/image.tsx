import { useState } from 'react'

import Image from 'next/image'

import Carousel from '@/components/carousel'
import { Product } from '@/types/product'

type ProductTableImageProps = {
  images: string[]
}

export default function ProductTableImage({ images }: ProductTableImageProps) {
  const [gallery, setGallery] = useState<string[]>([])

  return (
    <>
      <Image
        src={images[0]}
        alt="product"
        width={70}
        height={50}
        sizes="100vw"
        className="transition-all duration-300 ease-in-out hover:cursor-pointer"
        onClick={() => setGallery(images)}
      />

      <Carousel images={gallery} close={() => setGallery([])} />
    </>
  )
}
