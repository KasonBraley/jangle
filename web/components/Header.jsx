import Link from "next/link"
import Image from "next/image"
import { Button, Tooltip } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined"
import { useSession } from "next-auth/react"

import github from "../img/github.png"
import UserButton from "./auth/UserButton"
import SigninButton from "./auth/SigninButton"

const theme = createTheme({
  palette: {
    primary: {
      main: "#36393f",
    },
  },
})

const Header = () => {
  const { status } = useSession()

  return (
    <div className="header" data-testid="header">
      <ThemeProvider theme={theme}>
        {status === "authenticated" ? <UserButton /> : <SigninButton />}

        <h1>
          <Link href="/">
            <a>
              <ForumOutlinedIcon id="titleBubble" />
              <span>Jangle</span>
            </a>
          </Link>
        </h1>

        <Tooltip title="GitHub">
          <Button id="githubBtn" variant="contained" color="primary">
            <Link href="https://github.com/KasonBraley/jangle">
              <a>
                <Image
                  className="btnImg"
                  src={github}
                  alt="github"
                  width={30}
                  height={30}
                />
              </a>
            </Link>
          </Button>
        </Tooltip>
      </ThemeProvider>
    </div>
  )
}

export default Header
