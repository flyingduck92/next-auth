import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ChangePasswordForm from "./form"

const ChangePassword = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>Change Password</CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}

export default ChangePassword
