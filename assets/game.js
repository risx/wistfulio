var game;
var FPS = 60;
 
var images = {};

var speed = function(fps){
    FPS = parseInt(fps);
}

var Game = function(){
    this.running = false;
    this.canvas = document.querySelector('#wistful');
    this.ctx = this.canvas.getContext('2d');
 
    this.board = [];
    this.selector = null;
    this.score = 0;
    this.speed = 0.3;
    this.time = 0;
    this.state = null;
    this.rowselection = 0;

    this.rows = 14;
    this.cols = 6;
    this.blocksize = 56; 

    this.startTime = 0;   
    
}
 
Game.prototype.start = function(){
    this.running = true;
    this.board.length = 0;
    this.selector = 0;
    this.score = 0;
    this.speed = 0.3;
    this.time = 0;
    this.state = null;
    this.rowselection = 0;

    this.rows = 14;
    this.cols = 6;
    this.blocksize = 56; 

    this.startTime = Math.floor(Date.now() / 1000);

    var counter = 4;

    var countdown = setInterval(function(){
        counter--;
        if(counter <= 0){
            clearInterval(countdown);
            game.state = 'active';
            game.initSelector(1, 12);
            game.initBoard();
            game.update();
            game.display();
            counter = 4;
            
        }else{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.strokeStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.font = '100px Arial';
            this.ctx.fillText(counter, game.canvas.width / 2, game.canvas.height / 2);
        }
    }, 1000);
   
}

Game.prototype.initSelector = function(x, y){
    this.selector = new Block();

    this.selector.width = 112;

    this.selector.posy = y;
    this.selector.y = y * this.blocksize;
    this.selector.x = x * this.blocksize;
    this.selector.posx = x;
}

Game.prototype.isOver = function(){
    for(var i = 0; i < this.board.length; i++){
        if (this.board[i].y <= 0){
            this.state = 'gameover';
            this.gameend();    
        }
    }
}
Game.prototype.initBoard = function(){
    var boardSetup = [
    [0,10,'purple', 10 * 56],                                    [5,10,'green', 10 * 56],
    [0,11,'red', 11 * 56],[1,11,'blue', 11 * 56],[2,11,'red', 11 * 56],[4,11,'red', 11 * 56],[5,11,'blue', 11 * 56]
    ];

    var self = this;
    for(var x = 0; x < boardSetup.length; x++){
        self.createBlock(boardSetup[x][0], boardSetup[x][1], boardSetup[x][2], boardSetup[x][3]);
    }
}

Game.prototype.fillBoard = function(){
    var bottomRow = boardBottom();

    var self = this;
    if(this.board.length -1 <= 80){
	   self.createRow(bottomRow.posy + 1, bottomRow.y + 56);
    }
}
 
Game.prototype.createRow = function(y, positiony){
    function selectColor(selectRow){
    	rowpatterns = [
    	    ['red','blue','yellow','green','red','red'],
    	    ['blue','yellow','yellow','red','green','purple'],
    	    ['yellow','red','red','green','yellow','purple']
    	];
    	return rowpatterns[selectRow];
    }
        
    if(selectColor(this.rowselection) === undefined){
	   this.rowselection = 0;
    }

    var row = selectColor(this.rowselection);
    
    this.rowselection++;

    for(var x = 0; x < this.cols; x++){
        this.createBlock(x, y, row[x], positiony);
    }    
}

Game.prototype.createBlock = function(x, y, color, positiony){
    var b = new Block();
    b.color = color;
    b.x = x * this.blocksize;
    b.y = positiony;
    b.posx = x;
    b.posy = y;

    this.board.push(b);

}

Game.prototype.move = function(direction){
    var previousposx = this.selector.posx;
    var previcousposy = this.selector.posy;

    var toplimit = boardTop();

    if(direction === 'left' && this.selector.posx > 0){
    	this.selector.posx = previousposx - 1;
    	this.selector.x -= this.blocksize;
    }
    if(direction === 'right' && this.selector.posx < 4){
    	this.selector.posx = previousposx + 1;
    	this.selector.x += this.blocksize;
    }
    if(direction === 'up' && this.selector.posy > toplimit){
    	this.selector.posy = previcousposy - 1;
    	this.selector.y -= this.blocksize;
    }
    if(direction === 'down' && this.selector.y + 112 < 680){
    	this.selector.posy = previcousposy + 1;
    	this.selector.y += this.blocksize;  
    }
}

Game.prototype.swap = function(){
    var firstBlock = findBlock(this.selector.posx, this.selector.posy);
    var secondBlock = findBlock(this.selector.posx + 1, this.selector.posy);
    
    if(firstBlock !== undefined){
    	firstBlock.x += this.blocksize;
    	firstBlock.posx += 1;
    }
    if(secondBlock !== undefined){
    	secondBlock.x -= this.blocksize;
    	secondBlock.posx -= 1;
    }
}

