import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import Image from 'next/image'
import { toast } from 'sonner'

import Icon from '@/common/icons'

import Spinner from './spinner'

import Carousel from '../carousel'

export type ImageCloudinaryProps = {
  secureUrl: string
  assetId: string
}

type UploadFileProps = {
  size?: number
  maxLength?: number
}

export type UploadFileRefProps = {
  images: ImageCloudinaryProps[]
}

const UploadFile = (
  { size = 70, maxLength }: UploadFileProps,
  ref: ForwardedRef<UploadFileRefProps>
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<ImageCloudinaryProps[]>([])
  const [preview, setPreview] = useState<{ imgs: string[]; index: number }>({
    imgs: [],
    index: 0,
  })
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({
    images,
  }))

  const onUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setLoading(true)

    if (
      file?.type !== 'image/png' &&
      file?.type !== 'image/jpg' &&
      file?.type !== 'image/jpeg'
    ) {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      toast.error('Image is in wrong format 😢!')
      setLoading(false)
      return
    }

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
    data.append('folder', 'testing')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      )
      const res = await response.json()
      console.log('res >>', res)

      setImages((prev) => [
        ...prev,
        { assetId: res?.asset_id, secureUrl: res?.secure_url },
      ])
    } catch (error) {
      toast.error('Upload image failed, try again 😢!')
    } finally {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      setLoading(false)
    }
  }

  const onDeleteImage = (image: ImageCloudinaryProps) => {
    setImages((prev) => {
      return prev.filter((img) => img.assetId !== image.assetId)
    })
  }

  return (
    <>
      <Carousel
        images={preview.imgs}
        close={() =>
          setPreview({
            imgs: [],
            index: 0,
          })
        }
        options={{
          startIndex: preview.index,
        }}
      />
      <section className="flex w-full flex-wrap gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative rounded-md"
            style={{
              width: size,
              height: size,
            }}
          >
            <Image
              src={img.secureUrl}
              width={size}
              height={size}
              sizes="100vw"
              alt="image"
              className="h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-md bg-[hsla(0,0%,100%,.44)] p-1 px-2 backdrop-blur">
              <div
                onClick={() => {
                  setPreview({
                    imgs: images.map(
                      (imgs) => imgs.secureUrl
                    ) as unknown as string[],
                    index: index,
                  })
                }}
                className=" transition-all duration-300 hover:cursor-pointer lg:hover:scale-110"
              >
                <Icon name="ZoomOut" color="white" size={size * 0.23} />
              </div>
              <div
                className="bg-white"
                style={{
                  width: 1,
                  height: size * 0.2,
                }}
              />
              <div
                onClick={() => onDeleteImage(img)}
                className="transition-all duration-300 hover:cursor-pointer lg:hover:scale-110"
              >
                <Icon name="Trash" color="white" size={size * 0.23} />
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div
            className="flex items-center justify-center"
            style={{
              width: size,
              height: size,
            }}
          >
            <Spinner size={size * 0.4} />
          </div>
        )}

        <label
          htmlFor="upload-image-product"
          className="flex flex-col items-center justify-center gap-[3px] rounded-md border border-dashed border-[#00be00] hover:cursor-pointer"
          style={{
            width: size,
            height: size,
            borderColor: loading ? 'gray' : '',
            color: loading ? 'gray' : '',
          }}
        >
          <Icon
            size={size * 0.4}
            name="PhotoPlus"
            color={loading ? 'gray' : '#00be00'}
          />

          <p
            className="text-[9px] text-[#00be00]"
            style={{ color: loading ? 'gray' : '' }}
          >
            ({images.length}/{maxLength ?? '∞'})
          </p>

          <p
            style={{ color: loading ? 'gray' : '' }}
            className="text-[10px] text-[#00be00]"
          >
            Add photos
          </p>
        </label>

        <input
          ref={inputRef}
          disabled={loading}
          type="file"
          id="upload-image-product"
          hidden
          onChange={onUploadFile}
          accept="image/png, image/jpg, image/jpeg"
        />
      </section>
    </>
  )
}

export default forwardRef<UploadFileRefProps, UploadFileProps>(UploadFile)
