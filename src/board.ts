import colors from "colors/safe";
import { println, print } from "./utils";
import { Direction, Piece, User } from "./types";
import { Position } from "./interfaces";

export class Board {
  board: User[][];
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
   * Add a piece in the column
   *
   * @param column the number of the column
   * @param piece the piece symbol
   */
  placePiece(column: number, player: User) {
    this.board[column].push(player);
  }

  /**
   * Remove the last piece of the column
   * @param column the number of the column
   */
  removePiece(column: number) {
    this.board[column].pop();
  }

  /**
   * check if the player win
   * @param player the player's symbol
   */
  checkWinner(player: User): boolean {
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
          if (this.checkLine({ column: columnIndex, piece: pieceIndex }, direction, piece) == 4) {
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
  checkLine(position: Position, direction: Direction, player: User) {
    let counter = 1;
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
          return counter;
        }
      } catch (e) {
        return counter;
      }
      counter++;
    }
    return counter;
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

  /**
   * Return the player color
   * @param piece
   */
  getPlayerColor(piece: User): string {
    if (piece == User.PLAYER) {
      return colors.yellow("o");
    } else if (piece == 1) {
      return colors.red("o");
    }

    return " ";
  }

  /**
   * Display the board
   */
  display(): void {
    // Browse all flours
    for (let i = this.nbFloor; i > 0; i--) {
      // Browse all columns
      for (const column of this.board) {
        print("|");
        print(this.getPlayerColor(column[i - 1]));
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
