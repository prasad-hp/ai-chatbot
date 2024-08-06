import express from "express";
import { config } from "dotenv";
import { connectDataBase } from "./db/connection";
import cors from "cors"
import mainMouter from "./routes";
config()
const PORT = 3000;
const app = express();
app.use(cors({
    origin:["http://localhost:5173"]
}))
app.use(express.json());

app.use("/api/v1/", mainMouter);
connectDataBase()
    .then(()=>{
        app.listen(PORT, ()=>console.log(`Port is running successfully at port ${PORT}`))
    })
.catch((err)=> console.log(err))