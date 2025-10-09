const updatePassword = async ({
  token,
  password,
  passwordConfirm,
}: {
  token: string
  password: string
  passwordConfirm: string
}) => {
  return {
    error: true,
    message: "",
  }
}

export default updatePassword
