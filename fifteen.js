
var tiles; 
var slot_X = 300; 
var slot_Y = 300; 
var piece

"use strict";
window.onload = function()
{
  tiles = $("#puzzlearea")[0].children;
  $("#shufflebutton")[0].onclick = shufflePieces

  //Selects a random background when the game starts
  randomBackground();
  
  //Creates radio buttons that will change background picture when selected and appends it to the body of the html file
  $("#controls").after("<form id ='setup'></form>")
  $("#setup").append("<p id = 'header'>SELCECT OF FOUR OPTIONS</p>");
  $("#setup").append("<input type = 'radio' name = 'Back' value= 1>Chelsea</input>");
  $("#setup").append("<input type = 'radio' name= 'Back' value= 2>Buttercup</input>");
  $("#setup").append("<input type = 'radio' name= 'Back' value= 3>Micky Mouse</input>");
  $("#setup").append("<input type = 'radio' name= 'Back' value= 4>Tom & Jerry</input>");
  $("#header")[0].style.textAlign = "center";

  /*get the value of a radio button and passes it to the changeBackground function to select the background
  image associated with that radio button*/
  var formEle = $("#setup")[0].elements
  for (var i = 0; i < formEle.length; i++)
    {
      formEle[i].addEventListener("click",function(){
      changeBackground(this.value);
      shufflePieces();
  });
}

  for(i = 0; i < tiles.length; i++)
    {
      tiles[i].className = "puzzlepiece";

      //calculate the left style and top style pixel position of the div's to formulate the game
      tiles[i].style.left = (i % 4 * 100) + "px";
      tiles[i].style.top = (parseInt(i / 4) * 100) + "px";

      // Evaluates to "-XXX px -YYY px" to position the image on the squares using X and Y coordinates
      tiles[i].style.backgroundPosition = "-" + tiles[i].style.left + " " + "-" + tiles[i].style.top;

      /*When the mouse over event-handler is ran the isSquareMovable function check if the tile is movable
      and add the movablepiece class to that div tile*/
      tiles[i].onmouseover = isSquareMovable;

      /*When the mouse out event-handler is ran the RemoveMovablePiece function which remove the movablepiece
      class from the div tile*/
      tiles[i].onmouseout = RemoveMovablePiece;

      /*When a movable tile is clicked the moveTile function the ran the and the clicked tile is swaaped with the
       empty space tile*/
      tiles[i].onclick = moveTile;
    }
 }

  /*This function checks if a tile is valid to be swapped with the empty tile and if it is valid the "movablepiece" class
    is added to the div tile*/
  function isSquareMovable()
  {
    yValue = parseInt(this.style.top); xValue = parseInt(this.style.left);
    if (yValue == slot_Y && xValue == (slot_X-100) || yValue == slot_Y && xValue == (slot_X+100)
    || yValue == (slot_Y-100) && xValue == slot_X ||yValue == (slot_Y+100) && xValue == slot_X)
    {
      (this).classList.add("movablepiece");
    }
  }
  // This function removes the "movablepiece" class after the mouse leaves the tile which that class was applied to.
  function RemoveMovablePiece()
    {
      (this).classList.remove("movablepiece")
    }

//This function checks if a tile can be swapped with the empty tile and if it can then it swaps it
  function moveTile()
  {
    var yValue = parseInt(this.style.top);
    var xValue = parseInt(this.style.left);
    if (yValue == slot_Y && xValue == (slot_X-100) || yValue == slot_Y && xValue == (slot_X+100) ||
    yValue == (slot_Y-100) && xValue == slot_X || yValue == (slot_Y+100) && xValue == slot_X)
    {
      this.style.top = slot_Y + "px";
      this.style.left = slot_X + "px";
      slot_Y = yValue;
      slot_X = xValue;
    }
  }
//this function gets the tile given its top and left pixel position
  function getStyle(top, left)
  {
    for(var i =0; i < tiles.length; i++)
    {
      if(tiles[i].style.top==top && tiles[i].style.left==left)
      {
        piece = tiles[i];
        return piece;
      }
    }
  }

  function shufflePieces()
  {
    for(var i = 0; i < 200; i++)
    {
      var RanNummber = Math.floor (Math.random () * 4);
      var yValue ;
      var xValue;
      if (RanNummber == 0)
      { /* if RanNummber is zero, a left and top style is use as inputs in getsyle to find the tile that has that style position,
        when it is found that tile's style is swapped with the empty tile style, hence moving the tile to the empty sapce*/
        (getStyle((slot_Y-100)+"px", slot_X +"px"))|| getStyle((slot_Y+100)+"px", slot_X +"px");
        yValue = parseInt(piece.style.top);
        xValue = parseInt(piece.style.left);
        piece.style.top = slot_Y + "px";
        piece.style.left = slot_X  + "px";
        slot_Y = yValue;
        slot_X  = xValue;
      }
      else if (RanNummber == 1)
      {
        /* if RanNummber is one, a left and top style is use as inputs in getsyle to find the tile that has that style position,
          when it is found that tile's style is swapped with the empty tile style, hence moving the tile to the empty sapce*/
        (getStyle(slot_Y+"px", (slot_X-100)+"px")) || getStyle(slot_Y+"px", (slot_X+ 100)+"px");
        yValue = parseInt(piece.style.top);
        xValue = parseInt(piece.style.left);
        piece.style.top = slot_Y + "px";
        piece.style.left = slot_X + "px";
        slot_Y = yValue;
        slot_X  = xValue;
      }
      else if (RanNummber == 2)
      {
        /* if RanNummber is two, a left and top style is use as inputs in getsyle to find the tile that has that style position,
          when it is found that tile's style is swapped with the empty tile style, hence moving the tile to the empty sapce*/
        getStyle((slot_Y+100)+"px", slot_X +"px") || (getStyle((slot_Y-100)+"px", slot_X+"px"));
        yValue = parseInt(piece.style.top);
        xValue = parseInt(piece.style.left);
        piece.style.top =slot_Y+ "px";
        piece.style.left = slot_X  + "px";
        slot_Y = yValue;
        slot_X  = xValue;
      }
      else
      {
        /* Otherwsie, a left and top style is use as inputs in getsyle to find the tile that has that style position,
          when it is found that tile's style is swapped with the empty tile style, hence moving the tile to the empty sapce*/
        getStyle(slot_Y+"px", (slot_X + 100)+"px") || (getStyle(slot_Y+"px", (slot_X-100)+"px"));
        yValue = parseInt(piece.style.top);
        xValue = parseInt(piece.style.left);
        piece.style.top = slot_Y + "px";
        piece.style.left = slot_X + "px";
        slot_Y = yValue;
        slot_X  = xValue;
      }
    }
 }
/*This function changes the background image of the puzzle based on random selection
of the fourth images available*/

 function changeBackground(value)
 {
   for (var i = 0; i < tiles.length; i++)
     {
       tiles[i].style.backgroundImage =`url('background${value}.jpg')`;
      }
}
function randomBackground()
  {
    var pictures = ["Background1.jpg","Background2.jpg","Background3.jpg","Background4.jpg"];
    var current = tiles[0].style.backgroundImage.slice(5, -2);
    var RanNum = Math.floor(Math.random() * pictures.length);

   while(current == pictures[RanNum]) 
    {
       RanNum = Math.floor(Math.random() * pictures.length);
    }
    for (var i = 0; i < tiles.length; i++)
    {
      tiles[i].style.backgroundImage = "url('" + pictures[RanNum] +"')";
    }
  }