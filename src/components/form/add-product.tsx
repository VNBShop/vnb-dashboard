'use client'

import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export default function AddProductForm() {
  return (
    <form action="" className="mt-5 grid gap-4">
      <div className="grid grid-cols-4">
        <Select>
          <SelectTrigger className="h-10 text-gray-500">
            <SelectValue placeholder="Select product type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="m@example.com">m@example.com</SelectItem>
            <SelectItem value="m@google.com">m@google.com</SelectItem>
            <SelectItem value="m@support.com">m@support.com</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="Name" className="h-10" />
    </form>
  )
}
