module.exports = app => {
    const investees = require("../controllers/investee_ctrl.js");
    var router = require("express").Router();
    // Create a new Investee
    router.post("/", investees.create);

    // Retrieve a single 
    router.get("/:account", investees.findAccount);

    // Retrieve all 
    router.get("/", investees.findAll);



    app.use('/api/investees', router);
  };

