function Cell (x,y, alive) {
  this.x = x;
  this.y = y;

  if(alive === undefined)
    this.alive = true;
  else
    this.alive = alive;
};

Cell.prototype.die = function() {
  this.alive = false;
};

Cell.prototype.reborn = function() {
  this.alive = true;
};
