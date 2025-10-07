"use client"

import { Button } from "@/components/ui/button"
import Logout from "./actions"

const LogoutButton = () => {
  return (
    <Button
      size="sm"
      className="cursor-pointer"
      onClick={async () => await Logout()}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
