"use strict";

var express = require("express");

var morgan = require("morgan");

var path = require("path"); //Initialization


var app = express(); //settings

app.set("port", process.env.PORT || 4000); //Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); //Starting the server

app.listen(app.get("port"), function () {
  console.log("server on port", app.get("port"));
});