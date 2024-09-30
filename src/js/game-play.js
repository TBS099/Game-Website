//Create a new scene
let gameScene = new Phaser.Scene('Game');

//Load assets
gameScene.preload = function () {
    //Load Background
    this.load.image('level1', '.././assets/Backgrounds/Background1/game_background_1.png');

    //Load Player Sprite
    this.load.spritesheet('player', '.././assets/Player/Player_Idle.png', {
        frameWidth: 64,
        frameHeight: 64
    });

    //Load Enemy Sprites
    this.load.spritesheet('enemy_archer', '.././assets/Enemies/Archer/Archer_Idle.png', {
        frameWidth: 64,
        frameHeight: 64
    });
};

//Called once after the preload ends
gameScene.create = function () {
    //Create Background
    let bg = this.add.sprite(0, 0, 'level1');
    bg.setScale(0.8);
    //Set Background in the center
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    bg.setPosition(gameWidth / 2, gameHeight / 2);

    //Create Idle Animation for Player
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', {
            start: 0,
            end: 14
        }),
        frameRate: 20,
        repeat: -1
    });

    // Add the player to the scene, make player larger and play the idle animation
    let player = this.physics.add.sprite(100, 100, 'player');
    player.x = 20 + (player.width / 2);
    player.y = gameHeight - player.height - 10;
    player.setScale(1.5);
    player.play('idle');
};

//Set Configuration of the game
let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // No gravity
            debug: false // Optional for debugging
        }
    },
    scene: gameScene
};

//Create a new game with the configuration
let game = new Phaser.Game(config);