var db=require('../config/connection')
module.exports={
    data:(data,callback)=>{
        return new Promise(async(resolve,reject)=>{
        db.get().collection('buynow').insertOne(data).then((data)=>{
            resolve(data)
        })
    })
    }
}