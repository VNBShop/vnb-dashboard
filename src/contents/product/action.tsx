import { createRef, useState } from 'react'

import Icon from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import { Product } from '@/types/product'

type ProductTableActionProps = {
  data: Product
}

export default function ProductTableAction({ data }: ProductTableActionProps) {
  const modalDeleteRef = createRef<ModalProps>()

  return (
    <>
      <Modal ref={modalDeleteRef} header="Deactivate product">
        <section>
          <p className=" my-4">Are you sure you want to deactivate ?</p>

          <footer className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="sm" className=" hover:underline">
              Cancel
            </Button>
            <Button className=" bg-danger" size="sm">
              Deactivate
            </Button>
          </footer>
        </section>
      </Modal>
      <>
        {data?.productStatus ? (
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className=" flex items-center gap-1 text-success hover:cursor-pointer hover:underline">
              <Icon name="Pen" size={16} />
              Update
            </div>
            <div
              className=" flex items-center gap-1 text-danger hover:cursor-pointer hover:underline"
              onClick={() => {
                if (!!modalDeleteRef.current) {
                  modalDeleteRef.current.onOpen()
                }
              }}
            >
              <Icon name="Trash" size={16} />
              Deactivate
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    </>
  )
}
