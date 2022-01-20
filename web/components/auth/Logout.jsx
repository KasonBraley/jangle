import { useSession } from "next-auth/react"
import { Button } from "@mui/material"

function LogoutButton() {
  const { signOut, status } = useSession()

  return (
    status === "authenticated" && (
      <Button
        variant="contained"
        onClick={() => {
          signOut({ callbackUrl: window.location.origin })
        }}
      >
        Log out
      </Button>
    )
  )
}

export default LogoutButton
