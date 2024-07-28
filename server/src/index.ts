import express from "express";
import { config } from "dotenv";
import { connectDataBase } from "./db/connection";
import mainMouter from "./routes";
import morgan from "morgan";
import { Request } from "openai/_shims/auto/types";
config()
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res)=>{
    res.send("hello")
})
app.post("/signup", async(req, res)=>{
    const {firstName, lastName} = req.body;
    console.log(firstName, lastName)
    res.status(200).json({message: "Successfull"})
})

app.use("/api/v1/", mainMouter);

connectDataBase()
    .then(()=>{
        app.listen(PORT, ()=>console.log(`Port is running successfully at port ${PORT}`))
    })
.catch((err)=> console.log(err))