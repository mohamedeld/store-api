const Store = require("../models/storeModel");
const asyncWrapper = require("../middlewares/asyncWrapper")

const getAllStoreStatic = asyncWrapper(async (req,res)=>{
  const {featured,company,name,sort,fields,numericFilter} = req?.query;
  const query = {};
  if(featured){
    query.featured = featured === 'true' ? true : false;
  }
  if(company){
    query.company = company;
  }
  if(name){
    query.name = { $regex:name, $options:'i'}
  }
  let result = Store.find(query);
  if(fields){
    const fieldsList = fields?.split(', ')?.join(' ');
    result = result.select(fieldsList);
  }
  if(sort){
    const sortedList = sort?.split(',').join(' ');
    result = result.sort(sortedList);
  }else{
    result = result.sort('createdAt');
  }
  if(numericFilter){
    const filterMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<=':'$lte',
      '<':'$lt'
    }
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filter = numericFilter.replace(regEx,(match)=> `-${filterMap[match]}-`)

    const options = ['price','rating'];
    filter = filter?.split(', ').forEach(item=>{
      const [field,operator,value]= item?.split('-');
      if(options?.includes(field)){
        query[field] = {[operator]:Number(value)}
      }
    })
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit)
  const stores = await result;
  res.status(200).json({stores})
})


module.exports = {
  getAllStoreStatic
}