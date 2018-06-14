/* jshint esversion: 6 */

/*


BIG RESOURCES
by ajgeiss0702

I have probably changed the name because I just thought of something random to name it.


*/

const can = $('#main')[0];
var w = window.innerWidth;
var h = window.innerHeight;
const c = can.getContext("2d");

//INTRO thing
var drawimg = true;
can.width = w;
can.height = h;
var i = 0;
var i2 = 0;
var iv = setInterval(function() {
  c.strokeStyle = "black";

  c.moveTo(0, 0);
  c.lineTo(w/2, i);
  c.stroke();
  c.lineTo(w, 0);
  c.stroke();
  i2 = i2 + 0.01;
  i = i + 4;
  if(i >= h) {
    clearInterval(iv);
    var img = $('#ajlogo')[0];
    var i3 = 10;
    var iv2 = setInterval(function() {
      if(drawimg) {
        ii = i3*i3;
        //console.log(i3+", "+ii+", "+Math.sqrt(ii));
        c.fillStyle = "lightgrey";
        c.fillRect((((w)-(img.width))/2)-10, ((h-img.height)/2)-10, img.width+20, Math.sqrt(ii)+20);
        c.drawImage(img, ((w)-(img.width))/2, (h-img.height)/2, img.width, i3);
      }
      i3++;
      if(i3 > img.height) {
        clearInterval(iv2);
        var i4 = h;
        var i5 = 0;
        var iv3 = setInterval(function() {
          c.strokeStyle = "white";

          c.moveTo(0, 0);
          c.lineTo(w/2, i);
          c.stroke();
          c.lineTo(w, 0);
          c.stroke();
          i4 = i4 - 2;
          if(i4 <= h/1.02) {
            clearInterval(iv3);
            if(drawimg) {
              c.fillStyle="black";
              c.font="40px Arial";
              tw = c.measureText("games");
              c.fillText("games", ((w)-(tw.width))/2, ((h/2)+90));
            }
            setTimeout(function() {
              var iii = 0;
              var ivv = setInterval(function() {
                iii+= 0.05;
                c.globalAlpha = iii;
                c.fillStyle = "white";
                c.fillRect(0, 0, w, h);
                if(iii >= 0.7) {
                  clearInterval(ivv);
                  c.globalAlpha = 1;
                  c.clearRect(0, 0, w, h);
                  c.beginPath();
                  clearInterval(iv);
                  clearInterval(iv2);
                  clearInterval(iv3);
                  clearInterval(ivv);
                  main();
                }
              }, 50);
            }, 2000);
          }
          if(drawimg) {
            c.drawImage(img, ((w)-(img.width))/2, (h-img.height)/2);
          }
        }, 120);
      }
    }, 0);
  }
}, 1);

var stuff = {mineprice: 10};
// buttons
var buttons = [
  {
    x: 10,
    y: 2,
    height: 25, // NOTE TO FUTURE SELF: text will expand to fit height and box will become wider to fix text
    text: "Buy mine ("+stuff.mineprice+" stone)",
    click: function() {
      buttons[0].text = "Buy mine ("+stuff.mineprice+" stone)";
      if(materials.stone >= stuff.mineprice) {
        new Mine();
        materials.stone -= stuff.mineprice;
      } else {
        alert("You do not have enough stone! You need " + ((materials.stone-stuff.mineprice)*-1) + " more stone to buy that!");
      }
    }
  },
  {}
];


