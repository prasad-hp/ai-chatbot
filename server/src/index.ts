import express from "express";
import { config } from "dotenv";
import { connectDataBase } from "./db/connection";
import mainMouter from "./routes";
import cors from "cors"
config() 
const PORT = 3000;
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("hello")
})

app.use("/api/v1/", mainMouter);

connectDataBase()
    .then(()=>{
        app.listen(PORT, ()=>console.log(`Port is running successfully at port ${PORT}`))
    })
.catch((err)=> console.log(err))