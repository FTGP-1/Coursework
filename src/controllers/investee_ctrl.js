const db = require("../models");
// const Investee = db.investees;

const Investee = require('../models/investee_model');

// const Movie = require('../models/movie-model')



exports.create = (req, res) => {
    // Validate request
    if (!req.body.companyName) {
      res.status(400).send({ message: "Name can not be empty!" });
      // res.status(400).send(req.companyName );
      return;
    }
    // Create an Investor
    const investee = new Investee({
      companyName: req.body.companyName,
      legalPerson:req.body.legalPerson,
      tickerName:req.body.tickerName,
      tickerPrice:req.body.tickerPrice,
      account: req.body.account,
      ico: req.body.ico,
      profile: req.body.profile,
      progress: req.body.progress,
      fulfilled: req.body.fulfilled,
    });
    
    // Save Investee in the database
    investee
      .save(investee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Investor."
        });
      });
  };



exports.findAccount = (req, res) => {
    const account = req.params.account;
    Investee.findOne({ account: account })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Investee"});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Investee"});
      });
  };

  
exports.findICO = (req, res) => {
  const ico = req.params.ico;
  Investee.findOne({ ico: ico })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Investee"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Investee"});
    });
};


exports.findAll = (req, res) => {
  
    Investee.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving investees."
        });
      });
  };

exports.findAndUpdate= (req,res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const filter = { account: req.params.account};
  const update = { progress: req.body.progress };

  Investee.findOneAndUpdate(filter,update)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found Investee"});
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Investee"});
  });
}; 
