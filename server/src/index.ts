import express from "express";
import { config } from "dotenv";
import { connectDataBase } from "./db/connection";
import mainMouter from "./routes";
import morgan from "morgan";
import cookieParser from "cookie-parser"
import { Request } from "openai/_shims/auto/types";
import cors from "cors"
config()
const PORT = 3000;
const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.get("/", (req, res)=>{
    res.send("hello")
})

app.use("/api/v1/", mainMouter);

connectDataBase()
    .then(()=>{
        app.listen(PORT, ()=>console.log(`Port is running successfully at port ${PORT}`))
    })
.catch((err)=> console.log(err))