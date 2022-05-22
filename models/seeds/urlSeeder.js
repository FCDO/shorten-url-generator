const mongoose = require('mongoose')
const URL = require('../url')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線至mongodb

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  URL.create({
    origin_url: "https://www.gamer.com.tw/",
    url_code: "u2358"

  })
})