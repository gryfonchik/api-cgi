import express from "express";
import bodyParser from "body-parser";
import user_routes from "./routes/user.route.js";
import task_routes from "./routes/task.route.js";

const app = express();
const port = process.env.PORT || 3500;

// Настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

user_routes(app);
task_routes(app);

app.listen(port, () => {
  console.log("Port", port, "vot takoy");
});