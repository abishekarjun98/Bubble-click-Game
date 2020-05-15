
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var totalbubbles=5;

arr=[];
    arr=["blue","red","yellow","green","brown","orange"];

var circles = [];
ctx.globalAlpha = 1;
var clickscore=0;
var myImage = new Image();
myImage.src = "ballf.png";

var myImage2 = new Image();
myImage2.src = "gauntlet2.png";

var imgcoordx,imgcoordy,img2coordx,img2coordy ;

 var rockflag= 0;
 var rockpos;
 var gauntletpos;
 var gauntletflag=0;

var t;
begintimer();


document.getElementById("score").innerHTML=clickscore;

var timepassed=0;
function begintimer()
{
  document.getElementById("timer").innerHTML=timepassed;
  timepassed++;


  if(timepassed>30)
  {
    t=1000;
  }
  else
  {
    t=5000;
  }
}

var timeleft=10;
var areaflag=0;
function countdown()
{


var countdowntimer=document.getElementById("countdowntimer").innerHTML=timeleft;


if(timeleft<=10&&timeleft>0)
{
   

  if(areaflag==1)
  {
   timeleft--; 
  }
  else if(areaflag==0)
  {
    timeleft=10;
  }
  

  }

  if(timeleft==0)
  {
    if(areaflag==1)
    {
    alert("game over");
    }
    else{
      timeleft=10;
    }
  }
}


 

var timeri= setInterval(begintimer,1000);
var totalarea =1000000;



function checkarea()
{

var areacovered=0;
   

  for (var i = 0; i < circles.length; i++) {
    areacovered+=Math.pow(circles[i].radius,2)*Math.PI;    
    }

if( areacovered >400000)
{
  areaflag=1;

  countdown();

}
else
{
  areaflag=0;
}


}
setInterval(checkarea,1000);

function finddist(x1,x2,y1,y2)
{
  const xdist=x1-x2;
  const ydist=y1-y2;

  return Math.sqrt(Math.pow(xdist,2) + Math.pow(ydist,2));
}



function randomIntFromRange(min,max)
{

  return Math.floor(Math.random()*(max -min +1)+ min);
}

function isIntersect(xclicked,yclicked)
{

 // console.log("called");
for(var i=0; i<circles.length ;i++)
{

  var  d= finddist(xclicked,circles[i].x,yclicked,circles[i].y)

if(i!=rockpos)
{
      if(d < circles[i].radius)
  {
    
    clickscore++;
    document.getElementById("score").innerHTML=clickscore;
     circles.splice(i,1);
    //console.log("hell");
  }
}

if(i==rockpos)
{
  if(d<circles[rockpos].radius)
  {
    console.log("rockclicked");
    animate();
  }
}

if(i==gauntletpos)
{
  if(d<circles[gauntletpos].radius)
  {
    console.log("gauntletclicked");
    animate2();
  }
}
}

}

function createrock()
{
  //rockflag=1;
}



function isrockhit(xclicked,yclicked)
{

  if(rockflag==1)
  {
 var  d= finddist(xclicked,circles[rockpos].x,yclicked,circles[rockpos].y)


 if(d<circles[rockpos].radius)
 {

console.log("clicked rock");
animate();

 } 
 } 

}


function isgauntlethit(xclicked,yclicked)
{



  if(gauntletflag==1)
  {
 var  d1= finddist(xclicked,circles[gauntletpos].x,yclicked,circles[gauntletpos].y)

console.log(xclicked +" "+circles[gauntletpos].x  +" "+yclicked  +" "+circles[gauntletpos].y );

console.log(gauntletpos+"gauntlet");
console.log(d1+ " " + circles[gauntletpos].radius)

 if(d1<circles[gauntletpos].radius)
 {
  console.log("clicked gauntlet");

animate2();

  
 } 
}

}




function createcircles()
{

for(var i=1;i<=5;i++)
{

   
      var xnew=randomIntFromRange(radi,canvas.width-radi);
     var ynew=randomIntFromRange(radi,canvas.height-radi);
     var radi= Math.floor(Math.random()*(80 - 70 )+ 70);


velocityi={
  x:(Math.random()- 0.5)*4 ,
  y:(Math.random()- 0.5)*4,
};

var m= 1*4/3*Math.PI*Math.pow(radi,3);//density is taken as 1
var colnum=Math.floor(Math.random()* 6 );

if(circles.length>1)
{

  for (var j= 0 ; j< circles.length ; j++ ) 
  {
    
  if(finddist(xnew,circles[j].x,ynew,circles[j].y) < radi+circles[j].radius)
  { 

    var xnew=randomIntFromRange(radi,canvas.width-radi);
     var ynew=randomIntFromRange(radi,canvas.height-radi);
     var radi= Math.floor(Math.random()*(80 - 70 )+ 70);
    j=-1;

     }
    }
}


circles.push({x:xnew ,y:ynew ,radius: radi, color:arr[colnum],velocity:velocityi,mass:1});



}


}
//createcircles();

var createinterval = setInterval(createcircles,t);
var gauntletflag=0;

