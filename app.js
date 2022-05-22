const express = require('express')
const app = express()


const port = 3000




//setting home page route

app.get('/', (req, res) => {
  res.send('start')
})











app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})

