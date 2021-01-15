var db=require('../config/connection')
const bcrypt=require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
        db.get().collection('admin').insertOne(userData).then((data)=>{
            resolve(data.ops[0])
        })
        })
    },
    doLogin:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        let loginStatus=false
        let response={}
        let user=await db.get().collection('admin').findOne({Username:userData.Username})
        if(user){
            bcrypt.compare(userData.Password,user.Password).then((status)=>{
                if(status){
                    console.log("Login Success")
                    response.user=user
                    response.status=true
                    resolve(response)
                }else{
                    console.log("Login Failed")
                    resolve({status:false})
                }
            })
        }else{
            console.log("Login Failed")
            resolve({status:false})
        }

    })
},
    data:(data,callback)=>{
        return new Promise(async(resolve,reject)=>{
        db.get().collection('buynow').insertOne(data).then((data)=>{
            resolve(data)
        })
    })
    },
    allOrders:()=>{
        return new Promise(async(resolve,reject)=>{
            let order=await db.get().collection('buynow').find().toArray()
            resolve(order)
        })
    }
}