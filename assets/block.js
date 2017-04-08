var Block = function(){
    this.x = 0;
    this.y = 0;
    this.width = 56;
    this.height = 56;

    this.color = null;
    this.active = false;
    this.posx = 0;
    this.posy = 0;

    this.destroy = false;
    this.destroypos = 0;

    this.paused = false;
    this.falling = false;
    this.velocity = 0.3;

}

Block.prototype.update = function(){
    this.y -= game.speed;
}

Block.prototype.stop = function(){
    this.paused = (this.paused === true) ? false : true;
    
    if(this.paused === true){
	   game.speed = 0;
	   game.state = 'paused';
    }else{
	   game.speed = 0.15;
	   game.state = 'active';
    }
}

Block.prototype.isOut = function(){
    if(this.y + this.height < 0){
	   return true;
    }
}

Block.prototype.isActive = function(){
    if(this.y + this.height < 680){
	   this.active = true;
    }else{
	   this.active = false;
    }
}

Block.prototype.isFalling = function(){
    var below = findBlock(this.posx, this.posy + 1);
    if(below === undefined){
	   this.falling = true;
    } else {
	   this.falling = false;
    }
}

Block.prototype.tint = function(){
    if(this.active == false){
        
    }else{
        
    }
}

Block.prototype.destroyIt = function(){
    var holdcolor = this.color;

    game.ctx.fillStyle = 'white';
    game.ctx.fill();
}