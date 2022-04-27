const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const routes = require("./settings/routes");
routes(app);

app.listen(port, () => {
  console.log("Port", port, "vot takoy");
});
