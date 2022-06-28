import React from 'react'
// import { useFetch } from '../hooks/useFetch'
// import { CurrentUserContext } from '../contexts/currentUser'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const ProfileDialogSlide = ({ active, setActive }) => {
  // const [CurrentUserState] = React.useContext(CurrentUserContext)
  // const apiUrl = '/user'
  // const [{ response, error }, setDataFetch] = useFetch(apiUrl)

  return (
    <Dialog
      open={active}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setActive(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{'Your profile'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setActive(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={() => setActive(false)} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
