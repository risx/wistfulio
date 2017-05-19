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
	
	// this.matchedindex = 0;
	this.destroycounter = 60;
	this.destroyframe = 40;

	this.paniced = false;
	this.paused = false;

	this.floating = false;
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

	if(below === undefined || below.floating === true && this.active === true){
		this.floating = true;
	}else {
		this.floating = false;
	}

};


// Block.prototype.isFalling = function(){
// 	var below = findBlock(this.posx, this.posy + 1);

// 	if(below === undefined){
// 		this.falling = true;
// 	}else{
// 		//this.floatingcounter = 50;
// 		this.falling = false;			
// 	}
	
// };

Block.prototype.isFalling = function(){
	if(this.floating === true && this.active === true){
		this.falling = true;
	}else{
		this.falling = false;
	}
};

Block.prototype.destroy = function(){
	if(this.destroyframe < 40 && this.destroyframe >= 31){
		this.color = 'white';
	}else if (this.destroyframe <= 20 && this.destroyframe >= 11){
		this.color = 'black';
	}else if (this.destroyframe <= 11 && this.destroyframe >= 0){
		this.color = 'white';
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