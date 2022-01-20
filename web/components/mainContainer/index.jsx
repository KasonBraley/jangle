import { Typography } from "@mui/material"
import { useRouter } from "next/router"

const MainContainer = (props) => {
  const router = useRouter()

  let feature
  if (router.pathname === "/profile") {
    feature = ""
  } else if (router.pathname === "/roomchat") {
    feature = "Room Chat"
  } else if (router.pathname === "/matcher") {
    feature = ""
  }

  return (
    <>
      <div
        data-testid="main-container"
        className={
          router.pathname !== "/matcher"
            ? "main-container"
            : "main-container-matcher"
        }
      >
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className="roomTitle"
        >
          {feature}
        </Typography>
        {props.children}
      </div>
    </>
  )
}

export default MainContainer
