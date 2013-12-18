function World (width, height, random) {
  this.width = width;
  this.height = height;

  if(random === undefined)
    this.$setup(false);
  else
    this.$setup(random);
};

World.prototype.rotate = function() {
  var futureLiveCells = [];
  var futureDeadCells = [];

  var that = this;
  this.cells.forEach( function (cell) {
    var neighbours = that.$liveNeighboursOf(cell.x, cell.y);

    if(that.$rule1(cell, neighbours))
      futureDeadCells.push(cell);

    if(that.$rule2(cell,neighbours))
      futureLiveCells.push(cell);

    if(that.$rule3(cell,neighbours))
      futureDeadCells.push(cell);

    if(that.$rule4(cell,neighbours))
      futureLiveCells.push(cell);

  });

  this.$updateBoard(futureLiveCells, futureDeadCells);
  this.$updateCells();
};

World.prototype.$rule1 = function(cell, neighbours) {
  if (cell.alive && neighbours.length < 2) {
    return true;
  } else {
    return false;
  }
};

World.prototype.$rule2 = function(cell, neighbours) {
  if(cell.alive && (neighbours.length === 3 || neighbours.length === 2) )
    return true;
  else
    return false;
};

World.prototype.$rule3 = function(cell, neighbours) {
  if(cell.alive && neighbours.length > 3)
    return true;
  else
    return false;
};

World.prototype.$rule4 = function(cell, neighbours) {
  if(!cell.alive && neighbours.length === 3)
    return true;
  else
    return false;
};

World.prototype.$liveNeighboursOf = function(x,y) {
  var liveNeighbours = [];

  //up-left
  if (x-1 >= 0 && y+1 <= this.height-1) {
    var neighbour = this.get(x-1,y+1);
    if (neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  //up
  if(y+1 <= this.height-1) {
    var neighbour = this.get(x,y+1);
    if(neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  //up-right
  if(x+1 <= this.width-1 && y+1 <= this.height-1) {
    var neighbour = this.get(x+1,y+1);
    if(neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  //left
  if(x-1 >= 0) {
    var neighbour = this.get(x-1,y);
    if(neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  //right
  if(x+1 <= this.width-1) {
    var neighbour = this.get(x+1,y);
    if(neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  //down-left
  if(x-1 >= 0 && y-1 >= 0) {
    var neighbour = this.get(x-1,y-1);
    if(neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  //down
  if(y-1 >= 0) {
    var neighbour = this.get(x,y-1);
    if(neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  //down-right
  if(x+1 <= this.width-1 && y-1 >= 0) {
    var neighbour = this.get(x+1,y-1);
    if (neighbour.alive) {
      liveNeighbours.push(neighbour);
    }
  }

  return liveNeighbours;
};

World.prototype.revive = function(x,y) {
  this.board[x][y].reborn();
};

World.prototype.kill = function(x,y) {
  this.board[x][y].die();
};

World.prototype.get = function(x,y) {
  return this.board[x][y];
};

World.prototype.$setup = function(random) {
  this.$createBoard();
  this.$populateBoard(random);
  this.$updateCells();
};

World.prototype.$populateBoard = function(random) {
  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      if(random === true)
        this.board[i][j] = new Cell(i,j,[true,false][Math.round(Math.random())]);
      else
        this.board[i][j] = new Cell(i,j);
    }
  }
};

World.prototype.$createBoard = function() {
  this.board = [];

  for (var i = 0; i < this.width; i++) {
    this.board[i] = new Array(this.height);
  };
};

World.prototype.$updateCells = function() {
  this.cells = [];
  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      this.cells.push(this.board[i][j]);
    }
  }
};

World.prototype.$updateBoard = function(liveCells, deadCells) {
  var that = this;

  liveCells.forEach(function(cell) {
    that.revive(cell.x, cell.y);
  });

  deadCells.forEach(function(cell) {
    that.kill(cell.x, cell.y);
  });
};

World.prototype.getCells = function() {
  return this.cells;
};

World.prototype.getBoard = function() {
  return this.board;
};
