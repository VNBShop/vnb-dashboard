import { createRef } from 'react'

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import Icon from '@/common/icons'
import ProductForm from '@/components/form/product'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/drop-menu'
import { Modal, ModalProps } from '@/components/ui/modal'
import Spinner from '@/components/ui/spinner'
import { ProductResponse } from '@/hooks/useTableDataProduct'
import { Product } from '@/types/product'
import { DataError, DataResponse } from '@/types/react-query'
import { Store } from '@/types/store'

type ProductTableActionProps = {
  data: Store
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
}

export default function ProductTableAction({
  data,
  refetch,
}: ProductTableActionProps) {
  const axios = useAxiosPrivate()
  const modalUpdateRef = createRef<ModalProps>()
  const modalDeleteRef = createRef<ModalProps>()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    Product['productId'],
    unknown
  >({
    mutationFn: (_data) => {
      const res = axios.delete(`/product-service/api/v1/products/${_data}`)
      return res
    },

    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(
          response?.data?.metadata?.message ??
            `Deactivate ${data?.productName} successfully!`
        )
        if (!!modalDeleteRef.current) {
          modalDeleteRef.current.onClose()
        }

        refetch()
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.metadata?.message ?? 'Some thing went wrong!'
      )
    },
  })

  return (
    <>
      <>
        {data?.productStatus ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-8 w-8 items-center justify-center hover:cursor-pointer">
                <Icon name="Ellipsis" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                onClick={() => {
                  if (!!modalUpdateRef.current) {
                    modalUpdateRef.current?.onOpen()
                  }
                }}
              >
                <div className=" flex items-center gap-2">
                  <Icon name="Pen" size={16} />
                  Update
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  if (!!modalDeleteRef.current) {
                    modalDeleteRef.current.onOpen()
                  }
                }}
              >
                <div className=" flex items-center gap-2">
                  <Icon name="Trash" size={16} />
                  Deactivate
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div></div>
        )}
      </>

      <Modal ref={modalDeleteRef} header="Deactivate product">
        <section>
          <p className=" my-4">
            Are you sure you want to deactivate{' '}
            <span className="text-danger">{data?.productName}</span>?
          </p>

          <footer className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={isPending}
              className=" hover:underline"
              onClick={() => {
                if (!!modalDeleteRef.current) {
                  modalDeleteRef.current?.onClose()
                }
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              className=" flex items-center gap-1 bg-danger"
              size="sm"
              onClick={() => mutate(data.productId)}
            >
              {isPending && <Spinner size={16} />}
              Deactivate
            </Button>
          </footer>
        </section>
      </Modal>

      <Modal size="lg" ref={modalUpdateRef} header="Update product">
        <ProductForm
          updateData={data}
          refetch={refetch}
          onCloseModal={() => {
            if (!!modalUpdateRef.current) {
              modalDeleteRef.current?.onClose()
            }
          }}
        />
      </Modal>
    </>
  )
}
