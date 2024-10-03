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
    //Idle
    this.load.spritesheet('player_idle', '.././assets/Player/Player_Idle.png', {
        frameWidth: 64,
        frameHeight: 64
    });

    //Running
    this.load.spritesheet('player_run', '.././assets/Player/Player_Run.png', {
        frameWidth: 96,
        frameHeight: 64
    });

    //Load Enemy Sprites
    //Necromancer
    //Idle
    this.load.spritesheet('necromancer_idle', '.././assets/Enemies/Necromancer/Necromancer_Idle.png', {
        frameWidth: 96,
        frameHeight: 96
    });

    this.load.spritesheet('necromancer_walk', '.././assets/Enemies/Necromancer/Necromancer_walk.png', {
        frameWidth: 96,
        frameHeight: 96
    });
};

//Called once after the preload ends
gameScene.create = function () {
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    this.physics.world.setBounds(0, 0, gameWidth, gameHeight);

    //Setup Scorecard
    var score = 0;
    var scoreText;

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    scoreText.setDepth(2);

    //Create Background
    this.bg = this.add.sprite(0, 0, 'level1');
    this.bg.setScale(0.8);

    //Set Background in the center
    this.bg.setPosition(gameWidth / 2, gameHeight / 2);

    // Create a static group for all grass blocks
    this.grassGroup = this.physics.add.staticGroup();
    let blockSize = 102.4;

    // Create bottom grass blocks
    this.bottomGrassGroup = this.add.group({
        key: 'grass_middle',
        repeat: Math.ceil(gameWidth / 76.8) - 1,
        setXY: { x: 76.8 / 2, y: gameHeight + 5, stepX: 76.8 }
    });

    // Add bottom grass blocks to the static group
    this.bottomGrassGroup.children.iterate(block => {
        block.setScale(0.3);
        block.setDepth(1);
        this.grassGroup.add(block);
    });

    // Create Grass Group 1
    this.GrassGroup1 = this.add.group({
        key: 'grass_middle',
        repeat: 2,
        setXY: { x: blockSize / 2, y: gameHeight - 96 - 50 - 100, stepX: blockSize }
    });

    // Add Grass Group 1 blocks to the static group
    this.GrassGroup1.children.iterate(block => {
        block.setScale(0.4);
        block.setDepth(1);
        this.grassGroup.add(block);
    });

    // Add the right grass block for Grass Group 1
    const grassRightBlock1 = this.add.image(0, gameHeight - 96 - 50 - 100, 'grass_right');
    grassRightBlock1.x = this.GrassGroup1.children.entries[2].x + blockSize;
    grassRightBlock1.setScale(0.4).setDepth(1);
    this.physics.add.existing(grassRightBlock1, true);
    this.grassGroup.add(grassRightBlock1);

    // Create Grass Group 2
    this.GrassGroup2 = this.add.group({
        key: 'grass_middle',
        repeat: 2,
        setXY: { x: gameWidth / 2 - 400, y: gameHeight - 96 - 128 - 100 - 128 - 100, stepX: blockSize }
    });

    // Add Grass Group 2 blocks to the static group
    this.GrassGroup2.children.iterate(block => {
        block.setScale(0.4);
        block.setDepth(1);
        this.grassGroup.add(block);
    });

    // Add right and left grass blocks for Grass Group 2
    const grassRightBlock2 = this.add.image(0, gameHeight - 96 - 128 - 100 - 128 - 100, 'grass_right');
    grassRightBlock2.x = this.GrassGroup2.children.entries[2].x + blockSize;
    grassRightBlock2.setScale(0.4).setDepth(1);
    this.physics.add.existing(grassRightBlock2, true);
    this.grassGroup.add(grassRightBlock2);

    const grassLeftBlock2 = this.add.image(0, gameHeight - 96 - 128 - 100 - 128 - 100, 'grass_left');
    grassLeftBlock2.x = this.GrassGroup2.children.entries[0].x - blockSize;
    grassLeftBlock2.setScale(0.4).setDepth(1);
    this.physics.add.existing(grassLeftBlock2, true);
    this.grassGroup.add(grassLeftBlock2);

    // Create Grass Group 3
    this.GrassGroup3 = this.add.group({
        key: 'grass_middle',
        repeat: 2,
        setXY: { x: gameWidth - blockSize / 2, y: gameHeight - 96 - 30, stepX: -blockSize }
    });

    // Add Grass Group 3 blocks to the static group
    this.GrassGroup3.children.iterate(block => {
        block.setScale(0.4);
        block.setDepth(1);
        this.grassGroup.add(block);
    });

    // Add left grass block for Grass Group 3
    const grassLeftBlock3 = this.add.image(0, gameHeight - 96 - 30, 'grass_left');
    grassLeftBlock3.x = this.GrassGroup3.children.entries[2].x - blockSize;
    grassLeftBlock3.setScale(0.4).setDepth(1);
    this.physics.add.existing(grassLeftBlock3, true);
    this.grassGroup.add(grassLeftBlock3);

    // Create Grass Group 4
    this.GrassGroup4 = this.add.group({
        key: 'grass_middle',
        repeat: 0,
        setXY: { x: gameWidth - 250 - blockSize / 2, y: gameHeight - 96 - 50 - 128 - 130, stepX: -blockSize }
    });

    // Add Grass Group 4 blocks to the static group
    this.GrassGroup4.children.iterate(block => {
        block.setScale(0.4);
        block.setDepth(1);
        this.grassGroup.add(block);
    });

    // Add left and right grass blocks for Grass Group 4
    const grassLeftBlock4 = this.add.image(0, gameHeight - 96 - 50 - 128 - 130, 'grass_left');
    grassLeftBlock4.setScale(0.4).setDepth(1);
    grassLeftBlock4.x = this.GrassGroup4.children.entries[0].x - blockSize;
    this.physics.add.existing(grassLeftBlock4, true);
    this.grassGroup.add(grassLeftBlock4);

    const grassRightBlock4 = this.add.image(0, gameHeight - 96 - 50 - 128 - 130, 'grass_right');
    grassRightBlock4.setScale(0.4).setDepth(1);
    grassRightBlock4.x = this.GrassGroup4.children.entries[0].x + blockSize;
    this.physics.add.existing(grassRightBlock4, true);
    this.grassGroup.add(grassRightBlock4);

    //Create Idle Animation for Player
    this.anims.create({
        key: 'player_idle',
        frames: this.anims.generateFrameNumbers('player_idle', {
            start: 0,
            end: 14
        }),
        frameRate: 20,
        repeat: -1
    });

    //Create Running Animation for Player
    this.anims.create({
        key: 'player_running',
        frames: this.anims.generateFrameNumbers('player_run', {
            start: 0,
            end: 7
        }),
        frameRate: 10,
        repeat: -1
    });

    // Add the player to the scene
    this.player = this.physics.add.sprite(100, 100, 'player_idle');
    this.player.setDepth(1);

    //Set Player Position
    this.player.x = 20 + (this.player.width / 2);
    this.player.y = gameHeight - this.player.height - 10;

    //Set Player Scale
    this.player.setScale(1.7);
    this.player.setBodySize(32, 32);
    this.player.setOffset(16, 12);

    //Play Idle Animation
    this.player.play('player_idle');

    //Set Player Gravity
    this.player.body.setGravityY(400);

    //Set Colliders
    this.physics.add.collider(this.player, this.grassGroup);

    //Prevent Player from leaving the screen
    this.player.setCollideWorldBounds(true);

    //Create Idle Animation for Necromancer
    this.anims.create({
        key: 'necromancer_idle',
        frames: this.anims.generateFrameNumbers('necromancer_idle', {
            start: 0,
            end: 49
        }),
        frameRate: 40,
        repeat: -1
    });

    this.anims.create({
        key: 'necromancer_walk',
        frames: this.anims.generateFrameNumbers('necromancer_walk', {
            start: 0,
            end: 9
        }),
        frameRate: 20,
        repeat: -1
    });

    // Add the Necromancer to the scene
    this.necromancer1 = this.physics.add.sprite(100, 100, 'necromancer_idle');
    this.necromancer1.setDepth(1);

    //Set Necromancer Position
    this.necromancer1.x = 20 + (this.necromancer1.width / 2);
    this.necromancer1.y = gameHeight - this.necromancer1.height - 10;

    //Set Necromancer Scale
    this.necromancer1.setScale(1.7);
    this.necromancer1.setBodySize(32, 64);
    this.necromancer1.setOffset(32, 0);


    //Play Idle Animation
    this.necromancer1.play('necromancer_idle');

    //Set Necromancer Gravity
    this.necromancer1.body.setGravityY(300);

    //Set Colliders
    this.physics.add.collider(this.necromancer1, this.grassGroup);

    //Prevent Necromancer from leaving the screen
    this.necromancer1.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
};

gameScene.update = function (time, delta) {
    if (this.cursors.left.isDown) {
        this.player.setOffset(26, 12);
        this.player.setVelocityX(-200);
        this.player.flipX = true;

        //If the player is not moving and running animation isn't playing, play the running animation
        if (this.player.anims.currentAnim.key !== 'player_running') {
            this.player.play('player_running');
        }
    }
    else if (this.cursors.right.isDown) {
        this.player.setOffset(35, 12);
        this.player.setVelocityX(200);
        this.player.flipX = false;

        //If the player is not moving and running animation isn't playing, play the running animation
        if (this.player.anims.currentAnim.key !== 'player_running') {
            this.player.play('player_running');
        }
    }
    else {
        this.player.setOffset(16, 12);
        this.player.setVelocityX(0);

        //If the player is not moving and idle animation isn't playing, play the idle animation
        if (this.player.anims.currentAnim.key !== 'player_idle') {
            this.player.play('player_idle');
        }
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-360);
    }
}

//Set Configuration of the game
let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: gameScene
};

//Create a new game with the configuration
let game = new Phaser.Game(config);