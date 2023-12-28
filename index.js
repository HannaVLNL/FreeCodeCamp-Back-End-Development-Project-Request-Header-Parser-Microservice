// index.js
// where your node app starts

// init project
var express = require("express");
const moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  if(!isNaN(new Date(req.params.date))) {
    res.json({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString(),
    });  
  }
    else if(moment.unix(req.params.date).isValid()) {
      res.json({
        unix: parseInt(req.params.date),
        utc: moment.unix(parseInt(req.params.date)/1000).format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
      });
    }
      else if (req.params.date === undefined) {
        res.json({
          unix: moment.utc().valueOf(),
          utc: moment.utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
        });
        
      }
  else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
