const express = require("express");
require("dotenv").config();
require("express-async-errors")
const connectToDB = require("./db");
const errorHandlerMiddleware = require("./middlewares/globalError");
const storeRoutes = require("./routes/store");
const app = express();

app.use(express.json());

app.use("/api/v1/store",storeRoutes);


app.use((req,res,next)=>{
  res.status(404).json({
    message:"Not Found"
  })
});


app.use(errorHandlerMiddleware)

const start = async ()=>{
  try{
    await connectToDB();
  }catch(error){
    console.log(`Error ${error?.message}`);
  }
}




const PORT = process.env.PORT || 5000;
const startServer = ()=>{
  app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
  })
}

start().then(startServer);