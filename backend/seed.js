const mongoose=require('mongoose');
const Property=require("./models/Property")
const userjson=require("./data/db.json")
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(async()=>{
    console.log("Database Connected");
    await Property.deleteMany()
     await  Property.insertMany(userjson);

  console.log("Data is inserted");
  mongoose.disconnect();
}).catch(err=> console.log(err))



