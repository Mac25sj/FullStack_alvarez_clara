import express from 'express'
import cookieParser from 'cookie-parser'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { engine } from 'express-handlebars'
import config from './config/config.js'
import { connectMongo } from './db/mongo.js'
import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import mockRouter from './routes/mock.router.js'
import UserModel from './dao/models/User.js'
import PetModel from './dao/models/Pet.js'


const app = express()

// Conexión a Mongo
connectMongo()

// Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Ruta principal con vista
app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    title: 'Coder: Álvarez Clara Matías',
    pid: process.pid,
    swaggerUrl: `http://localhost:${config.PORT}/api/docs`
  })
})

// Vista de usuarios
app.get('/users-view', async (req, res) => {
  try {
    const users = await UserModel.find().populate('pets._id').lean()
    res.render('users', {
      layout: 'main',
      title: 'Listado de Usuarios',
      users
    })
  } catch (error) {
    res.status(500).send('Error al cargar usuarios')
  }
})


app.get('/pets-view/:pid', async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.pid).populate('owner').lean()
    if (!pet) return res.status(404).send('Mascota no encontrada')

    res.render('petDetail', {
      layout: 'main',
      title: `Mascota: ${pet.name}`,
      pet
    })
  } catch (error) {
    res.status(500).send('Error al cargar la mascota')
  }
})


app.get('/pets-view', async (req, res) => {
  try {
    const pets = await PetModel.find().populate('owner').lean()
    res.render('pets', {
      layout: 'main',
      title: 'Listado de Mascotas',
      pets
    })
  } catch (error) {
    res.status(500).send('Error al cargar mascotas')
  }
})


// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'Documentación Matías Álvarez Clara'
    },
    servers: [
      {
        url: `http://localhost:${config.PORT || 3000}`,
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./src/docs/*.yaml']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

// Routers
app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)
app.use('/api/adoptions', adoptionsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/mocks', mockRouter)
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

export default app