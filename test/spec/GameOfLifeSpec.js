describe("The Game of Life", function () {

  describe("Rule #1: Any live cell with fewer than two live neighbours dies, as if caused by under-population.", function () {
    it("cells with one neighbour should die", function() {
      var world = new World(2,2);

      world.kill(1,1);
      world.kill(0,0);

      world.rotate();

      var expectedCells = [new Cell(0,0,false), new Cell(0,1,false), new Cell(1,0,false), new Cell(1,1,false)];

      expect(world.getCells()).toEqual(expectedCells);
    });

    it("a live cell with no live neighbours should die", function() {
      var world = new World(3,3);

      world.kill(0,0);
      world.kill(1,0);
      world.kill(2,0);
      world.kill(0,1);
      world.kill(2,1);
      world.kill(0,2);
      world.kill(1,2);
      world.kill(2,2);

      world.rotate();

      expect(world.get(1,1).alive).toBeFalsy();
    });
  });

  describe("Rule #2: Any live cell with two or three live neighbours lives on to the next generation.", function() {
    it("cells with two live neighbours must live", function() {
      var world = new World(3,3);

      world.kill(0,2);
      world.kill(1,2);
      world.kill(2,2);
      world.kill(0,0);
      world.kill(1,0);
      world.kill(2,0);

      world.rotate();

      expect(world.get(1,1).alive).toBeTruthy();
    });
  });

  describe("Rule #3: Any live cell with more than three live neighbours dies, as if by overcrowding.", function() {
    it("cells with 4 live neighbours must die", function() {
      var world = new World(3,3);

      world.kill(0, 2);
      world.kill(1, 2);
      world.kill(2, 2);
      world.kill(2, 0);

      world.rotate();

      expect(world.get(1,1).alive).toBeFalsy();
    });

    it("a cell surrounded by live neighbours must die", function() {
      var world = new World(3,3);

      world.rotate();

      expect(world.get(1,1).alive).toBeFalsy();
    });
  });

  describe("Rule #4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", function() {
    it("cells with 3 live neighbours will revive", function() {
      var world = new World(3,3);

      world.kill(1, 2);
      world.kill(2, 2);
      world.kill(2, 1);
      world.kill(2, 0);
      world.kill(1, 0);
      world.kill(1, 1);

      world.rotate();

      expect(world.get(1,1).alive).toBeTruthy();
    });
  });
});
