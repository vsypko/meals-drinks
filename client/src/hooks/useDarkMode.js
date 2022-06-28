import { useState } from "react"
import { createTheme } from "@mui/material/styles"

export const useDarkMode = () => {
  const darkTheme = createTheme({ palette: { mode: "dark" } })
  const lightTheme = createTheme({ palette: { mode: "light" } })

  const currentTheme = window.matchMedia("(prefers-color-scheme: dark)")
  const [theme, setTheme] = useState(
    currentTheme.matches ? darkTheme : lightTheme
  )

  const toggleTheme = () => {
    theme.palette.mode === "dark" ? setTheme(lightTheme) : setTheme(darkTheme)
  }

  return [theme, toggleTheme]
}
