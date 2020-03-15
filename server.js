const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();
// serve static content for app from public directory
app.use(express.static("public"));

//parse app body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/burgersController");

//let server access routes
app.use(routes);
//start the server
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
