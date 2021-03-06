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
  if(req.session.adminLoggedIn){
    res.redirect('/admin/home')
  }else{
    res.render('adminlogin')
  }
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
  if(req.session.adminLoggedIn){
    let data=await admin_helpers.allOrders()
  res.render('adminhome',{data})
  }else{
    res.redirect('/admin/login')
  }
})
router.post('/login',(req,res)=>{
  admin_helpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.admin=response.admin
      req.session.adminLoggedIn=true
      res.redirect('/admin')
    }else{
      res.redirect('/admin/login')
    }
    res.redirect('/admin/home')
  })
})
module.exports = router;
