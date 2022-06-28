import React from "react"

import Button from "@mui/material/Button"
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined"
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded"
import { useDarkMode } from "../hooks/useDarkMode"

const ThemeSelect = (props) => {
  const { theme, toggleTheme, setOpenDrawer } = props

  const icon =
    theme.palette.mode === "dark" ? (
      <WbSunnyRoundedIcon />
    ) : (
      <NightsStayOutlinedIcon />
    )
  const title = theme.palette.mode === "light" ? "Dark theme" : "Light theme"

  const changeMode = () => {
    toggleTheme()
    setOpenDrawer(false)
  }

  return (
    <Button
      sx={{ justifyContent: "left", color: "inherit", fontWeight: "normal" }}
      onClick={changeMode}
      startIcon={icon}
    >
      {title}
    </Button>
  )
}
export default ThemeSelect
