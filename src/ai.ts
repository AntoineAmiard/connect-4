import { Board } from "./board";
import { Position, Score } from "./interfaces";
import { Direction, User } from "./types";

export class AI {
  board: Board;
  score: Score = {
    1: 1,
    2: 50,
    3: 500,
    4: 500000,
  };

  constructor(board: Board) {
    this.board = board;
  }

  setBoard(board: Board) {
    this.board = board;
  }

  evaluateBoard(board: Board, player: User): number {
    let score = 0;
    // browse all columns
    for (const [columnIndex, column] of board.board.entries()) {
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
          const line = this.board.checkLine({ column: columnIndex, piece: pieceIndex }, direction, piece);
          score += this.score[line];
        }
      }
    }
    return score;
  }

  play(): number {
    let bestSCore = -Infinity;
    let move;
    for (const column of this.board.availableColumns) {
      this.board.placePiece(column, User.AI);
      // let score = this.evaluateBoard(User.AI);
      let score = this.minimax(this.board, 4, User.PLAYER);
      this.board.removePiece(column);
      console.log(`Column ${column} has a score ${score}`);
      if (score > bestSCore) {
        bestSCore = score;
        move = column;
      }
    }
    return move;
  }

  minimax(board: Board, depth: number, player: User): number {
    const result = this.evaluateBoard(board, User.AI);
    if (depth == 0 || result == 4) {
      return result;
    }

    // AI Playing
    if (player == User.AI) {
      let bestSCore = -Infinity;
      for (const column of this.board.availableColumns) {
        this.board.placePiece(column, User.AI);
        let score = this.minimax(board, depth - 1, User.PLAYER);
        this.board.removePiece(column);
        bestSCore = Math.max(bestSCore, score);
      }
      return bestSCore;

      // Player playing
    } else {
      let bestSCore = +Infinity;
      for (const column of this.board.availableColumns) {
        this.board.placePiece(column, User.PLAYER);
        let score = this.minimax(board, depth - 1, User.AI);
        this.board.removePiece(column);
        bestSCore = Math.min(bestSCore, score);
      }
      return bestSCore;
    }
  }
}
