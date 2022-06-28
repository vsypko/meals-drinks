import React from "react"
import Button from "@mui/material/Button"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Avatar from "@mui/material/Avatar"

import { makeStyles } from "@mui/styles"
import { CurrentUserContext } from "../contexts/currentUser"
import { Redirect } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { ProfileDialogSlide } from "./UserProfile"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  userButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.text.secondary,
    "&:hover, &:focus": {
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.text.primary,
    },
  },

  paper: {
    marginRight: theme.spacing(2),
  },
}))

export default function UserMenu() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [userState, setUserState] = React.useContext(CurrentUserContext)
  const [isLogout, setIsLogout] = React.useState(false)
  const [, setToken] = useLocalStorage("token")
  const [openProfile, setOpenProfile] = React.useState(false)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleProfile = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
    setOpenProfile(true)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  React.useEffect(() => {
    if (isLogout) {
      setToken("")
      setUserState((state) => ({
        ...state,
        isLoggedIn: false,
        currentUser: null,
      }))
      setOpen(false)
    }
  }, [isLogout, setToken, setUserState])

  if (isLogout) {
    return <Redirect to="/" exact />
  }

  return (
    <>
      <div className={classes.root}>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {!userState.currentUser.imageUrl ? (
            <Avatar className={classes.userButton}>
              {userState.currentUser.email.slice(0, 2).toUpperCase()}
            </Avatar>
          ) : (
            <Avatar alt="User Avatar" src={userState.currentUser.imageUrl} />
          )}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: "0 0 0 ",
              }}
            >
              <Paper elevation={4}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => setIsLogout(true)}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <ProfileDialogSlide active={openProfile} setActive={setOpenProfile} />
    </>
  )
}
