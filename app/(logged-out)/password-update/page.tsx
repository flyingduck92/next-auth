import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/db/drizzle"
import { passwordResetTokens } from "@/db/passwordResetTokensSchema"
import { eq } from "drizzle-orm"
import Link from "next/link"

const PasswordUpdate = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) => {
  const searchParamsValues = await searchParams
  let isTokenValid = false

  const { token } = searchParamsValues
  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))

    const now = Date.now()

    if (
      !!passwordResetToken.tokenExpiry &&
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      isTokenValid = true
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {isTokenValid
              ? "Update Password"
              : "Your password reset link is invalid or already expired"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isTokenValid ? (
            <div>form</div>
          ) : (
            <Link href="/password-reset" className="underline">
              Request another password reset link
            </Link>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

export default PasswordUpdate
