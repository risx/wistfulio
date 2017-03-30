var Selector = function(){
	this.x = 0;
	this.y = 0;
	this.width = 112;
	this.height = 56;

	this.color = null;
	this.active = false;
	this.posx = 0;
	this.posy = 0;

	this.speed = 0.3;
	this.velocity = 0.3;

}

Selector.prototype.update = function(){
	this.y -= this.speed;
}
Selector.prototype.up = function(){
	console.log('up');
}
Selector.prototype.down = function(){
	console.log('down');
}
Selector.prototype.left = function(){
	console.log('left');
}
Selector.prototype.right = function(){
	console.log('right');
}
