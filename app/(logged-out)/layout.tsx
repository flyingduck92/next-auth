import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const LoggedOutLayout = async ({ children }: { children: React.ReactNode }) => {

  // redirect to my-acount if loggedIn
  const session = await auth()

  if (session?.user?.id) {
    redirect('/my-account')
  }

  return children
}

export default LoggedOutLayout