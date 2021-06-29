const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
   const query = req.body.cityName;
   const unit = "metric";
   const apiKey = "8d4222141ba7b559da0b4c4097fe158b";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
   
   https.get(url, function(response){
      response.on("data", function(data){
         const weatherData = JSON.parse(data);
         const weatherDesc = weatherData.weather[0].description;
         const temp = weatherData.main.temp;
         const icon = weatherData.weather[0].icon;
         const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
         res.write("<p>Weather is currently " + weatherDesc + "</p>");
         res.write("<h2>The Temperature in " + query + " is " + temp + " degree celcius.</h2>");
         res.write("<img src=" + imageURL + ">");
      });
   });
});

app.listen(3000, function(){
   console.log("Server Started on Port 3000");
});
