import { useForm } from 'react-hook-form'

import { Form } from '@/components/ui/form'

export default function FormCreate() {
  const form = useForm()
  return (
    <Form {...form}>
      <form action="" className="mt-4 rounded-md bg-white p-2"></form>
    </Form>
  )
}
