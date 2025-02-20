require("dotenv").config();

const Store = require("./models/storeModel")
const connectToDB = require("./db");
const jsonProducts = require("./products.json")
const start = async ()=>{
  try{
    await connectToDB();
    await Store.deleteMany();
    await Store.create(jsonProducts);
    process.exit(0)
    console.log("added successfully")
  }catch(error){
    console.log(`Error ${error?.message}`);
    process.exit(1)
  }
}
start()