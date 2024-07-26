import { config } from "dotenv";
import { connectDataBase } from "./db/connection";
import app from "./app";
config()
const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    res.send("hello")
})


connectDataBase()
    .then(()=>{
        app.listen(PORT, ()=>console.log(`Port is running successfully at port ${PORT}`))
    })
.catch((err)=> console.log(err))