var express = require("express");
var router = express.Router();
const multer = require("multer");
const GALLERY = require("../model/gallery");


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

router.post("/add",upload.single("image"), async function (req, res, next) {
  try {
    if (!req.file) {
      throw new Error("Image file is missing!");
    }

    req.body.image = req.file.filename;

    const datas = await GALLERY.create(req.body);

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
  const datas = await GALLERY.find();

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

//delete

router.delete("/delete/:id", async function (req, res, next) {
  id = req.params.id;
  u_data = req.body;
  const datas = await GALLERY.findByIdAndDelete(id, u_data);
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
