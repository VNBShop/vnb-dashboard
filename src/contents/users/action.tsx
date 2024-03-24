import { createRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import Spinner from '@/components/ui/spinner'
import useDeleteUser from '@/hooks/users/useDeleteUser'
import { User } from '@/types/user'

type IProps = {
  data: User
}

export default function UsersShipperTableAction({ data }: IProps) {
  const modalDeleteRef = createRef<ModalProps>()
  const [modal, setModal] = useState(false)

  const { loading, onDeactivateUser } = useDeleteUser({
    onSuccess: () => {
      setModal(false)
    },
  })

  return (
    <>
      <>
        <Button
          disabled={!data?.isActive}
          onClick={() => setModal(true)}
          size="sm"
          className="bg-danger hover:bg-danger/70"
        >
          Deactivate
        </Button>
      </>

      <Modal
        show={modal}
        onClick={() => setModal(false)}
        header="Confirm delete user"
      >
        <section>
          <p className=" my-4">
            Are you sure you want to deactivate{' '}
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
                onDeactivateUser({
                  userId: data?.userId,
                })
              }
            >
              {loading && <Spinner size={16} />}
              Deactivate
            </Button>
          </footer>
        </section>
      </Modal>
    </>
  )
}
