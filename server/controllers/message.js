var MongoProcess = require('../mongo');
var mongoProcess = new MongoProcess();

module.exports = {
  index: function(req, res) {
    // mongoProcess.getKeywordList(function(err,result){
    //   if (err) {throw err};
    //   res.send({"results": result});

    // })
res.send("index" + req.params + " ss")
  },

  show: function(req, res) {
    // mongoProcess.getSummaryByKeyword(req.params.summary, function(err,result){
    //   res.send({"result": result});
    // })
//res.send("show" + req.params);
console.log(req.params);
    //for date range withe keyword
    if (req.params.message && req.params.startDate && req.params.endDate){
           mongoProcess.getTwitsByDateKeyword(req.params, function(err,result){
              if (err) {throw err};
              res.send({"results": result});
          })
    }
    else{
      res.send({"results":"wrong parameters"});
    }
  }

  // //TODO
  // create: function(req, res) {
  //   res.send("TODO");
  // },

  // update: function(req, res) {
  //   res.send("TODO");
  // },


  // destroy: function(req, res) {
  //   res.send("TODO");
  // }


};