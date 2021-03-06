import { useContext, useEffect, useState } from "react"
import { Box, Tooltip, Button, Avatar } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import swal from "sweetalert"
import { useSession } from "next-auth/react"
import { SocketContext } from "../../../context/socket"

const UserButton = ({ username }) => {
  const [userProfile, setUserProfile] = useState(null)
  useEffect(() => {
    ;(async () => {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/profiles/${username}`
        )
        setUserProfile(res.data[0])
      } catch (err) {
        console.log(err)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: session } = useSession()
  const { socket, setCurrentRoom } = useContext(SocketContext)

  const createDirectMessageRoom = async () => {
    let roomname = `${session.user.name}-${username}`
    let body = { roomname, users: [session.user.name, username] }

    try {
      await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms`, body)
      setCurrentRoom(roomname)
      try {
        socket.emit("join", {
          room: roomname,
          user: session.user.nam,
        })
        setCurrentRoom(roomname)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      if (err.response.status === 409) {
        swal({
          title: "Hold up...",
          text: err.response.data.err,
          dangerMode: true,
        })
      } else {
        swal({
          title: "That didn't work out.",
          text: `The request failed to be completed`,
          dangerMode: true,
        })
      }
    }
  }

  const handleClick = async () => {
    if (username === session.user.name) {
      swal({
        title: "Hold up...",
        text: "You are trying to send a Direct Message to yourself. Try someone else!",
        dangerMode: true,
      })
      return
    }
    await createDirectMessageRoom()
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#303136",
      },
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title={`Chat with ${username}?`}>
            <Button
              className="rightUserBtn"
              variant="contained"
              color="primary"
              onClick={handleClick}
              size="large"
              id="user-btn"
            >
              <Avatar
                className="rightAvatar"
                alt={session.user.name}
                src={userProfile?.image?.url ? userProfile.image.url : null}
              />
              {username}
            </Button>
          </Tooltip>
        </Box>
      </ThemeProvider>
    </>
  )
}
export default UserButton
