import React, { useContext } from "react"
import { withRouter, NavLink } from "react-router-dom"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"

import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Fab from "@mui/material/Fab"

import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle"
import InfoIcon from "@mui/icons-material/Info"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import ScrollTop from "./ScrollTop"
import Divider from "@mui/material/Divider"
import ThemeSelect from "./ThemeSelect"
import ThemeSelectDrawer from "./ThemeSelectDrawer"
import { CurrentUserContext } from "../contexts/currentUser"

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import UserMenu from "./UserMenu"

const navLinks = [
  { icon: <HomeIcon />, title: "Home", path: "/", disable: false },
  {
    icon: <SearchIcon />,
    title: "Food&drinks",
    path: "/recipes",
    disable: true,
  },
  {
    icon: <QuestionAnswerIcon />,
    title: "Chat",
    path: "/chat",
    disable: true,
  },
  {
    icon: <PersonPinCircleIcon />,
    title: "Contact",
    path: "/contact",
    disable: false,
  },
  { icon: <InfoIcon />, title: "About", path: "/about", disable: false },
]

const Header = (props) => {
  const { theme, toggleTheme } = props
  const [currentUserState] = useContext(CurrentUserContext)
  const [openDrawer, setOpenDrawer] = React.useState(false)

  return (
    <>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          {/* MENU BUTTON for mobile -----------------*/}
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            {openDrawer ? (
              <CloseIcon fontSize="inherit" />
            ) : (
              <MenuIcon fontSize="inherit" />
            )}
          </IconButton>

          {/* DRAWER ---------------------------------*/}

          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            sx={{
              width: 240,
              zIndex: (theme) => theme.zIndex.appBar - 1,
            }}
          >
            <Toolbar />
            {navLinks.map(({ icon, title, path, disable }) => (
              <Button
                startIcon={icon}
                component={NavLink}
                onClick={() => setOpenDrawer(false)}
                to={path}
                exact
                key={title}
                sx={{
                  color: "inherit",
                  justifyContent: "left",
                  fontWeight: "normal",
                }}
                disabled={currentUserState.isLoggedIn ? false : disable}
                activeStyle={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                {title}
              </Button>
            ))}
            <Divider />
            <ThemeSelectDrawer
              theme={theme}
              toggleTheme={toggleTheme}
              setOpenDrawer={setOpenDrawer}
            />
          </Drawer>
          {/* Logo Title -----------------------------*/}
          <Typography
            variant="h5"
            color="inherit"
            component={NavLink}
            to={navLinks[0].path}
            sx={{ ml: 1, textDecoration: "none", flexGrow: 1 }}
            noWrap
          >
            {"<GET"}
            <span style={{ color: "darkorange" }}>DEV</span>
            {" />"}
          </Typography>

          {/* Main menu bar ------------------------*/}

          <Stack
            spacing={5}
            direction="row"
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {navLinks.map(({ title, path, disable }) => (
              <Button
                component={NavLink}
                to={path}
                exact
                key={title}
                sx={{
                  fontWeight: "normal",
                  color: "inherit",
                  "&:hover": {
                    fontWeight: "bold",
                  },
                }}
                disabled={currentUserState.isLoggedIn ? false : disable}
                activeStyle={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                {title}
                {/* <ListItemText primary={title} /> */}
              </Button>
            ))}
            {/* Theme switcher button -----------------*/}
            <ThemeSelect theme={theme} toggleTheme={toggleTheme} />
          </Stack>

          {/* Authorisation button ------------------*/}
          <Box sx={{ justifyContent: "flex-end" }}>
            {!currentUserState.isLoggedIn && (
              <IconButton
                component={NavLink}
                to="/login"
                sx={{ color: "lightgrey" }}
                activeStyle={{
                  color: "inherit",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            )}
            {currentUserState.isLoggedIn && <UserMenu />}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Scrolling button -------------------------------*/}

      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}

export default withRouter(Header)
