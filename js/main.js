/* jshint esversion: 6 */
/*


BIG RESOURCES
by ajgeiss0702

I have probably changed the name because I just thought of something random to name it.


*/

var fps = 15;

var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if(!isChrome) {
  alert("This game was developed on chrome, and runs smoothest on there.\n\nMost things should still work on other browsers, but its not garenteed.");
}

function getSaveName(bt) {
  var savename = bt.split("Buy ")[1].split(" (")[0].replace("-", "").replace(" ", "");
  if(savename == "automine") {
    savename += "rs";
  } else {
    savename += "s";
  }
  return savename;
}




class Mine {
  constructor(precd) {
    //cd = cooldown
    this.cd = precd || 0;
    this.texture = $('#mine')[0];
    this.type = "mine";
    getters.mines.push(this);
  }

  think() {
    if(typeof this.texture == 'undefined') {
      this.texture = $('#mine')[0];
    }
    if(this.cd <= 0) {
      var num = Math.round(Math.random()*5);
      if(num == 1 & materials.stone >= 20) {
        if(materials.gold) {
          materials.gold += 1;
        } else {
          materials.gold = 1;
        }
        return "gold";
      }

      materials.stone += 1;
      this.cd = 75;
      this.cds = this.cd/fps;
      return "stone";

    } else {

      this.cd -= 1;
      return false;

    }
  }
}

class AutoMiner {
  constructor(precd) {
    this.cd = precd || 0;
    this.texture = $('#autominer')[0];
    this.type = "autominer";
    getters.autominers.push(this);
  }

  think() {
    if(typeof this.texture == 'undefined') {
      this.texture = $('#autominer')[0];
    }

    if(this.cd <= 0) {
      var num = Math.round(Math.random()*5);
      if(num == 1 & materials.stone >= 20) {
        if(materials.gold) {
          materials.gold += 1;
        } else {
          materials.gold = 1;
        }
        return "gold";
      }

      materials.stone += 1;
      this.cd = 30;
      this.cds = this.cd/fps;
      return "stone";

    } else {

      this.cd -= 1;
      return false;

    }
  }
}

class OilRig {
  constructor(precd) {
    this.cd = precd || 0;
    this.texture = $('#oilrig')[0];
    this.type = "oilrig";
    getters.oilrigs.push(this);
  }

  think() {
    if(typeof this.texture == 'undefined') {
      this.texture = $('#oilrig')[0];
    }
    if(this.cd <= 0) {

      materials.gold += 1;
      this.cd = 75;
      this.cds = this.cd/fps;
      return "gold";

    } else {

      this.cd -= 1;
      return false;

    }
  }
}


var getting = false;
function httpGet(theUrl, callback) {
  if(!getting) {
    getting = true;
    var cxmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      cxmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      cxmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    cxmlhttp.onreadystatechange = function() {
      if (cxmlhttp.readyState === 4 && cxmlhttp.status === 200 && cxmlhttp.responseText !== 24) {
        getting = false;
        callback(cxmlhttp.responseText);
      } else if(cxmlhttp.readyState !== 2 && cxmlhttp.readyState !== 1) {
        getting = false;
        if(cxmlhttp.readyState !== 4) {
          message = cxmlhttp.readyState +" readyState";
        } else if(cxmlhttp.status !== 200) {
          message = cxmlhttp.status+" status";
        } else if(cxmlhttp.responseText === 24) {
          message = "responseText";
        }
        callback('{"error": true, "message": "'+message+' check failed!"}');
        console.error("Error during httpGet");
      }
    };
    cxmlhttp.open("GET", theUrl, true );
    cxmlhttp.send();
  } else {
    console.warn("httpGet busy, delaying 500 ms");
    setTimeout(httpGet(theUrl, callback), 500);
  }
}
function loadGetters() {
  var gettercount;
  try {
    gettercount = JSON.parse(localStorage.getItem("gettersStore"));
  } catch (e) {}
  if(gettercount == null) {
    console.log("loadsave returned null! This must be your first time playing (on this computer)!");
    return false;
  }
  var i = 0;
  while(i < Object.keys(gettercount).length) {
    var x = 0;
    while(x < (gettercount[Object.keys(gettercount)[i]]).length) {
      gettername = Object.keys(gettercount)[i];
      gettercd = gettercount[Object.keys(gettercount)[i]][x];
      if(gettername == "mines" & x !== 0) {
        new Mine(gettercount[Object.keys(gettercount)[i]][x]);
      } else if(gettername == "autominers") {
        new AutoMiner(gettercd);
      } else if(gettername == "oilrigs") {
        new OilRig(gettercd);
      }
      x++;
    }
    i++;
  }
}

var getters = { mines: [], autominers: [], oilrigs: [] };
loadGetters();
var materials = {stone: 0};
try {
  materials = JSON.parse(localStorage.getItem("materialsStore")) || { stone: 0 };
} catch (e) {}

function setSaveInterval() {
  setInterval(function() {
    var gettercount = {mines: [], autominers: [], oilrigs: []};
    var i = 0;
    while(i < Object.keys(getters).length) {
      var x = 0;
      while(x < getters[Object.keys(getters)[i]].length) {
        gettercount[Object.keys(getters)[i]].push(getters[Object.keys(getters)[i]][x].cd);
        x++;
      }
      i++;
    }
    try {
      localStorage.setItem("gettersStore", JSON.stringify(gettercount));
      localStorage.setItem("materialsStore", JSON.stringify(materials));
    } catch (e) {}
  }, 2000);
}
