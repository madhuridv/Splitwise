const userModel = require('../Db/models/schema');
//const jwt = require('jsonwebtoken');

const userOperation = {
AddUser(userObject,response){
    userModel.create(userObject,(err,doc)=>{
       if(err){
           console.log("Error is ",err);
           response.json({Status: "F"});
       }else{
           response.json({Status: "S", record: doc});
       }
    })
}
} //end of user operation

module.exports = userOperation;