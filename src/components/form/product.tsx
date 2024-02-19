'use client'

import { Dispatch, SetStateAction, createRef, useEffect } from 'react'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import numeral from 'numeral'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { toast } from 'sonner'

import useCreateProduct, {
  CreateProductProps,
  UpdateProductProps,
} from '@/hooks/useCreateProduct'
import { ProductResponse } from '@/hooks/useTableDataProduct'
import { brands, categories } from '@/libs/constants'

import { Product } from '@/types/product'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import InputNumber from '../ui/input-number'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Spinner from '../ui/spinner'
import UploadFile, {
  ImageCloudinaryProps,
  UploadFileRefProps,
} from '../ui/upload-file'

type FormProps = {
  productName: string
  productPrice: string
  productSubCategory: string
  productBrand: string
  productSizes: {
    id?: ''
    value: string
  }[]
  productDetails: {
    key: string
    value: string
  }[]
}

type AddProductFormProps = {
  onCloseModal: () => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse, Error>>
  updateData?: Product
}

export default function ProductForm({
  updateData,
  onCloseModal,
  refetch,
}: AddProductFormProps) {
  const imagesRef = createRef<UploadFileRefProps>()

  const form = useForm<FormProps>({
    defaultValues: {
      productName: '',
      productPrice: '',
      productSubCategory: '',
      productBrand: '',
      productSizes: !!JSON.stringify(updateData)
        ? [{ value: '', id: '' }]
        : [{ value: '' }],
      productDetails: [{ key: '', value: '' }],
    },
  })

  const errors = form.formState.errors

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'productSizes',
  })

  const {
    fields: detailFields,
    append: detailAppend,
    remove: detailRemove,
  } = useFieldArray({
    control: form.control,
    name: 'productDetails',
  })

  const { loading, onActionProduct } = useCreateProduct({
    onCloseModal,
    refetch,
  })

  const onSubmit = (values: FormProps) => {
    if (imagesRef && imagesRef.current && !imagesRef.current?.images?.length) {
      toast.error('Please upload image for prodcut!')
      return
    }

    const details = values.productDetails.map((detail) => ({
      [detail.key]: detail.value,
    }))

    const convertDetail = Object.fromEntries(
      details.map((obj) => Object.entries(obj)[0])
    )

    const isUpdate = !!JSON.stringify(updateData)

    const updateProductSizesNew: UpdateProductProps['addedProductSizes'] = []
    const updateProductSizesUpdated: UpdateProductProps['updatedProductSizes'] =
      []
    const updateProductSizesDelete: UpdateProductProps['deletedProductSizes'] =
      []

    if (isUpdate) {
      updateData!.productSizes.forEach((size) => {
        const existsInValues = values.productSizes.some(
          (val) => val.id === size.productSizeId.toString()
        )
        if (!existsInValues) {
          updateProductSizesDelete.push(size.productSizeId)
        }
      })

      values.productSizes.forEach((size) => {
        if (!!size.id) {
          updateProductSizesUpdated.push({
            productSizeId: numeral(size?.id).value() as number,
            productSize: size.value,
          })
        } else {
          updateProductSizesNew.push(size.value)
        }
      })
    }

    const updatePayload: UpdateProductProps = {
      productName: values.productName,
      productPrice: numeral(values.productPrice).value() as number,
      productSubCategory: numeral(values.productSubCategory).value() as number,
      productBrand: numeral(values.productBrand).value() as number,
      productDetails: convertDetail,
      productAssets: imagesRef.current?.images as ImageCloudinaryProps[],
      addedProductSizes: updateProductSizesNew,
      updatedProductSizes: updateProductSizesUpdated,
      deletedProductSizes: updateProductSizesDelete,
    }

    const createPayload: CreateProductProps = {
      ...values,
      productAssets: imagesRef.current?.images as ImageCloudinaryProps[],
      productPrice: numeral(values.productPrice).value() as number,
      productSubCategory: numeral(values.productSubCategory).value() as number,
      productSizes: values.productSizes.map((att) => att.value),
      productBrand: numeral(values.productBrand).value() as number,
      productDetails: convertDetail,
    }

    onActionProduct(isUpdate ? updatePayload : createPayload)
  }

  useEffect(() => {
    if (!!updateData?.productId) {
      form.setValue('productName', updateData?.productName)
      form.setValue('productPrice', updateData?.productPrice?.toString())
      form.setValue(
        'productSubCategory',
        updateData?.productSubCategory?.subCategoryId?.toString()
      )
      form.setValue(
        'productBrand',
        updateData?.productBrand?.brandId?.toString()
      )

      if (!!imagesRef.current) {
        imagesRef.current.update(updateData?.productImages)
      }

      if (!!JSON.stringify(updateData?.productSizes)) {
        form.setValue(
          'productSizes',
          updateData.productSizes.map((size) => ({
            id: size.productSizeId.toString(),
            value: size.productSize,
          })) as FormProps['productSizes']
        )
      }

      if (!!JSON.stringify(updateData?.productDetail)) {
        form.setValue(
          'productDetails',
          Object.entries(updateData?.productDetail).map(([key, value]) => {
            return {
              key: key,
              value: value,
            }
          }) as []
        )
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(updateData), form])

  return (
    <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
      <h3 className="mb-2 text-sm font-medium text-[#211C6A]">
        General<span className="text-danger">*</span>
      </h3>
      <div className="mb-5 grid gap-7 md:grid-cols-2">
        <div>
          <Controller
            name="productName"
            control={form.control}
            rules={{
              required: 'Please enter name!',
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <Input
                  placeholder="Name"
                  className="h="
                  value={value}
                  onChange={onChange}
                />
              )
            }}
          />
          <p className="text-sm text-danger">{errors?.productName?.message}</p>
        </div>

        <div>
          <Controller
            name="productPrice"
            control={form.control}
            rules={{
              required: 'Please enter price!',
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <InputNumber
                  thousandSeparator
                  maxLength={11}
                  className=""
                  value={value}
                  onChange={onChange}
                  placeholder="Price"
                />
              )
            }}
          />
          <p className="text-sm text-danger">{errors?.productPrice?.message}</p>
        </div>
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <div>
          <Controller
            name="productSubCategory"
            control={form.control}
            rules={{
              required: 'Please choose category!',
            }}
            render={({ field }) => {
              return (
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectGroup key={item.categoryName}>
                        <SelectLabel>{item.categoryName}</SelectLabel>
                        {item.subCategories.map((i) => (
                          <SelectItem
                            key={i.subCategoryId}
                            value={i.subCategoryId.toString()}
                          >
                            {i.subCategoryName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              )
            }}
          />
          <p className="text-sm text-danger">
            {errors?.productSubCategory?.message}
          </p>
        </div>

        <div>
          <Controller
            name="productBrand"
            control={form.control}
            rules={{
              required: 'Please choose brand!',
            }}
            render={({ field }) => {
              return (
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((i) => (
                      <SelectItem key={i.brandId} value={i.brandId.toString()}>
                        {i.brandName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            }}
          />
          <p className="text-sm text-danger">{errors?.productBrand?.message}</p>
        </div>
      </div>

      <div className="my-10">
        <h3 className="mb-2 text-sm font-medium text-[#211C6A]">
          Images<span className="text-danger">*</span>
        </h3>
        <UploadFile ref={imagesRef} />
      </div>

      <section className="grid gap-7">
        <h3 className="-mb-5 text-sm font-medium text-[#211C6A]">Attributes</h3>

        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-2 md:grid-cols-2 md:gap-7">
            <Controller
              control={form.control}
              name={`productSizes.${index}.value`}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input
                    placeholder="Size"
                    value={value}
                    onChange={onChange}
                    className="h="
                  />
                )
              }}
            />

            {/* <div>
              <Controller
                control={form.control}
                rules={{
                  required: 'Please enter stock!',
                }}
                name={`productSizeAndStock.${index}.stock`}
                render={({ field: { value, onChange } }) => {
                  return (
                    <InputNumber
                      value={value}
                      onChange={onChange}
                      maxLength={11}
                      className="h="
                      placeholder="Stock"
                    />
                  )
                }}
              />
              <p className="text-sm text-danger">
                {errors?.productSizeAndStock?.[index]?.stock?.message}
              </p>
            </div> */}

            <div className="h= flex gap-3 text-sm md:items-end">
              <div
                className="text-success hover:cursor-pointer hover:underline"
                onClick={() => {
                  append({ value: '' })
                }}
              >
                Add
              </div>
              <div
                style={{
                  visibility:
                    index === 0 && fields.length === 1 ? 'hidden' : 'visible',
                }}
                className="text-danger hover:cursor-pointer hover:underline"
                onClick={() => remove(index)}
              >
                Remove
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-7">
        <h3 className="-mb-5 text-sm font-medium text-[#211C6A]">
          Descriptions<span className="text-danger">*</span>
        </h3>
        {detailFields.map((field, index) => (
          <div key={field.id} className="grid gap-2 md:grid-cols-3 md:gap-7">
            <div>
              <Controller
                control={form.control}
                rules={{
                  required: 'Please enter key!',
                }}
                name={`productDetails.${index}.key`}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Input
                      placeholder="Key"
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
              <p className="text-sm text-danger">
                {errors?.productDetails?.[index]?.key?.message}
              </p>
            </div>

            <div>
              <Controller
                control={form.control}
                rules={{
                  required: 'Please enter value!',
                }}
                name={`productDetails.${index}.value`}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Input
                      value={value}
                      onChange={onChange}
                      placeholder="Value"
                    />
                  )
                }}
              />
              <p className="text-sm text-danger">
                {errors?.productDetails?.[index]?.value?.message}
              </p>
            </div>

            <div className="flex gap-3 text-sm md:items-end">
              <div
                className="text-success hover:cursor-pointer hover:underline"
                onClick={() => {
                  detailAppend({ key: '', value: '' })
                }}
              >
                Add
              </div>
              <div
                style={{
                  visibility:
                    index === 0 && fields.length === 1 ? 'hidden' : 'visible',
                }}
                className="text-danger hover:cursor-pointer hover:underline"
                onClick={() => detailRemove(index)}
              >
                Remove
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 flex items-center justify-center">
        <Button
          type="submit"
          className="flex items-center gap-1"
          disabled={loading || imagesRef?.current?.isUploading}
        >
          {loading && <Spinner size={18} />}
          {!!JSON.stringify(updateData) ? 'Update' : 'Create'}
        </Button>
      </section>
    </form>
  )
}
