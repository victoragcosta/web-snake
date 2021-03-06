function Snake(tileSize){
	this.tileSize = tileSize;
	this.pos = createVector(0,0);
	this.vel = createVector(0,0);
	this.size = 0;
	this.tail = [];
	this.hide = false;

	this.startOver = function(){
		this.pos.set(floor(width/this.tileSize/2)*this.tileSize, floor(height/this.tileSize/2)*this.tileSize);
		this.vel.set(0,0);
		this.size = 0;
		this.tail = [];
	}

	this.dir = function(x, y){
		if(!this.vel.copy().add(createVector(x, y)).equals(createVector(0,0))){
			this.vel.set(x, y);
		}
		if(game.gameStatus != 2){
			game.startGame();
		}
	}

	this.update = function(){
		for(var i = 0; i < this.tail.length-1; i++){
			this.tail[i] = this.tail[i+1];
		}
		this.tail[this.size-1] = this.pos.copy();

		this.pos = this.pos.add(this.vel.copy().mult(this.tileSize));

		var x = constrain(this.pos.x, -this.tileSize, width);
		var y = constrain(this.pos.y, -this.tileSize, height);
		this.pos.set(x, y);
	}

	this.show = function(){
		fill(0,120,0);
		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, this.tileSize, this.tileSize);	
		}
		rect(this.pos.x, this.pos.y, this.tileSize, this.tileSize);
	}

	this.eat = function(food){
		var dist = food.pos.dist(this.pos);
		if(dist < this.tileSize/2){
			this.size++;
			food.randomPos();
		}
	}

	this.lose = function(){
		game.endGame();
		this.startOver();
	}

	this.collide = function(){
		for(var i = 0; i < this.tail.length; i++){
			var dist = this.pos.dist(this.tail[i]);
			if(dist < this.tileSize/2){
				this.lose();
				return true;
			}
		}
		if(this.pos.x <= -this.tileSize/2 || this.pos.x >= width || this.pos.y < -this.tileSize/2 || this.pos.y >= height){
			this.lose();
			return true;
		}
		return false;
	}
}