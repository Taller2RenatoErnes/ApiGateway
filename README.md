# API Gateway

Este proyecto es una **API Gateway** que sirve como punto de entrada para interactuar con varios microservicios, incluyendo:
- **Microservicio de Usuarios**: Gestiona el registro, perfil y progreso de los usuarios.
- **Microservicio de Carreras**: Gestiona las carreras y asignaturas, incluyendo los prerrequisitos y postrequisitos.
- **Microservicio de Acceso**: Gestiona la autenticación de usuarios.

Además, la API Gateway hace llamadas al monolito **Cubi12** para obtener recursos relacionados con asignaturas.

---

## Características
- **API Gateway** para manejar las solicitudes HTTP y redirigirlas a los microservicios correspondientes.
- **Microservicios**:
  - **Usuarios**: Para gestionar el registro y los perfiles de los usuarios.
  - **Carreras**: Para gestionar las carreras y asignaturas.
  - **Acceso**: Para manejar el login de los usuarios.
  - **Monolito Cubi12**: Para obtener recursos por asignatura.

---

## Ejecución
- Antes de ejecutar debe asegurarse de que se haya creado el container de Docker:
```bash
  docker-compose up -d
```
- Una vez se haya creado el container y, esté en ejecución:
```bash
  npm install
  npm run dev
```

## Rutas Disponibles

### **Microservicio de Acceso**
Gestiona la autenticación de los usuarios.

- **POST `/login`**  
  Realiza el login de un usuario.  
  **Ejemplo de solicitud**:
  ```bash
  POST /login
  Content-Type: application/json
  {
    "email": "user@example.com",
    "password": "rut_del_usuario"
  }
### **Microservicio de Carreras**
Gestiona la información relacionada con las carreras y asignaturas.

- **GET** /careers
Obtiene todas las carreras.
  ```bash
  GET /careers

```

- **GET** /subjects
Obtiene todas las asignaturas.
 ```bash
  GET /subjects

```
- **POST** /careers/subjects/prerequisites
Obtiene todos los prerequisitos de una asignatura.
 ```bash
  POST /careers/subjects/prerequisites
{
    "subject_id": "subject_id"
  
}

```

- **POST** /careers/subjects/prerequisites
Obtiene todas las asignaturas y las que estas abren.
 ```bash
  POST /careers/subjects/prerequisites-map
{
  "career_id": "career_id"
}

```

- **POST** /careers/subjects/prerequisites
Obtiene todas las asignaturas y las que estas abren.
 ```bash
  POST /careers/subjects/postrequisites-map
{
"   subject_id": "subject_id"

}

```

### **Microservicio de Users**
Gestiona la autenticación de los usuarios.

