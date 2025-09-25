import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Register = () => {
  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register for a new Account</CardDescription>
        </CardHeader>
      </Card>
    </main>
  )
}

export default Register