var express = require("express");
var router = express.Router();
const AIRLINEROUTE = require("../model/airlineroute");
const AIRLINE = require("../model/airline");

//create

router.post("/add", async function (req, res, next) {
  try {
    if (
      !req.body.origin ||
      !req.body.destination ||
      !req.body.name ||
      !req.body.no ||
      !req.body.takeoftime ||
      !req.body.date ||
      !req.body.price
    ) {
      throw new Error(
        "Origin ,destination, name, no takeoftime ,price, or date is missing!"
      );
    }

    const datas = await AIRLINEROUTE.create(req.body);

    res.status(201).json({
      status: "Data Successfully Added!",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
});

//view
router.get("/view", async function (req, res, next) {
  const datas = await AIRLINEROUTE.find();

  try {
    res.status(200).json({
      status: "Data Successfully View",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(404).json({
      status: "No Data Found",
      message: error.message,
    });
  }
});

//FindById
router.get("/show/:id", async function (req, res, next) {
  try {
    id = req.params.id;
    const datas = await AIRLINEROUTE.findById(id);
    res.status(201).json({
      status: "Data Successfully Find!",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(404).json({
      status: "No Data Found",
      message: error.message,
    });
  }
});

//Update

router.put("/update/:id", async function (req, res, next) {
  try {
    if (
      !req.body.origin ||
      !req.body.destination ||
      !req.body.name ||
      !req.body.no ||
      !req.body.takeoftime ||
      !req.body.date ||
      !req.body.price
    ) {
      throw new Error(
        "Origin ,destination, name, no takeoftime ,price, or date is missing!"
      );
    }

    id = req.params.id;
    u_data = req.body;
    const datas = await AIRLINEROUTE.findByIdAndUpdate(id, u_data);

    res.status(201).json({
      status: "Data Successfully Updated!",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
});

//delete

router.delete("/delete/:id", async function (req, res, next) {
  id = req.params.id;
  u_data = req.body;
  const datas = await AIRLINEROUTE.findByIdAndDelete(id, u_data);
  try {
    res.status(201).json({
      status: "Data Successfully Deleted!",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
});

// View category
router.get("/viewcategory", async (req, res, next) => {
  try {
    const categoryview = await AIRLINE.find().select("name no");
    res.status(200).json({
      status: "Data Successfully Viewed",
      message: "Success",
      data: categoryview,
    });
  } catch (error) {
    res.status(404).json({
      status: "No Data Found",
      message: error.message,
    });
  }
});

module.exports = router;
