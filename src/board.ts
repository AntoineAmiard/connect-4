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

  /**
   * Place a piece on the board
   *
   * @param column the number of the column
   * @param piece the piece symbol
   */
  public placePiece(column: number, piece: number) {
    if (column <= 0 && column > this.nbColumns) {
      throw new Error("Column must be between 0 and " + this.nbColumns);
    }
    const selectedColumn: number[] = this.board[column];
    if (selectedColumn.length >= this.nbFloor) {
      throw new Error("Column already full");
    }
    selectedColumn.push(piece);
  }

  /**
   * check if the player win
   * @param player the player's symbol
   */
  public checkWinner(player: number): boolean {
    // browse all columns
    for (const [columnIndex, column] of this.board.entries()) {
      // browse all pice in the column
      for (const [pieceIndex, piece] of column.entries()) {
        // if piece not belong to the player,
        if (piece != player) {
          continue;
        }

        let counter = 0;
        const directions = [
          [true, false],
          [false, true],
          [true, true],
        ];
        for (let i = 0; i < 3; i++) {
          counter = 0;
          for (let j = 0; j < 4; j++) {
            try {
              if (this.board[columnIndex + (directions[0] ? i : 0)][pieceIndex + (directions[0] ? j : 0)] == player) {
                counter++;
              } else {
                break;
              }
            } catch (e) {
              break;
            }
          }
          if (counter >= 4) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Return the availables columns
   */
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

  /**
   * Display the board
   */
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

    for (let i = 1; i <= this.nbColumns; i++) {
      print(" ");
      print(this.availableColumns.includes(i) ? i.toString() : " ");
    }
    println("");
  }
}
