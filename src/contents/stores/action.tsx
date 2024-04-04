import { createRef } from 'react'

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import useAxiosPrivate from '@/api/private/useAxios'
import Icon from '@/common/icons'
import StoreForm from '@/components/form/store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/drop-menu'
import { Modal, ModalProps } from '@/components/ui/modal'
import Spinner from '@/components/ui/spinner'
import { ProductResponse } from '@/hooks/products/useProductsTable'
import { StoresResponse } from '@/hooks/stores/useStoresTable'
import { DataError, DataResponse } from '@/types/react-query'
import { Store } from '@/types/store'

type StoreTableActionProps = {
  data: Store
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<StoresResponse, Error>>
}

export default function StoreTableAction({
  data,
  refetch,
}: StoreTableActionProps) {
  const axios = useAxiosPrivate()
  const modalUpdateRef = createRef<ModalProps>()
  const modalDeleteRef = createRef<ModalProps>()

  const { mutate, isPending } = useMutation<
    DataResponse<unknown>,
    DataError<unknown>,
    Store['storeId'],
    unknown
  >({
    mutationFn: (_data) => {
      const res = axios.delete(`/store-service/api/v1/stores/${_data}`)
      return res
    },

    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(
          response?.data?.metadata?.message ??
          `Deactivate ${data?.storeName} successfully!`
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={!data?.status}>
            <div className="flex h-8 w-8 items-center justify-center hover:cursor-pointer">
              <Icon name="Ellipsis" size={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
            {!!data?.status && (
              <>
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
              </>
            )}

          </DropdownMenuContent>
        </DropdownMenu>
      </>

      <Modal ref={modalDeleteRef} header="Deactivate store">
        <section>
          <p className=" my-4">
            Are you sure you want to deactivate{' '}
            <span className="text-danger">{data?.storeName}</span>?
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
              onClick={() => mutate(data.storeId)}
            >
              {isPending && <Spinner size={16} />}
              Deactivate
            </Button>
          </footer>
        </section>
      </Modal>

      <Modal size="lg" ref={modalUpdateRef} header="Update store">
        <StoreForm
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
