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
