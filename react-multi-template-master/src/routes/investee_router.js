module.exports = app => {
    const investees = require("../controllers/investee_ctrl.js");
    var router = require("express").Router();
    // Create a new Investee
    router.post("/api/investees", investees.create);

    app.use('/api/investees', router);
  };

