import express from 'express'
import cors from "cors"
import logger from './logger.js'
import morgan from 'morgan'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//routes import
import healthcheckRouter from "./routes/healthcheck.routes.js"

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)

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

export { app }