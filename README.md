# Proyecto Final Backend III

Este es el proyecto final del curso **Backend III de CoderHouse**, realizado por **Matías Álvarez Clara**.  
Incluye una API desarrollada con **Node.js + Express**, con módulos de **usuarios, mascotas y adopciones**, documentada con **Swagger**, probada con **Mocha/Chai/Supertest** y contenerizada con **Docker**.

---

##  Características

- **Módulo de Usuarios**: CRUD de usuarios con documentación Swagger.
- **Módulo de Mascotas**: CRUD de mascotas con vistas en Handlebars.
- **Módulo de Adopciones**: CRUD de adopciones de mascotas.
- **Documentación Swagger**: Disponible en `/api/docs`.
- **Pruebas Funcionales**: Usando Mocha, Chai y Supertest para endpoints principales.
- **Soporte Docker**: Aplicación contenerizada para fácil despliegue.

---

#  Enlace DockerFIle
https://hub.docker.com/repository/docker/mac25sj/backend_final_coderhouse_matias_alvarez/general


#  Enlace Linkedin
https://www.linkedin.com/in/mat%C3%ADas%C3%A1lvarezclara/

#  Enlace Github
https://github.com/Mac25sj/Entrega-1-Backend3_alvarez_clara.git

##  Instalación

Clona el repositorio:
```bash
git clone <https://github.com/Mac25sj/Entrega-1-Backend3_alvarez_clara>
cd entrega-backend-iii
npm install



Ejecución Local
Para iniciar el servidor en el puerto 8080:
pnpm start  
npm start


El servidor se ejecutará en:
- API: http://localhost:8080
- Swagger: http://localhost:8080/api/docs

Endpoints de la API
Usuarios
- GET /api/users → Obtener todos los usuarios
- GET /api/users/:id → Obtener usuario por ID
- POST /api/users → Crear nuevo usuario
- PUT /api/users/:id → Actualizar usuario
- DELETE /api/users/:id → Eliminar usuario
Mascotas
- GET /api/pets → Obtener todas las mascotas
- GET /api/pets/:id → Obtener mascota por ID
- POST /api/pets → Crear nueva mascota
- PUT /api/pets/:id → Actualizar mascota
- DELETE /api/pets/:id → Eliminar mascota
Adopciones
- GET /api/adoptions → Obtener todas las adopciones
- GET /api/adoptions/:id → Obtener adopción por ID
- POST /api/adoptions → Crear nueva adopción
- DELETE /api/adoptions/:id → Eliminar adopción

Pruebas
Ejecuta las pruebas con:
npm test


Las pruebas cubren endpoints principales de usuarios, mascotas y adopciones utilizando Mocha, Chai y Supertest.

Docker
El proyecto incluye soporte para Docker, lo que facilita su despliegue en cualquier entorno.
Construir Imagen Localmente
docker build -t matiasalvarez/backend3-final:1.0.0 .


Ejecutar Contenedor Localmente
docker run -p 8080:8080 mac25sj/backend_final_coderhouse_matias_alvarez:1.0.0


Subir a DockerHub
docker tag matiasalvarez/backend3-final:1.0.0 matiasalvarez/backend3
docker push matiasalvarez/backend3


(Reemplaza matiasalvarez con tu usuario de DockerHub si es diferente)

Una vez que el contenedor esté ejecutándose en el puerto 8080:
- Accede a la aplicación en http://localhost:8080
- Consulta la documentación Swagger en http://localhost:8080/api/docs
- Utiliza herramientas como Postman o curl para probar los endpoints.
- Para desarrollo, podés montar volúmenes:
docker run -p 8080:8080 -v $(pwd):/app matiasalvarez/backend3-final:1.0.0



📖Documentación Swagger
Accede a la documentación interactiva de la API en:
👉 http://localhost:8080/api/docs


