// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/* ===== Timestamp endpoint =====
   This route handles:
   - /api          -> current time
   - /api/:date    -> provided date (either numeric timestamp or ISO string)
*/
app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;
  let date;

  // 1) No parameter: return current time
  if (!dateString) {
    date = new Date();
  } else {
    // 2) If the parameter is digits only, treat as milliseconds timestamp
    if (/^\d+$/.test(dateString)) {
      // parseInt is safe here; Number(dateString) also works
      date = new Date(parseInt(dateString));
    } else {
      // 3) Otherwise, attempt to parse as date string (e.g., "2015-12-25")
      date = new Date(dateString);
    }
  }

  // 4) If invalid, return error object expected by FCC
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5) Valid date -> return unix (ms) and utc string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
