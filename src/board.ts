import colors from "colors/safe";
import { println, print } from "./utils";

export class Board {
  board: number[][];
  nbColumns: number;
  nbFloor: number;

  constructor(nbColumn: number, nbFloor: number) {
    this.nbFloor = nbFloor;
    this.nbColumns = nbColumn;
    this.board = [];
    for (let i = 0; i < this.nbColumns; i++) {
      this.board.push([]);
    }
  }

  public placePiece(columnNumber: number, piece: number) {
    if (columnNumber <= 0 && columnNumber > this.nbColumns) {
      throw new Error("Column must be between 0 and " + this.nbColumns);
    }
    const column: number[] = this.board[columnNumber - 1];
    if (column.length >= this.nbFloor) {
      throw new Error("Column already full");
    }
    column.push(piece);
  }

  public checkWinner(player: number): boolean {
    for (const [columnIndex, column] of this.board.entries()) {
      for (const [pieceIndex, piece] of column.entries()) {
        if (piece != player) {
          continue;
        }
        let counter: number = 0;
        for (let j = 0; j < 4; j++) {
          if (this.board[columnIndex][pieceIndex + j] == player) counter++;
          else break;
        }
        if (counter >= 4) return true;

        counter = 0;
        for (let j = 0; j < 4; j++) {
          if (this.board[columnIndex + j][pieceIndex] == player) counter++;
          else break;
        }
        if (counter >= 4) return true;

        counter = 0;
        for (let j = 0; j < 4; j++) {
          if (this.board[columnIndex + j][pieceIndex + j] == player) counter++;
          else break;
        }
        if (counter >= 4) return true;
      }
    }
    return false;
  }

  get availableColumns(): number[] {
    const available: number[] = [];
    // Browse all columns
    this.board.forEach((column, index) => {
      if (column.length < this.nbFloor) {
        available.push(index + 1);
      }
    });
    return available;
  }

  public display(): void {
    // Browse all flours
    for (let i = this.nbFloor; i >= 0; i--) {
      // Browse all columns
      for (const column of this.board) {
        print("|");
        if (column[i] == 0) print(colors.yellow("o"));
        // player 1 piece
        else if (column[i] == 1) print(colors.red("o"));
        // player 2 piece
        else print(" "); // no piece
      }
      println("|");
    }
  }
}
