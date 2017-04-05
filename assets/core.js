(function() {
   var timeouts = [];
   var messageName = "zero-timeout-message";

   function setZeroTimeout(fn) {
	   timeouts.push(fn);
	   window.postMessage(messageName, "*");
   }

   function handleMessage(event) {
	   if (event.source == window && event.data == messageName) {
		   event.stopPropagation();
		   if (timeouts.length > 0) {
			   var fn = timeouts.shift();
			   fn();
		   }
	   }
   }

   window.addEventListener("message", handleMessage, true);

   window.setZeroTimeout = setZeroTimeout;
})();

var timer = function(){
    function checkTime(i){
		return i = (i < 10) ? '0' + i : i;
    }

    var now = Math.floor(Date.now() / 1000);
    var diff = now - game.startTime;
    
    var minutes = Math.floor(diff / 60);
    var seconds = Math.floor(diff % 60);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

}


var loadImages = function(sources, callback){
    var nb = 0;
    var loaded = 0;
    var imgs = {};
    for(var i in sources){
		nb++;
		imgs[i] = new Image();
		imgs[i].src = sources[i];
		imgs[i].onload = function(){
		    loaded++;
		    if(loaded == nb){
			callback(imgs);
		    }
		}
    }
}

var boardTop = function(){
	var highestpoint = 20;
	for(var i = 0; i < game.board.length; i++){
		var block = findBlock(game.board[i].posx, game.board[i].posy);
		if(block.posy <= highestpoint){
			highestpoint = block.posy;
		}
	}
	return highestpoint;	
}

var boardBottom = function(){
	var lowestpoint = 0;
	for(var i = 0; i < game.board.length; i++){
		var block = findBlock(game.board[i].posx, game.board[i].posy);
		if(block.posy > lowestpoint){
			lowestpoint = block.posy;
			var lowestBlock = block;
		}
	}
	return lowestBlock;
}

var isMatching = function(blockOne, blockTwo, blockColor){
	if(blockTwo !== undefined && blockOne !== undefined
		&& blockOne.falling == false && blockTwo.falling == false
		&& blockOne.color == blockColor && blockTwo.color == blockColor
		&& blockOne.active == true && blockTwo.active == true){

		return true;
	}
}

var findBlock = function(x, y){
    for(var i = 0; i < game.board.length; i++){
		if(game.board[i].posx === x
		&& game.board[i].posy === y){
		    return game.board[i];
		}
    }

}

var removeBlocks = function(blocks){
    function remove(block){
		for(var i = 0; i < game.board.length; i++){
		    if(game.board[i].posx == block.posx
		    && game.board[i].posy == block.posy){
				game.board.splice(i, 1);
		    }
		}
    }

    for(var i = 0; i < blocks.length; i++){
    	var block = blocks[i];
       	remove(block);
    }

}

var draw = function(object, type){
    if (type === 'block'){
		// if(object.color == 'blue'){
		//     this.ctx.drawImage(images.blueBlock, object.x, object.y, object.width, object.height);	    
		// }
		// if(object.color == 'green'){
		//     this.ctx.drawImage(images.greenBlock, object.x, object.y, object.width, object.height);
		// }
		// if(object.color == 'red'){
		//     this.ctx.drawImage(images.redBlock, object.x, object.y, object.width, object.height);
		// }
		// if(object.color == 'yellow'){
		//     this.ctx.drawImage(images.yellowBlock, object.x, object.y, object.width, object.height);
		// }
		// if(object.color == 'purple'){
		//     this.ctx.drawImage(images.purpleBlock, object.x, object.y, object.width, object.height);
		// }
	//}
	    this.ctx.beginPath();
	    this.ctx.rect(object.x, object.y + 1, object.width, object.height);
	    this.ctx.fillStyle = object.color;
	    this.ctx.fill();

	    this.ctx.strokeStyle = 'black';
	    this.ctx.lineWidth = '3';
	    this.ctx.rect(object.x, object.y + 1, object.width, object.height);
	    this.ctx.stroke();
	    this.ctx.closePath();

	    // //debug info
	    // this.ctx.fillStyle='white';
	    // this.ctx.font='20px Oswald, sans-serif';
	    // this.ctx.fillText(object.posx, object.x + 5, object.y + 50);
	    // this.ctx.fillText(object.posy, object.x + 25, object.y + 50);
	    // this.ctx.fillText(object.color, object.x + 5, object.y + 30);
	    // //end debug info
    } else {
	    this.ctx.beginPath();
	    this.ctx.strokeStyle = 'white';
	    this.ctx.lineWidth = '3';
	    this.ctx.rect(object.x, object.y, object.width, object.height);
	    this.ctx.stroke();
	    this.ctx.closePath();
    }
}

var keyActions = function(e){
	if(e !== 37 || e !== 38 || e !== 39 || e !== 40
		|| e !== 68 || e !== 83 || e !== 87 || e !== 16){
		e.preventDefault();
	}
	// 37 - < // 87 - W // 38 - ^ // 83 - S// 39 - > 
	// 65 - A// 40 - V // 68 - D// 80 - P// 16 - Shift
    if(game.state == 'active'){
		if(e.keyCode === 37){
		   game.move('left');
		}
		if(e.keyCode === 38){
		    game.move('up');
		}
		if(e.keyCode === 39){
		    game.move('right');
		}
		if(e.keyCode === 40){
		    game.move('down');
		}
		if(e.keyCode === 32){
		    game.swap();
		}
		if(e.keyCode === 16){
		    game.speed = (game.speed == 0.3) ? 1 : 0.3;
		}
    }
    if(e.keyCode === 80 && game.state !== 'gameover'){
		game.paused = game.pause();
    }
}