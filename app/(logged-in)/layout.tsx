import Link from "next/link"
import LogoutButton from "./logout-button"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const LoggedInLayout = async ({ children }: { children: React.ReactNode }) => {
  // redirect to my-acount if loggedIn
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-200 flex justify-between p-4 items-center">
        <ul className="flex gap-4">
          <li>
            <Link href="/my-account">My Account</Link>
          </li>
          <li>
            <Link href="/change-password">Change Password</Link>
          </li>
        </ul>
        <div>
          <LogoutButton />
        </div>
      </nav>
      <main className="flex-1 flex justify-center items-center">
        {children}
      </main>
    </div>
  )
}

export default LoggedInLayout
