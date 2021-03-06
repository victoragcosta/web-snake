var tile = 20;
var snake;
var food;
var game;
var delay = 150;
var timing = [];

var touchPoints = [];

function setup() {
	var cnvs;
	if(displayWidth < displayHeight){
		cnvs = createCanvas(windowWidth - windowWidth%tile, windowWidth - windowWidth%tile);
	} else {
		cnvs = createCanvas(windowHeight - windowHeight%tile, windowHeight - windowHeight%tile);	
	}
	cnvs.position((windowWidth - width)/2,(windowHeight - height)/2);
	snake = new Snake(tile);
	snake.startOver();
	food = new Food(tile);
	food.randomPos();
	game = new GameControl();
	timing[1] = Date.now();
}

function draw() {
	timing[0] = Date.now();

	if(timing[0]-timing[1] >= delay){
		timing[1] = timing[0];
		background(51);
		noStroke();

		game.show();

		snake.update();
		snake.eat(food);
		if(snake.collide()){
			food.randomPos();
		}
		food.show2();
		snake.show();
	}
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		snake.dir(0,-1);
	} else if(keyCode === DOWN_ARROW){
		snake.dir(0, 1);
	} else if(keyCode === LEFT_ARROW){
		snake.dir(-1, 0);
	} else if(keyCode === RIGHT_ARROW){
		snake.dir(1,0);
	}
}

function touchStarted(){
	touchPoints[0] = createVector(mouseX, mouseY);
}

function touchEnded(){
	touchPoints[1] = createVector(mouseX, mouseY);
	handleTouches();
}

function touchMoved(){
	return false;
}

function handleTouches(){
	var touchDir = touchPoints[1].copy().sub(touchPoints[0]).normalize();
	if(touchDir.x === abs(touchDir.x)){
		if(touchDir.y === abs(touchDir.y)){
			if(touchDir.x > touchDir.y){
				snake.dir(1,0);
			} else {
				snake.dir(0,1);
			}
		} else {
			if(touchDir.x > abs(touchDir.y)){
				snake.dir(1,0);
			} else {
				snake.dir(0,-1);
			}
		}
	} else {
		if(touchDir.y === abs(touchDir.y)){
			if(abs(touchDir.x) > touchDir.y){
				snake.dir(-1,0);
			} else {
				snake.dir(0,1);
			}
		} else {
			if(touchDir.x < touchDir.y){
				snake.dir(-1,0);
			} else {
				snake.dir(0,-1);
			}
		}
	}
}