var Trainee = require('../models/trainee');
exports.getTrainee = function(req,res){
  console.log("get trainee",req.params.id);

  var ObjectId = require('mongodb').ObjectID;

  Trainee.find({'_id' : new ObjectId(req.params.id)},function(err, result){
    if (err){
        res.json({success: false, message: "There has no trainee in our system"})
      }else{
        console.log(result);
        res.json({success: true, message: "Trainee list", result: result})
      }
  })
}


exports.getAllTrainees = function(req,res){
  console.log("get all trainee");
  Trainee.find({},function(err, result){
    if (err){
        res.json({success: false, message: "There has no trainee in our system"})
      }else{
        res.json({success: true, message: "Trainee list", result: result})
      }
  })
}

exports.saveTrainee = function(req,res){
  var trainee = new Trainee();
  trainee.batch =  req.body.batch,
  trainee.username =  req.body.username,
  trainee.password =  req.body.password,
  trainee.firstname =  req.body.firstname,
  trainee.lastname =  req.body.lastname,
  trainee.email =  req.body.email,
  trainee.phone =  req.body.phone,
  trainee.client_calls =  req.body.client.name,
  trainee.client_call_date = req.body.client.date
  trainee.save(function(err, result){
    console.log(result);
    // res.json({success: true, message: "Trainee has been added!"})
    if (err) {
      res.send();
    }else{
     res.json({success: true, message: "Trainee has been added!"})
   }
 })
}
