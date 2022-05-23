const express = require('express')
const app = express()
const generatePassword = require('./generator')
const URL = require('./models/url')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

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




//setting home page route

app.get('/', (req, res) => {

  res.render('index')
})
app.get('/shorten', (req, res) => {

  res.redirect('/')
})


app.post('/shorten', (req, res) => {
  const raw_url = req.body.rawURL
  const url_code = generatePassword()
  const shorten_url = `http://localhost:3000/${url_code
    }`
  const url = new URL({
    origin_url: raw_url,
    url_code: url_code
  })
  return url.save()
    .then(() => res.render('show', { shorten_url }))
    .catch(error => console.log(error))
})

app.get('/:code', (req, res) => {
  const code = req.params.code
  return URL.find({ url_code: code })
    .lean()
    .then(url => res.redirect(url[0].origin_url))
    .catch(error => console.log(error))
})











app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})

