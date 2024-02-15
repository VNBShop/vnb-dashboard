'use client'

import { createRef } from 'react'

import numeral from 'numeral'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { toast } from 'sonner'

import { brands, categories } from '@/libs/constants'

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
import UploadFile, {
  ImageCloudinaryProps,
  UploadFileRefProps,
} from '../ui/upload-file'

type FormProps = {
  productName: string
  productPrice: string
  productSubCategory: string
  productBrand: string
  productSizeAndStock: {
    value: string
  }[]
  productDetails: {
    key: string
    value: string
  }[]
}

type CreateProductProps = {
  productName: string
  productSizeAndStock: string[]
  productPrice: number
  productSubCategory: number
  productBrand: number
  productAssets: ImageCloudinaryProps[]
  productDetails: {
    [key: string]: string | number
  }[]
}

export default function AddProductForm() {
  const imagesRef = createRef<UploadFileRefProps>()

  const form = useForm<FormProps>({
    defaultValues: {
      productName: '',
      productPrice: '',
      productSubCategory: '',
      productBrand: '',
      productSizeAndStock: [{ value: '' }],
      productDetails: [{ key: '', value: '' }],
    },
  })

  const errors = form.formState.errors

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'productSizeAndStock',
  })

  const {
    fields: detailFields,
    append: detailAppend,
    remove: detailRemove,
  } = useFieldArray({
    control: form.control,
    name: 'productDetails',
  })

  const onSubmit = (values: FormProps) => {
    if (imagesRef && imagesRef.current && !imagesRef.current?.images?.length) {
      toast.error('Please upload image for prodcut!')
      return
    }

    const payload: CreateProductProps = {
      ...values,
      productAssets: imagesRef.current?.images as ImageCloudinaryProps[],
      productPrice: numeral(values.productPrice).value() as number,
      productSubCategory: numeral(values.productSizeAndStock).value() as number,
      productSizeAndStock: values.productSizeAndStock.map((att) => att.value),
      productBrand: numeral(values.productBrand).value() as number,
      productDetails: values.productDetails.map((detail) => ({
        [detail.key]: detail.value,
      })),
    }
  }

  return (
    <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
      <h3 className="mb-2 text-sm font-medium text-[#211C6A]">
        General<span className="text-danger">*</span>
      </h3>
      <div className="mb-5 grid gap-7 md:grid-cols-2 lg:w-[60%]">
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
                  className="h-10"
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
                  className="h-10"
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

      <div className="grid gap-7 md:grid-cols-2 lg:w-[60%]">
        <div>
          <Controller
            name="productSubCategory"
            control={form.control}
            rules={{
              required: 'Please choose category!',
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="h-10 text-gray-500">
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
            render={({ field: { value, onChange } }) => {
              return (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="h-10 text-gray-500">
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
          <div key={field.id} className="grid gap-7 md:grid-cols-3 lg:w-[91%]">
            <Controller
              control={form.control}
              name={`productSizeAndStock.${index}.value`}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input
                    placeholder="Size"
                    value={value}
                    onChange={onChange}
                    className="h-10"
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
                      className="h-10"
                      placeholder="Stock"
                    />
                  )
                }}
              />
              <p className="text-sm text-danger">
                {errors?.productSizeAndStock?.[index]?.stock?.message}
              </p>
            </div> */}

            <div className="flex h-10 items-end gap-3 text-sm">
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
          <div key={field.id} className="grid gap-7 md:grid-cols-3 lg:w-[91%]">
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
                      className="h-10"
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
                      className="h-10"
                      placeholder="Value"
                    />
                  )
                }}
              />
              <p className="text-sm text-danger">
                {errors?.productDetails?.[index]?.value?.message}
              </p>
            </div>

            <div className="flex h-10 items-end gap-3 text-sm">
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
        <Button type="submit">Create product</Button>
      </section>
    </form>
  )
}
