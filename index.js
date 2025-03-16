
var express = require('express');
var app = express();

// CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Counter variable
let counter = 0;

// Counter query route
app.get('/cpt/query', function(req, res) {
  res.json({ value: counter });
});

// Counter increment route
app.get('/cpt/inc', function(req, res) {
  if (req.query.v) {
    const value = parseInt(req.query.v);
    if (!isNaN(value)) {
      counter += value;
      res.json({ code: 0 });
    } else {
      res.json({ code: -1 });
    }
  } else {
    counter += 1;
    res.json({ code: 0 });
  }
});

app.get('/test/*', function(req, res) {
  let input = req.url.substring(6);
  let ex_return = { msg: param };
  if (input === "json") {
    ex_return = { a: 1, b: 2 };
  } else if (input === "hello") {
    ex_return = ["Hello", "World"];
  } else if (input === "42") {
    ex_return = 42;
  }
  res.json(ex_return);
});

// Messages storage
var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

// Get message by index
app.get('/msg/get/:id', function(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= allMsgs.length) {
    res.json({ code: 0 });
  } else {
    res.json({ code: 1, msg: allMsgs[id] });
  }
});

// Get all messages
app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs);
});

// Get number of messages
app.get('/msg/nber', function(req, res) {
  res.json(allMsgs.length);
});

// Post new message
app.get('/msg/post/*', function(req, res) {
  const message = unescape(req.url.split('/msg/post/')[1]);
  allMsgs.push(message);
  res.json({ code: 1, msgNumber: allMsgs.length - 1 });
});

// Delete message
app.get('/msg/del/:id', function(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= allMsgs.length) {
    res.json({ code: 0 });
  } else {
    allMsgs.splice(id, 1);
    res.json({ code: 1 });
  }
});

app.get("/", function(req, res) {
  res.send("Hello");
});

app.listen(8080);
console.log("App listening on port 8080...");
