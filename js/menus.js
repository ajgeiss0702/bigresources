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

try {
  var bgc = localStorage.getItem('bgc');
} catch (e) {}
if(bgc !== null) {
  changeColor(bgc);
}

function changeColor(color) {
  try {
    localStorage.setItem("bgc", color);
  } catch (e) {}
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

var rgs = {
  "mines": "Gives you 1 stone every 5 seconds. Each stone, you have a 1/10 chance of getting gold",
  "autominers": "Gives you 1 stone every 2 seconds. Each stone, you have a 1/5 chance of getting gold",
  "oilrigs": "Gives you some oil every 5 seconds. You sell this oil to get 1 gold."
};

var lastbuybuttons = "";
function buyButtons() {
  i = 0;
  ah = "";
  while(i < buttons.length) {
    if(typeof buttons[i].text !== 'undefined') {
      var savename = getSaveName(buttons[i].text);
      ah += '<a class="buybtn" onclick="buttons['+i+'].click()" data-toggle="popover" data-trigger="hover" title="'+savename+'" data-content="'+rgs[savename]+'" data-placement="bottom" data-container="body">'+buttons[i].text+' ('+(getters[savename].length)+')</a><br>';
    }
    i++;
  }
  if(lastbuybuttons !== ah) {
    //console.log("change new buy buttons: " + lastbuybuttons !== ah);
    $('[data-toggle="popover"]').popover("hide");
    $('#buyBtns').html(ah);
    $('[data-toggle="popover"]').popover({
      container: 'body'
    });
    lastbuybuttons = ah;
  }
}





function resetAllStuff() {
  var c = confirm("Are you sure you want to reset?\nThis will erase ALL of your progress PERMANENTLY after pressing 'ok'\nThere is no going back after this.\n\n(your settings will be saved)");
  if(c == true) {
    try {
      localStorage.removeItem("gettersStore");
      localStorage.removeItem("materialsStore");
      location.href = '';
      localStorage.removeItem("gettersStore");
      localStorage.removeItem("materialsStore");
    } catch (e) {}
    location.href = '';
  }
}
