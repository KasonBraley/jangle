import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}
import LoadingButton from "@mui/lab/LoadingButton"

export function LoadingWrapper({ children }) {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div>
        <LoadingButton loading variant="contained" color="error" />
      </div>
    )
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }
  return <>{children}</>
}
