var time;



//alert(Time("2022-11-03T02:04:32.278Z"));

//alert(new Date());
function init()
{
  initLevel(); //INITIALIZE THE LEVEL STRUCTURE
  initPlayer(); //INITIALIZE THE PLAYER
  initControll(); //INITIALIZE CONTROLLS
  render(); //START RENDER
}


function render()
{
  var now = new Date().getTime(), //GET CURRENT TIME
  dt = now - (time || now); //FRAME TIME
  time = now;
    
  updateLevel(dt); //UPDATE LEVEL
  updatePlayer(dt);  //UPDATE PLAYER
  requestAnimationFrame(render); //CONTINUE RENDER  
}