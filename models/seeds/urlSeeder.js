const db = require('../../config/mongoose')
const URL = require('../url')



db.once('open', () => {
  console.log('mongodb connected!')
  URL.create({
    origin_url: "https://www.gamer.com.tw/",
    url_code: "u2358"

  })
})