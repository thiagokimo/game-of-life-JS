(function (window) {
  'use strict';

  var numberOfColumns, numberOfRows, columnWidth, rowHeight;
  var ctx = window.document.getElementById('world').getContext("2d");
  var world;

  var requestAnimFrame =  window.requestAnimationFrame ||
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame ||
                          window.oRequestAnimationFrame ||
                          window.msRequestAnimationFrame ||
                          function(callback) {
                              window.setTimeout(callback, 1000 / 60);
                          };

  function setup() {
    numberOfColumns = 960 / 4;
    numberOfRows = 400 / 4;
    columnWidth = 960 / numberOfColumns;
    rowHeight = 400 / numberOfRows;
    world = new World(numberOfColumns, numberOfRows, true);
  };

  function update(world) {
    drawCells(world);
    world.rotate();
    requestAnimationFrame(function(){update(world)});
  };

  function drawCells (world) {
    world.getCells().forEach(function (cell) {
      if (cell.alive) {
        ctx.fillStyle = "#000000";
        ctx.fillRect( cell.x * columnWidth, cell.y * rowHeight,
                      cell.x * columnWidth + columnWidth, cell.y * rowHeight + rowHeight);
      } else {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect( cell.x * columnWidth, cell.y * rowHeight,
                      cell.x * columnWidth + columnWidth, cell.y * rowHeight + rowHeight);
      }
    });
  };

  function start () {
    setup();
    update(world);
  };

  window.onload = start;

}(this));
