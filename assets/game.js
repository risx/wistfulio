var game;
var FPS = 60;

var images = {};

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
  this.speed = 0.15;
  this.time = 0;
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
  this.speed = 0.15;
  this.time = 0;
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

  if(firstBlock !== undefined){
    firstBlock.x += this.blocksize;
    firstBlock.posx += 1;
  }
  if(secondBlock !== undefined){
    secondBlock.x -= this.blocksize;
    secondBlock.posx -= 1;
  }
};

Game.prototype.moveDown = function(){
  for(var i = 0; i < this.board.length; i++){
    if(this.board[i].falling == true && this.board[i].active == true){
      this.board[i].y += this.blocksize;
      this.board[i].posy += 1;
    }
  }
};

Game.prototype.findMatch = function(){
  var yrows = boardBottom();

  function setMatching(amount, direction, x, y){
    if(direction == 'horiztonal'){
      for(var i = x; i < x + amount; i++){
        var block = findBlock(i, y);
        block.matched = true;
      }
    }
    if (direction == 'vertical'){
      for(var i = y; i < y + amount; i++){
        var block = findBlock(x, i);
        block.matched = true;
      }
    }
  };

  for(var i = 0; i < this.board.length; i++){
    var matching = 1;
    var block = this.board[i];
    var initiailpos;
		
    //search horizontally
    for(var x = block.posx; x < this.cols; x++){
      if(searchMatching(x, block.posy, x + 1, block.posy)){
          initiailpos = x - 1;
          matching++;
      }else{
        if(matching >= 3){
          this.numbermatched = matching;
          setMatching(matching, 'horiztonal', initiailpos, block.posy);
        }
        matching = 1;
        initiailpos;
      }
      if(matching > 3){
        initiailpos--;
        this.numbermatched = matching;
        setMatching(matching, 'horiztonal', initiailpos, block.posy);
      }
    };

      //search vertically
    for(var y = block.posy; y < yrows.posy; y++){
      if(searchMatching(block.posx, y, block.posx, y + 1)){
          initiailpos = y - 1;
          matching++;
      }else{
        if(matching >= 3){
          console.log(initiailpos);
          this.numbermatched = matching;
          setMatching(matching, 'vertical', block.posx, initiailpos);
        }
        matching = 1;
        initiailpos;

        }
      }
      if(matching > 3){
        if(matching > 4){
          console.log(initiailpos);
          this.numbermatched = matching;
          setMatching(matching, 'vertical', block.posx, initiailpos - 4);
        }else {
          console.log(initiailpos);
          this.numbermatched = matching;
          setMatching(matching, 'vertical', block.posx, initiailpos - 1);
        }
    }

  }
};

Game.prototype.destroyBlocks = function(){
  if(this.numbermatched >= 3){
    for(var i = 0; i < this.board.length; i++){
      if(this.board[i].matched == true){
        removeBlocks(this.board[i]);
      }
    }
    this.numbermatched = 0;
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
    var time = 0;
    for(var i = 0; i < this.board.length; i++){
      this.board[i].update();
        this.board[i].isActive();
        this.board[i].isFalling();
    }

    if(this.state == 'active'){
        this.selector.update();
        //this.destroyBlocks();
        this.moveDown();
        this.fillBoard();
        this.findMatch();
          this.isOver();
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

  document.getElementById('score').innerHTML = 'Score: ' + game.score;
  document.getElementById('time').innerHTML = 'Time: ' + timer();
};

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
  var maindisplay = requestAnimationFrame(function(){
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

  loadImages(sprites, function(imgs){
    images = imgs;
    game = new Game();
  })

};

var start = function(){
  if(game.running == false){
    game.start();
  }

};