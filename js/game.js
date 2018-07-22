/* jshint esversion: 6 */

/*


BIG RESOURCES
by ajgeiss0702

I have probably changed the name because I just thought of something random to name it.


*/

var idone = false;

const can = $('#main')[0];
var w = window.innerWidth;
var h = window.innerHeight;
const c = can.getContext("2d");

setTimeout(function(){
  if(!idone) {
    if(typeof iv !== 'undefined') {
      clearInterval(iv);
    }
    if(typeof iv2 !== 'undefined') {
      clearInterval(iv2);
    }
    if(typeof iv3 !== 'undefined') {
      clearInterval(iv3);
    }
    if(typeof ivv !== 'undefined') {
      clearInterval(ivv);
    }
    main();
  }
}, 5000);


//INTRO thing
var drawimg = true;
can.width = w;
can.height = h;
var i = 0;
var i2 = 0;
var iv = setInterval(function() {
  changeColor(settings.bgc);
  c.strokeStyle = "black";
  if(bgc == "black" || bgc == "rgb(54, 57, 53)") {
    c.strokeStyle ='lightgrey';
  }

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
        try {
          c.fillStyle = settings.bgc || "white";
        } catch (e) {}
        c.fillRect((((w)-(img.width))/2)-10, ((h-img.height)/2)-10, img.width+20, Math.sqrt(ii)+20);
        c.drawImage(img, ((w)-(img.width))/2, (h-img.height)/2, img.width, i3);
      }
      i3++;
      if(i3 > img.height) {
        clearInterval(iv2);
        var i4 = h;
        var i5 = 0;
        var iv3 = setInterval(function() {
          try {
            c.strokeStyle = settings.bgc || "white";
          } catch (e) {}

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
              if(bgc == "black" || bgc == "rgb(54, 57, 53)") {
                c.fillStyle='lightgrey';
              }
              c.fillText("games", ((w)-(tw.width))/2, ((h/2)+90));
            }
            setTimeout(function() {
              var iii = 0;
              var ivv = setInterval(function() {
                iii+= 0.05;
                c.globalAlpha = iii;
                try {
                  c.fillStyle = settings.bgc || "white";
                } catch (e) {}
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

var ostuff = {
  prices: {
    mines: {
      stone: 10
    },
    autominers: {
      gold: 15,
      stone: 50
    },
    oilrigs: {
      gold: 50
    }
  }
};
var stuff = {
  prices: {
    mines: {
      stone: 10
    },
    autominers: {
      gold: 15,
      stone: 50
    },
    oilrigs: {
      gold: 50
    }
  }
};
// buttons
var buttons = [
  {
    x: 10,
    y: 2,
    height: 25, // NOTE TO FUTURE SELF: text will expand to fit height and box will become wider to fix text (may be invalid now, remaking buy menu in html)
    text: "Buy mine ("+stuff.prices.mines.stone+" stone)",
    click: function() {
      buttons[0].text = "Buy mine ("+stuff.prices.mines.stone+" stone)";
      if(materials.stone >= stuff.prices.mines.stone) {
        new Mine();
        materials.stone -= stuff.prices.mines.stone;
      } else {
        alert("You do not have enough stone! You need " + ((materials.stone-stuff.prices.mines.stone)*-1) + " more stone to buy that!");
      }
    },
    update: function(){
      this.text = "Buy mine ("+stuff.prices.mines.stone+" stone)";
    }
  },
  {},
  {}
];

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function main() {
  if(!idone) {
    $('.hidden').removeClass('hidden');
    idone = true;
    setSaveInterval();
    getterCountChange();
    setTimeout(function(){
      getterCountChange();
      console.log("toggled!");
    }, 100);


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

      y = 0;
      while(y < Object.keys(getters).length) {
        if(y > 0) {
          //console.log(Object.keys(getters)[y-1]+" before: g" + stuff.prices[Object.keys(getters)[y-1]].gold + " s"+stuff.prices[Object.keys(getters)[y-1]].stone);
          if(getters[Object.keys(getters)[y]].length > 0) {
            if(typeof stuff.prices[Object.keys(getters)[y-1]].gold !== 'undefined') {
              stuff.prices[Object.keys(getters)[y-1]].gold = Math.floor(ostuff.prices[Object.keys(getters)[y-1]].gold*1.05*getters[Object.keys(getters)[y]].length);
            }
            if(typeof stuff.prices[Object.keys(getters)[y-1]].stone !== 'undefined') {
              stuff.prices[Object.keys(getters)[y-1]].stone = Math.floor(ostuff.prices[Object.keys(getters)[y-1]].stone*1.05*getters[Object.keys(getters)[y]].length);
            }
          }
          //console.log(Object.keys(getters)[y-1]+" after: g" + stuff.prices[Object.keys(getters)[y-1]].gold + " s"+stuff.prices[Object.keys(getters)[y-1]].stone);
        }
        y++;
      }

      i = 0;
      x = 0;
      while(i < Object.keys(getters).length) {
        x = 0;
        if(!settings.gettercount) {
          while(x < getters[Object.keys(getters)[i]].length) {
            getter = getters[Object.keys(getters)[i]][x];
            resp = getter.think();
            xoffset = getter.texture.width * (i*1.3) + 10;
            type = getter.type;
            if(type == "autominer") {
              xoffset = (getter.texture.width * (i*1.3)) + 60;
            }
            c.drawImage(getter.texture, xoffset, ((((h-(getter.texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+5));
            c.font = "15px Arial";
            c.fillStyle = "black";
            if(bgc == "black" || bgc == "rgb(54, 57, 53)") {
              c.fillStyle='lightgrey';
            }
            c.fillText(Math.round(getter.cd/fps)+1, xoffset-5, ((((h-(getter.texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+35)+12);
            if(resp == "stone") {
              c.drawImage($('#stone')[0], ((xoffset+getter.texture.width)-60), ((((h-(getter.texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+60));
              getter.returnedStone = 1;
            } else if(resp == "gold") {
              img = $('#gold')[0];
              c.drawImage(img, ((xoffset+getter.texture.width)-60), ((((h-(getter.texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+60));
              getter.returnedGold = 1;
            }
            if(getter.returnedStone !== false) {
              getter.returnedStone -= 0.1;
              c.globalAlpha = getter.returnedStone;
              movingx = (50-(getter.returnedStone*100)/2)*1.25;
              c.drawImage($('#stone')[0], ((xoffset+getter.texture.width)-60)+movingx, ((((h-(getter.texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+60)-movingx);
              c.globalAlpha = 1;
              if(getter.returnedStone <= 0.1) {
                getter.returnedStone = false;
              }
            }
            if(getter.returnedGold !== false) {
              getter.returnedGold -= 0.1;
              c.globalAlpha = getter.returnedGold;
              movingx = (50-(getter.returnedGold*100)/2)*1.25;
              c.drawImage($('#gold')[0], ((xoffset+getter.texture.width)-60)+movingx, ((((h-(getter.texture.height-45))/getters[Object.keys(getters)[i]].length)*x)+60)-movingx);
              c.globalAlpha = 1;
              if(getter.returnedGold <= 0.1) {
                getter.returnedGold = false;
              }
            }
            x++;
          }
        } else { try {
          xoffset = getters[Object.keys(getters)[i]][0].texture.width * (i*1.3) + 10;
          type = getters[Object.keys(getters)[i]][0].type;
          if(type == "autominer") {
            xoffset = (getters[Object.keys(getters)[i]][0].texture.width * (i*1.3)) + 60;
          }
          c.fillStyle = "black";
          if(bgc == "black" || bgc == "rgb(54, 57, 53)") {
            c.fillStyle='lightgrey';
          }
          c.drawImage(getters[Object.keys(getters)[i]][0].texture, xoffset, 10);
          c.fillText(getters[Object.keys(getters)[i]].length, (xoffset+(getters[Object.keys(getters)[i]][0].texture.width/2))-c.measureText(getters[Object.keys(getters)[i]].length).width, 20+(getters[Object.keys(getters)[i]][0].texture.height));
          while(x < getters[Object.keys(getters)[i]].length) {
            getter = getters[Object.keys(getters)[i]][x];
            resp = getter.think();
            x++;
          }
        } catch(e) {}
        }
        i++;
      }

      i = 0;
      while(i < buttons.length) {
        currentbutton = buttons[i];
        //c.font = (buttons[i].height)/1.5+"px Arial";
        buttons[i].width = c.measureText(buttons[i].text).width+17;
        //c.fillStyle = "lightgrey";
        //c.strokeStyle = "black";
        //c.fillRect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
        //c.fill();
        //c.rect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
        c.stroke();
        //c.fillStyle = "black";
        //c.font = (buttons[i].height)/1.5+"px Arial";
        //textx = (Number(buttons[i].x)+10);
        //texty = buttons[i].y+(buttons[i].height/1.4);
        //console.log("[" + i + "] x: " + textx + ", y: " + texty);
        //c.fillText(buttons[i].text, textx, texty);
        i++;
      }

      var adding = "<table class='materials'>";
      i = 0;
      while(i < Object.keys(materials).length) {
        //adding += "  " + capitalizeFirst(Object.keys(materials)[i])+": " + materials[Object.keys(materials)[i]];
        if(bgc == "black" || bgc == "rgb(54, 57, 53)") {
          ac = "class='whitetext'";
        } else {
          ac = "";
        }
        adding += "<tr><td align='right' "+ac+">" + addCommas(materials[Object.keys(materials)[i]]) + "</td><td align='center' "+ac+"><img src='img/"+Object.keys(materials)[i]+".png'></td><td style='min-width: 8vw; max-width; 8vw; width: 8vw;' "+ac+">"+mps[Object.keys(materials)[i]]+"/s</td></tr>";
        i++;
      }
      //c.fillText(adding, w-(c.measureText(adding).width+10), 40);
      $('#materials').html(adding+"</table>");

      if(typeof materials.gold !== 'undefined' & typeof buttons[1].text == "undefined") {
        buttons[1] = {
          x: 10+buttons[0].width+5,
          y: 2,
          height: 25, // NOTE TO FUTURE SELF: text will expand to fit height and box will become wider to fix text
          text: "Buy auto-mine ("+stuff.prices.autominers.gold+" gold & "+stuff.prices.autominers.stone+" stone)",
          click: function() {
            if(materials.gold >= stuff.prices.autominers.gold & materials.stone >= stuff.prices.autominers.stone) {
              materials.stone -= stuff.prices.autominers.stone;
              materials.gold -= stuff.prices.autominers.gold;
              new AutoMiner();
            } else {
              moregold = (materials.gold-stuff.prices.autominers.gold)*-1;
              if(moregold < 0) {
                moregold = 0;
              }
              morestone = (materials.stone-stuff.prices.autominers.stone)*-1;
              if(morestone < 0) {
                morestone = 0;
              }
              alert("You do not have enough resources! You need " + morestone + " more stone and " + moregold + " more gold to buy that!");
            }
          },
          update: function(){
            this.text = "Buy auto-mine ("+stuff.prices.autominers.gold+" gold & "+stuff.prices.autominers.stone+" stone)";
          }
        };
      }
      if(getters.autominers.length >= 5 & typeof buttons[2].text == "undefined" & typeof buttons[1].width !== "undefined" & typeof buttons[0] !== "undefined") {
        buttons[2] = {
          x: 10+buttons[0].width+5+buttons[1].width+5,
          y: 2,
          height: 25, // NOTE TO FUTURE SELF: text will expand to fit height and box will become wider to fix text
          text: "Buy oil rig ("+stuff.prices.oilrigs.gold+" gold)",
          click: function() {
            console.log("Attempting to buy oil rig!");
            if(materials.gold >= stuff.prices.oilrigs.gold) {
              materials.gold -= stuff.prices.oilrigs.gold;
              new OilRig();
            } else {
              moregold = (stuff.prices.oilrigs.gold-materials.gold);
              if(moregold < 0) {
                moregold = 0;
              }
              alert("You do not have enough resources! You need " + moregold + " more gold to buy that!");
            }
          },
          update: function(){
            this.text = "Buy oil rig ("+stuff.prices.oilrigs.gold+" gold)";
          }
        };
      }
      if(recalcbuttons) {
        buttons[1].x = buttons[0].width+15;
        buttons[2].x = 10+buttons[0].width+5+buttons[1].width+5;
      }
      i = 0;
      while(i < buttons.length) {
        buttons[i].update();
        i++;
      }
    }, 1000/fps);



    //button click
    can.addEventListener('click', function(evt) {
      var mpos = getMousePos(evt);
      i = 0;
      while(i < buttons.length) {
        if(isInside(mpos, buttons[i])) {
          console.log("Calling click for button with text '"+buttons[i].text+"'");
          buttons[i].click();
        }
        i++;
      }
    }, false);
  }
}

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
