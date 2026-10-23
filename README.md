# Lovely Chicken Web

Sistema web de gestión para Lovely Chicken desarrollado para el curso **Soluciones Web y Aplicaciones Distribuidas (SIST1402A)**.

## Estructura

```text
lovely-chicken-web/
├── backend/   # Spring Boot + JPA + JWT + SQL Server
├── frontend/  # Angular 22 + Angular Material
└── docs/      # Entregables y evidencias T2
```

## Backend

- Java 25
- Spring Boot 4.1.1
- Spring Data JPA / Hibernate
- Spring Security + JWT
- SQL Server
- Puerto local: `9494`

Ejecución en Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

> Las credenciales de base de datos deben configurarse localmente. No subir secretos al repositorio.

## Frontend

- Angular 22
- Angular Material
- Reactive Forms
- HttpClient
- JWT interceptor
- Route guards

Ejecución:

```powershell
cd frontend
npm install
ng serve
```

Abrir: `http://localhost:4200`

## Funcionalidad T2

- Login con JWT
- Rutas protegidas
- Interceptor Bearer
- Layout corporativo Lovely Chicken
- CRUD completo de Productos
- Comunicación padre-hijo con `input()` / `output()`
- Inicio del módulo de Mesas
- Integración Angular ↔ Spring Boot

## Pruebas confirmadas

- Login: 200 OK
- GET productos: 200 OK
- POST producto: 201 Created
- PUT producto: 200 OK
- DELETE producto: 204 No Content
- Guard sin token: redirección a `/login`
- Logout: eliminación del token y redirección a login

## Autor responsable de esta versión

Jhenry Huamán Guevara
