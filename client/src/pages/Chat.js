import React from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

// const options = {
//   method: 'GET',
//   url: 'https://imdb8.p.rapidapi.com/title/get-base',
//   params: { tconst: 'tt0944947' },
//   headers: {
//     'x-rapidapi-key': '9cc8ab84b3msh79f5e4bfcd3fc2ep196665jsn8878fef17f13',
//     'x-rapidapi-host': 'imdb8.p.rapidapi.com',
//   },
// }

// fetch(options)
//   .then(function (response) {
//     console.log(response.data)
//   })
//   .catch(function (error) {
//     console.error(error)
//   })

export const Chat = () => {
  return (
    <Container maxWidth="md">
      <Typography>Quizes PAGE</Typography>
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum possimus
        ea atque, voluptatem debitis eveniet numquam exercitationem facilis
        soluta nobis, sapiente magni fugiat corporis. Voluptates repellat facere
        quaerat labore rem? QUIZES PAGE
      </Typography>
    </Container>
  )
}
