var express = require("express");
var router = express.Router();
const multer = require("multer");
const AIRLINEROUTE = require("../model/airlineroute");
const BOOKING = require("../model/booking");
const AIRLINESCLASS = require("../model/airlinesclass");

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

// router.post("/add", async function (req, res, next) {
//   try {
//     if (
//       !req.body.name ||
//       !req.body.email ||
//       !req.body.mno ||
//       !req.body.gender ||
//       !req.body.birthdate ||
//       !req.body.origin ||
//       !req.body.destination ||
//       !req.body.price ||
//       !req.body.seat ||
//       !req.body.aclass ||
//       !req.body.rdate ||
//       !req.body.pno ||
//       !req.body.pname ||
//       !req.body.takeoftime ||
//       !req.body.date
//     ) {
//       throw new Error(
//         "Name ,email,mno, gender, birthdate, origin , destination ,price,seat, class, rdate, pno ,pname , takeoftime or date is missing!"
//       );
//     }

//     const datas = await BOOKING.create(req.body);

//     res.status(201).json({
//       status: "Data Successfully Added!",
//       message: "Success",
//       data: datas,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "Error",
//       message: error.message,
//     });
//   }
// });

router.post("/add", async function (req, res, next) {
  try {
    const {
      name,
      email,
      mno,
      gender,
      birthdate,
      origin,
      destination,
      price,
      seat,
      aclass,
      rdate,
      pno,
      pname,
      takeoftime,
      date,
    } = req.body;

    if (
      !name ||
      !email ||
      !mno ||
      !gender ||
      !birthdate ||
      !origin ||
      !destination ||
      !price ||
      !seat ||
      !aclass ||
      !rdate ||
      !pno ||
      !pname ||
      !takeoftime ||
      !date
    ) {
      throw new Error(
        "Name, email, mno, gender, birthdate, origin, destination, price, seat, class, rdate, pno, pname, takeoftime, or date is missing!"
      );
    }

    const seatNumber = parseInt(seat, 10);
    if (isNaN(seatNumber) || seatNumber < 1 || seatNumber > 30) {
      throw new Error("Seat number must be between 1 and 30");
    }

    const existingBooking = await BOOKING.findOne({
      seat: seatNumber,
      date: date,
    });
    if (existingBooking) {
      throw new Error(
        `Seat number ${seatNumber} is already booked for ${date}`
      );
    }

    const newBooking = new BOOKING(req.body);
    await newBooking.save();

    res.status(201).json({
      status: "Data Successfully Added!",
      message: "Success",
      data: newBooking,
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
  const datas = await BOOKING.find();

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
    const datas = await BOOKING.findById(id);
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
      !req.body.name ||
      !req.body.email ||
      !req.body.mno ||
      !req.body.gender ||
      !req.body.birthdate ||
      !req.body.origin ||
      !req.body.destination ||
      !req.body.price ||
      !req.body.seat ||
      !req.body.aclass ||
      !req.body.rdate ||
      !req.body.pno ||
      !req.body.pname ||
      !req.body.takeoftime ||
      !req.body.date
    ) {
      throw new Error(
        "Name , email,mno,gender, birthdate, origin , destination ,price,seat, class, rdate, pno ,pname , takeoftime or date is missing!"
      );
    }

    id = req.params.id;
    u_data = req.body;
    const datas = await BOOKING.findByIdAndUpdate(id, u_data);

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
  const datas = await BOOKING.findByIdAndDelete(id, u_data);
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
    const categoryview = await AIRLINEROUTE.find().select(
      "origin destination name no takeoftime date price"
    );
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

router.get("/viewcategoryclass", async (req, res, next) => {
  try {
    const categoryviewclass = await AIRLINESCLASS.find().select("name");
    res.status(200).json({
      status: "Data Successfully Viewed",
      message: "Success",
      data: categoryviewclass,
    });
  } catch (error) {
    res.status(404).json({
      status: "No Data Found",
      message: error.message,
    });
  }
});

router.get("/viewcategory", async (req, res, next) => {
  try {
    const categoryview = await AIRLINE.find().select("name");
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
