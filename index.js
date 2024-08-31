import 'dotenv/config'
import express from 'express'
import logger from './logger.js'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

let userData = []
let nextId = 1

// add a new user
app.post('/users', (req, res) => {
  const {name, price} = req.body
  const newuser = {id: nextId++, name, price}
  userData.push(newuser)
  res.status(201).send(newuser)
})

// get all user
app.get('/users', (req, res) => {
  res.status(200).send(userData)
})

//get a user with id
app.get('/users/:id', (req, res) => {
  const user = userData.find(t => t.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).send('user not found')
  }
  res.status(200).send(user)
})

//update user

app.put('/users/:id', (req, res) => {
  const user = userData.find(t => t.id === parseInt(req.params.id))

  if (!user) {
    return res.status(404).send('user not found')
  }
  const {name, price} = req.body
  user.name = name
  user.price = price
  res.send(200).send(user)
})

//delete user

app.delete('/users/:id', (req, res) => {
  const index = userData.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).send('user not found')
  }

  logger.info(`Deleting users id ${index}`)
  userData.splice(index, 1)
  res.status(200).send('deleted')
})


app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`)
})