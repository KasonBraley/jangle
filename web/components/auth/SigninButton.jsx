import { Button } from "@mui/material"
import { signIn } from "next-auth/react"

function SigninButton() {
  return (
    <Button
      id="profileBtn"
      variant="contained"
      color="primary"
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  )
}
export default SigninButton
