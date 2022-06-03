const express = require("express");
const customerRoutes = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


// get a list of all the customers.
customerRoutes.route("/customer").get(function (req, res) {
  let dbConnect = dbo.getDb("Test");
  dbConnect
    .collection("customers")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get a single customer by id
customerRoutes.route("/customer/:id").get(function (req, res) {
  let dbConnect = dbo.getDb();
  let myQuery = { _id: ObjectId( req.params.id )};
  dbConnect
      .collection("customers")
      .findOne(myQuery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// create a new customer.
customerRoutes.route("/customer/add").post(function (req, response) {
  let dbConnect = dbo.getDb();
  let myObj = {
    name: req.body.name,
    position: req.body.position
  };
  dbConnect.collection("customers").insertOne(myObj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// update a customer by id.
customerRoutes.route("/update/:id").post(function (req, response) {
  let dbConnect = dbo.getDb();
  let myQuery = { _id: ObjectId( req.params.id )};
  let newValues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
    },
  };
  dbConnect
    .collection("customers")
    .updateOne(myQuery, newValues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// delete a customer
customerRoutes.route("/:id").delete((req, response) => {
  let dbConnect = dbo.getDb();
  let myQuery = { _id: ObjectId( req.params.id )};
  dbConnect.collection("customers").deleteOne(myQuery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = customerRoutes;
