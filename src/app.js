import cluster from 'cluster'
import os from 'os'
import express from 'express'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import config from './config/config.js'
import { connectMongo } from './db/mongo.js'
import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import mockRouter from './routes/mock.router.js'
import bcrypt from 'bcryptjs'


const numCPUs = os.cpus().length
const PORT = config.PORT

if (cluster.isPrimary) {
  console.log(`Proceso primario PID ${process.pid} - creando ${numCPUs} workers...`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(` Worker ${worker.process.pid} falló. Reiniciando...`)
    cluster.fork()
  })
} else {
  const app = express()

  connectMongo()

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AdoptMe API',
        version: '1.0.0',
        description: 'Documentación del proyecto AdoptMe'
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Servidor local'
        }
      ],
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              first_name: { type: 'string' },
              last_name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' }
            }
          },
          Pet: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              specie: { type: 'string' },
              birthDate: { type: 'string', format: 'date' },
              adopted: { type: 'boolean' },
              owner: { type: 'string', nullable: true }
            }
          },
          Adoption: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              owner: { $ref: '#/components/schemas/User' },
              pet: { $ref: '#/components/schemas/Pet' }
            }
          }
        }
      }
    },
    apis: ['./src/routes/*.js']
  }

  const swaggerSpec = swaggerJSDoc(swaggerOptions)

  app.use(express.json())
  app.use(cookieParser())

  app.get('/', (req, res) => {
    res.send(`Servidor AdoptMe funcionando correctamente desde worker ${process.pid}`)
  })

  app.use('/api/users', usersRouter)
  app.use('/api/pets', petsRouter)
  app.use('/api/adoptions', adoptionsRouter)
  app.use('/api/sessions', sessionsRouter)
  app.use('/api/mocks', mockRouter)
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Worker ${process.pid} corriendo en http://0.0.0.0:${PORT}`);
});
}