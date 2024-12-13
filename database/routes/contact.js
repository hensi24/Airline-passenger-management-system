var express = require("express");
const CONTACT = require("../model/contact");
var router = express.Router();

//create

router.post("/add", async function (req, res, next) {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.mno ||
      !req.body.message
    ) {
      throw new Error("Name, email, mno, or message required!");
    }
    const datas = await CONTACT.create(req.body);

    res.status(201).json({
      status: "Data Successfully Added!",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: error.message,
    });
  }
});

//view

router.get("/view", async function (req, res, next) {
  const datas = await CONTACT.find();
  try {
    res.status(200).json({
      status: "Data Successfully View!",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(400).json({
      status: "No Data Found",
      message: error.message,
    });
  }
});

//delete

router.delete("/delete/:id", async function (req, res, next) {
  id = req.params.id;
  u_data = req.body;
  const datas = await CONTACT.findByIdAndDelete(id, u_data);
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

module.exports = router;
