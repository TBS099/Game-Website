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
    //Archer
    this.load.spritesheet('enemy_archer', '.././assets/Enemies/Archer/Archer_Idle.png', {
        frameWidth: 64,
        frameHeight: 64
    });

    //Dual Wielder
    this.load.spritesheet('enemy_dual_wielder', '.././assets/Enemies/Dual_Wielder/Dual_Wielder_Idle.png', {
        frameWidth: 64,
        frameHeight: 64
    });
};

//Called once after the preload ends
gameScene.create = function () {
    //Create Background
    this.bg = this.add.sprite(0, 0, 'level1');
    this.bg.setScale(0.8);
    //Set Background in the center
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    this.bg.setPosition(gameWidth / 2, gameHeight / 2);

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

    // Add the player to the scene
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setDepth(1);

    //Set Player Position
    this.player.x = 20 + (this.player.width / 2);
    this.player.y = gameHeight - this.player.height - 10;

    //Set Player Scale
    this.player.setScale(1.5);

    //Play Idle Animation
    this.player.play('idle');

    //Set Player Gravity
    this.player.body.setGravityY(300);

    //Prevent Player from leaving the screen
    this.player.setCollideWorldBounds(true);
};

//Set Configuration of the game
let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: gameScene
};

//Create a new game with the configuration
let game = new Phaser.Game(config);