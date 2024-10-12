import PreloadScene from './scenes/preloadScene.js';
import MainScene from './scenes/mainScene.js';
import GameOverScene from './scenes/gameOverScene.js';

// Game configuration
const config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [PreloadScene, MainScene, GameOverScene],
};

// Create the game instance
const game = new Phaser.Game(config);