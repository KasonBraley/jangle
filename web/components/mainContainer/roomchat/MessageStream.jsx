import { Fragment, useEffect, useContext, useState } from "react"
import { SocketContext } from "../../../context/socket"
import { connect } from "react-redux"
import axios from "axios"
import { setRoomMessages } from "../../../store/rooms"
import { useSession } from "next-auth/react"
import { Typography } from "@mui/material"

const MessageStream = ({ setRoomMessages, rooms, username }) => {
  const { data: session } = useSession()
  username = session.user.name
  const { socket, currentRoom } = useContext(SocketContext)
  let [messages, setMessages] = useState([])

  useEffect(() => {
    function listener() {
      setMessages(rooms.get(currentRoom))
    }
    socket.on("message", listener)

    return function cleanup() {
      socket.off("message", listener)
    }
  }, [socket, rooms, messages, currentRoom])

  useEffect(() => {
    ;(async () => {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/messages/${currentRoom}`
        )
        if (res.data.length > 0)
          setRoomMessages({ messages: res.data, roomname: currentRoom })
        setMessages(rooms.get(currentRoom))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [currentRoom, rooms, setRoomMessages])

  useEffect(() => {
    if (rooms.has(currentRoom)) {
      setMessages(rooms.get(currentRoom))
    }
  }, [currentRoom, rooms])

  return (
    <>
      {messages && messages.length >= 1 && (
        <div className="message-container" data-testid="message-stream">
          {messages.map((msg, idx) => {
            let date = new Date(msg.timestamp)
            return (
              <Fragment key={idx}>
                <div
                  className={
                    msg.username === username
                      ? "myMessageRow"
                      : "theirMessageRow"
                  }
                >
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: 700,
                      width: "300px",
                      margin: "-5px -300px 0 0",
                      justifyContent:
                        msg.username !== username ? "flexStart" : "flexEnd",
                      color: msg.username !== username ? "white" : "#36393f",
                      fontSize: msg.username !== username ? ".9rem" : "0.01rem",
                    }}
                  >
                    {msg.username}
                  </Typography>
                  <p
                    className={
                      msg.username === username
                        ? "myChatMessage"
                        : "theirChatMessage"
                    }
                    key={idx}
                  >
                    {`${msg.content}`}
                  </p>
                </div>
                <Typography
                  className={
                    msg.username === username
                      ? "myChatTimeStamp"
                      : "theirChatTimeStamp"
                  }
                  style={{
                    marginBottom: msg.username !== username ? "22px" : "-18px",
                  }}
                  variant="caption"
                  key={idx}
                >
                  {date.toDateString()} {" at "}
                  {date.toLocaleTimeString()}
                </Typography>
              </Fragment>
            )
          })}
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.rooms,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setRoomMessages: (data) => dispatch(setRoomMessages(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageStream)
