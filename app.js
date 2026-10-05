import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import db from './config/db.config.js';

import authRouter from './routes/auth.routes.js';
import userRoute from './routes/user.routes.js';
import ticketRoute from './routes/ticket.routes.js';
import adminRoute from './routes/admin.routes.js';
import agentRoute from './routes/agent.routes.js';

import errorHandler from './middlewares/error.middleware.js';
import swaggerUI from 'swagger-ui-express';
import swagger from './docs/swagger.json' with {type: "json"};


const app = express();
const port = process.env.PORT ?? 3000;


app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger))
app.get("/", (req, res) => {
    return res.json({
        "Project": "Customer - Support - Ticketing",
        "Swagger": "/api-docs",
        "ReadME ": "Don't forget to open the ReadME file"
    })
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", userRoute)
app.use("/api/v1", ticketRoute)
app.use("/api/v1", adminRoute)
app.use("/api/v1", agentRoute)

db()

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});