import Link from "next/link"
import { Button, Tooltip } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined"
import { useAuth0 } from "@auth0/auth0-react"

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
  const { isAuthenticated } = useAuth0()

  return (
    <div className="header" data-testid="header">
      <ThemeProvider theme={theme}>
        {isAuthenticated ? <UserButton /> : <SigninButton />}

        <h1>
          <Link href="/">
            <div>
              <ForumOutlinedIcon id="titleBubble" />
              <a>Jangle</a>
            </div>
          </Link>
        </h1>

        <Link href="https://github.com/jangle401/jangle-front">
          <Tooltip title="GitHub">
            <Button id="githubBtn" variant="contained" color="primary">
              <img className="btnImg" src={github} />
            </Button>
          </Tooltip>
        </Link>
      </ThemeProvider>
    </div>
  )
}

export default Header
