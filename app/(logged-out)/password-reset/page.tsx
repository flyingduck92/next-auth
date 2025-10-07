"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import z from "zod"
import passwordReset from "./actions"
import { MailCheckIcon } from "lucide-react"

const formSchema = z.object({
  email: z.email(),
})

const PasswordReset = () => {
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get("email")
        ? decodeURIComponent(searchParams.get("email")!)
        : "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await passwordReset(data.email)
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        {form.formState.isSubmitSuccessful ? (
          <>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <MailCheckIcon /> Email Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              If you have an account with us, you will receive an email at{" "}
              {form.getValues("email")}
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Password Reset</CardTitle>
              <CardDescription>
                Enter valid email to reset password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <fieldset
                    disabled={form.formState.isSubmitting}
                    className="flex flex-col gap-2"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="your_email@domain.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {!!form.formState.errors.root?.message && (
                      <FormMessage>
                        {form.formState.errors.root.message}
                      </FormMessage>
                    )}
                    <Button type="submit">Reset Password</Button>
                  </fieldset>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <div className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
              <div className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </main>
  )
}

export default PasswordReset
