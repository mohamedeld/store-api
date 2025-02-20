const Store = require("../models/storeModel");
const asyncWrapper = require("../middlewares/asyncWrapper")

const getAllStoreStatic = asyncWrapper(async (req,res)=>{
  const stores= await Store.find({});
  res.status(200).json({stores})
})


module.exports = {
  getAllStoreStatic
}