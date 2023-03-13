const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
//use express.json to get data into json format
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());

const TodoItemsRoute = require("./routes/todoitems");

// Let's connect to mongodb ..
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemsRoute);

// Add Port and connect to sever

app.listen(PORT, () => console.log("Sever connected"));
