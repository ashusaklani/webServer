import express, { application } from "express";
// import path,{dirname} from "path";
import cors from "cors"
import cookieParser from "cookie-parser"
// import { fileURLToPath } from "url";

const app = express(); 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//importing routers 
import homeRouter from "./routers/home.routes.js";
import applicationRouter from "./routers/application.routes.js";
//routing
app.use('/',homeRouter);
app.use('/application',applicationRouter)

app.use(express.static("public"));
export {app};

