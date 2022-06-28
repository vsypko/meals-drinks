import React from "react"
import axios from "axios"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export const Homepage = () => {
  const [news, setNews] = React.useState()
  const getNews = async () => {
    try {
      const response = await axios(
        "https://www.indexofsciences.com/index.php/wp-json/wp/v2/posts"
      )
      setNews(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const createMarkup = () => {
    if (!news) {
      return
    }
    return { __html: news[1].content.rendered }
  }

  return (
    <Container maxWidth="md">
      <Typography>HOME PAGE</Typography>
      <div dangerouslySetInnerHTML={createMarkup()} />
      <pre>{JSON.stringify(news, null, 2)}</pre>
      <Button onClick={getNews}>Get nutrition news</Button>
    </Container>
  )
}
