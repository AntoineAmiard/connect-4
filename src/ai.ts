import { Direction, Piece, User } from "./types";
import { Position, Score } from "./interfaces";

import { Board } from "./board";

export class AI {
  score: Score = {
    1: 1,
    2: 50,
    3: 500,
    4: 500000,
  };

  evaluateBoard(board: Board, player :User): number {
    let score = 0;
    // browse all columns
    for (const [columnIndex, column] of board.board.entries()) {
      // browse all pice in the column
      for (const [pieceIndex, piece] of column.entries()) {
    
        const directions: Direction[] = [
          Direction.VERTICAL,
          Direction.HORIZONTAL,
          Direction.DIAGONAL_UP,
          Direction.DIAGONAL_DOWN,
        ];
        for (const direction of directions) {
          const line = board.checkLine({ column: columnIndex, piece: pieceIndex }, direction, player);
          score += this.score[line];
        }
      }
    }
    return score;
  }

  play(board: Board): number {
    let bestSCore = -Infinity;
    let move;
    for (const column of board.availableColumns) {
      board.placePiece(column, User.AI);
      // let score = this.evaluateBoard(board, User.AI);
      let score = this.minimax(board, 1, User.PLAYER);
      board.removePiece(column);
      console.log(`Column ${column} has a score ${score}`);
      if (score > bestSCore) {
        bestSCore = score;
        move = column;
      }
    }
    return move;
  }

  minimax(board: Board, depth: number, player: User): number {
    // const result = this.evaluateBoard(board, player);
    if (depth == 0) {
      return this.evaluateBoard(board, User.AI);
    } else if (board.checkWinner(player)) {    
      return this.score[4];
    }

    // AI Playing
    if (player == User.AI) {
      let bestSCore = -Infinity;
      for (const column of board.availableColumns) {
        board.placePiece(column, User.AI);
        let score = this.minimax(board, depth - 1, User.PLAYER);
        board.removePiece(column);
        bestSCore = Math.max(bestSCore, score);
      }
      return bestSCore;

      // Player playing
    } else {
      let bestSCore = +Infinity;
      for (const column of board.availableColumns) {
        board.placePiece(column, User.PLAYER);
        let score = this.minimax(board, depth - 1, User.AI);
        board.removePiece(column);
        bestSCore = Math.min(bestSCore, score);
      }
      return bestSCore;
    }
  }
}
