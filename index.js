// Import the express javascript library
var express = require('express');


const manual = require('./monster-manual');


const scores = require('./scores');


//decapitalizes given string
const fixString = function(string){
  let newString = string.toLowerCase();
  return newString;
};


//capitalizes given string
const fixName = function(string){
  let newName = string.toLowerCase();
  newName = newName.charAt(0).toUpperCase() +
    newName.substr(1)
  return newName;
}


//checks if given property is equal to value
const propEquals = function(obj, prop, val){
  if (obj[prop] !== undefined && obj[prop] + '' === val + '') {
    return true;
  }
}


//checks if given property is greater than value
const propGreater = function(obj, prop, val){
  if (obj[prop] !== undefined && obj[prop] + '' > val + '') {
    return true;
  }
}


//checks if given property is lower than value
const propLower = function(obj, prop, val){
  if (obj[prop] !== undefined && obj[prop] + '' < val + '') {
    return true;
  }
}


//checks if given property is between val1 and val2
const propBetween = function(obj, prop, val1, val2){
  if (obj[prop] !== undefined && val2 > obj[prop] && obj[prop] > val1 ) {
    return true;
  }
}


//checks if given property includes value
const propIncludes = function(obj, prop, val){
  if (obj[prop] !== undefined && obj[prop].indexOf(val) > 0) {
    return true;
  }
}



// Instantiate a server
var app = express();


// Set the port number to be compatible with Cloud 9
const PORT = 8080;


//Home
app.get('/', function (req, res) {
  res.json('Hello world -- My server is working!!!');
  console.log((new Date()).toString()+' Message served to the client');
});


//Test
app.get('/test', function(req, res) {
  let data = manual;
  res.json(data);
});


//Name
app.get('/name/:name', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'name', fixName(req.params.name));
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
});


//cr
app.get('/cr/:rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    item.challenge_rating = eval(item.challenge_rating);
    return propEquals(item, 'challenge_rating', req.params.rating);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//cr greater than
app.get('/cr/compare/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    item.challenge_rating = eval(item.challenge_rating);
    return propGreater(item, 'challenge_rating', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//cr less than
app.get('/cr/compare/less_than/:high_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    item.challenge_rating = eval(item.challenge_rating);
    return propLower(item, 'challenge_rating', req.params.high_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//cr range
app.get('/cr/compare/range/:low_rating/to/:high_rating', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      item.challenge_rating = eval(item.challenge_rating);
      return propBetween(item, 'challenge_rating', req.params.low_rating, req.params.high_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//ac
app.get('/ac/:rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'armor_class', req.params.rating);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//ac greater than
app.get('/ac/compare/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'armor_class', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//ac less than
app.get('/ac/compare/less_than/:high_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'armor_class', req.params.high_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


// Set up the server to 'listen' to requests on port 8080
// Requests to virtual machines running on Cloud 9 will use
// port 8080 by default.  You can force a URL request to a
// specific port by adding :nnnn to the end of the URL
app.listen(PORT, function () {
  // This function executes when a request is heard from the client
  console.log('Example app listening on port ' + PORT + '!');
});
