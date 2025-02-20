const {Schema,model,models} = require("mongoose")


const storeSchema = new Schema({
  name:{
    type:String,
    required:[true,"name is required"]
  },
  price:{
    type:Number,
    required:[true,"price is required"],
    min:1
  },
  company:{
    type:String,
    enum:{
      values:["ikea","liddy","caressa","marcos"],
      message:'{VALUE} is not supported'
    }
  },
  rating:{
    type:Number,
    min:1,
    max:5
  },
  featured:{
    type:Boolean,
    default:false
  },
},{timestamps:true})

const Store = models?.Store || model("Store",storeSchema);

module.exports = Store;