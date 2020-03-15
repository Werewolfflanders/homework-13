const express = require("express");

const router = express.Router();

const burger = require("../models/burger");

//create routes 
router.get("/", (req, res) => {
  burger.all(data => {
    const hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.create(["burger_name"], [req.body.burger_name], result => {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;
  burger.update(
    {
      devoured: req.body.devour
    },
    condition,
    result => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});
//send routes to server.js
module.exports = router;