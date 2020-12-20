import { Game } from './game';

/**
 * Starting point of the game
 */
function main(): void {
  const game: Game = new Game(7, 6);
  game.start();
}

main();
