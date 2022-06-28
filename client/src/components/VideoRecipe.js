import React from "react"
import { withStyles } from "@mui/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
// import Typography from "@mui/material/Typography"
import ReactPlayer from "react-player"

const MyDialogTitle = (props) => {
  const { children, onClose, ...other } = props
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 13,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

const MyDialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0.6),
  },
}))(DialogContent)

export const VideoRecipe = (props) => {
  const { onClose, open, data } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <MyDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {data.strMeal ? data.strMeal : data.strDrink}
      </MyDialogTitle>
      <MyDialogContent dividers>
        <ReactPlayer
          controls
          width="maxWidth"
          url={data.strMeal ? data.strYoutube : data.strVideo}
        />
      </MyDialogContent>
    </Dialog>
  )
}
