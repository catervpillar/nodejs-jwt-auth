require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
  {
    username: 'tom',
    title: 'Post 1'
  },
  {
    username: 'ric',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateUser, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000)