<<<<<<< HEAD

- do this
- git clone url
- cd customer-support-ticketing
- git checkout develop
- git pull origin develop

next create your feature brach( the feature you are working on)
- git checkout -b feat/login

then work on your feature and commit

- git add .
- git commit -m "feat: implement login"

please always add the feat for us to know it is a new feature implemented

then push your feature branch
- git push -u origin feat/login


go to your github you should see the feature you pushed
then create a pull request (PR)
the PR should be: 
- feat/login - develop


- THIS README FILE WILL EDITED - LET US COMMUNICATE HERE FOR NOW

- REGISTER ROUTE
  firstName, lastName, dob, email, age, phone, password, status(active, pending, closed), role(customer, agent, admin), timestamps



  don't alter what you met. work only on your technology.... already pushed code is working

  if there is need to refactor teammate code, please drop it here or  inform the team in the whatsapp group

  user npm run dev to run your code

  use postman for now

  make sure your code is running before pushing

  push only to develop branch


  marvelous is working on the schema
  install the following:

  - dependencies
  npm i express mongoose jsonwebtoken bcryptjs cors swagger-ui-express dotenv multer cloudinary multer-storage-cloudinary

- devDependencies
  nodemon
  







  

=======
# Customer Support Ticketing

A full-stack customer support ticketing project with an Express and MongoDB API and a React frontend built with Vite.

## Project Structure

- `backend/` contains the Express API, MongoDB models, validation, authentication, and OpenAPI documentation.
- `frontend/` contains the React and Vite application.

## Requirements

- Node.js and npm
- A MongoDB connection string

## Configuration

Create `backend/.env` with the following values:

```env
PORT=3000
DB_CONNECTION=mongodb://127.0.0.1:27017/customer-support-ticketing
JWT_SECRET=replace-with-a-long-random-secret
```

`PORT` is optional and defaults to `3000`. `DB_CONNECTION` and `JWT_SECRET` must be set for the API's database connection and JWT authentication. Do not commit real secrets.

## Run Locally

Install and start the backend:

```sh
cd backend
npm install
npm run dev
```

The API listens at `http://localhost:5000` by default. Swagger UI is available at `http://localhost:5000/api-docs`.

In a separate terminal, install and start the frontend:

```sh
cd frontend
npm install
npm run dev
```

Vite prints the local frontend URL when it starts.

## API Overview

API routes use the `/api/v1` prefix. Protected routes require a JWT bearer token; admin and agent routes also require the corresponding role.

| Method   | Endpoint                         | Access        |
| -------- | -------------------------------- | ------------- |
| `POST`   | `/api/v1/auth/register`          | Public        |
| `POST`   | `/api/v1/auth/login`             | Public        |
| `GET`    | `/api/v1/profile`                | Authenticated |
| `PUT`    | `/api/v1/edit-profile`           | Authenticated |
| `DELETE` | `/api/v1/deactivate-profile`     | Authenticated |
| `POST`   | `/api/v1/create-ticket`          | Customer      |
| `GET`    | `/api/v1/view-tickets`           | Customer      |
| `GET`    | `/api/v1/view-ticket/:id`        | Customer      |
| `PATCH`  | `/api/v1/edit-ticket/:id`        | Customer      |
| `PATCH`  | `/api/v1/admin/assign-agent/:id` | Admin         |
| `GET`    | `/api/v1/admin/all-agents`       | Admin         |
| `GET`    | `/api/v1/admin/all-customers`    | Admin         |
| `PATCH`  | `/api/v1/admin/user/:id`         | Admin         |
| `GET`    | `/api/v1/agent/tickets/:id`      | Agent         |
| `PATCH`  | `/api/v1/agent/ticket/:id`       | Agent         |

See Swagger UI for request schemas and response details. Replace `:id` with the relevant resource ID.

## Frontend Scripts

Run these commands from `frontend/`:

```sh
npm run dev
npm run build
npm run preview
npm run lint
```

The backend's current `npm test` script is a placeholder and exits with an error; backend automated tests are not configured yet.
>>>>>>> 71f28da (initial commit)
