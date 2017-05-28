var game;
var FPS = 60;

var images = {};
var sounds = {};

var speed = function(fps){
  FPS = parseInt(fps);
};

var Game = function(){
  this.running = false;
  this.canvas = document.querySelector('#wistful');
  this.ctx = this.canvas.getContext('2d');

  this.board = [];
  this.selector = null;
  this.score = 0;
  this.speed = 3;
  this.time = 0;
  this.globaltick = 0;
  this.findtick = 0;
  this.state = null;
  this.rowselection = 0;

  this.numbermatched = 0;

  this.rows = 14;
  this.cols = 6;
  this.blocksize = 56;

  this.startTime = 0;

};

Game.prototype.start = function(){
  this.running = true;
  this.board.length = 0;
  this.selector = 0;
  this.score = 0;
  this.time = 0;
  this.globaltick = 0;
  this.state = null;
  this.rowselection = 0;

  this.numbermatched = 0;

  this.startTime = Math.floor(Date.now() / 1000);

  var counter = 4;

  var countdown = setInterval(function(){
    counter--;
    if(counter <= 0){
      clearInterval(countdown);
      game.state = 'active';
      game.initSelector(1, 10);
      game.initBoard();
      game.fillBoard();
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

};

Game.prototype.initSelector = function(x, y){
  this.selector = new Block();

  this.selector.width = 112;

  this.selector.posy = y;
  this.selector.y = y * this.blocksize;
  this.selector.x = x * this.blocksize;
  this.selector.posx = x;
};

Game.prototype.isOver = function(){
  for(var i = 0; i < this.board.length; i++){
    if (this.board[i].y <= 0){
      this.state = 'gameover';
      this.gameend();
    }
  }
};

Game.prototype.initBoard = function(){
  var boardSetup = [
  [0,10,'red', 10 * 56],                                    [5,10,'purple', 10 * 56],
  [0,11,'red', 11 * 56],[1,11,'blue', 11 * 56],[2,11,'red', 11 * 56],[4,11,'red', 11 * 56],[5,11,'red', 11 * 56]
  ];

  var self = this;
  for(var x = 0; x < boardSetup.length; x++){
      self.createBlock(boardSetup[x][0], boardSetup[x][1], boardSetup[x][2], boardSetup[x][3]);
  }
};

Game.prototype.fillBoard = function(){
  var bottomRow = boardBottom();

  var self = this;
  if(this.board.length - 1 <= 80){
    self.createRow(bottomRow.posy + 1, bottomRow.y + 56);
  }
};

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
};

Game.prototype.createBlock = function(x, y, color, positiony){
  var b = new Block();
  b.color = color;
  b.x = x * this.blocksize;
  b.y = positiony;
  b.posx = x;
  b.posy = y;

  this.board.push(b);
};

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
};

Game.prototype.swap = function(){
  var firstBlock = findBlock(this.selector.posx, this.selector.posy);
  var secondBlock = findBlock(this.selector.posx + 1, this.selector.posy);

  if(firstBlock !== undefined && secondBlock !== undefined
    && firstBlock.matched === false && firstBlock.falling === false && firstBlock.floating === false
    && secondBlock.matched === false && secondBlock.falling === false && secondBlock.floating === false){
    firstBlock.x += this.blocksize;
    firstBlock.posx += 1;
    secondBlock.x -= this.blocksize;
    secondBlock.posx -= 1;
  } else 
  if(secondBlock !== undefined && secondBlock.matched === false 
     && secondBlock.falling === false && secondBlock.floating === false
     && firstBlock === undefined){
    secondBlock.x -= this.blocksize;
    secondBlock.posx -= 1;
  } else 
  if(firstBlock !== undefined && firstBlock.matched === false 
      && firstBlock.falling === false && firstBlock.floating === false
      && secondBlock === undefined){
    firstBlock.x += this.blocksize;
    firstBlock.posx += 1;
  }
};

Game.prototype.moveDown = function(){
  for(var i = 0; i < this.board.length; i++){
    if(this.board[i].falling === true && this.board[i].floating === true && this.board[i].active === true){
        var below = findBlock(this.board[i].posx,this.board[i].posy + 1);
        if(below === undefined){
          this.board[i].y += this.blocksize;
          this.board[i].posy += 1;
        }
    }
  }
};

Game.prototype.findMatch = function(){
  var yrows = boardBottom();

	function setMatchedHor(start, row, matching){
		for(var i = start; i < start + matching; i++){
			var block = findBlock(i, row);
      //block.matchedindex++;
      block.matched = true;
      game.numbermatched++;
		}
	};

	function setMatchedVert(start, col, matching){
    for(var i = start - matching; i < start; i++){
      var block = findBlock(col, i);
      block.matchedindex++;
      block.matched = true;
      game.numbermatched++;
    }
	};

	//search horizontally
	for(var y = 0; y < yrows.posy; y++){
		var matching = 1;
		var startIndex = 0;
		for(var x = 1; x < 6; x++){
			var first_block = findBlock(x, y);
			var second_block = findBlock(x - 1, y);
			if(isMatching(first_block, second_block)){
				matching++;
			}else{
				if(matching >= 3){
					setMatchedHor(startIndex, y, matching);
				}	
				matching = 1;
				//startIndex++;
        startIndex = x;
			}
		}	
		if(matching >= 3){
			setMatchedHor(startIndex, y, matching);
		}		
	};

	//search vertically
	for(var x = 0; x < 6; x++){
		var matching = 1;
		var startIndex = 0;
		for(var y = 0; y < yrows.posy; y++){
			var first_block = findBlock(x, y);
			var second_block = findBlock(x, y - 1);
      startIndex = y;
			if(isMatching(first_block, second_block)){
				matching++;
			}else{
				if(matching >= 3){
					setMatchedVert(startIndex, x, matching);
				}
				matching = 1;
			}
		}
		if(matching >= 3){
				setMatchedVert(startIndex, x, matching);
		}
	};
};

Game.prototype.destroyBlocks = function(){
  console.log(this.numbermatched);
  if(this.numbermatched >= 3){
    for(var i = 0; i < this.board.length; i++){
      if(this.board[i].matched == true){
        removeBlocks(this.board[i]);
        this.numbermatched--;
      }
    }
  }
};

Game.prototype.shiftBlocksUp = function(){
  var inc = 5;
  for(var i = 0; i < this.board.length; i++){
    if(this.board[i].y < 680 && this.board[i].active === false){
      for(var i = 0; i < this.board.length; i++){  
        this.board[i].y -= inc;
      }
      this.selector.y -= inc;
      this.score += 5;
    }
  }
};

Game.prototype.gameend = function(){
  this.running = false;
  this.board.length = 0;
  this.selector = null;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.strokeStyle = 'white';
  this.ctx.textAlign = 'center';
  this.ctx.font = '30px Arial';
  this.ctx.fillText('GAME OVER', game.canvas.width / 2, game.canvas.height / 2);
};

Game.prototype.pause = function(){
  this.selector.stop();
  for(var i = 0; i < this.board.length; i++){
    this.board[i].stop();
  };
};

Game.prototype.update = function(){
    if(this.state !== 'gameover'){

    if(this.state == 'active'){

      this.globaltick++;
      this.findtick++;

      if(this.globaltick >= 35){
        this.selector.update();
        for(var i = 0; i < this.board.length; i++){   
          this.board[i].update();
        }
        this.globaltick = 0;
      };

      if(this.findtick >= 20){
        this.findMatch();
        this.findtick = 0;
      };

      this.moveDown();
      this.fillBoard();
      this.isOver();

      document.getElementById('score').innerHTML = 'Score: ' + game.score;
      document.getElementById('time').innerHTML = 'Time: ' + timer();
    };
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
};

Game.prototype.display = function(){

  if(game.state == 'active'){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(var i = 0; i < this.board.length; i++){
        this.board[i].isActive();
        this.board[i].destroy();
        this.board[i].prepareFloat();
        this.board[i].countdown();
        this.board[i].isFalling();
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
};

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

  var sounds = {
    move:'./assets/sounds/move.wav'
  }

  loadSounds(sounds, function(snds){
    sounds = snds;
  });
  loadImages(sprites, function(imgs){
    images = imgs;
    game = new Game();
  });

};

var start = function(){
  if(game.running == false){
    game.start();
  }

};