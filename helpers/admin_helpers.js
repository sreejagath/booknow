var db=require('../config/connection')
const bcrypt=require('bcrypt')
const Razorpay=require ('razorpay')
var paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AbgGbrMGPscBPqpltF6L_K8E3Vin7YIzm9vrFRhyC0jbTqXUoVVW7232q3XfYM4w8fQLcDDh3xcygCV_", // please provide your client id here
  client_secret:
    "ELEW-2WUZLVtGa7s9FmnJLwMIk3w25heDSnPjmh8MCHOCnb2qGPRDCTk_wPQ8k64yZFczbEy6GR8rxR5", // provide your client secret here
});
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
        let admin=await db.get().collection('admin').findOne({Username:userData.Username})
        if(admin){
            bcrypt.compare(userData.Password,admin.Password).then((status)=>{
                if(status){
                    console.log("Login Success")
                    response.admin=admin
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
    data:(data)=>{
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
    },
    createPay: (amount) => {
        return new Promise((resolve, reject) => {
          const create_payment_json = {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            redirect_urls: {
              return_url: "http://localhost:3000/",
              cancel_url: "http://localhost:3000/cod",
            },
            transactions: [
              {
                item_list: {
                  items: [
                    {
                      name: "Spandanangal",
                      sku: "item",
                      price: amount,
                      currency: "INR",
                      quantity: 1,
                    },
                  ],
                },
                amount: {
                  currency: "INR",
                  total: amount,
                },
                description: "This is the payment description.",
              },
            ],
          };
    
          paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
              throw error;
            } else {
              console.log(payment);
              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                  resolve(payment.links[i].href);
                }
              }
            }
          });
        });
      },
      generateRazorpay:(total)=>{
        return new Promise((resolve,reject)=>{
            var options = {
                amount: total*100,  // amount in the smallest currency unit
                currency: "INR",
                receipt: "order_rcptid_11"
              };
              instance.orders.create(options, function(err, order) {
                console.log("New Order : ",order);
                resolve(order)
              });
        })
    }
}