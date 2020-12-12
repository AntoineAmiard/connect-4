import { Board } from "./board";
import readlineSync from "readline-sync";
import { print, println } from "./utils";

export class Game {
  board: Board;

  constructor(columns: number, floors: number) {
    this.board = new Board(columns, floors);
  }

  /**
   * Start the game
   */
  start(): void {
    println("----------- Game start -----------");
    let choice: number;
    while (true) {
      console.clear();
      this.board.display();
      // ---- PLAYER TURN ------

      choice = this.getUserChoice();
      println(choice.toString());
      this.board.placePiece(choice, 0);

      // check if player win
      if (this.board.checkWinner(0)) {
        console.clear();
        this.board.display();
        println("Well played ! You win !");
        break;
      }

      // ---- AI TURN ------
      choice = this.getAiChoice();
      +println(choice.toString());
      this.board.placePiece(choice, 1);

      // check if AI win
      if (this.board.checkWinner(1)) {
        console.clear();
        this.board.display();
        println("Arf ! You lose");
        break;
      }
    }
  }

  /**
   * Get user choice
   */
  getUserChoice(): number {
    let input: string;
    let choice: number;

    // while input is not correcct
    do {
      input = readlineSync.question("Select a column :");
      choice = parseInt(input);
    } while (isNaN(choice) || choice < 0 || choice > Math.max(...this.board.availableColumns));

    return choice - 1;
  }

  /**
   * Get AI choice
   */
  getAiChoice(): number {
    console.log(this.board.availableColumns);
    const random: number = Math.floor(Math.random() * this.board.availableColumns.length);
    return this.board.availableColumns[random];
  }
}
