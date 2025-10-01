'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { passwordSchema } from '@/validation/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema
  }).and(passwordMatchSchema)

const ChangePasswordForm = () => {

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirm: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    setTimeout(() => {
      console.log(data)
    }, 2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <fieldset disabled={form.formState.isSubmitting} className='flex flex-col gap-2'>
          <FormField control={form.control} name='currentPassword' render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='******' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name='password' render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder='*****' type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name='passwordConfirm' render={({ field }) => (
            <FormItem>
              <FormLabel>New Password Confirm</FormLabel>
              <FormControl>
                <Input {...field} placeholder='*****' type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button type='submit'>Change Password</Button>
        </fieldset>
      </form>
    </Form>
  )
}

export default ChangePasswordForm