import dynamic from 'next/dynamic'

import source from '@/common/animates/success.animate.json'
import Icon from '@/common/icons'
import { CartInvoice } from '@/components/form/invoice-order'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

const Animate = dynamic(() => import('@/common/animates/animate'), {
  ssr: false,
})

type IProps = {
  products?: CartInvoice[]
  open: boolean
  onCloseModal: () => void
}

export default function InvoiceStateModal({ onCloseModal, open }: IProps) {
  return (
    <Modal show={open} onCloseModal={onCloseModal} header="Created ordered">
      <div>
        <Animate
          src={source}
          style={{
            width: 100,
          }}
        />
      </div>

      <section className="flex items-center justify-center">
        <p className="text-lg font-medium text-success">
          Creared order successfully!
        </p>
      </section>

      <section className="mt-7 flex items-center justify-center gap-4">
        <Button className="h-10" variant="outline">
          <Icon name="Checked" size={18} />
          <span>Finished</span>
        </Button>
        <Button className="h-10 bg-secondary">
          <Icon name="Printer" size={18} />
          <span>Print</span>
        </Button>
      </section>
    </Modal>
  )
}
