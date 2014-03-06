var MongoProcess = require('../mongo');
var mongoProcess = new MongoProcess();

function Message(){
  this.getMessageByKeywordAndDaterange = function (req,res){
    if (req.params.keyword && req.params.startDate && req.params.endDate){
           mongoProcess.getTwitsByDateKeyword(req.params, function(err,result){
              if (err) {throw err};
              res.send({"results": result});
          })
    }
    else{
      res.send({"results":"wrong parameters"});
    }
  };
}
module.exports = Message;