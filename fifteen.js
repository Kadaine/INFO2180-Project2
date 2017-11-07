
var game_tiles; 
var slot_X = 300; 
var slot_Y = 300; 
var piece

"use strict";
window.onload = function()
{
  game_tiles = $("#puzzlearea")[0].children;
  $("#shufflebutton")[0].onclick = shuffleTiles


  randomImage();
  

  $("#controls").after("<form id ='setup'></form>")
  $("#setup").append("<p id = 'header'>SELCECT AN IMAGE</p>");
  $("#setup").append("<input type = 'radio' name = 'Back' value= 1>Chelsea</input>");
  $("#setup").append("<input type = 'radio' name= 'Back' value= 2>Buttercup</input>");
  $("#setup").append("<input type = 'radio' name= 'Back' value= 3>Micky Mouse</input>");
  $("#setup").append("<input type = 'radio' name= 'Back' value= 4>Tom & Jerry</input>");
  $("#header")[0].style.textAlign = "center";


  var formEle = $("#setup")[0].elements
  for (var i = 0; i < formEle.length; i++)
    {
      formEle[i].addEventListener("click",function(){
      changeBackground(this.value);
      shuffleTiles();
  });
}

  for(i = 0; i < game_tiles.length; i++)
    {
      game_tiles[i].className = "puzzlepiece";


      game_tiles[i].style.left = (i % 4 * 100) + "px";
      game_tiles[i].style.top = (parseInt(i / 4) * 100) + "px";


      game_tiles[i].style.backgroundPosition = "-" + game_tiles[i].style.left + " " + "-" + game_tiles[i].style.top;


      game_tiles[i].onmouseover = canSquareMove;


      game_tiles[i].onmouseout = RemoveMovablePiece;


      game_tiles[i].onclick = moveTile;
    }
 }


  function canSquareMove()
  {
    yValue = parseInt(this.style.top); xValue = parseInt(this.style.left);
    if (yValue == slot_Y && xValue == (slot_X-100) || yValue == slot_Y && xValue == (slot_X+100)
    || yValue == (slot_Y-100) && xValue == slot_X ||yValue == (slot_Y+100) && xValue == slot_X)
    {
      (this).classList.add("movablepiece");
    }
  }

  function RemoveMovablePiece()
    {
      (this).classList.remove("movablepiece")
    }


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

  function getStyle(top, left)
  {
    for(var i =0; i < game_tiles.length; i++)
    {
      if(game_tiles[i].style.top==top && game_tiles[i].style.left==left)
      {
        piece = game_tiles[i];
        return piece;
      }
    }
  }

  function shuffleTiles()
  {
    for(var i = 0; i < 200; i++)
    {
      var RanNummber = Math.floor (Math.random () * 4);
      var yValue ;
      var xValue;
      if (RanNummber == 0)
      { 
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

 function changeBackground(value)
 {
   for (var i = 0; i < game_tiles.length; i++)
     {
       game_tiles[i].style.backgroundImage =`url('background${value}.jpg')`;
      }
}
function randomImage()
  {
    var pictures = ["background1.jpg","background2.jpg","background3.jpg","background4.jpg"];
    var current = game_tiles[0].style.backgroundImage.slice(5, -2);
    var RanNum = Math.floor(Math.random() * pictures.length);

   while(current == pictures[RanNum])
    {
       RanNum = Math.floor(Math.random() * pictures.length);
    }
    for (var i = 0; i < game_tiles.length; i++)
    {
      game_tiles[i].style.backgroundImage = "url('" + pictures[RanNum] +"')";
    }
  }