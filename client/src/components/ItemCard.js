import React from "react"
import { makeStyles } from "@mui/styles"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"

import { RecipeDialog } from "./RecipeDialog"
import { VideoRecipe } from "./VideoRecipe"

const useStyles = makeStyles({
  oneCard: {
    margin: "auto",
    maxWidth: 250,
    maxHeight: 800,
    borderRadius: 10,
    transition: "0.8s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
})

const ItemCard = (props) => {
  const { data, db } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [vopen, setVopen] = React.useState(false)

  return (
    <Card className={classes.oneCard} raised sx={{ borderRadius: 3 }}>
      <CardActionArea onClick={() => setOpen(true)}>
        <CardMedia
          component="img"
          alt=""
          image={db === "meals" ? data.strMealThumb : data.strDrinkThumb}
          height="250"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {db === "meals" ? data.strMeal : data.strDrink}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Category: {data.strCategory}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.strArea
              ? "Origin: " + data.strArea
              : "Type: " + data.strAlcoholic}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ mr: 1, justifyContent: "space-between" }}>
        <Button
          size="small"
          onClick={() => setVopen(true)}
          color="primary"
          disabled={data.strVideo === null || data.strYoutube === null}
        >
          VIDEO
        </Button>
        <Button size="small" onClick={() => setOpen(true)} color="primary">
          RECIPE
        </Button>
      </CardActions>
      <VideoRecipe open={vopen} data={data} onClose={() => setVopen(false)} />
      <RecipeDialog open={open} data={data} onClose={() => setOpen(false)} />
    </Card>
  )
}
export default ItemCard
