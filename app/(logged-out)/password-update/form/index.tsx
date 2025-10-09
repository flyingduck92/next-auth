"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { passwordMatchSchema } from "@/validation/passwordMatchSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import updatePassword from "./actions"
import { toast } from "sonner"

const updatePasswordSchema = passwordMatchSchema

type Props = {
  token: string
}

const UpdatePasswordForm = ({ token }: Props) => {
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const response = await updatePassword({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    })

    if (response?.error) {
      form.setError("root", {
        message: response.message,
      })
    } else {
      form.reset()
      toast.success("Password successfully updated", {
        richColors: true,
      })

      /*
      Toast Docs:
        types: 
          toast('text') => default
          toast.message() => description
            toast.message('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            })

          toast.success('text') => success
          toast.info('text') => info
          toast.warning('text') => warning
          toast.error('text') => error

          [opt- with action]: 
            toast('Event has been created', {
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo')
              },
            })

        position: 
          "top-right" 
          "top-center"
          "top-left"
          "bottom-right" (default)
          "bottom-center"
          "bottom-left"

        richColors: 
          true | false
          
        expand: 
          true | false

        src: 
        https://sonner.emilkowal.ski/
      
      */
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="*****" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password Confirm</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="*****" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          )}
          <Button type="submit">Change Password</Button>
        </fieldset>
      </form>
    </Form>
  )
}

export default UpdatePasswordForm
