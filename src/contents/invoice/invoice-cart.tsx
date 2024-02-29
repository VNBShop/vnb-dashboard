import { Dispatch, SetStateAction } from 'react'

import Image from 'next/image'

import Icon from '@/common/icons'

import { CartInvoice } from '../../components/form/invoice-order'
import InputNumber from '../../components/ui/input-number'

type IProps = {
  products: CartInvoice[]
  setProducts: Dispatch<SetStateAction<CartInvoice[]>>
}

export default function InvoiceCart({ products, setProducts }: IProps) {
  const onDelete = (id: number) => {
    if (!id) return
    setProducts((prev) => prev.filter((item) => item.id !== id))
  }
  return (
    <section className="w-full flex-1 rounded-md bg-white p-4 shadow-sm">
      <p className="mb-4 flex items-center gap-1 font-medium">
        <Icon name="Cart" size={16} />
        Cart:
      </p>
      <section className=" space-y-6">
        {products?.map((prod) => (
          <article key={prod.id} className="flex items-center gap-6">
            <figure className="relative h-[85px] w-[85px] rounded-md">
              <Image
                alt="img"
                src={prod?.productImages[0]?.productAssetUrl}
                sizes="100vw"
                className="rounded-md object-cover"
                fill
              />
            </figure>

            <div className="flex-1">
              <h2 className="text-[15px]">
                {prod?.productName}{' '}
                {prod?.nameSize ? <span>({prod.nameSize})</span> : null}
              </h2>
              <p className="my-1 mb-2 text-sm font-medium text-secondary">
                {prod?.productPrice?.toLocaleString()}
              </p>
              <section className=" flex items-end justify-between">
                <section className="flex items-center">
                  <button
                    disabled={!prod.quantity || prod.quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-l-md bg-blue-500 text-white"
                    onClick={() => {
                      setProducts((prev) => {
                        const findProduct = prev.findIndex(
                          (item) => item.id === prod.id
                        )

                        if (findProduct !== -1) {
                          const newProds = [...prev]
                          newProds[findProduct] = {
                            ...newProds[findProduct],
                            quantity: newProds[findProduct].quantity - 1,
                          }

                          return newProds
                        }

                        return prev
                      })
                    }}
                  >
                    <Icon name="Minus" size={16} />
                  </button>
                  <InputNumber
                    value={prod?.quantity}
                    onValueChange={(value) => {
                      setProducts((prev) => {
                        const findProduct = prev.findIndex(
                          (item) => item.id === prod.id
                        )

                        if (findProduct !== -1) {
                          const newProds = [...prev]
                          newProds[findProduct] = {
                            ...newProds[findProduct],
                            quantity: value?.floatValue ?? 1,
                          }

                          return newProds
                        }

                        return prev
                      })
                    }}
                    className="h-8 w-[50px] rounded-none text-center"
                  />
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-r-md bg-blue-500 text-white"
                    onClick={() => {
                      setProducts((prev) => {
                        const findProduct = prev.findIndex(
                          (item) => item.id === prod.id
                        )

                        if (findProduct !== -1) {
                          const newProds = [...prev]
                          newProds[findProduct] = {
                            ...newProds[findProduct],
                            quantity: newProds[findProduct].quantity + 1,
                          }

                          return newProds
                        }

                        return prev
                      })
                    }}
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </section>

                <div
                  className="text-gray-600 hover:cursor-pointer hover:text-danger"
                  onClick={() => onDelete(prod.id)}
                >
                  <Icon name="Trash" size={23} />
                </div>
              </section>
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}
