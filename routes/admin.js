var express = require('express');
const { LoopDetected } = require('http-errors');
const { route } = require('.');
const admin_helpers = require('../helpers/admin_helpers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/home')
});
router.get('/login',(req,res)=>{
  res.render('adminlogin')
})
router.get('/signup',(req,res)=>{
  res.render('signup')
})
router.post('/signup',(req,res)=>{
  admin_helpers.doSignup(req.body).then((data)=>{
    console.log(data);
  })
})
router.get('/home',async(req,res)=>{
  let data=await admin_helpers.allOrders()
  console.log(data);
  res.render('adminhome',{data})
})
router.post('/login',(req,res)=>{
  admin_helpers.doLogin(req.body).then((data)=>{
    res.redirect('/admin/home')
  })
})
module.exports = router;
