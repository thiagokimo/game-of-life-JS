describe("Cell", function () {
  it("must be comparable", function () {
    var cellA = new Cell(1,2);
    var cellB = new Cell(1,2);

    expect(cellA).toEqual(cellB);
  });

  it("must have coordinates", function () {
    var cell = new Cell(1,1);

    expect(Object.prototype.toString.call(cell.x)).toEqual('[object Number]');
    expect(Object.prototype.toString.call(cell.y)).toEqual('[object Number]');
  });

  it("can die", function () {
    var cell = new Cell(1,1);

    cell.die();

    expect(cell.alive).toBeFalsy();
  });

  it("can reborn", function () {
    var cell = new Cell(1,1);

    cell.die();
    cell.reborn();

    expect(cell.alive).toBeTruthy();
  });
});
