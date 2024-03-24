import { createRef, useState } from 'react'

import Image from 'next/image'

import PostMedia from '@/components/post-media'
import PostStatus from '@/components/post-status'
import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import Spinner from '@/components/ui/spinner'
import useHandleReportPost from '@/hooks/reports/useHandleReportPost'
import { Report } from '@/types/user'

type IProps = {
  data: Report
}

export default function ReportsTableAction({ data }: IProps) {
  const [modal, setModal] = useState(false)

  const { loading, onHandleReportPost } = useHandleReportPost({
    onSuccess: () => {
      setModal(false)
    },
  })

  return (
    <>
      <>
        <Button
          onClick={() => setModal(true)}
          size="sm"
          variant="ghost"
          className=" font-medium text-success hover:underline"
        >
          {data?.post?.postId}
        </Button>
      </>

      <Modal
        show={modal}
        size="lg"
        onClick={() => setModal(false)}
        closeOutside={false}
        header="Check report"
      >
        <section>
          <article className="mb-7 bg-white py-3 md:rounded-md">
            <section className="flex items-center gap-2">
              <figure className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={data?.post?.postAuthorAvatar ?? ''}
                  alt="avt"
                  fill
                  sizes="100vw"
                  className=" object-cover"
                />
              </figure>
              <div>
                <p className="text-sm font-medium">
                  {data?.post?.postAuthorName}
                </p>
              </div>
            </section>

            <PostStatus post={data?.post} />

            <PostMedia post={data?.post} />
          </article>

          <footer className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              disabled={loading}
              size="sm"
              className="flex items-center gap-1 bg-danger text-white"
              onClick={() =>
                onHandleReportPost({
                  reportId: data?.postReportId,
                  type: 'reject',
                })
              }
            >
              {loading && <Spinner size={16} />}
              Reject
            </Button>
            <Button
              className=" flex items-center gap-1 bg-success hover:bg-success/70"
              size="sm"
              disabled={loading}
              onClick={() =>
                onHandleReportPost({
                  reportId: data?.postReportId,
                  type: 'approve',
                })
              }
            >
              {loading && <Spinner size={16} />}
              Approve
            </Button>
          </footer>
        </section>
      </Modal>
    </>
  )
}
