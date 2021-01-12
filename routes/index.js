var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/cod',(req,res)=>{
  res.render('cod')
})
router.get('/placeorder',(req,res)=>{
  res.render('success')
})
router.post('/placeorder',(req,res)=>{
  res.render('success')
})
module.exports = router;
