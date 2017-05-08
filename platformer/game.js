var isGameOver;
var score;

var GRAVITY = 0.3;
var JUMP = -5;

var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;

var level;
var OBSTACLE_SPRITE_SIDE = 10;


var player;

var obstacleSprites;

function setup() {
    isGameOver = false;
    score = 0;
    level = 1;
    
    createCanvas(400, 300);
    background(150, 200, 250);
    groundSprites = new Group();
    
    numGroundSprites = width/GROUND_SPRITE_WIDTH+1;

    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    
    player = createSprite(100, height-75, 50, 50);
    
    obstacleSprites = new Group();
}

function draw() {
    if (isGameOver) {
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        text("You got to level: " + level, camera.position.x, camera.position.y - 40);
        text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
    } else {
        background(150, 200, 250);
        
        player.velocity.y = player.velocity.y + GRAVITY;
        
        if (groundSprites.overlap(player)) {
            player.velocity.y = 0;
            player.position.y = (height-50) - (player.height/2);
        }
        
        if (keyDown(UP_ARROW) &&  player.position.y > 20) {
            player.velocity.y = JUMP;
        }
        
        player.position.x = player.position.x + 5;
        camera.position.x = player.position.x + (width/4);
        
        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }
        
        if (random() > (0.99 - level/1000)) { // adjust for level
            var obstacle = createSprite(camera.position.x + width, random(0, (height-50)-15), OBSTACLE_SPRITE_SIDE, OBSTACLE_SPRITE_SIDE);
            obstacleSprites.add(obstacle);
        }
        
        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
            removeSprite(firstObstacle);
        }
        
//        obstacleSprites.overlap(player, endGame);
        obstacleSprites.collide(player, scoreUp);
        
        drawSprites();
        
        score = score + 1;
        textAlign(CENTER);
        text(score, camera.position.x, 10);

        if (checkForLevelChange()) {
            background(255, 255, 255); // flash background to white
        }
        
        //add the level text
        textAlign(CENTER);
        text("Level: " + level, camera.position.x, 20);
    }
}

function scoreUp(jewel, hero)
{
    score = score + 1000;
    jewel.remove();
}
 
function checkForLevelChange() {
    var levelChanged = false;
    //if score has gone up another 500 then change level and increase sprite size
    if ((score % 500) == 0) { 
        level = level + 1; //increase the level
        //increase the sprite size
        OBSTACLE_SPRITE_SIDE = OBSTACLE_SPRITE_SIDE * level;
        levelChanged = true;
    }         
    return levelChanged;
}


function endGame() {
    isGameOver = true;
    level = 1;
}

function mouseClicked() {
  if (isGameOver) {
      
    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n*50;
    }

    player.position.x = 100;
    player.position.y = height-75;

    obstacleSprites.removeSprites();
    
    score = 0;
    isGameOver = false;
  }
}