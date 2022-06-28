import React from "react"

import { useDarkMode } from "../hooks/useDarkMode"

import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined"
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded"

const ThemeSelect = (props) => {
  const { theme, toggleTheme } = props

  const icon =
    theme.palette.mode === "light" ? (
      <NightsStayOutlinedIcon />
    ) : (
      <WbSunnyRoundedIcon />
    )
  const title =
    theme.palette.mode === "light"
      ? "Turn to dark theme"
      : "Turn to light theme"

  return (
    <Tooltip title={title}>
      <IconButton
        onClick={toggleTheme}
        sx={{ fontWeight: "normal", color: "inherit" }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
}
export default ThemeSelect
