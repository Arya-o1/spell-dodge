var bgImg;
var x1 = 0;
var x2;

var scrollSpeed = 2;

var player,playerWalking,playerStanding,playerDie,playerAttack;
var attackspell;
var spell1,spell2,spell1Img,spell2Img;
var wall1,wall2,wall3,wall4;
var gamestate;
var play = 1;
var end = 2;
var score = 0;
var spell1group,spell2group;
var spellspeed = -10;

function preload(){

    // bgImg = loadImage("industrial-background (1).jpg");

    bgImg = loadImage("—Pngtree—horror night halloween holiday banner_1152176.png");

    playerWalking = loadAnimation("Wraith_01_Moving Forward_000.png","Wraith_01_Moving Forward_001.png",
    "Wraith_01_Moving Forward_002.png","Wraith_01_Moving Forward_003.png","Wraith_01_Moving Forward_004.png",
    "Wraith_01_Moving Forward_005.png","Wraith_01_Moving Forward_006.png","Wraith_01_Moving Forward_007.png",
    "Wraith_01_Moving Forward_008.png","Wraith_01_Moving Forward_009.png"
    ,"Wraith_01_Moving Forward_010.png","Wraith_01_Moving Forward_011.png");
   
    playerStanding = loadImage("Wraith_01_Moving Forward_010.png");

    // playerDie = loadAnimation("Wraith_01_Dying_000.png","Wraith_01_Dying_001.png","Wraith_01_Dying_002.png","Wraith_01_Dying_003.png"
    // ,"Wraith_01_Dying_004.png","Wraith_01_Dying_005.png","Wraith_01_Dying_006.png","Wraith_01_Dying_007.png","Wraith_01_Dying_008.png","Wraith_01_Dying_009.png",
    // "Wraith_01_Dying_010.png","Wraith_01_Dying_011.png","Wraith_01_Dying_012.png","Wraith_01_Dying_013.png","Wraith_01_Dying_014.png");

    // playerAttack = loadAnimation("Wraith_01_Attack_000 - Copy.png", "Wraith_01_Attack_000.png", "Wraith_01_Attack_001 - Copy.png" ,"Wraith_01_Attack_001.png",
    //  "Wraith_01_Attack_002 - Copy.png" ,"Wraith_01_Attack_002.png", "Wraith_01_Attack_003 - Copy.png" ,"Wraith_01_Attack_003.png", "Wraith_01_Attack_004.png", "Wraith_01_Attack_005.png"
    //   ,"Wraith_01_Attack_006.png" ,"Wraith_01_Attack_007.png", "Wraith_01_Attack_008.png" ,"Wraith_01_Attack_009.png", "Wraith_01_Attack_010.png" ,"Wraith_01_Attack_011.png" )

    // attackspell = loadImage("Wraith_01_Attack_002.png");
      spell1Img = loadImage("Spells Effect.png");
      spell2Img = loadImage("Spells Effect2.png")

    }

function setup() { 
  createCanvas(800, 400);
  wall1 = createSprite(10,200,20,400);
  wall1.visible = false;
  wall2 = createSprite(790,200,20,400);
  wall2.visible = false;
  wall3 = createSprite(400,10,800,20);
  wall3.visible = false;
  wall4 = createSprite(400,390,800,20);
  wall4.visible = false;

  player = createSprite(100,300,50,50);
  player.addAnimation("Walking",playerWalking);
  // player.addAnimation("Attack",playerAttack);
  // player.addImage("spellattack",attackspell);
  player.addImage("standing",playerStanding);
  // player.debug = true;
  player.setCollider("rectangle",0,-20,150,270);
  player.scale = 0.4;
  
  spell1group = new Group();  
  spell2group = new Group();  

  x2 = width;
  gamestate = end;

} 

function draw() { 

  image(bgImg, x1, 0, width, height);
    image(bgImg, x2, 0, width, height);
  
     x1 -= scrollSpeed;
      x2 -= scrollSpeed;
  
    if (x1 < -width){
    x1 = width;
    }
    if (x2 < -width){
    x2 = width;
    }

  fill("red");
  text("SCORE - " + score,600,50);
  
  if (gamestate===end){
    scrollSpeed=0;
    score = 0;
    player.changeAnimation("standing");
    textSize(20);
    fill("red");
    text("press 'space' to start",300,200);
    if(keyDown("space")){
    gamestate=play;
    scrollSpeed = 2;
    spellspeed = -10;

    }
    
  }
 
    
    if(gamestate===play){
      player.changeAnimation("Walking");

    if (keyDown("up")){
      player.y -= 4;
    } 
     if(keyDown("down")){
      player.y += 4;
    } 
     if(keyDown("left")){
      player.x -= 4;
    }
     if(keyDown("right")){
      player.x += 4;
    }
  
    if (frameCount % 100 === 0 ){
      makeSpell();
    
  }
    player.collide(wall1);
    player.collide(wall2);
    player.collide(wall3);
    player.collide(wall4);
  
    if(player.isTouching(spell1group)){
      score+=1;
      spell1.destroy();
    }
  

  if(player.isTouching(spell2group)){
    gamestate = end;
    player.x = 100;
    player.y =  300;
    spell1group.destroyEach();
    spell2group.destroyEach();

  }

  if(frameCount %  300  === 0){
    scrollSpeed+=0.1;
    spellspeed -=0.5;
    console.log(scrollSpeed,spellspeed)
  }
    }
  drawSprites();	
}

function makeSpell(){
  // player.changeAnimation("spellattack");
  spell1 = createSprite(-20,-20);
  spell1.addImage("spell1",spell1Img);
  spell2 = createSprite(-20,-20);
  spell2.addImage("spell2",spell2Img);

  var rand = Math.round(random(1,2));
  if(rand===1){
    spell1.x = random(820,860);
    spell1.y = random(10,400);
    spell1.velocityX = spellspeed;
 
  } else{
    spell2.x = random(820,860);
    spell2.y = random(10,400);
    spell2.velocityX = spellspeed;
  }
  
  spell1.scale = 0.7;
  spell2.scale = 0.7;
  spell1group.add(spell1);
  spell2group.add(spell2);
  
}