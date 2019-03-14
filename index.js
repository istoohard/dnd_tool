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
  if (obj[prop] !== undefined && obj[prop].indexOf(val) >= 0) {
    return true;
  }
}


//returns modifier for a stat
const statMod = function(stat){
  let data = scores;
  data = data.filter((item) => {
    return propEquals(item, "stat", stat)
  });
  let mod = data[0].modifier;
  return mod;
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
    return propIncludes(item, 'name', fixName(req.params.name));
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
app.get('/cr/greater_than/:low_rating', function(req, res) {
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
app.get('/cr/less_than/:high_rating', function(req, res) {
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
app.get('/cr/range/:low_rating/to/:high_rating', function(req, res) {
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
app.get('/ac/greater_than/:low_rating', function(req, res) {
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
app.get('/ac/less_than/:high_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'armor_class', req.params.high_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//ac range
app.get('/ac/range/:low_rating/to/:high_rating', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'armor_class', req.params.low_rating, req.params.high_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//hp
app.get('/hp/:rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'hit_points', req.params.rating);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//hp greater than
app.get('/hp/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'hit_points', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//hp less than
app.get('/hp/less_than/:high_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'hit_points', req.params.high_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//hp range
app.get('/hp/range/:low_rating/to/:high_rating', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'hit_points', req.params.low_rating, req.params.high_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//stat mod
app.get('/score/:scorey', function(req, res) {
  let data = scores;
  // data = data.filter((item, idx) => {
  //   console.log(idx);
  //   return propEquals(item, "stat", req.params.scorey)
  // });
  res.json(statMod(req.params.scorey));
  console.log((new Date()).toString()+' Message served to the client');
})


//strength
app.get('/stat/strength/:score', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'strength', req.params.score);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with str stat higher than given val
app.get('/stat/strength/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'strength', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with str stat lower than given val
app.get('/stat/strength/less_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'strength', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns with str stat between two given values
app.get('/stat/strength/range/:low_score/to/:high_score', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'strength', req.params.low_score, req.params.high_score);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//dexterity
app.get('/stat/dexterity/:score', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'dexterity', req.params.score);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with dex stat higher than given val
app.get('/stat/dexterity/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'dexterity', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with dex stat lower than given val
app.get('/stat/dexterity/less_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'dexterity', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns with dex stat between two given values
app.get('/stat/dexterity/range/:low_score/to/:high_score', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'dexterity', req.params.low_score, req.params.high_score);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//constitution
app.get('/stat/constitution/:score', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'constitution', req.params.score);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with con stat higher than given val
app.get('/stat/constitution/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'constitution', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with con stat lower than given val
app.get('/stat/constitution/less_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'constitution', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns with con stat between two given values
app.get('/stat/constitution/range/:low_score/to/:high_score', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'constitution', req.params.low_score, req.params.high_score);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//intelligence
app.get('/stat/intelligence/:score', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'intelligence', req.params.score);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with int stat higher than given val
app.get('/stat/intelligence/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'intelligence', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with int stat lower than given val
app.get('/stat/intelligence/less_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'intelligence', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns with int stat between two given values
app.get('/stat/intelligence/range/:low_score/to/:high_score', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'intelligence', req.params.low_score, req.params.high_score);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//wisdom
app.get('/stat/wisdom/:score', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'wisdom', req.params.score);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with wis stat higher than given val
app.get('/stat/wisdom/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'wisdom', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with wis stat lower than given val
app.get('/stat/wisdom/less_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'wisdom', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns with wis stat between two given values
app.get('/stat/wisdom/range/:low_score/to/:high_score', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'wisdom', req.params.low_score, req.params.high_score);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//charisma
app.get('/stat/charisma/:score', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propEquals(item, 'charisma', req.params.score);
  })
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with chr stat higher than given val
app.get('/stat/charisma/greater_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
 data = data.filter((item, idx) => {
    console.log(idx);
    return propGreater(item, 'charisma', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns monsters with chr stat lower than given val
app.get('/stat/charisma/less_than/:low_rating', function(req, res) {
  let data = manual;
  if (!data) data = null;
  data = data.filter((item, idx) => {
    console.log(idx);
    return propLower(item, 'charisma', req.params.low_rating);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//returns with chr stat between two given values
app.get('/stat/charisma/range/:low_score/to/:high_score', function(req, res) {
    let data = manual;
    if (!data) data = null;
    data = data.filter((item, idx) => {
      console.log(idx);
      return propBetween(item, 'charisma', req.params.low_score, req.params.high_score);
    });
  res.json(data);
  console.log((new Date()).toString()+' Message served to the client');
})


//beginning for html conversion
app.get('/ht/hi', function(req, res) {
 // Transform the data object elements into an
// HTML table
res.json('palksjdf;laksjdf');

})


// Set up the server to 'listen' to requests on port 8080
// Requests to virtual machines running on Cloud 9 will use
// port 8080 by default.  You can force a URL request to a
// specific port by adding :nnnn to the end of the URL
app.listen(PORT, function () {
  // This function executes when a request is heard from the client
  console.log('Example app listening on port ' + PORT + '!');
});
