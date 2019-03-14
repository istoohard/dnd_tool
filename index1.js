// Import the express javascript library
var express = require('express');

// Transform the data object elements into an
// HTML table
const formatToHTML = function(dataArr) {
  // If dataArr is undefined or null, make an empty array
  if (!dataArr) {
    dataArr = [];
  }
  // Use the Array.map function to convert each record 
  // into an HTML table element.
  dataArr = dataArr.map(item => {
    // Create the HTML here
    let html = '<tr>'
    html += (item.year) ? '<td>'+item.year+'</td>' : '';
    html += (item.name) ? '<td>'+item.name+'</td>' : '';
    html += (item.sex) ? '<td>'+item.sex+'</td>' : '';
    html += (item.count) ? '<td>'+item.count+'</td>' : '';
    html += '</tr>';
    return html
  })
  // Now join all the elements together inside the 
  // <table><tbody> elements.
  return '<table><tbody>'+
    dataArr.join('')+'</tbody></table>';
}




const manual = require('./monster-manual');
const scores = require('./scores');


<html>
<body>

<h1>My First Web Page</h1>
<p>My First Paragraph</p>

<p id="demo"></p>

<script>
  const scores = require('./scores');
document.getElementById("demo").innerHTML = scores['12'];
</script>

</body>
</html>
const mod = function(string){
  for(var i = 1; i==30; i++){
    if(string ===scores.modifer){
      let modifier = scores.modifer[string];
      return modifier;
      
    }
    
  }
  
  
}
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


// Instantiate a server
var app = express();

// Set the port number to be compatible with Cloud 9
const PORT = 8080;



app.get('/', function (req, res) {
  res.json('Hello world -- My server is working!!!');
  console.log((new Date()).toString()+' Message served to the client');
});


//Test
app.get('/modtest', function(req, res) {
  
  res.json(scores["1"]);
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


//CR
app.get('/CR/:rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    
    return propEquals(item, 'challenge_rating', req.params.rating);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//CR greater than
app.get('/CR/compare/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return (item.challenge_rating !== undefined) && eval(item.challenge_rating) > req.params.low_rating
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//CR less than
app.get('/CR/compare/less_than/:high_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return (item.challenge_rating !== undefined) && eval(item.challenge_rating) < req.params.high_rating
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//CR range
app.get('/CR/compare/range/:low_rating/to/:high_rating', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return (item.challenge_rating !== undefined) && eval(item.challenge_rating) > req.params.low_rating && eval(item.challenge_rating) < req.params.high_rating
    });
})


app.get('/scores', function(req, res) {
  
  res.json(yes);
});





// Set up the server to 'listen' to requests on port 8080
// Requests to virtual machines running on Cloud 9 will use
// port 8080 by default.  You can force a URL request to a
// specific port by adding :nnnn to the end of the URL
app.listen(PORT, function () {
  // This function executes when a request is heard from the client
  console.log('Example app listening on port ' + PORT + '!');
});
