const express = require('express')
const app = express()

const URL = require('./models/url')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const routes = require('./routes/index')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

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

app.use(routes)



app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})

