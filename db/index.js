const mongoose = require("mongoose");

const connectToDB = async ()=>{
  await mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Db connected successfully");
  }).catch(error=> console.log(`db error when connected ${error?.message}`))
}

module.exports = connectToDB;