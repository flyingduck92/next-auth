'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(5),
  passwordConfirm: z.string()
})

const Register = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
  }

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register for a new Account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} >
              <FormField control={form.control} name='email' render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='your_email@domain.com' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name='password' render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='*****' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name='passwordConfirm' render={({ field }) => (
                <FormItem>
                  <FormLabel>Password confirm</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='*****' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <Button type='submit'>
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Register