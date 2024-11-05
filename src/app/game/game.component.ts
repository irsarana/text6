import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  birdYPosition = 300;   // Initial position of the bird
  gravity = 2;           // Gravity that pulls the bird down
  jumpStrength = 40;     // Strength of the bird's jump
  isGameOver = false;    // To check if the game is over
  obstacleSpeed = 2;     // Speed of the obstacles
  obstacles: any[] = []; // Obstacles array
  gameInterval: any;     // Reference to game loop
  score = 0;             // Player's score

  constructor() {
    this.startGame();
  }

  // Start the game loop
  startGame() {
    this.isGameOver = false;
    this.birdYPosition = 300;
    this.score = 0;

    // Clear previous obstacles
    this.obstacles = [];
    this.createObstacles();

    // Game loop
    this.gameInterval = setInterval(() => {
      this.gameLoop();
    }, 20);  // Run every 20 milliseconds
  }

  // Game loop that updates game state
  gameLoop() {
    // Update bird's position
    this.birdYPosition += this.gravity;

    // Update obstacles position and generate new ones
    this.updateObstacles();

    // Check for collisions
    this.checkCollision();

    // Check if the bird touches the ground
    if (this.birdYPosition >= 560 || this.birdYPosition <= 0) {
      this.gameOver();
    }
  }

  // Jump event
  jump() {
    if (!this.isGameOver) {
      this.birdYPosition -= this.jumpStrength;
    } else {
      // Restart the game when clicking after game over
      this.startGame();
    }
  }

  // Create obstacles (pipes)
  createObstacles() {
    const gap = 150;
    const pipeHeight = Math.floor(Math.random() * 200) + 100;
    const pipeTop = pipeHeight + gap;

    this.obstacles.push({
      x: 400, // Start off-screen on the right
      height: pipeHeight,
      top: 0
    });

    this.obstacles.push({
      x: 400, // Second pipe below the gap
      height: 600 - pipeTop,
      top: pipeTop
    });
  }

  // Update obstacle positions
  updateObstacles() {
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].x -= this.obstacleSpeed;

      // Remove obstacle when it goes off-screen
      if (this.obstacles[i].x < -60) {
        this.obstacles.splice(i, 1);
        this.score++;
      }
    }

    // Create new obstacles periodically
    if (this.obstacles.length < 2) {
      this.createObstacles();
    }
  }

  // Check for collisions between bird and obstacles
  checkCollision() {
    for (const obstacle of this.obstacles) {
      if (
        obstacle.x < 90 && obstacle.x > 10 &&
        (this.birdYPosition < obstacle.height || this.birdYPosition > obstacle.top)
      ) {
        this.gameOver();
      }
    }
  }

  // End the game
  gameOver() {
    this.isGameOver = true;
    clearInterval(this.gameInterval);
  }
}
