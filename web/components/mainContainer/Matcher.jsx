import { useState, useContext } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import swal from "sweetalert"
import {
  Paper,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded"
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded"
import { SocketContext } from "../../context/socket"
import friends6 from "../../img/friends6.jpeg"

const theme = createTheme({
  palette: {
    primary: {
      main: "#7db1b1",
    },
    secondary: {
      main: "#EE8585",
    },
  },
})

const Matcher = () => {
  const { data: session } = useSession()
  const { setCurrentRoom } = useContext(SocketContext)

  const [selected, setSelected] = useState([])
  const [bio, setBio] = useState("")
  const [username, setUsername] = useState("")
  const [image, setImage] = useState(null)

  const handleUserChoice = async (userWasLiked) => {
    if (userWasLiked) {
      await createDirectMessageRoom()
    }
    await getRandomUser()
  }
  let user = session.user

  const createDirectMessageRoom = async () => {
    let roomname = `${user.name}-${username}`
    let body = { roomname, users: [user.name, username] }

    try {
      await axios.post(`${process.env.REACT_APP_API_SERVER}/rooms`, body)
      swal({
        title: "User Liked!",
        text: `This user has been added to your Direct Messages.`,
      })
      setCurrentRoom(body.roomname)
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

  const getRandomUser = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/profiles/${user.name}/random`
      )
      if (res.data) {
        setSelected(res.data.interests)
        setBio(res.data.bio)
        setUsername(res.data.username)
        res.data.image?.url ? setImage(res.data.image.url) : setImage(null)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id="matcher">
      <Paper
        id="matcherPaper"
        elevation={0}
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h6" className="letterSpacing" mb={3} mt={-4}>
            Match with Other Users!
          </Typography>
          {username ? (
            <>
              <Card id="matchCard" data-testid="matcher-card">
                {image && (
                  <CardMedia
                    id="matcherImg"
                    component="img"
                    image={image}
                    alt="user image"
                  />
                )}

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    data-testid="matcher-username"
                  >
                    {username}
                  </Typography>
                  <Typography variant="h6" style={{ textAlign: "left" }}>
                    Interests:
                  </Typography>
                  <div style={{ textAlign: "left", marginBottom: "1rem" }}>
                    {selected.map((interest) => {
                      return (
                        <Chip
                          data-testid={`matcher-interests-${interest}`}
                          className="matchChip"
                          variant="outlined"
                          label={interest}
                          color="default"
                          key={interest}
                        />
                      )
                    })}
                  </div>
                  <Typography variant="h6" style={{ textAlign: "left" }}>
                    Bio:
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    data-testid="matcher-bio"
                  >
                    {bio}
                  </Typography>
                </CardContent>
              </Card>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  className="matchBtn"
                  size="large"
                  color="secondary"
                  onClick={() => handleUserChoice(false)}
                >
                  <ThumbDownAltRoundedIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  className="matchBtn"
                  size="large"
                  color="primary"
                  onClick={() => handleUserChoice(true)}
                >
                  <ThumbUpAltRoundedIcon fontSize="inherit" />
                </IconButton>
              </div>
            </>
          ) : (
            <div>
              <CardMedia
                data-testid="matcher-landing"
                id="matchLanding"
                src={friends6}
                component="img"
                image={image}
                alt="social image"
              />
              <Button
                data-testid="matcher-landing-btn"
                id="findMatchesBtn"
                variant="contained"
                color="primary"
                onClick={getRandomUser}
              >
                Find someone to chat with!
              </Button>
            </div>
          )}
        </ThemeProvider>
      </Paper>
    </div>
  )
}

export default Matcher
