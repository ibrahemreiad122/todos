const userRoutes = require("./src/routes/user.route");
const todoRoutes = require("./src/routes/todo.route");

const mongoose = require("mongoose"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  PORT = 3000;
app.use(
  cors({
    exposedHeaders: ["auth"]
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/todos", todoRoutes); // if we have not base route this midellware must be after user
app.use("/api/users", userRoutes);

mongoose.connect("mongodb://localhost/todos-service", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.connection.on("open", () => {
  console.log("connection sucess");
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "MongoError" && err.code === 11000) {
    console.error("MongoError");
    const key = Object.keys(err.keyValue)[0];
    const message = `this ${key} is already exists`;
    return res
      .status(400)
      .send({
        message
      })
      .end();
  }

  if (err instanceof mongoose.Error.ValidationError) {
    console.log("ValidationError", err);
    const messags = [];
    for (const property in err.errors) {
      messags.push(err.errors[property].message);
    }
    return res
      .status(400)
      .send({
        message: messags[0]
      })
      .end();
  }
  if (err instanceof Error) {
    if (err.message === "NOTFOUND")
      return res
        .status(404)
        .send({
          message: err.message
        })
        .end();
    return res
      .status(400)
      .send({
        message: err.message
      })
      .end();
  }
  return res.status(500).end();
});
app.listen(PORT, () => console.log("server work fine"));
