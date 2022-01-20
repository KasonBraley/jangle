import { signIn, useSession } from "next-auth/react"
import { Button } from "@mui/material"

function LoginButton() {
  const { status } = useSession()

  return (
    !status === "authenticated" && (
      <Button variant="contained" onClick={() => signIn()}>
        Log in
      </Button>
    )
  )
}

export default LoginButton
