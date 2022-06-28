import React from "react"
import { withStyles } from "@mui/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const MyDialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <DialogTitle className={classes.root} {...other}>
      <Typography>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
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
})

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent)

export const RecipeDialog = (props) => {
  const { open, data, onClose } = props

  let ingredients = [{}]

  for (let i = 1; i < 16; i++) {
    ingredients.push({
      id: i,
      ingredient: "strIngredient" + String(i),
      measure: "strMeasure" + String(i),
    })
  }

  const imgUrlStart = data.strMeal
    ? "https://www.themealdb.com/images/ingredients/"
    : "https://www.thecocktaildb.com/images/ingredients/"

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <MyDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {data.strMeal ? data.strMeal : data.strDrink}
      </MyDialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <img
              alt=""
              src={data.strMealThumb ? data.strMealThumb : data.strDrinkThumb}
              height="300"
            />
            <Typography gutterBottom>{data.strInstructions}</Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography>Ingredients:</Typography>
            <List>
              {ingredients.map((included, id) =>
                data[included.ingredient] ? (
                  <ListItem divider key={id} sx={{ pl: 0 }}>
                    <img
                      alt=""
                      src={
                        imgUrlStart +
                        `${data[included.ingredient].replace(/ /g, "%20")}` +
                        "-Small.png"
                      }
                      height="30"
                    />
                    {data[included.ingredient]} - {data[included.measure]}
                  </ListItem>
                ) : null
              )}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
