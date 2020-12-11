import { Board } from "./board";

export class Game {
  constructor() {}

  start(): void {
    console.log("La partie demarre");
    const board: Board = new Board(7, 6);
    board.display();
    console.log(board.checkWinner(1));
    console.log(board.checkWinner(0));
  }
}
