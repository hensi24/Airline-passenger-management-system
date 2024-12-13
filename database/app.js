var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var admin_loginRouter = require("./routes/admin_login");
var user_loginRouter = require("./routes/user_login");
var serviceRouter = require("./routes/service");
var contactRouter = require("./routes/contact");
var feedbackRouter = require("./routes/feedback");
var airlineRouter = require("./routes/airline");
var airlinerouteRouter = require("./routes/airlineroute");
var canteencategoryRouter = require("./routes/canteencategory");
var canteenRouter = require("./routes/canteen");
var galleryRouter = require("./routes/gallery");
var airlinesclassRouter = require("./routes/airlinesclass");
var bookingRouter = require("./routes/booking");

const mongoose = require("mongoose");
var cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://hensivaghasiya05:hensy%4024@hensi.zhcxko7.mongodb.net/Airport_management_system"
  )
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err.message);
  });

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin_login", admin_loginRouter);
app.use("/user_login", user_loginRouter);
app.use("/service", serviceRouter);
app.use("/contact", contactRouter);
app.use("/feedback", feedbackRouter);
app.use("/airline", airlineRouter);
app.use("/airlineroute", airlinerouteRouter);
app.use("/canteencategory", canteencategoryRouter);
app.use("/canteen", canteenRouter);
app.use("/gallery", galleryRouter);
app.use("/airlinesclass", airlinesclassRouter);
app.use("/booking", bookingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
