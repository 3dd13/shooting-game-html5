var context;
var canvas;
var players = [];
var enemies = [];
var keys = {};
var MOVING_UNIT = 3;
var BULLET_MOVING_UNIT = 6;
var ROTATING_UNIT = Math.PI / 20;

var setupCanvas = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"); 
  
  createPlayers();
  createEnemies();
  animate();
};

function createPlayers() {
  for(var i = 0; i < 2; i++) {
    players.push({
      x: (i * 20) + 10,
      y: 10,
      direction: 0,
      bullets: []
    });
  }
}

function createEnemies() {
  for(var i = 0; i < 5; i++) {
    enemies.push({
      x: (i * 50) + 10,
      y: canvas.height - 20,
      direction: -90,
      bullets: []
    });
  }
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  // Clear the canvas
  context.clearRect( 0, 0, canvas.width, canvas.height );

  updatePlayerBulletPositions();
  updatePlayerPositions();
  checkBulletEnemiesCollision();

  // Loop over bees!
  for ( var i in players ) {
    drawBullets(players[i]);
    drawPlayer(players[i]);
  }
  
  for ( var i in enemies ) {
    drawEnemy(enemies[i]);
  }
}

