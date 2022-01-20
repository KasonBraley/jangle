import { useEffect, useContext, useState } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { setRooms } from "../../../../store/rooms"
import { SocketContext } from "../../../../context/socket"
import { useAuth0 } from "@auth0/auth0-react"
import DirectMessage from "../Chat/DirectMessage"
import { TreeView } from "@mui/lab"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useRouter } from "next/router"

const MatcherSidebar = (props) => {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth0()
  const { socket, setCurrentRoom, currentRoom } = useContext(SocketContext)
  const [directMsgRooms, setDirectMsgRooms] = useState([])

  let username = isAuthenticated
    ? user.nickname
    : `Test-User#${Math.round(Math.random() * 1000)}`

  useEffect(() => {
    ;(async () => {
      let res = null
      try {
        res = await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms`)
        props.setRooms(res.data)
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

    if (router.pathname !== "/roomchat") router.push("/roomchat")
  }

  return (
    <div className="rooms-container" data-testid="matcher-rooms">
      <TreeView
        defaultExpanded={["0"]}
        mt={3}
        aria-label="room navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
      >
        {directMsgRooms?.length > 0 && (
          <DirectMessage
            startNodeId="0"
            joinRoom={joinRoom}
            directMsgRooms={directMsgRooms}
          />
        )}
      </TreeView>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setRooms: (rooms) => dispatch(setRooms(rooms)),
})

export default connect(null, mapDispatchToProps)(MatcherSidebar)
