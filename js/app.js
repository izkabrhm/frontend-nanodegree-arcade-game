var enemyPosY = [60, 143, 226];
// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  
  this.x = -100;
  this.y = enemyPosY[Math.floor(Math.random() * 3)];
  this.speed = getRandomInt(100, 550);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if(this.x > 6 * 101) {
    this.x = -101;
    this.speed = getRandomInt(100, 550);
  }

  // Handle collisions with the player
  if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) { 
    player.reset();
    gameLife.decrease();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.reset();
};

// Update the player's position, required method for game
Player.prototype.update = function() {
  if(this.col < 0) {
    this.col = 0;
  }

  if(this.col > 4) {
    this.col = 4;
  }

  if(this.row > 5) {
    this.row = 5;
  }

  // Reset the player's position... has reached the water
  if(this.row == 0) {
    this.reset();
    score.updateSuccess();
  }

  this.x = this.col * 101;
  this.y = this.row * 83;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input for controlling the player
Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left':
      this.col--;
      break;
    case 'right':
      this.col++;
      break;
    case 'up':
      this.row--;
      break;
    case 'down':
      this.row++;
      break;
  }
};

Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
  this.x = this.col * 101;
  this.y = this.row * 83;
};

var Score = function() {
  this.success = 0;
  this.miss = 0;
};

Score.prototype.render = function(){
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText("Score:"+this.success+"  Level:"+gameLevel,0,77);
}

Score.prototype.updateSuccess = function() {
  this.success += 1;
  gameLevel += 1;
  console.log('score: ' + score + ',  level: ' + gameLevel);
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText("Score:"+this.success+"  Level:"+gameLevel,0,77);
  
    allEnemies.push(new Enemy());
  
};

Score.prototype.reset = function(){
  this.success = 0;
  this.success = 0;
};

var Life = function() {
  this.lifeImg = 'images/Heart.png';
  this.life = 3;
}
/**
 * Renders the life on the screen.
 */
Life.prototype.render = function() {
  var x = 0;
  for (var i = 0; i < this.life; i++) {
    ctx.drawImage(Resources.get(this.lifeImg), x, 553, 35,60);
    x = x + 35;
  }
  if (this.life === 0) {
    ctx.drawImage(Resources.get('images/GameOver.png'), 0, 0, 505, 650);
  }
}
/**
 * Decrease number of lives.
 */
Life.prototype.decrease = function() {
  if (this.life > 0) {
    this.life = this.life - 1;
  }
  /*var x = 0;
  for (var i = 0; i < this.life; i++) {
    ctx.drawImage(Resources.get(this.lifeImg), x, 570, 50,85);
    x = x + 50;
  }*/
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var numEnemies = 3;
var allEnemies = [];
for(var i = 0; i < numEnemies; i++) {
  allEnemies.push(new Enemy());
}
var player = new Player();
var gameLevel = 1;
var score = new Score();
var gameLife = new Life();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomInt(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};
