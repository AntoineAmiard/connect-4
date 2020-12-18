import { AI } from "./ai";
import { Board } from "./board";
import { User } from "./types";
import colors from "colors";
import { println } from "./utils";
import readlineSync from "readline-sync";

export class Game {
  numberOfTurn: number;
  board: Board;
  ai: AI;

  players: {
    player1: -1;
    player2: 1;
  };

  constructor(columns: number, floors: number) {
    this.board = new Board(columns, floors);
    this.ai = new AI();
    this.numberOfTurn = columns * floors;
  }

  /**
   * Start the game
   */
  start(): void {
    println("----------- Game start -----------");
    let choice: number;
    let result: boolean;

    while (this.board.availableColumns.length != 0) {
      // console.clear();
      this.board.display();

      // ---- PLAYER TURN ------

      choice = this.getUserChoice();
      this.board.placePiece(choice, User.PLAYER);

      // check if player win
      result = this.board.checkWinner(User.PLAYER);
      if (result) {
        console.clear();
        this.board.display();
        println(colors.green("Well played ! You win !"));
        process.exit(0);
      }

      // ---- AI TURN ------
      choice = this.getAiChoice();
      this.board.placePiece(choice, User.AI);

      // check if AI win
      result = this.board.checkWinner(User.AI);
      if (result) {
        console.clear();
        this.board.display();
        println(colors.red("Arf ! You lose"));
        process.exit(0);
      }
    }

    console.clear();
    this.board.display();
    println(colors.blue("Equality"));
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
      choice = parseInt(input) - 1;
    } while (isNaN(choice) || !this.board.availableColumns.includes(choice));

    return choice;
  }

  /**
   * Get AI choice
   */
  getAiChoice(): number {
    return this.ai.play(this.board);
    // return this.board.availableColumns[Math.floor(Math.random() * this.board.availableColumns.length)];
  }
}
