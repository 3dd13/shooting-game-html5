function drawEnemy(enemy) {
  context.save();
  
  context.translate( enemy.x, enemy.y );
  context.rotate(enemy.direction);  
  
  context.strokeStyle = "#693";
      
  context.beginPath();
  context.moveTo(-8, +5);  
  context.quadraticCurveTo(0, 0, -8, -5);
  context.quadraticCurveTo(0, 0, 8, -5);
  context.quadraticCurveTo(0, 0, 8, +5);    
  context.quadraticCurveTo(0, 0, -8, +5);      
  context.closePath();
  context.stroke();
  
  context.restore();
}
