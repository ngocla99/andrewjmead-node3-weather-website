const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// Set handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nemo",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: data,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nemo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nemo",
    helpText: "This is awesome helper text.",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nemo",
    errorMessage: "Help articles not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nemo",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is listening on port" + port);
});
