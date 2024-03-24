import { useState } from 'react'

import CreateVoucherForm from '@/components/form/create-voucher'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import Spinner from '@/components/ui/spinner'
import useDeleteVoucher from '@/hooks/vouchers/useDeleteVoucher'
import { Voucher } from '@/types/order'

type IProps = {
  data: Voucher
}

export default function VouchersTableAction({ data }: IProps) {
  const [modal, setModal] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const onCloseModalUpdate = () => {
    {
      setModal(false)
    }
  }

  const onCloseModalDelete = () => {
    setModalDelete(false)
  }

  const { loading, onDeleteVoucher } = useDeleteVoucher({
    onSucess: onCloseModalDelete,
  })

  return (
    <>
      <section className="flex items-center gap-1">
        <Button
          onClick={() => setModal(true)}
          size="sm"
          variant="ghost"
          className=" font-medium text-blue-500 hover:underline"
        >
          Update
        </Button>
        <Button
          onClick={() => setModalDelete(true)}
          size="sm"
          variant="ghost"
          className=" font-medium text-danger hover:underline"
        >
          Delete
        </Button>
      </section>

      <Modal
        show={modalDelete}
        onCloseModal={onCloseModalDelete}
        header="Detele voucher"
      >
        <section>
          <p>Are you sure you want to delete this voucher?</p>

          <section className="mt-7 flex items-center justify-end gap-1">
            <Button
              disabled={loading}
              variant="ghost"
              size="sm"
              className="hover:underline"
              onClick={onCloseModalDelete}
            >
              Cancel
            </Button>

            <Button
              disabled={loading}
              size="sm"
              className="space-x-1 bg-danger hover:bg-danger/70"
              onClick={() =>
                onDeleteVoucher({
                  voucherId: data?.voucherId,
                })
              }
            >
              {loading && <Spinner size={16} />}
              <span>Delete</span>
            </Button>
          </section>
        </section>
      </Modal>

      <Modal
        show={modal}
        size="lg"
        onCloseModal={onCloseModalUpdate}
        header="Update voucher"
      >
        <CreateVoucherForm dataUpdate={data} close={onCloseModalUpdate} />
      </Modal>
    </>
  )
}
