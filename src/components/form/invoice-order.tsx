'use client'

import { useState } from 'react'

import Image from 'next/image'

import { toast } from 'sonner'

import Icon from '@/common/icons'

import useSearchProduct from '@/hooks/products/useSearchProduct'

import { cn } from '@/libs/utils'
import { Product } from '@/types/product'

import SearchProductSkeleton from '../skeleton/search-product'
import { Button } from '../ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export default function InvoiceOrderForm() {
  const [products, setProducts] = useState<Product[]>([])
  const { search, onSearch, isError, isFetching, isLoading, data } =
    useSearchProduct()
  return (
    <section className="mt-5 flex items-center justify-center">
      <section className="w-[70%]">
        <section className="grid gap-28 lg:grid-cols-2">
          <section>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-[350px]" variant="outline">
                  <Icon name="Plus" size={16} />
                  Add product
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[350px]">
                <Command key={'search-product'} shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={(e) => {
                      onSearch(e)
                    }}
                    placeholder="Search product..."
                    className="h-9"
                  />
                  <CommandList>
                    {!isFetching && !isError ? (
                      <section className=" mt-2 space-y-3">
                        {data?.map((product) => (
                          <div
                            key={product?.productId?.toString()}
                            onSelect={() => {
                              setProducts((prev) => {
                                const findIndex = prev.findIndex(
                                  (prod) => prod.productId === product.productId
                                )

                                if (findIndex !== -1) {
                                  toast.error(
                                    `${product?.productName} already have on cart`
                                  )
                                  return prev
                                }
                                return [...prev, product]
                              })
                            }}
                          >
                            <section className="flex items-center gap-3">
                              <figure className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image
                                  src={
                                    product?.productImages[0].productAssetUrl ??
                                    ''
                                  }
                                  alt="product id"
                                  sizes="100vw"
                                  className=" rounded-full object-cover"
                                  fill
                                />
                              </figure>
                              <article className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">
                                    {product?.productName}
                                  </p>

                                  <div
                                    className={cn(
                                      ' rounded-full px-2 py-[2px] text-[10px] text-white',
                                      product?.productStatus
                                        ? 'bg-[#c9edc5] text-[#2c6d28]'
                                        : 'bg-gray-300'
                                    )}
                                  >
                                    {product?.productStatus
                                      ? 'Active'
                                      : 'Inactive'}
                                  </div>
                                </div>
                                <p className="text-xs text-secondary">
                                  {product?.productPrice?.toLocaleString()}
                                </p>

                                <section className="mt-2 flex items-center gap-1">
                                  {product?.productSizes?.map((size) => (
                                    <div
                                      className="flex items-center gap-1 rounded border border-gray-300 p-1 px-2 text-sm"
                                      key={size?.productSizeId}
                                    >
                                      <Icon name="Plus" size={14} />
                                      {size?.productSize}
                                    </div>
                                  ))}
                                </section>
                              </article>
                            </section>
                          </div>
                        ))}
                      </section>
                    ) : null}

                    {(isFetching || isLoading) && !data ? (
                      <SearchProductSkeleton />
                    ) : null}

                    {(isError || !data) && !isFetching ? (
                      <p className="grid place-items-center py-4 text-sm">
                        No product found
                      </p>
                    ) : null}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </section>

          <section>
            <p className="mb-4 flex items-center gap-1 font-medium text-gray-600">
              <Icon name="Cart" size={18} />
              Cart:
            </p>
            <section className=" space-y-4">
              {products?.map((prod) => (
                <article
                  key={prod.productId}
                  className="flex items-center gap-4"
                >
                  <figure className="relative h-[50px] w-[50px] rounded-md">
                    <Image
                      alt="img"
                      src={prod?.productImages[0]?.productAssetUrl}
                      sizes="100vw"
                      className="rounded-md object-cover"
                      fill
                    />
                  </figure>

                  <div>
                    <h2 className="">{prod?.productName}</h2>
                    <p className="text-[13px] font-medium text-secondary">
                      {prod?.productPrice?.toLocaleString()}
                    </p>
                    <section></section>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </section>
      </section>
    </section>
  )
}
