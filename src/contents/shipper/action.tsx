import { createRef, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import Spinner from '@/components/ui/spinner'
import useDeleteShipper from '@/hooks/shipper/useDeleteShipper'
import { Shipper } from '@/types/order'

type IProps = {
  data: Shipper
}

export default function ShipperTableAction({ data }: IProps) {
  const modalDeleteRef = useRef<ModalProps | null>(null)

  const { loading, onDeleteShipper } = useDeleteShipper({
    onSuccess: () => {
      !!modalDeleteRef?.current && modalDeleteRef?.current?.onClose()
    },
  })

  return (
    <>
      <>
        <Button
          onClick={() =>
            !!modalDeleteRef?.current && modalDeleteRef?.current?.onOpen()
          }
          size="sm"
          className="bg-danger hover:bg-danger/70"
        >
          Delete
        </Button>
      </>

      <Modal ref={modalDeleteRef} header="Confirm delete user">
        <section>
          <p className=" my-4">
            Are you sure you want to delete{' '}
            <span className="text-danger">{`${data?.firstName} ${data?.lastName}`}</span>
            ?
          </p>

          <footer className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={loading}
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
              disabled={loading}
              className=" flex items-center gap-1 bg-danger"
              size="sm"
              onClick={() =>
                onDeleteShipper({
                  shipperId: data?.shipperId,
                })
              }
            >
              {loading && <Spinner size={16} />}
              Delete
            </Button>
          </footer>
        </section>
      </Modal>
    </>
  )
}
