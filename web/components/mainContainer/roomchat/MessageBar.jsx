import { useContext } from "react"
import { Paper, InputBase } from "@mui/material"
import { SocketContext } from "../../../context/socket"
import { useSession } from "next-auth/react"

const MessageBar = () => {
  const { socket, currentRoom } = useContext(SocketContext)
  const { data: session } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let content = e.target.message.value
    let timeElapsed = Date.now()
    let date = new Date(timeElapsed)
    try {
      socket.emit("message", {
        content,
        roomname: currentRoom,
        username: session.user.name,
        timestamp: date,
      })
    } catch (err) {
      console.log(err)
    }

    e.target.message.value = ""
  }
  if (currentRoom) {
    return (
      <div className="message-bar" data-testid="message-bar">
        <Paper
          className="msgPaper"
          onSubmit={handleSubmit}
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#474b52",
          }}
        >
          <InputBase
            className="msgInput"
            name="message"
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Message"
            inputProps={{ "aria-label": "send message" }}
          />
        </Paper>
      </div>
    )
  }
  return null
}

export default MessageBar
