import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'

dotenv.config({ path: `.env.${env}` })

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret'
}