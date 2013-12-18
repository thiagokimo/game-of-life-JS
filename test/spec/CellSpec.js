describe("Cell", function () {
  it("must be comparable", function () {
    var cellA = new Cell(1,2);
    var cellB = new Cell(1,2);

    expect(cellA).toEqual(cellB);
  });

  it("must have coordinates", function () {
    var cell = new Cell(1,1);

    expect(cell.x).toBeDefined();
    expect(cell.y).toBeDefined();
  });

  it("can die", function () {
    var cell = new Cell(1,1);

    cell.die();

    expect(cell.alive).toBe(false);
  });

  it("can reborn", function () {
    var cell = new Cell(1,1);

    cell.die();
    expect(cell.alive).toBe(false);

    cell.reborn();
    expect(cell.alive).toBe(true);
  });
});
