//Global Variables
var monkey,bananaIMG,bananaGroup,banana,obstacleIMG,obstaclesGroup,obstacle,monkeyIMG,backIMG,bg,gameState,PLAY,END,k,f,score;

var invisibleground;


function preload(){
  monkeyIMG=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  obstacleIMG = loadImage("stone.png");
  bananaIMG = loadImage("Banana.png");
  backIMG = loadImage("jungle2.jpg");
  
  
}


function setup() {
  createCanvas(600,600);
  bg=createSprite(300,110,16000,20);
  bg.addImage("bg",backIMG);
  //bg.velocityX = -4;
      
  
 
   
  invisibleground=createSprite(300,280,800,20);
  invisibleground.visible = false;
  
  
  
  monkey = createSprite(100,250,10,10);
  monkey.addAnimation("monkey",monkeyIMG);
  monkey.scale = 0.2;
 
  
  score = 0;
  
  PLAY = 1;
  END = 0;
  
  f=0;
  
  gameState = PLAY;
  
  
  
    
  
  
  bananaGroup = new Group();
  obstaclesGroup=new Group();
  
}


function draw(){
  
    
  
   
    if(gameState===PLAY){
      
       monkey.collide(invisibleground);
      
      if(bg.x<200){
        bg.x = bg.width/2;
      }
     background(255);
     
  
  
      spawnBananas();
      spawnObstacles();
    
    
    
    
    if(keyWentDown("space")&& monkey.x === 100 ){
      monkey.velocityY=-15;
    } 
    
    monkey.velocityY=monkey.velocityY+0.8;
    
    
  
  
   
    
  
   
  if (monkey.isTouching(bananaGroup)){
    score = score+2;
    bananaGroup.destroyEach();
   }
      
   switch (score){
     case 10 : monkey.scale = 0.22;
               break;
     case 20 : monkey.scale = 0.24;
               break;
     case 30 : monkey.scale = 0.26;
               break;
     case 40 : monkey.scale = 0.28;
               break;
     case 50 : gameState = END;
               k=1;
               break;
     default : break;         
       
   }   
     
     
  
  if (monkey.isTouching(obstaclesGroup)){
    monkey.scale = 0.2;
    score = 0;
    f=f+1;
    obstaclesGroup.destroyEach();
    
    
    
  }
      
      if(f===5){
      gameState = END;
    
    }
  
  
  
  
  
  }
  
  if(gameState===END){
    monkey.destroy();
    bg.destroy();
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
   
      
 if(k===1){
   background(0);
   
   textSize(20);
   fill("yellow");
   textFont("ARIAL BLACK");
   text("GOOD JOB",250,150);
   
 }
 
 else if (f===5){
   background(0);
    
    
   
   textSize(20);
   fill("yellow");
   textFont("ARIAL BLACK");
   text("HARD LUCK",250,150);
   
 }
    
  }
 
  
  
  console.log(f);
  
  
  
  
    
  

  camera.position.x = mouseX;
  camera.position.y = monkey.x;
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE: " + score , 450,50);
}

function spawnBananas(){
  if(frameCount%80===0){
  banana = createSprite(600,400,10,10);
  banana.addImage(bananaIMG);
  banana.scale=0.05;
  banana.y=random(120,200);
  banana.velocityX=-4;
  banana.lifetime=150;
  
  bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,280,10,40);
    obstacle.addImage(obstacleIMG);
    obstacle.scale=0.15;
    obstacle.velocityX=-6;
    obstacle.lifetime=100;
    obstacle.collide(invisibleground);
   
    
    obstaclesGroup.add(obstacle);
  }
  
}