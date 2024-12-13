var express = require("express");
var router = express.Router();
const AIRLINESCLASS = require("../model/airlinesclass");

//create

router.post("/add", async function (req, res, next) {
  try {
    if (!req.body.name) {
      throw new Error("Name  is missing!");
    }

    const datas = await AIRLINESCLASS.create(req.body);

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
  const datas = await AIRLINESCLASS.find();

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

//Update

router.put("/update/:id", async function (req, res, next) {
  try {
    if (!req.body.name) {
      throw new Error("Name  is missing!");
    }

    id = req.params.id;
    u_data = req.body;
    const datas = await AIRLINESCLASS.findByIdAndUpdate(id, u_data);

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
  const datas = await AIRLINESCLASS.findByIdAndDelete(id, u_data);
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

//FindById
router.get("/show/:id", async function (req, res, next) {
  try {
    id = req.params.id;
    const datas = await AIRLINESCLASS.findById(id);
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

module.exports = router;
