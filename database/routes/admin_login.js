var express = require("express");
var router = express.Router();
var ADMIN = require("../model/admin_login");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const multer = require("multer");

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
//Sign up

router.post("/add", upload.single("image"), async function (req, res, next) {
  try {
    if (!req.file) {
      throw new Error("Image file is missing!");
    }
    if (
      !req.body.name ||
      !req.body.mno ||
      !req.body.email ||
      !req.body.password
    ) {
      throw new Error("Data Did Not MAtch!");
    }

    req.body.password = await bcrypt.hash(req.body.password, 8);
    req.body.image = req.file.filename;

    const datas = await ADMIN.create(req.body);

    res.status(201).json({
      status: "Data Successfully Added!",
      message: "Success",
      data: datas,
    });
  } catch (error) {
    res.status(404).json({
      status: "No Data Found!",
      message: error.message,
    });
  }
});

//Login

router.post("/login", async function (req, res, next) {
  try {
    const datas = await ADMIN.findOne({ email: req.body.email });
    if (!datas) {
      throw new Error("Enter Valid Email!");
    }

    const check = await bcrypt.compare(req.body.password, datas.password);
    if (!check) {
      throw new Error("Enter Valid Password");
    }

    const admintoken = jwt.sign({ id: datas._id }, "SURAT");

    res.status(200).json({
      status: "Successfully Login!",
      message: "Success",
      data: datas,
      admintoken,
    });
  } catch (error) {
    res.status(404).json({
      status: "No Data Found!",
      message: error.message,
    });
  }
});

//view login
router.get("/show/:id", async function (req, res, next) {
  try {
    id = req.params.id;
    const datas = await ADMIN.findById(id);
    res.status(201).json({
      status: "Data Successfully view!",
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

//view

router.get("/view", async function (req, res, next) {
  const datas = await ADMIN.find();
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

router.put("/update/:id", async function (req, res, next) {
  try {
    // if (!req.body.username || !req.body.email || !req.body.password || !req.body.mno) {
    //   throw new Error("data did not match");
    // }
    id = req.params.id;
    u_data = req.body;

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const datas = await ADMIN.findByIdAndUpdate(id, u_data);
    // console.log(datas);
    res.status(201).json({
      status: "Data Successfully updated!",
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

router.post("/forgetpass", async function (req, res, next) {
  try {
    // if (!req.body.email || !req.body.mno) {
    //   throw new Error("Data didn't match!!");
    // }
    const datas = await ADMIN.find({ email: req.body.email });
    const contactno = datas.mno;
    if (!datas) {
      throw new Error("Email is not valid!!");
    }
    if (contactno === !req.body.mno) {
      throw new Error("Contact no is not valid!!");
    }

    res.status(200).json({
      status: "Data Successfully find!",
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

router.get("/findbyid", async function (req, res, next) {
  try {
    const data = await ADMIN.findOne({ _id: req.query.id });
    res.status(200).json({
      status: "success",
      message: "date find success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "data not found!",
      message: error.message,
    });
  }
});

module.exports = router;