function drawcircles()
{

  ctx.clearRect(0,0,canvas.width,canvas.height);
circles.forEach(circle => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  //ctx.fillStyle = circle.color;
  ctx.strokeStyle=  circle.color;
  ctx.stroke();
  //ctx.closePath();
  //ctx.fill();
});


if(circles.length>5)
{


  rockpos= 1;
  var radiusi =circles[rockpos].radius;
  imgcoordx=circles[rockpos].x - radiusi*Math.cos(Math.PI/4);
  imgcoordy=circles[rockpos].y -radiusi*Math.sin(Math.PI/4);

 ctx.drawImage(myImage, shift, 421, frameWidth, frameHeight,imgcoordx, imgcoordy, frameWidth, frameHeight);


rockflag=1;
 
}


if(circles.length>10)
{
  gauntletpos= 1;
  var radiusi =circles[gauntletpos].radius;
  img2coordx=circles[gauntletpos].x - radiusi*Math.cos(Math.PI/4);
  img2coordy=circles[gauntletpos].y -radiusi*Math.sin(Math.PI/4);

 ctx.drawImage(myImage2, shift2, 20,frameWidth2, frameHeight2,img2coordx, img2coordy, frameWidth2, frameHeight2);
gauntletflag=1;

}


update();
globalID = window.requestAnimationFrame(drawcircles);

}
globalID =window.requestAnimationFrame(drawcircles);
function update()
{
circles.forEach(circle => {

    for (var i = 0; i < circles.length; i++) {


    if(circle==circles[i])
    {
      continue;
    }
    if(finddist(circle.x,circles[i].x,circle.y,circles[i].y) < circle.radius+ circles[i].radius)
    {
  //      console.log("colllided");

      resolveCollision(circle,circles[i]);

      
    }

    }

    if(circle.x -circle.radius <= 0 || circle.x+circle.radius >= canvas.width)
    {
      circle.velocity.x=-circle.velocity.x;
    }
        if(circle.y -circle.radius <= 0 || circle.y+circle.radius >= canvas.height)
    {
  circle.velocity.y=-circle.velocity.y;
    }

    circle.x+=circle.velocity.x;
    circle.y+=circle.velocity.y;


  });



}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}


 

function resolveCollision(circle, othercircle) {
    const xVelocityDiff = circle.velocity.x - othercircle.velocity.x;
    const yVelocityDiff = circle.velocity.y - othercircle.velocity.y;

    const xDist = othercircle.x - circle.x;
    const yDist = othercircle.y - circle.y;

  
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

       
        const angle = -Math.atan2(othercircle.y - circle.y, othercircle.x - circle.x);

        const m1 = circle.mass;
        const m2 = othercircle.mass;

        
        const u1 = rotate(circle.velocity, angle);
        const u2 = rotate(othercircle.velocity, angle);

        
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

       
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

       
        circle.velocity.x = vFinal1.x;
        circle.velocity.y = vFinal1.y;

        othercircle.velocity.x = vFinal2.x;
        othercircle.velocity.y = vFinal2.y;
    }
}



 function getMousePosition(canvas, event) { 
            //let rect = canvas.getBoundingClientRect(); 
            let x = event.clientX;// - rect.left; 
            let y = event.clientY ;//- rect.top; 

            let xmod=x-8;
            let ymod=y-30;
            console.log("Coordinate x: " + xmod,  
                 "Coordinate y: " + ymod); 

            isIntersect(xmod,ymod);

            //isrockhit(xmod,ymod);

            //isgauntlethit(xmod,ymod);
            
      }
      
        let canvasElem = document.querySelector("canvas"); 
          
        canvasElem.addEventListener("mousedown", function(e) 
        { 
            getMousePosition(canvasElem, e); 
        }); 


var shift = 0;
var frameWidth = 100;
var frameHeight = 100;
var totalFrames = 4;
var currentFrame = 0;


var shift2 = 96;
var frameWidth2 = 70;
var frameHeight2 = 130;
var totalFrames2 = 3;
var currentFrame2 = 0;
var radius=50*1.414;

function animate()
{
  shift += frameWidth + 1;

  if (currentFrame == totalFrames) {
    shift = 0;
    currentFrame = 0;

    circles.splice(rockpos,1);
    rockflag=0;
    clickscore++;
  }
 
  currentFrame++;


}

function animate2()
{
   shift2 += frameWidth2 + 1;

  if (currentFrame2 == totalFrames2) {
    shift2 = 0;
    currentFrame2 = 0;
    gauntletflag=0;

console.log("called animation");
    //circles.splice(gauntletpos,2);

    for (var i = 1; i < circles.length/2; i++)
     {
      circles.splice(i,1);
    }



  
    clickscore++;
  }
 
  currentFrame2++;

}



function shi()
{
  animate();
  shift=shift+110;
}




 function stop() {
  cancelAnimationFrame(globalID);

  clearInterval(timeri);
}
 function start() {
  globalID = requestAnimationFrame(drawcircles);

  timeri=setInterval(begintimer,1000);
}





