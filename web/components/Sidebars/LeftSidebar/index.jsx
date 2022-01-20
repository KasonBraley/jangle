import { useSession } from "next-auth/react"
import Nav from "./Nav"
import ChatSidebar from "./Chat"
import MatcherSidebar from "./Matcher/MatcherSidebar"
import { Typography } from "@mui/material"
import { useRouter } from "next/router"

const LeftSidebar = () => {
  const router = useRouter()
  const { status } = useSession()

  return status === "authenticated" ? (
    <div
      className="left-sidebar"
      id="resizable"
      elevation={10}
      data-testid="left-sidebar"
    >
      {router.pathname === "/chat" ? <ChatSidebar /> : null}
      {router.pathname === "/match" ? <MatcherSidebar /> : null}

      <div className="footer" data-testid="footer">
        <Nav />
        <Typography
          variant="overline"
          gutterBottom
          style={{ textAlign: "center", marginTop: "1.4rem" }}
        >
          © Jangle 2021
        </Typography>
      </div>
    </div>
  ) : (
    <div className="left-sidebar" id="resizable" elevation={10}>
      <Typography
        variant="overline"
        gutterBottom
        className="footer"
        style={{ textAlign: "center", marginTop: "1.4rem" }}
      >
        © Jangle 2021
      </Typography>
    </div>
  )
}

export default LeftSidebar
