/*

           SETTINGS

*/
var settingsShown;
function showSettings() {
  if(settingsShown) {
    $('.settingsbox')[0].className = 'settingsbox slideout';
    settingsShown = false;
    return settingsShown;
  } else {
    $('.settingsbox')[0].className = 'settingsbox';
    settingsShown = true;
    return settingsShown;
  }
}

var colors = [
  "white",
  "red",
  "blue",
  "darkblue",
  "purple",
  "lightgrey",
  "yellow",
  "orange",
  "black",
  "rgb(54, 57, 53)"
];
var i = 0;
var ah = "";
while(i < colors.length) {
  ah += '<a class="color" style="background-color: '+colors[i]+';" onclick="changeColor(\''+colors[i]+'\')"></a>';
  i++;
}
$('#colors').html(ah);

var bgc = localStorage.getItem('bgc');
if(bgc !== null) {
  changeColor(bgc);
}

function changeColor(color) {
  localStorage.setItem("bgc", color);
  $('body').css('background-color', color);
  bgc = color;
}

/*

           BUY MENU

*/
var buyshown;
function showBuy() {
  if(buyshown) {
    $('.buymenu')[0].className = 'buymenu slideoutside';
    buyshown = false;
    return buyshown;
  } else {
    $('.buymenu')[0].className = 'buymenu';
    buyshown = true;
    return buyshown;
  }
}

setInterval(buyButtons, 2000);

function buyButtons() {
  i = 0;
  ah = "";
  while(i < buttons.length) {
    if(typeof buttons[i].text !== 'undefined') {
      var savename = buttons[i].text.split("Buy ")[1].split(" (")[0].replace("-", "").replace(" ", "");
      if(savename == "automine") {
        savename += "rs";
      } else {
        savename += "s";
      }
      ah += '<a class="buybtn" onclick="buttons['+i+'].click()">'+buttons[i].text+' ('+(getters[savename].length)+')</a><br>';
    }
    i++;
  }
  $('#buyBtns').html(ah);
}





function resetAllStuff() {
  var c = confirm("Are you sure you want to reset?\nThis will erase ALL of your progress PERMANENTLY after pressing 'ok'\nThere is no going back after this.\n\n(your settings will be saved)");
  if(c == true) {
    localStorage.removeItem("gettersStore");
    localStorage.removeItem("materialsStore");
    location.href = '';
    localStorage.removeItem("gettersStore");
    localStorage.removeItem("materialsStore");
  }
}
