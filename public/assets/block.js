var Block = function(){
	this.x = 0;
	this.y = 0;
	this.width = 56;
	this.height = 56;

	this.color = null;
	this.active = false;
	this.posx = 0;
	this.posy = 0;

	this.matched = false;
	
	this.matchedindex = 0;
	this.destroycounter = 205;
	this.destroyframe = 10;

	this.paniced = false;
	this.paused = false;
	this.falling = false;
	this.floatingcounter = 50;
	
	this.velocity = 0.3;
};

Block.prototype.update = function(){
		this.y -= game.speed;
};

Block.prototype.stop = function(){
		this.paused = (this.paused === true) ? false : true;

		if(this.paused === true){
		 game.speed = 0;
		 game.state = 'paused';
		}else{
		 game.speed = 1;
		 game.state = 'active';
		}
};

Block.prototype.isOut = function(){
		if(this.y + this.height < 0){
		 return true;
		}
};

Block.prototype.isActive = function(){
		if(this.y + this.height < 680){
		 this.active = true;
		}else{
		 this.active = false;
		};
};

Block.prototype.prepareFloat = function(){
	var below = findBlock(this.posx, this.posy + 1);

	if(below !== undefined && this.active === true &&
		below.falling === true){
			this.falling = true;
		}
};

Block.prototype.isFalling = function(){
	var below = findBlock(this.posx, this.posy + 1);

	if(below === undefined){
		this.falling = true;
	}else{
		//this.floatingcounter = 50;
		this.falling = false;			
	}
	this.prepareFloat();
};

Block.prototype.destroy = function(){
	var previouscolor;
	if(this.destroycounter % 2 === 0){
		var previouscolor = this.color;
		this.color = 'white';
	}else{
		this.color = (previouscolor === undefined) ? this.color : previouscolor;
	}

	if(this.destroycounter < 0 && this.destroyframe <= 0){
		removeBlocks(this);
	};
};

Block.prototype.countdown = function(){
	if(this.matched === true){
		this.destroycounter--;
	};
	if(this.destroycounter <= 0){
		this.destroyframe--;
	}
};