var express = require('express');
const { route } = require('.');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login',(req,res)=>{
  res.render('adminlogin')
})
router.get('/signup',(req,res)=>{
  res.render('signup')
})

module.exports = router;
