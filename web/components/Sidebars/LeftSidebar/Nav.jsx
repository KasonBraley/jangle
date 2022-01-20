import { Button } from "@mui/material"
import Link from "next/link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const theme = createTheme({
  palette: {
    primary: {
      main: "#7db1b1",
    },
  },
})

export default function Nav() {
  return (
    <div id="leftSidebar">
      <ThemeProvider theme={theme}>
        <div className="navRow">
          <Link href="/chat">
            <Button
              data-testid="roomchat-left-btn"
              size="small"
              variant="outlined"
              color="primary"
              className="navBtn"
            >
              Chat <ChatOutlinedIcon className="navIcon" />
            </Button>
          </Link>
        </div>
        <div className="navRow">
          <Link href="/match">
            <Button
              data-testid="matcher-left-btn"
              size="small"
              variant="outlined"
              color="primary"
              className="navBtn"
            >
              Match <SentimentVerySatisfiedIcon className="navIcon" />
            </Button>
          </Link>
        </div>
        <div className="navRow">
          <Link href="/profile">
            <Button
              data-testid="profile-left-btn"
              size="small"
              variant="outlined"
              color="primary"
              className="navBtn"
            >
              Profile <AccountCircleIcon className="navIcon" />
            </Button>
          </Link>
        </div>
      </ThemeProvider>
    </div>
  )
}
