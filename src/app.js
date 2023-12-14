const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const { error } = require("console");
const dotenv =  require("dotenv")

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;



// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Hub",
    name: "Anuj Chopra",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Anuj Chopra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "You can contact me on my email reclusebloke@gmail.com",
    title: "Help",
    name: "Anuj Chopra",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }


  try{
  const response = await forecast(req.query.address);


    const finalData = await response.json();

    if(finalData.success==false){
        throw new error()

    }
    res.json(finalData);

}
catch(err){
  
    res.status(404).json({errorMessage:"Enter valid city or place name"})

}

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anuj Chopra",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anuj Chopra",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
