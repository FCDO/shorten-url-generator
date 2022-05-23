const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const generatePassword = require('../../generator')

router.post('/', (req, res) => {

  const raw_url = req.body.rawURL
  if (!raw_url) {
    res.redirect('/')
  }
  const url_code = generatePassword()
  const shorten_url = `http://localhost:3000/shorten/${url_code
    }`
  const url = new URL({
    origin_url: raw_url,
    url_code: url_code
  })
  return url.save()
    .then(() => res.render('show', { shorten_url }))
    .catch(error => console.log(error))
})




router.get('/', (req, res) => {

  res.redirect('/')
})




router.get('/:code', (req, res) => {
  const code = req.params.code
  return URL.find({ url_code: code })
    .lean()
    .then(url => res.redirect(url[0].origin_url))
    .catch(error => console.log(error))
})







module.exports = router