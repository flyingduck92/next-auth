'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { passwordSchema } from '@/validation/passwordSchema'
import loginUser from './actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const formSchema = z
  .object({
    email: z.email(),
    password: passwordSchema
  })


const Login = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await loginUser({
      email: data.email,
      password: data.password
    })

    if (response?.error) {
      form.setError('root', {
        message: response?.message,
      })
    } else {
      router.push('/my-account')
      // window.location.href = '/my-account'
    }

  }

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login for a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} >
              <fieldset disabled={form.formState.isSubmitting} className='flex flex-col gap-2'>
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
                {
                  !!form.formState.errors.root?.message &&
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                }
                <Button type='submit'>Login</Button>
              </fieldset>
            </form >
          </Form >
        </CardContent >
        <CardFooter className='flex-col gap-2'>
          <div className="text-muted-foreground text-sm">
            Don't have an account? {' '}
            <Link href='/register'
              className='underline'>
              Register
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            Forgot password? {' '}
            <Link href='/password-reset'
              className='underline'>
              Reset password
            </Link>
          </div>
        </CardFooter>
      </Card >
    </main >
  )
}

export default Login