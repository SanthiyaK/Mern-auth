const express=require('express');
const mongoose=require('mongoose');
const User=require("./models/User")
const Property=require("./models/Property")
const cors=require('cors')
const cookieParser=require('cookie-parser')
const routerUser=require('./routes/User')
const routerProp=require('./routes/Property')
require('dotenv').config();

const PORT=process.env.PORT;
const app=express();

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(cookieParser())
app.use("/api/auth", routerUser)
app.use("/api/property",routerProp)
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database Connected")
).catch(err=>console.log("ERROR IN  DATABASE CONNECTION"))


app.listen(PORT,()=>{
    console.log(`Server is connected to the port ${PORT}`); 
})




/* {
    origin: ["http://localhost:3000"],
    credentials: true
} */