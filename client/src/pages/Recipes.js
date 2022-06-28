import React from "react"
import axios from "axios"
import ItemCard from "../components/ItemCard"

import { makeStyles } from "@mui/styles"

import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import Input from "@mui/material/Input"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import Hidden from "@mui/material/Hidden"

import backimg from "../images/backimg.png"
import newmeals from "../images/newmeals.jpg"
import newdrinks from "../images/newdrinks.jpg"
import Divider from "@mui/material/Divider"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 1),
    backgroundImage: `url(${backimg})`,
    backgroundPosition: "0 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "92vh",
    minWidth: "99vw",
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundAttachment: "fixed",
  },
  paper: {
    height: 250,
    opacity: 0.7,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
      opacity: 1,
    },
    textAlign: "center",
    margin: "auto",
    maxWidth: 250,
  },

  activePaper: {
    margin: "auto",
    height: 250,
    transform: "scale(1.1)",
    opacity: 1,
    textAlign: "center",
    maxWidth: 250,
  },

  searchCards: {
    padding: theme.spacing(2),
  },
  foundItemCard: {
    padding: theme.spacing(2),
    justify: "center",
  },
}))

const InputItem = (props) => {
  const { searchItem, setSearchItem, handleItemSearch } = props
  return (
    <Input
      type="search"
      sx={{ cursor: "pointer" }}
      autoFocus
      autoComplete="search"
      disableUnderline
      placeholder={"Search"}
      value={searchItem}
      onChange={(e) => setSearchItem(e.target.value)}
      onKeyPress={(e) => handleItemSearch(e, searchItem)}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon onClick={(e) => handleItemSearch(e, searchItem)} />
        </InputAdornment>
      }
    />
  )
}
// HIDDEN TITLE FOR SM BREAKPOINT -------------------------------------------
const HiddenTitle = (props) => {
  const { dataX } = props
  return (
    <Grid item lg={6} xs={12}>
      <Typography
        variant="h2"
        style={{ color: "gold", fontFamily: "Grape Nuts", fontWeight: "bold" }}
        align="center"
      >
        Find your favorite meals or drinks here!
      </Typography>
      {dataX && (
        <Hidden smDown>
          <Divider style={{ marginTop: 100 }} />
          <Typography variant="h5" style={{ color: "yellow" }} align="center">
            Found: {dataX.length} items
          </Typography>
        </Hidden>
      )}
    </Grid>
  )
}

export const Recipes = () => {
  const classes = useStyles()
  const [searchMeals, setMeals] = React.useState("")
  const [searchDrinks, setDrinks] = React.useState("")
  const [data, setData] = React.useState("")
  const [db, setDb] = React.useState("")
  const urlMeals = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`

  const itemFetch = (urlItem, searchItem) => {
    axios(urlItem + `${searchItem}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }

  const handleItemSearch = (event, searchItem) => {
    if (event.key !== "Enter" && event.type !== "click") {
      return
    }
    if (searchItem.trim()) {
      if (db === "meals") {
        itemFetch(urlMeals, searchItem)
      } else {
        itemFetch(urlDrinks, searchItem)
      }
    } else {
      return
    }
  }

  return (
    // COMMON CONTAINER ------------------------------------------------
    <Grid container className={classes.root} spacing={1}>
      {/* //SEARCH ITEMS CONTAINER ------------------------------------------------ */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          className={classes.searchCards}
          justify="center"
        >
          {/* TITLE WHEN BREAKPOINT < SM ------------------------------------------------------------------*/}
          <Hidden smUp>
            <HiddenTitle dataX={data[db]} />
          </Hidden>
          {/* SEARCH CARD MEALS ----------------------------------------------------------*/}
          <Grid item lg={3} xs={6}>
            <Card
              elevation={4}
              className={db === "meals" ? classes.activePaper : classes.paper}
            >
              <CardActionArea
                onClick={(e) => setDb("meals")}
                style={{
                  backgroundImage: `url(${newmeals})`,
                  height: "100%",
                }}
              >
                <Typography component="span" variant="h4" color="inherit">
                  MEALS
                </Typography>
              </CardActionArea>
              {db === "meals" && (
                <InputItem
                  searchItem={searchMeals}
                  setSearchItem={setMeals}
                  handleItemSearch={handleItemSearch}
                />
              )}
            </Card>
          </Grid>
          {/* TITLE WHEN BREAKPOINT > SM------------------------------------------------------------------*/}
          <Hidden smDown>
            <HiddenTitle dataX={data[db]} />
          </Hidden>
          {/* SEARCH CARD DRINKS --------------------------------------------------------*/}
          <Grid item lg={3} xs={6}>
            <Card
              elevation={4}
              className={db === "drinks" ? classes.activePaper : classes.paper}
            >
              <CardActionArea
                onClick={(e) => setDb("drinks")}
                style={{
                  backgroundImage: `url(${newdrinks})`,
                  height: "100%",
                }}
              >
                <Typography component="span" variant="h4" color="inherit">
                  DRINKS
                </Typography>
              </CardActionArea>
              {db === "drinks" && (
                <InputItem
                  searchItem={searchDrinks}
                  setSearchItem={setDrinks}
                  handleItemSearch={handleItemSearch}
                />
              )}
            </Card>
          </Grid>
        </Grid>
        {data[db] && (
          <Hidden smUp>
            <Divider style={{ marginTop: 10 }} />
            <Typography variant="h5" style={{ color: "yellow" }} align="center">
              Found: {data[db].length} items
            </Typography>
          </Hidden>
        )}

        {/* CONTAINER FOR FOUND ITEMS CARDS --------------------------------------*/}

        {data[db] && (
          <Grid
            container
            spacing={3}
            className={classes.foundItemCard}
            justify="center"
          >
            {/* RENDER MAP OF FOUND ITEMS CARD -----------------------------------------*/}
            {data[db].map((dbItem, index) => (
              <Grid item xs={6} lg={3} key={index}>
                <ItemCard data={dbItem} db={db} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
