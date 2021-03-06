var express = require('express');
var router = express.Router();
var helpers=require('../helpers/admin_helpers')
var paypal = require('paypal-rest-sdk');
// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AbgGbrMGPscBPqpltF6L_K8E3Vin7YIzm9vrFRhyC0jbTqXUoVVW7232q3XfYM4w8fQLcDDh3xcygCV_', // please provide your client id here 
  'client_secret': 'ELEW-2WUZLVtGa7s9FmnJLwMIk3w25heDSnPjmh8MCHOCnb2qGPRDCTk_wPQ8k64yZFczbEy6GR8rxR5' // provide your client secret here 
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/cod',(req,res)=>{
  res.render('cod')
})
router.post('/cod',(req,res)=>{
  res.render('success')
})
router.get('/success',(req,res)=>{
  res.render('success')
})
router.post('/placeorder',(req,res)=>{
  totalPrice=80
  helpers.data(req.body).then((result)=>{
    if(req.body['payment']==='cod'){
      res.redirect('/admin/success')
    }else{
        helpers.generateRazorpay(totalPrice).then((response)=>{
          res.json(response)
        })
      }
  })
})
module.exports = router;
