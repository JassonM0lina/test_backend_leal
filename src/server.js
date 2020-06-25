const express = require("express");
const morgan = require("morgan");
const path = require("path");

//Initialization
const app = express();


//settings
app.set("port", process.env.PORT || 4000);


//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Starting the server
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"));
  });