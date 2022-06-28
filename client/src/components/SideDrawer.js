import React from "react"
import { useState, useContext } from "react"
import { NavLink } from "react-router-dom"

import { makeStyles } from "@mui/styles"
import SwipeableDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import MenuIcon from "@mui/icons-material/Menu"
import { Avatar } from "@mui/material"

import Divider from "@mui/material/Divider"
import ThemeSelectDrawer from "./ThemeSelectDrawer"

import { CurrentUserContext } from "../contexts/currentUser"

const useStyles = makeStyles((theme) => ({
  list: {
    width: 240,
  },
  linkItem: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: theme.palette.text.secondary,
  },
  linkItemSecond: {
    padding: 3,
    textDecoration: `none`,
    color: theme.palette.text.secondary,
  },
}))

const SideDrawer = (props) => {
  const { theme, toggleTheme, navLinks } = props
  const classes = useStyles()
  const [state, setState] = useState({ right: false })
  const [currentUserState] = useContext(CurrentUserContext)

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  const sideDrawerList = (anchor, props) => (
    <Box
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Main menu drawer -------------------------------------------------------------*/}
      <List component="nav">
        {props.navLinks.map(({ icon, title, path }) => (
          <ListItem
            button
            exact
            component={NavLink}
            to={path}
            key={title}
            className={classes.linkItem}
            activeStyle={{
              color: "inherit",
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Theme switcher button ----------------------------------------------------------*/}
      <ThemeSelectDrawer theme={props.theme} toggleTheme={props.toggleTheme} />
      {/* Authorisation button -----------------------------------------------------------*/}
      {!currentUserState.isLoggedIn && (
        <ListItem
          button
          style={{ color: props.theme.palette.text.secondary }}
          component={NavLink}
          to={"/login"}
          activeStyle={{
            color: "inherit",
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>Authorization</ListItemText>
        </ListItem>
      )}
      {currentUserState.isLoggedIn && (
        <ListItem
          button
          style={{ color: props.theme.palette.text.secondary }}
          component={NavLink}
          exact
          to={"/"}
          activeStyle={{
            color: "inherit",
          }}
        >
          <ListItemIcon>
            <Avatar>U</Avatar>
          </ListItemIcon>
          <ListItemText>{currentUserState.currentUser.username}</ListItemText>
        </ListItem>
      )}
    </Box>
  )

  return (
    <React.Fragment key="right">
      <IconButton
        aria-label="menu"
        onClick={toggleDrawer("right", true)}
        sx={{ position: "right-end", display: { xs: "flex", sm: "none" } }}
      >
        <MenuIcon fontSize="large" style={{ color: "inherit" }} />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("righ", props)}
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default SideDrawer
