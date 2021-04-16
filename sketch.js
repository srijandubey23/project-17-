// declaring variables globally
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground,invisibleGround;
var gameOver, gameOverImg;
var score = 0, bananaScore = 0;
var PLAY = 1;
var End = 0;
var gameState = PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverImg = loadImage("gameover.png");
}


function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
 // monkey.debug = true;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;;
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(100,350,300,10);
  invisibleGround.visible=true;
  
  // creating groups
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(300,170);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
}

function draw() {
  background("white")
  if(gameState === PLAY){
    if (ground.x < 250){
    ground.x = ground.width/2;
  }
    monkey.collide(invisibleGround);
  
  //console.log(monkey.y)
  // to make the monkey jump on space key
  if(keyDown("space") && monkey.y>300) {
    monkey.velocityY=-12;
  }
  // to add a gravity
  monkey.velocityY = monkey.velocityY + 0.6;
  
  spawnObstacle();  
  spawnFood();
    
  //score while increase by 1 in every frame 
   score = score + Math.round(getFrameRate()/60);
  
  // to check if monkey is touching foodGroup
  if(monkey.isTouching(foodGroup)){
    foodGroup[0].destroy();
    bananaScore = bananaScore +2;
  }
  
  // to check if monkey is touching obstacleGroup
  if(monkey.isTouching(obstacleGroup)){

     gameState = End;
    }
  }
  else if (gameState === End){
   gameOver.visible=true;
   ground.velocityX = 0;
    monkey.velocity = 0;
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
  }
  
  
  
  fill("black");
  text("Survival Time: "+ score ,450,30);
  text("Score: "+bananaScore, 450,50);
    
  
  drawSprites();
}

function spawnObstacle(){
  //spawning obstacles
   if (frameCount % 70=== 0) {  
   var obstacle = createSprite(500,330,5,5);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;
   obstacle.velocityX=-4; 
   obstacle.lifeTime=150;
     obstacleGroup.add(obstacle);
    // obstacle.debug = true;
 } 
}

function spawnFood(){
  //spawning food 
  if(frameCount%90===0){
    var banana=createSprite(500,230,5,5);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifeTime=150;
    banana.y=Math.round(random(180,300));
    foodGroup.add(banana);
  }
}



