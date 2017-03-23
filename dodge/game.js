var isGameOver;
var player;
var playerImage;
var enemy;
var enemyImage;
var backgroundImage;



function preload() {
  playerImage = loadImage("https://ivobrett.github.io/hackclubcode/dodge/images/png/player.png");
  enemyImage = loadImage("https://ivobrett.github.io/hackclubcode/dodge/images/png/enemyShip.png");
  backgroundImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/aKQOg3G.png");

  playerImageLeft = loadImage("https://ivobrett.github.io/hackclubcode/dodge/images/png/playerLeft.png");
  playerImageRight = loadImage("https://ivobrett.github.io/hackclubcode/dodge/images/png/playerRight.png");
}

function setup() {
  isGameOver = false;
  createCanvas(512, 512);
  player = createSprite(width / 2, height - (playerImage.height / 2), 0, 0);
  player.addImage(playerImage);
  enemy = createSprite(width / 2, 0, 0, 0);
  enemy.addImage(enemyImage);
  enemy.rotationSpeed = 4.0;

}

function draw() {
  if (isGameOver) {
    gameOver();
  } else {
    if (enemy.overlap(player)) {
      isGameOver = true;
    }
    if (enemy.overlap(player)) {
      gameOver();
    }
    background(backgroundImage);
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage.width / 2))) {
        player.addImage(playerImageRight);
      player.position.x += 2;
    }
    else if (keyDown(LEFT_ARROW) && player.position.x > (playerImage.width / 2)) {
        player.addImage(playerImageLeft);
      player.position.x -= 2;
    }
    else {
        player.addImage(playerImage);
    }
    enemy.position.y = enemy.position.y + 3;
    if (enemy.position.y > height) {
      enemy.position.y = 0;
      enemy.position.x = random(5, width - 5);
    }
    drawSprites();
  }
}

function gameOver() {
  background(0);
  textAlign(CENTER);
  fill("white");
  text("Game Over!", width / 2, height / 2);
  text("Click anywhere to try again", width / 2, 3 * height / 4);
}

function mouseClicked() {
  isGameOver = false;
  player.position.x = width / 2;
  player.position.y = height - (playerImage.height / 2);
  enemy.position.x = width / 2;
  enemy.position.y = 0;
}