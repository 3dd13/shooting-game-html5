function drawBullets(player) {
  for( var i in player.bullets ) {
    context.save();
    
    var bullet = player.bullets[i];
    context.translate( bullet.x, bullet.y );
    context.rotate(bullet.direction);

    context.strokeStyle = "#A36";
    context.beginPath();
    context.lineTo(2, 0);
    context.lineTo(0, 1);    
    context.lineTo(-2, 0);
    context.lineTo(1, 0);    

    context.closePath();
    context.stroke();
    
    context.restore();  
  }
}

function drawPlayer(player) {
  context.save();
  
  context.translate( player.x, player.y );
  context.rotate(player.direction);  
  
  context.strokeStyle = "#36A";      
  context.beginPath();
  context.moveTo(+8, 0);
  context.lineTo(-8, -5);
  context.quadraticCurveTo(0, 0, -8, +5);
  context.closePath();
  context.stroke();
  
  context.restore();    
}

function updatePlayerPositions() {
  player = players[0];
  if (keys[37]) {
    player.direction -= ROTATING_UNIT;
  } else if (keys[39]) {
    player.direction += ROTATING_UNIT;
  }
  
  if (keys[38]) {
    var deltaPosX = MOVING_UNIT * Math.cos(player.direction);
    var deltaPosY = MOVING_UNIT * Math.sin(player.direction);
    
    movePlayerTo(player, deltaPosX, deltaPosY);
  } else if (keys[40]) {
    var deltaPosX = -1 * MOVING_UNIT * Math.cos(player.direction);
    var deltaPosY = -1 * MOVING_UNIT * Math.sin(player.direction);
    
    movePlayerTo(player, deltaPosX, deltaPosY);
  }
}

function movePlayerTo(player, deltaPosX, deltaPosY) {
  if (player.x + deltaPosX >= 0 && player.x + deltaPosX <= canvas.width ) {
    player.x += deltaPosX;
  }

  if (players[0].y + deltaPosY >= 0 && player.y + deltaPosY <= canvas.height ) {
    player.y += deltaPosY;
  }
}

function updatePlayerBulletPositions() {
  player = players[0];
  for( var i in player.bullets ) {
    var bullet = player.bullets[i];
    
    var deltaPosX = BULLET_MOVING_UNIT * Math.cos(bullet.direction);
    var deltaPosY = BULLET_MOVING_UNIT * Math.sin(bullet.direction);
    
    if (bullet.x + deltaPosX >= 0 && bullet.x + deltaPosX <= canvas.width ) {
      bullet.x += deltaPosX;
    }

    if (bullet.y + deltaPosY >= 0 && bullet.y + deltaPosY <= canvas.height ) {
      bullet.y += deltaPosY;
    }
    
    if (bullet.x + deltaPosX < 0
        || bullet.x + deltaPosX > canvas.width
        || bullet.y + deltaPosY < 0 
        || bullet.y + deltaPosY > canvas.height) {
      // TODO does it affect the for loop running when the array size is changed in the loop ?
      player.bullets.splice(i, 1);
    }
  }

  if (keys[32]) {
    player.bullets.push({
      x: player.x,
      y: player.y,
      direction: player.direction
    })
  } 
}

function checkBulletEnemiesCollision() {
  // TODO does it affect the for loop running when the array size is changed in the loop ?
  for( var i in player.bullets ) {
    for (var j in enemies) {
      if (collides(player.bullets[i], enemies[j])) {
        player.bullets.splice(i, 1);
        enemies.splice(j, 1);
      }
    }
  }
}

function collides(bullet, enemy) {
  return (bullet.x >= enemy.x - 5)
         && (bullet.x <= enemy.x + 5)
         && (bullet.y >= enemy.y - 5)
         && (bullet.y <= enemy.y + 5);
}