Game.prototype.moveDown = function(){
    for(var i = 0; i < this.board.length; i++){
    	if(this.board[i].falling == true && this.board[i].active == true){
    	    this.board[i].y += this.blocksize;
    	    this.board[i].posy += 1;
    	}
    }
}

Game.prototype.findMatch = function(){
    var matching = [];

    function checkMatching(firstBlock){
        var rightBlock = findBlock(block.posx + 1, block.posy);
        var leftBlock = findBlock(block.posx - 1, block.posy);
       

        if(isMatching(rightBlock, leftBlock, firstBlock.color) && firstBlock.falling == false){
            //console.log(firstBlock, rightBlock, leftBlock);
            var lefterBlock = findBlock(block.posx + 2, block.posy);
            var righterBlock = findBlock(block.posx - 2, block.posy);

            if(lefterBlock !== undefined && lefterBlock.color == firstBlock.color){
                matching.push(firstBlock, rightBlock, leftBlock, lefterBlock);
            } else if(righterBlock !== undefined && righterBlock.color == firstBlock.color){
                matching.push(firstBlock, rightBlock, leftBlock, righterBlock);
            } else {
                matching.push(firstBlock, rightBlock, leftBlock);
            }

        }

        var upBlock = findBlock(block.posx, block.posy - 1);
        var downBlock = findBlock(block.posx, block.posy + 1);
        
        if (isMatching(upBlock, downBlock, firstBlock.color) && firstBlock.falling == false){
            var upperBlock = findBlock(block.posx, block.posy - 2);
            var downerBlock = findBlock(block.posx, block.posy + 2);

            if(downerBlock !== undefined && downerBlock.color == firstBlock.color){
                matching.push(firstBlock, upBlock, downBlock, downerBlock);
            } else if(downerBlock !== undefined && downerBlock.color == firstBlock.color){
                matching.push(firstBlock, upBlock, downBlock, downerBlock);
            } else {
                matching.push(firstBlock, upBlock, downBlock);
            }
        }

    }

    for(var i = 0; i < this.board.length; i++){
	   var block = this.board[i];
       //this.board[i].isMatching()
    	if(matching.length < 3){
    	   checkMatching(block);
    	   removeBlocks(matching);
    	   this.score += matching.length * 100;	    
        }    
    }
}

Game.prototype.gameend = function(){
    this.running = false;
    this.board.length = 0;
    this.selector = null;

    var counter = 4;
    var countdown = setInterval(function(){
        counter--;
        if(counter <= 0){
            clearInterval(countdown);
            counter = 4;
        }else{
            for(var i = this.canvas.height; i > 0; i--){
                this.ctx.clearRect(0, i, this.canvas.width, 56);  
            }
            this.ctx.strokeStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.font = '30px Arial';
            this.ctx.fillText('GAME OVER', game.canvas.width / 2, game.canvas.height / 2);
        }
    }, 1000);

    

}

Game.prototype.pause = function(){
    this.selector.stop();
    for(var i = 0; i < this.board.length; i++){
	   this.board[i].stop();
    }
}
 
Game.prototype.update = function(){
    if(this.state !== 'gameover'){
        var time = 0;
        for(var i = 0; i < this.board.length; i++){
            this.board[i].update();
        	this.board[i].isActive();
        	this.board[i].isFalling();
        }

        if(this.state == 'active'){
        	this.score++;
        	this.selector.update();
        	this.findMatch();
        	this.moveDown();
        	this.isOver();
            this.fillBoard();
        }

        window.addEventListener('keydown', keyActions, true);
        
    }
    var self = this;
 
    if(this.state == 'gameover'){
        //stopeverything
        self.pause();
        this.state = 'gameover';
    }
 
    if(FPS == 0){
        setZeroTimeout(function(){
            self.update();
        });
    }else{
        setTimeout(function(){
            self.update();
        }, 1000/FPS);
    }

    document.getElementById('score').innerHTML = 'Score: ' + game.score;
    document.getElementById('time').innerHTML = 'Time: ' + timer();
    document.getElementById('state').innerHTML = 'State: ' + game.state;
}
 
Game.prototype.display = function(){
    if(game.state == 'active'){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(var i = 0; i < this.board.length; i++){
            if(this.board[i].y < 700){
               draw(this.board[i], 'block');
            } 
        }
        draw(this.selector);
 	
    }
    var self = this;
    requestAnimationFrame(function(){
        self.display();
    });
}
 
window.onload = function(){
    this.canvas = document.querySelector('#wistful');
    this.ctx = this.canvas.getContext('2d');
    
    var sprites = {
    	blueBlock:'./assets/images/blueblock.png',
    	greenBlock:'./assets/images/greenblock.png',
    	purpleBlock:'./assets/images/purpleblock.png',
    	redBlock:'./assets/images/redblock.png',
    	yellowBlock:'./assets/images/yellowblock.png'
    }

    loadImages(sprites, function(imgs){
    	images = imgs;
    	game = new Game();
    })
 
}

var start = function(){
    if(game.running == false){
        game.start(); 
    }

}