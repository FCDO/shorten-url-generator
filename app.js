const express = require('express')
const app = express()

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const routes = require('./routes/index')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const port = 3000

require('./config/mongoose')

app.use(routes)



app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})

