import { Board } from "../src/board";

describe("Place piece", function () {
  it("add a piece in the first column", function () {
    const result: number[][] = [[1], [], [], [], [], [], []];
    const board: Board = new Board(7, 6);
    board.placePiece(1, 1);
    expect(board.board).toStrictEqual(result);
  });
});
