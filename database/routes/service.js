var express = require("express");
var router = express.Router();
const multer = require("multer");
const SERVICE = require("../model/service");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//create

router.post("/add", upload.single("image"), async function (req, res, next) {
  try {
    if (!req.file) {
      throw new Error("Image file is missing!");
    }

    if (!req.body.name || !req.body.description) {
      throw new Error("Name or description is missing!");
    }

    req.body.image = req.file.filename;

    const datas = await SERVICE.create(req.body);

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
  const datas = await SERVICE.find();

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
router.get(
  "/show/:id",
  upload.single("image"),
  async function (req, res, next) {
    try {
      id = req.params.id;
      const datas = await SERVICE.findById(id);
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
  }
);

//Update

router.put(
  "/update/:id",
  upload.single("image"),
  async function (req, res, next) {
    try {
      if (!req.file) {
        throw new Error("Image file is missing!");
      }
      if (!req.body.name || !req.body.description) {
        throw new Error("Name or description is missing!");
      }

      req.body.image = req.file.filename;
      id = req.params.id;
      u_data = req.body;
      const datas = await SERVICE.findByIdAndUpdate(id, u_data);

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
  }
);

//delete

router.delete("/delete/:id", async function (req, res, next) {
  id = req.params.id;
  u_data = req.body;
  const datas = await SERVICE.findByIdAndDelete(id, u_data);
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
