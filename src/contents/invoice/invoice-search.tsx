import Image from 'next/image'

import Icon from '@/common/icons'

import useSearchProduct from '@/hooks/products/useSearchProduct'
import { cn } from '@/libs/utils'

import { Product } from '@/types/product'

import SearchProductSkeleton from '../../components/skeleton/search-product'
import { Button } from '../../components/ui/button'
import { Command, CommandInput, CommandList } from '../../components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover'

type IProps = {
  onAddProducts: (
    prod: Product & {
      nameSize?: string
      id: number
    }
  ) => void
}
export default function SearchInvoice({ onAddProducts }: IProps) {
  const { search, onSearch, isError, isFetching, isLoading, data } =
    useSearchProduct({ isInvoice: true })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg w-[140px] bg-white" variant="outline">
          <Icon name="Plus" size={16} />
          Add product
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[400px] md:w-[600px]">
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
              <section className=" mt-2 space-y-5">
                {data?.map((product) => (
                  <div
                    className={cn(
                      !data[data.length - 1] ? ' border-b pb-5' : ''
                    )}
                    key={product?.productId?.toString()}
                  >
                    <section className="flex items-center gap-4">
                      <figure className="relative h-[80px] w-[80px] overflow-hidden rounded-md">
                        <Image
                          src={product?.productImages[0].productAssetUrl ?? ''}
                          alt="product id"
                          sizes="100vw"
                          className="rounded-md object-contain"
                          fill
                        />
                      </figure>
                      <article className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="flex-1 text-sm font-medium text-black/70">
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
                            {product?.productStatus ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                        <p className="my-2 text-xs text-secondary">
                          {product?.productPrice?.toLocaleString()}
                        </p>

                        <section className="flex flex-wrap items-center gap-[6px]">
                          {product?.productSizeAndStockResponses?.map(
                            (size) => (
                              <section
                                key={size?.productSizeId}
                                className="flex items-center gap-1 rounded border border-gray-300 text-sm"
                              >
                                <section className="px-2">
                                  <p
                                    className={
                                      !size?.productStock
                                        ? 'text-gray-300'
                                        : 'text-black/70'
                                    }
                                  >
                                    {!!size?.productSize
                                      ? size.productSize
                                      : 'Quantity'}
                                    : {` `} ({size?.productStock ?? 0})
                                  </p>
                                </section>

                                <Button
                                  disabled={
                                    !size?.productStock || !size?.productSizeId
                                  }
                                  onClick={() => {
                                    if (!size?.productSizeId) return
                                    onAddProducts({
                                      ...product,
                                      id: size.productSizeId,
                                      nameSize: size?.productSize,
                                    })
                                  }}
                                  className="h-auto rounded-none border-l bg-transparent p-[6px] px-2 text-black/70 shadow-none hover:cursor-pointer hover:bg-black hover:text-white"
                                >
                                  <Icon name="Plus" size={20} />
                                </Button>
                              </section>
                            )
                          )}
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
  )
}
