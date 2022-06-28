import React from "react"

import Box from "@mui/material/Box"

import ReactPlayer from "react-player"
import ski from "../images/ski.mp4"
import backabout1 from "../images/backabout1.jpg"
import thumbsUp from "../images/thumbs_up.png"

export const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backabout1})`,
        backgroundPosition: "0 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <ReactPlayer controls url={ski} />
      <img
        alt="thumbsUp"
        src={thumbsUp}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          width: 30,
          height: 30,
          top: 180,
          left: 280,
        }}
      />
    </Box>
  )
}
