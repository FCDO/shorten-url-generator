const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線至mongodb

const port = 3000

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


//setting home page route

app.get('/', (req, res) => {
  res.send('start')
})











app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})

