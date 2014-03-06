var MongoProcess = require('../mongo');
var mongoProcess = new MongoProcess();

function summary(){
  this.getKeywordList = function(req,res){
    mongoProcess.getKeywordList(function(err,result){
        if (err) {throw err};
        res.send({"results": result});
    })
  };

  this.getSummaryByKeyword = function(req,res){
    mongoProcess.getSummaryByKeyword(req.params.keyword, function(err,result){
      res.send({"result": result});
   })
  };
}

module.exports = summary;
