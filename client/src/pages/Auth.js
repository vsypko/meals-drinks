import React, { useEffect, useState, useContext } from "react"
import { NavLink, Redirect } from "react-router-dom"
import GoogleLogin from "react-google-login"
import IconGoogle from "../components/SvgGoogle"

import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles"
import Container from "@mui/material/Container"

import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

import { useFetch } from "../hooks/useFetch"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { CurrentUserContext } from "../contexts/currentUser"

//----end of required imports-------------------------------------------------------------------

//----Copiright component-----------------------------------------------------------------------
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <NavLink to="/" style={{ textDecoration: "none" }} exact>
        <span style={{ color: "inherit" }}>{"<GET"}</span>
        <span style={{ color: "darkorange" }}>{"DEV"}</span>
        <span style={{ color: "inherit" }}>{" /> "}</span>
      </NavLink>
      {new Date().getFullYear()}
    </Typography>
  )
}
//----Component styles---------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0px 100px ${theme.palette.background.default} inset !important`,
    },
  },
  description: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover, &:focus": {
      color: theme.palette.text.primary,
    },
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
  },
}))
//----AUTH component----------------------------------------------------------------------------
export const Auth = (props) => {
  //----Defining some states--------------------------------------------------------------------
  const isLogin = props.match.path === "/login"
  const pageTitle = isLogin ? "Log in" : "Sign Up"
  const descriptionText = isLogin
    ? "Don't have an account? Sign Up!"
    : "Have an account? Log In!"
  const apiUrl = isLogin ? "/login" : "/registration"
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showInput, setShowInput] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
  const [, setToken] = useLocalStorage("token")
  const [, setCurrentUserState] = useContext(CurrentUserContext)
  //----Errors messages states-------------------------------------------------------------------
  const [errorMessageEmail, setErrorMessageEmail] = useState(null)
  const [errorMessagePassword, setErrorMessagePassword] = useState(null)

  //----Form submit handler---------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault()
    doFetch({
      method: "post",
      data: { email, password },
    })
  }

  const responseGoogle = (response) => {
    doFetch({
      method: "post",
      data: { tokenId: response.tokenId },
    })
  }

  // ----Error handler-----------------------------------------------------
  useEffect(() => {
    if (!error) {
      return
    }
    setErrorMessageEmail(null)
    setErrorMessagePassword(null)
    switch (error.status) {
      case 400:
        setErrorMessageEmail(
          error.data.errors.errors[0].param === "email"
            ? "⚠ " + error.data.errors.errors[0].msg
            : null
        )
        setErrorMessagePassword(
          error.data.errors.errors[0].param === "password"
            ? "⚠ " + error.data.errors.errors[0].msg
            : null
        )
        if (error.data.errors.errors[1] !== undefined) {
          setErrorMessagePassword(
            error.data.errors.errors[1].param === "password"
              ? "⚠ " + error.data.errors.errors[1].msg
              : null
          )
        }
        break
      case 401:
        setErrorMessageEmail("⚠ " + error.data.message)
        break
      case 403:
        setErrorMessagePassword("⚠ " + error.data.message)
        break
      case 404:
        setErrorMessageEmail("⚠ " + error.data.message)
        break
      case 406:
        setErrorMessagePassword("⚠ " + error.data.message)
        break
      default:
        break
    }
  }, [error])

  // ---- Success handler------------------------------------------------------
  useEffect(() => {
    if (!response) {
      return
    }

    setToken(response.token)
    setSubmitted(true)
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }))
  }, [setToken, response, setCurrentUserState])

  if (submitted) {
    return <Redirect to="/" exact />
  }

  //----Component rendering----------------------------------------------------------------
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pageTitle}
        </Typography>

        {/* Google log in ---------------------------------------------------------------------- */}

        {isLogin && (
          <GoogleLogin
            clientId="723906188335-js8s27s5k9rhq018nmcfrnhflv474dlb.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                startIcon={<IconGoogle />}
              >
                LOG IN WITH GOOGLE ACCOUNT
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )}
        {isLogin && <Typography className={classes.submit}>or</Typography>}

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          {/* Text fields for email & password inputs ---------------------------------------*/}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{ classes: { input: classes.input } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!(errorMessageEmail && errorMessageEmail)}
            helperText={errorMessageEmail && errorMessageEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showInput ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!(errorMessagePassword && errorMessagePassword)}
            helperText={errorMessagePassword && errorMessagePassword}
            InputProps={{
              classes: { input: classes.input },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className={classes.description}
                    disableRipple
                    aria-label="toggle password visibility"
                    onClick={() => setShowInput(!showInput)}
                    edge="end"
                  >
                    {showInput ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          {/* Submit button ----------------------------------------------------------------*/}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
          >
            {pageTitle}
          </Button>

          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}

            {/* Log in or Sign Up Link -------------------------------------------------------*/}

            <Grid item>
              <NavLink
                to={isLogin ? "/signup" : "/login"}
                variant="body2"
                className={classes.description}
              >
                {descriptionText}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>

      {/* Copiright infor at the end of form ---------------------------------------------------------*/}

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
