import { useContext } from "react"
import { MenuItem, InputBase, Button, Typography, Divider } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CheckIcon from "@mui/icons-material/Check"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
import swal from "sweetalert"
import { SocketContext } from "../../../../context/socket"

const theme = createTheme({
  palette: {
    primary: {
      main: "#7db1b1",
    },
  },
})

const CreateRoomForm = ({ handleClose }) => {
  const { user } = useAuth0()
  const { socket, setCurrentRoom } = useContext(SocketContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addRoomToServer(e.target.roomname.value)
    handleClose()
  }

  const addRoomToServer = async (roomname) => {
    let body = { roomname }
    let res = null
    try {
      res = await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms`, body)
      setCurrentRoom(res.data.roomname)
      try {
        socket.emit("join", {
          room: res.data.roomname,
          user: user.nickname,
        })
        setCurrentRoom(roomname)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.log(err)
      swal({
        title: "Oh no!",
        text: "Unable to create a room with that name.",
        icon: "warning",
        dangerMode: true,
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <form id="createRoomForm" onSubmit={handleSubmit}>
        <Typography variant="subtitle1" sx={{ marginLeft: "10px" }}>
          New Room Details
        </Typography>
        <Divider style={{ backgroundColor: "#99aab5" }} />
        <MenuItem>
          <InputBase
            name="roomname"
            placeholder="Room Name"
            sx={{ color: "white" }}
            required
          />
        </MenuItem>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="small"
            id="room-submit-btn"
            color="primary"
            endIcon={<CheckIcon />}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </ThemeProvider>
  )
}

export default CreateRoomForm
