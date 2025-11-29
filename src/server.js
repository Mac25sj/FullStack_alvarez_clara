import app from './app.js'
import config from './config/config.js'

const PORT = config.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en:`)
  console.log(`    Localhost:   http://localhost:${PORT}`)
  console.log(`    Swagger:     http://localhost:${PORT}/api/docs`)
})