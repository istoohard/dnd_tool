const scores = require('./scores');

const propEquals = function(obj, prop, val) {
  if (obj[prop] !== undefined && obj[prop] + '' === val + '') {
    return true;
  }
};

const isDefined = function(obj) {
  if (obj === undefined) {
    return false;
  }
  else {
    return true;
  }
};

exports.str = function(save) {
  if (save === undefined) {
    save = ' ';
    return save;
  }
  else {
    return 'Strength+' + save + '\xa0\xa0';
  }
};

exports.dex = function(save) {
  if (save === undefined) {
    save = ' ';
    return save;
  }
  else {
    return 'Dexterity+' + save + '\xa0\xa0';
  }
};

exports.con = function(save) {
  if (save === undefined) {
    save = ' ';
    return save;
  }
  else {
    return 'Constitution+' + save + '\xa0\xa0';
  }
};

exports.int = function(save) {
  if (save === undefined) {
    save = ' ';
    return save;
  }
  else {
    return 'Intelligence+' + save + '\xa0\xa0';
  }
};

exports.wis = function(save) {
  if (save === undefined) {
    save = ' ';
    return save;
  }
  else {
    return 'Wisdom+' + save + '\xa0\xa0';
  }
};

exports.cha = function(save) {
  if (save === undefined) {
    save = ' ';
    return save;
  }
  else {
    return 'Charisma+' + save + '\xa0\xa0';
  }
};

exports.formatSpecial = function(obj) {
  var name = [];
  if (isDefined(obj) === true) {
    for (var i = 0; i < obj.length; i++) {
      name[i] = (obj[i].name) + ': ';
      name[i] = name[i].concat(obj[i].desc);
      name[i] = name[i].concat('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
    }
  }
  return name;
};

exports.statMod = function(stat) {
  let data = scores;
  data = data.filter((item) => {
    return propEquals(item, "stat", stat);
  });
  let mod = data[0].modifier;
  return stat + '(' + mod + ')';
};
