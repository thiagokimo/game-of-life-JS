describe("World", function () {
  it("must have an array of cells", function() {
    var world = new World(3,3);

    expect(world.getCells()).toBeDefined();
  });

  it("must have a board of cells", function () {
    var world = new World(3,3);

    expect(world.getBoard()).toBeDefined();
  });

  it("must have the number of cells equals its height * width", function () {
    var world = new World(3,3);

    expect(world.getCells().length).toEqual(9);
  });

  it("must retrieve a cell at a given position", function() {
    var world = new World(3,3);
    var expectedCell = new Cell(1,1);

    expect(expectedCell).toEqual(world.get(1,1));
  });

  it("must kill a cell at a given position", function() {
    var world = new World(3,3);

    world.kill(1,1);

    var deadCell = world.get(1,1);

    expect(deadCell.alive).toBe(false);
  });

  it("must revive a cell at a given position", function() {
    var world = new World(3,3);

    world.kill(1,1);
    expect(world.get(1,1).alive).toBe(false);

    world.revive(1,1);
    expect(world.get(1,1).alive).toBe(true);
  });
});
