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
      account: req.body.account,
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

exports.findOne = (req, res) => {
    const id = req.params.id;
    Investee.findOne()
    Investee.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Investee with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Investee with id=" + id });
      });
  };