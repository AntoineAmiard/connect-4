import colors from "colors/safe";
import { println, print } from "./utils";
import { Direction, Piece } from "./types";
import { Position } from "./interfaces";

export class Board {
  board: Piece[][];
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
  public placePiece(column: number, piece: Piece) {
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
  public checkWinner(player: Piece): boolean {
    // browse all columns
    for (const [columnIndex, column] of this.board.entries()) {
      // browse all pice in the column
      for (const [pieceIndex, piece] of column.entries()) {
        // if piece not belong to the player,
        if (piece != player) {
          continue;
        }

        const directions: Direction[] = [
          Direction.VERTICAL,
          Direction.HORIZONTAL,
          Direction.DIAGONAL_UP,
          Direction.DIAGONAL_DOWN,
        ];
        for (const direction of directions) {
          if (this.checkLine({ column: columnIndex, piece: pieceIndex }, direction, player)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * check if a line exist from the param piece
   * @param column
   * @param piece
   * @param direction
   * @param player
   */
  checkLine(position: Position, direction: Direction, player: Piece) {
    for (let j = 0; j < 3; j++) {
      switch (direction) {
        case Direction.HORIZONTAL:
          position.column += 1;
          break;
        case Direction.VERTICAL:
          position.piece += 1;
          break;
        case Direction.DIAGONAL_UP:
          position.column += 1;
          position.piece += 1;
          break;
        case Direction.DIAGONAL_DOWN:
          position.column += 1;
          position.piece -= 1;
          break;
      }
      try {
        if (this.board[position.column][position.piece] != player) {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return true;
  }

  /**
   * Return the availables columns
   */
  get availableColumns(): number[] {
    const available: number[] = [];
    // Browse all columns
    this.board.forEach((column, index) => {
      if (column.length < this.nbFloor) {
        available.push(index);
      }
    });
    return available;
  }

  private getPlayerColor(piece: Piece): string {
    if (piece == 0) {
      return colors.yellow("o");
    } else if (piece == 1) {
      return colors.red("o");
    }

    return " ";
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
        print(this.getPlayerColor(column[i]));
      }
      println("|");
    }

    for (let i = 0; i < this.nbColumns; i++) {
      print(" ");
      print(this.availableColumns.includes(i) ? (i + 1).toString() : " ");
    }
    println("");
  }
}
