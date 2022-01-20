import { useEffect, useContext, useState } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { TreeView } from "@mui/lab"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useAuth0 } from "@auth0/auth0-react"

import { setRooms } from "../../../../store/rooms"
import { SocketContext } from "../../../../context/socket"
import Public from "./Public"
import DirectMessage from "./DirectMessage"
import CreateRoom from "./CreateRoom"

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
})

const Rooms = (props) => {
  const { socket, setCurrentRoom, currentRoom } = useContext(SocketContext)
  const { isAuthenticated, user } = useAuth0()

  let username = isAuthenticated
    ? user.nickname
    : `Test-User#${Math.round(Math.random() * 1000)}`

  const [publicRooms, setPublicRooms] = useState([])
  const [directMsgRooms, setDirectMsgRooms] = useState([])

  useEffect(() => {
    ;(async () => {
      let res = null
      try {
        res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`)

        props.setRooms(res.data)
        setPublicRooms(
          res.data.filter((room) =>
            !room.password && room.users?.length === 0 ? room : false
          )
        )
        setDirectMsgRooms(
          res.data.filter((room) =>
            room.users?.length > 0 &&
            room.roomname.split("-").includes(username)
              ? room
              : false
          )
        )
      } catch (err) {
        console.log(err)
      }
    })()
  }, [props, currentRoom, username])

  const joinRoom = (e) => {
    let room = e.target.innerText

    try {
      socket.emit("join", {
        room,
        username,
      })
      setCurrentRoom(room)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="rooms-container">
      <ThemeProvider theme={theme}>
        <CreateRoom />
        <TreeView
          color="primary"
          defaultExpanded={["0", "1", "2"]}
          mt={3}
          aria-label="room navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
        >
          <Public joinRoom={joinRoom} publicRooms={publicRooms} />
          {directMsgRooms.length > 0 && (
            <DirectMessage
              startNodeId="1"
              joinRoom={joinRoom}
              directMsgRooms={directMsgRooms}
            />
          )}
        </TreeView>
      </ThemeProvider>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setRooms: (rooms) => dispatch(setRooms(rooms)),
})

export default connect(null, mapDispatchToProps)(Rooms)