function main() {
  setSaveInterval();

  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //make player's first mine
  new Mine();

  var recalcbuttons = false;

 /* * * * * * * * * * * *
  *                     *
  * MAIN THINK INTERVAL *
  *                     *
  * * * * * * * * * * * */
  var maininval = setInterval(function() {
    c.clearRect(0, 0, w, h);
    c.beginPath();

    i = 0;
    x = 0;
    while(i < Object.keys(getters).length) {
      x = 0;
      while(x < getters[Object.keys(getters)[i]].length) {
        resp = getters[Object.keys(getters)[i]][x].think();
        xoffset = 10;
        if(Object.keys(getters)[i] == "autominers") {
          xoffset = buttons[0].width + 30;
        }
        c.drawImage(getters[Object.keys(getters)[i]][x].texture, xoffset, ((((h-(getters[Object.keys(getters)[i]][x].texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+35));
        c.font = "15px Arial";
        c.fillStyle = "black";
        c.fillText(Math.round(getters[Object.keys(getters)[i]][x].cd/4)+1, xoffset, ((((h-(getters[Object.keys(getters)[i]][x].texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+35)+12);
        if(resp == "stone") {
          c.drawImage($('#stone')[0], xoffset+getters[Object.keys(getters)[i]][x].texture.width, ((((h-(getters[Object.keys(getters)[i]][x].texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+35));
        } else if(resp == "gold") {
          img = $('#gold')[0];
          c.drawImage(img, xoffset-img.width, ((((h-(getters[Object.keys(getters)[i]][x].texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+35));
        }
        x++;
      }
      i++;
    }

    i = 0;
    while(i < buttons.length) {
      currentbutton = buttons[i];
      c.font = (buttons[i].height)/1.5+"px Arial";
      buttons[i].width = c.measureText(buttons[i].text).width+17;
      c.fillStyle = "lightgrey";
      c.strokeStyle = "black";
      c.fillRect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
      //c.fill();
      c.rect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
      c.stroke();
      c.fillStyle = "black";
      c.font = (buttons[i].height)/1.5+"px Arial";
      textx = (Number(buttons[i].x)+10);
      texty = buttons[i].y+(buttons[i].height/1.4);
      //console.log("[" + i + "] x: " + textx + ", y: " + texty);
      c.fillText(buttons[i].text, textx, texty);
      i++;
    }

    var adding = "";
    i = 0;
    while(i < Object.keys(materials).length) {
      c.fillStyle = "black";
      c.strokeStyle = "black";
      c.font="30px Arial";
      adding += "  " + capitalizeFirst(Object.keys(materials)[i])+": " + materials[Object.keys(materials)[i]];
      c.stroke();
      i++;
    }
    c.fillText(adding, w-(c.measureText(adding).width+10), 40);

    if(typeof materials.gold !== 'undefined' & typeof buttons[1].text == "undefined") {
      buttons[1] = {
        x: buttons[0].width+15,
        y: 2,
        height: 25, // NOTE TO FUTURE SELF: text will expand to fit height and box will become wider to fix text
        text: "Buy auto-mine (15 gold & 50 stone)",
        click: function() {
          if(materials.gold >= 15 & materials.stone >= 50) {
            materials.stone -= 50;
            materials.gold -= 15;
            new AutoMiner();
          } else {
            moregold = (materials.gold-15)*-1;
            if(moregold < 0) {
              moregold = 0;
            }
            morestone = (materials.stone-50)*-1;
            if(morestone < 0) {
              morestone = 0;
            }
            alert("You do not have enough resources! You need " + morestone + " more stone and " + moregold + " more gold to buy that!");
          }
        }
      };
    }
    if(recalcbuttons) {
      buttons[1].x = buttons[0].width+15;
    }
    if(getters.autominers.length >= 2 & stuff.mineprice < 37) {
      stuff.mineprice = 37;
      buttons[0].text = "Buy mine ("+stuff.mineprice+" stone)";
    } else if(getters.autominers.length >= 10 & stuff.mineprice < 50) {
      stuff.mineprice = 50;
      buttons[0].text = "Buy mine ("+stuff.mineprice+" stone)";
    } else if(getters.autominers.length >= 25 & stuff.mineprice < 100) {
      stuff.mineprice = 100;
      buttons[0].text = "Buy mine ("+stuff.mineprice+" stone)";
      recalcbuttons = true;
    }
  }, 250);



  // button click
  function getMousePos(event) {
      var rect = can.getBoundingClientRect();
      return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
  }
  function isInside(pos, rect){
      return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
  }
  can.addEventListener('click', function(evt) {
    var mpos = getMousePos(evt);
    i = 0;
    while(i < buttons.length) {
      console.log(isInside(mpos, buttons[i]));
      if(isInside(mpos, buttons[i])) {
        console.log("calling click!");
        buttons[i].click();
      }
      i++;
    }
  }, false);

}
