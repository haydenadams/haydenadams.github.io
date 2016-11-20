var canvas;
var ctx;

var ZingTouch = require('zingtouch');

function init()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    var zt = new ZingTouch.Region(document.getElementById("myCanvas"));
    zt.bind(document.getElementById("myCanvas"), 'swipe', function(e){
      console.log('what');
    }, false);


    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);

    if( canvas.getContext )
    {
        setup();
        setInterval( draw , 33 );
    }
}

var x;
var y;
var dx;
var dy;
var mousePos = { x: 1, y: 1 };
var pos = { x: 1, y: 1 };

var pictures = [];
for (var i = 0; i < 20; i++) {
  pictures.push(new Image());
  pictures[pictures.length-1].src = '/img/scans-min/img' + (i+1) + '-min.jpg';
}

function setup() {
  x = canvas.width/2;
  y = canvas.height;
  dx = 2;
  dy = -2;
}

function draw(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawBall();

  // draw img
  for (var i = 0; i < 20; i++) {
    var ph = canvas.height / 20;
    var y = (Math.abs(pos.y)) % (20 * ph);
    if (ph*i < y && ph*(i+1) > y) {
      // ctx.globalAlpha = 1 - ((y % ph) / ph);
      ctx.drawImage(pictures[i], 0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = ((y % ph) / ph);
      ctx.drawImage(pictures[i+1], 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    }
  }

  // draw pos
  ctx.font = "48px serif";
  ctx.fillText(" y pos " + Math.round(pos.y), 10, 50);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.touches[0].pageX - rect.left,
      y: evt.touches[0].pageY - rect.top
    };
}

var newTouch = true;
function handleStart(e) {
}

function handleEnd(e) {
  newTouch = true;
}

function handleCancel(e) {
}

function handleMove(e) {
  var oldMousePos = mousePos;
  mousePos = getMousePos(canvas, e);
  if (!newTouch) {
    pos.y += (mousePos.y - oldMousePos.y) / 20;
  }
  if (newTouch) {
    newTouch = false;
  }

  if (mousePos.x <= 0) {
    mousePos.x = 1;
  }
  if (mousePos.y <= 0) {
    mousePos.y = 1;
  }
  if (mousePos.x > canvas.width) {
    mousePos.x = canvas.width;
  }
  if (mousePos.y > canvas.height) {
    mousePos.y = canvas.height;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

init();
