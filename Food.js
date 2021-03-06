function Food(tileSize){
	this.tileSize = tileSize;
	this.pos = createVector(0,0);
	this.image = null;

	this.randomPos = function(){
		var x = floor(random(width)/this.tileSize)*this.tileSize;
		var y = floor(random(height)/this.tileSize)*this.tileSize;
		this.pos.set(x, y);
	}

	this.show = function(){
		fill(220, 100, 100)
		rect(this.pos.x, this.pos.y, this.tileSize, this.tileSize);
	}

	this.show2 = function(){
		if(this.image === null){
			this.image = loadImage("img/food.png");
		}
		image(this.image, this.pos.x, this.pos.y);
	}
}