import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import Landing from "../components/mainContainer/Landing"

function App() {
  const router = useRouter()
  const { data: session } = useSession()

  function RequireAuth({ children, redirectTo }) {
    return session ? children : router.push(redirectTo)
  }

  return (
    <div className="App">
      <Landing />
    </div>
  )
}

export default App
