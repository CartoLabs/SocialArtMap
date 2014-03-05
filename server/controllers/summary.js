var MongoProcess = require('../mongo');
var mongoProcess = new MongoProcess();

module.exports = {
  index: function(req, res) {
    res.send("index called");
  },

  show: function(req, res) {
    console.log(req);
    if (req.params.summary == "getKeywordList"){
      mongoProcess.getKeywordList(function(err,result){
        if (err) {throw err};
        res.send({"results": result});
      })
    }else{
      mongoProcess.getSummaryByKeyword(req.params.summary, function(err,result){
        res.send({"result": result});
      })
    }
  },

  // //TODO
  // create: function(req, res) {
  //   res.send("TODO");
  // },

  // update: function(req, res) {
  //   res.send("TODO");
  // },


  // destroy: function(req, res) {
  //   res.send("TODO");
  // },

  getKeywordList: function(req,res){
    console.log("called");
    console.dir(req);
    res.send("done");

  }

};