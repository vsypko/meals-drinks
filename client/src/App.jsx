import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import { CurrentUserProvider } from "./contexts/currentUser"

import Header from "./components/Header"

import { useDarkMode } from "./hooks/useDarkMode"

import { Homepage } from "./pages/Homepage"
import { Recipes } from "./pages/Recipes"
import { Chat } from "./pages/Chat"
import { Contact } from "./pages/Contact"
import { About } from "./pages/About"
import { Auth } from "./pages/Auth"
import CssBaseline from "@mui/material/CssBaseline"
import CurrentUserChecker from "./components/CurrentUserChecker"

const App = () => {
  const [theme, toggleTheme] = useDarkMode()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <CurrentUserProvider>
          <CurrentUserChecker>
            <Router>
              <Header theme={theme} toggleTheme={toggleTheme} />
              <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/chat" component={Chat} />
                <Route path="/contact" component={Contact} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Auth} />
                <Route path="/signup" component={Auth} />
              </Switch>
            </Router>
          </CurrentUserChecker>
        </CurrentUserProvider>
      </CssBaseline>
    </ThemeProvider>
  )
}
export default App
