import { Direction, Piece, User } from './types';
import { Position, Score } from './interfaces';

import { Board } from './board';

export class AI {
  score: Score = {
    1: 1,
    2: 50,
    3: 500,
    4: 500000,
  };

  evaluateBoard(board: Board): number {
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
          const line = board.checkLine(
            { column: columnIndex, piece: pieceIndex },
            direction,
            piece
          );
          score += piece == User.AI ? this.score[line] : -this.score[line];
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
      let score = this.minimax(board, 3, User.PLAYER, -Infinity, +Infinity);
      board.removePiece(column);
      console.log(`Column ${column} has a score ${score}`);
      if (score > bestSCore) {
        bestSCore = score;
        move = column;
      }
    }
    return move;
  }

  minimax(
    board: Board,
    depth: number,
    player: User,
    alpha: number,
    beta: number
  ): number {
    if (depth == 0) {
      return this.evaluateBoard(board);
    }

    // AI Playing
    if (player == User.AI) {
      let bestScore = -Infinity;
      for (const column of board.availableColumns) {
        board.placePiece(column, User.AI);
        let score = this.minimax(board, depth - 1, User.PLAYER, alpha, beta);
        board.removePiece(column);
        bestScore = Math.max(bestScore, score);
        if (bestScore > beta) {
          return bestScore;
        }
        alpha = Math.max(alpha, bestScore);
      }
      return bestScore;

      // Player playing
    } else {
      let bestScore = +Infinity;
      for (const column of board.availableColumns) {
        board.placePiece(column, User.PLAYER);
        let score = this.minimax(board, depth - 1, User.AI, alpha, beta);
        board.removePiece(column);
        bestScore = Math.min(bestScore, score);
        if (alpha > bestScore) {
          return bestScore;
        }
        beta = Math.min(beta, bestScore);
      }
      return bestScore;
    }
  }
}
