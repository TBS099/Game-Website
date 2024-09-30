//Create a new scene
let gameScene = new Phaser.Scene('Game');

//Load assets
gameScene.preload = function () {

    //Load Background
    this.load.image('level1', '.././assets/Backgrounds/Background1/game_background_1.png');

    //Add Block Images
    this.load.image('grass_left', '.././assets/Blocks/Grass/Grass_Left.png');
    this.load.image('grass_middle', '.././assets/Blocks/Grass/Grass_Middle.png');
    this.load.image('grass_right', '.././assets/Blocks/Grass/Grass_Right.png');
    this.load.image('grass_single', '.././assets/Blocks/Grass/Grass_Single.png');

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

    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    //Set Background in the center
    this.bg.setPosition(gameWidth / 2, gameHeight / 2);

    // Create a group for floor grass blocks, with the blocks repeating
    this.bottomGrassGroup = this.physics.add.group({
        key: 'grass_middle',
        repeat: Math.ceil(gameWidth / 76.8) - 1,
        setXY: { x: 76.8 / 2, y: gameHeight + 5, stepX: 76.8 }
    });

    // Set properties for floor grass block
    this.bottomGrassGroup.children.iterate(block => {
        block.setImmovable(true);
        block.setDepth(1);
        block.setScale(0.3);
    });

    // Create a group for Grass Group 1
    this.GrassGroup1 = this.physics.add.group(
        {
            key: 'grass_middle',
            repeat: 2,
            setXY: { x: 128 / 2, y: gameHeight - 96 - 50 - 100, stepX: 128 }
        },
    );

    // Set properties for group 1 grass block
    this.GrassGroup1.children.iterate(block => {
        block.setImmovable(true);
        block.setDepth(1);
        block.setScale(0.5);
    });

    // Create a single right grass block for group 1
    const grassRightBlock1 = this.physics.add.sprite(0, gameHeight - 96 - 50 - 100, 'grass_right');
    grassRightBlock1.setImmovable(true);
    grassRightBlock1.setDepth(1);
    grassRightBlock1.setScale(0.5);

    // Adjust the x position of the right block to align with the middle block group 1
    grassRightBlock1.x = this.GrassGroup1.children.entries[2].x + (grassRightBlock1.width / 2);

    // Create a group for Grass Group 2
    this.GrassGroup2 = this.physics.add.group(
        {
            key: 'grass_middle',
            repeat: 0,
            setXY: { x: gameWidth / 2 - 200, y: gameHeight - 96 - 128 - 100 - 128 - 100, stepX: 128 }
        },
    );

    // Set properties for group 2 grass block
    this.GrassGroup2.children.iterate(block => {
        block.setImmovable(true);
        block.setDepth(1);
        block.setScale(0.5);
    });

    // Create a single right grass block for group 2
    const grassRightBlock2 = this.physics.add.sprite(0, gameHeight - 96 - 128 - 100 - 128 - 100, 'grass_right');
    grassRightBlock2.setImmovable(true);
    grassRightBlock2.setDepth(1);
    grassRightBlock2.setScale(0.5);

    // Adjust the x position of the right block to align with the middle block group 2
    grassRightBlock2.x = this.GrassGroup2.children.entries[0].x + (grassRightBlock2.width / 2);

    // Create a group for Grass Group 3
    this.GrassGroup3 = this.physics.add.group(
        {
            key: 'grass_middle',
            repeat: 1,
            setXY: { x: gameWidth - 128 / 2, y: gameHeight - 96 - 50, stepX: -128 }
        },
    );

    // Set properties for group 3 grass block
    this.GrassGroup3.children.iterate(block => {
        block.setImmovable(true);
        block.setDepth(1);
        block.setScale(0.5);
    });

    // Create a single left grass block for group 3
    const grassLeftBlock3 = this.physics.add.sprite(0, gameHeight - 96 - 50, 'grass_left');
    grassLeftBlock3.setImmovable(true);
    grassLeftBlock3.setDepth(1);
    grassLeftBlock3.setScale(0.5);

    // Adjust the x position of the left block to align with the middle block group 3
    grassLeftBlock3.x = this.GrassGroup3.children.entries[1].x - (grassLeftBlock3.width / 2);

    // Create a group for Grass Group 4
    this.GrassGroup4 = this.physics.add.group(
        {
            key: 'grass_middle',
            repeat: 0,
            setXY: { x: gameWidth - 150 - 128 / 2, y: gameHeight - 96 - 50 - 128 - 200, stepX: -128 }
        },
    );

    // Set properties for group 4 grass block
    this.GrassGroup4.children.iterate(block => {
        block.setImmovable(true);
        block.setDepth(1);
        block.setScale(0.5);
    });

    // Create a single left grass block for group 4
    const grassLeftBlock4 = this.physics.add.sprite(0, gameHeight - 96 - 50 - 128 - 200, 'grass_left');
    grassLeftBlock4.setImmovable(true);
    grassLeftBlock4.setDepth(1);
    grassLeftBlock4.setScale(0.5);

    // Adjust the x position of the left block to align with the middle block group 4
    grassLeftBlock4.x = this.GrassGroup4.children.entries[0].x - (grassLeftBlock4.width / 2);

    // Create a single right grass block for group 4
    const grassRightBlock4 = this.physics.add.sprite(0, gameHeight - 96 - 50 - 128 - 200, 'grass_right');
    grassRightBlock4.setImmovable(true);
    grassRightBlock4.setDepth(1);
    grassRightBlock4.setScale(0.5);

    // Adjust the x position of the right block to align with the middle block group 4
    grassRightBlock4.x = this.GrassGroup4.children.entries[0].x + (grassRightBlock4.width / 2);

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
    this.player.setScale(1.7);

    //Play Idle Animation
    this.player.play('idle');

    //Set Player Gravity
    this.player.body.setGravityY(300);

    //Set Colliders
    this.physics.add.collider(this.player, this.bottomGrassGroup);

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