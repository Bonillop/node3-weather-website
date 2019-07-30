const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("../utils/forecast");
const geoCode = require("../utils/geocode");

const app = express();

// Definimos los paths para la configuracion de express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../src/templates/views");
const partialsPath = path.join(__dirname, "../src/templates/partials");

// Seteamos el engine de handlebars y la ubicacion para hacer el render
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Seteamos un directorio estatico para exponer publicamente
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pepe"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Help message",
    name: "Pepe"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Pepe"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        location: location,
        forecast: forecastData,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Pepe"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Pepe"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
