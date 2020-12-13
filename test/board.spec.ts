import { Board } from "../src/board";

describe("Place piece", function () {
  it("add a piece in the first column", function () {
    const result: number[][] = [[1], [], [], [], [], [], []];
    const board: Board = new Board(7, 6);
    board.placePiece(0, 1);
    expect(board.board).toStrictEqual(result);
  });

  it("should detect horizontal line", function () {
    const board = new Board(7, 6);
    board.placePiece(0, 1);
    board.placePiece(1, 1);
    board.placePiece(2, 1);
    board.placePiece(3, 1);
    expect(board.checkWinner(1)).toBeTruthy;
  });

  it("should detect vertical line", function () {
    const board = new Board(7, 6);
    board.placePiece(0, 1);
    board.placePiece(0, 1);
    board.placePiece(0, 1);
    board.placePiece(0, 1);
    expect(board.checkWinner(1)).toBeTruthy;
  });

  it("should detect diagonal line", function () {
    const board = new Board(7, 6);
    board.placePiece(0, 1);
    board.placePiece(1, 0);
    board.placePiece(1, 1);
    board.placePiece(2, 0);
    board.placePiece(2, 0);
    board.placePiece(2, 1);
    board.placePiece(3, 0);
    board.placePiece(3, 0);
    board.placePiece(3, 0);
    board.placePiece(3, 1);
    expect(board.checkWinner(1)).toBeTruthy;
  });

  it("should not detect line", function () {
    const board = new Board(7, 6);
    board.placePiece(0, 1);
    board.placePiece(1, 1);
    board.placePiece(2, 1);

    expect(board.checkWinner(1)).toBeFalsy;
  });

  it("should not detect line with one piece", function () {
    const board = new Board(7, 6);
    board.placePiece(0, 1);

    expect(board.checkWinner(1)).toBeFalsy;
  });
});
