//Create a new scene
let gameScene = new Phaser.Scene('Game');

//Initialize variables
var player;
var necromancer1;
var necromancer2;
var paladin1;
var paladin2;
var bombs;
var isAttacking = false;
var isAttacked = false;
var gameOver = false;
var score = 0;
var necromancers;
var paladins;


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

    //Attack
    this.load.spritesheet('player_attack', '.././assets/Player/Player_Attack.png', {
        frameWidth: 144,
        frameHeight: 64
    });

    //Death
    this.load.spritesheet('player_death', '.././assets/Player/Player_Death.png', {
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

    //Walking
    this.load.spritesheet('necromancer_walk', '.././assets/Enemies/Necromancer/Necromancer_walk.png', {
        frameWidth: 96,
        frameHeight: 96
    });

    //Attack
    this.load.spritesheet('necromancer_attack', '.././assets/Enemies/Necromancer/Necromancer_Attack.png', {
        frameWidth: 128,
        frameHeight: 128
    });

    //Get Hit
    this.load.spritesheet('necromancer_getHit', '.././assets/Enemies/Necromancer/Necromancer_GetHit.png', {
        frameWidth: 96,
        frameHeight: 96
    });

    //Death
    this.load.spritesheet('necromancer_death', '.././assets/Enemies/Necromancer/Necromancer_Death.png', {
        frameWidth: 96,
        frameHeight: 96
    });

    //Paladin
    //Idle
    this.load.spritesheet('paladin_idle', '.././assets/Enemies/Paladin/Paladin_Idle.png', {
        frameWidth: 128,
        frameHeight: 128
    });

    //Walking
    this.load.spritesheet('paladin_walk', '.././assets/Enemies/Paladin/Paladin_Walk.png', {
        frameWidth: 128,
        frameHeight: 128
    });

    //Attack
    this.load.spritesheet('paladin_attack', '.././assets/Enemies/Paladin/Paladin_Attack.png', {
        frameWidth: 128,
        frameHeight: 128
    });

    //Get Hit
    this.load.spritesheet('paladin_getHit', '.././assets/Enemies/Paladin/Paladin_GetHit.png', {
        frameWidth: 128,
        frameHeight: 128
    });

    //Death
    this.load.spritesheet('paladin_death', '.././assets/Enemies/Paladin/Paladin_Death.png', {
        frameWidth: 128,
        frameHeight: 128
    });

    //Bomb
    this.load.image('bomb', '.././assets/Items/Bomb.png');

    //Explosion
    this.load.image('explosion1', '.././assets/Explosion/explosion1.png');
    this.load.image('explosion2', '.././assets/Explosion/explosion2.png');
    this.load.image('explosion3', '.././assets/Explosion/explosion3.png');
    this.load.image('explosion4', '.././assets/Explosion/explosion4.png');
    this.load.image('explosion5', '.././assets/Explosion/explosion5.png');
    this.load.image('explosion6', '.././assets/Explosion/explosion6.png');
    this.load.image('explosion7', '.././assets/Explosion/explosion7.png');
    this.load.image('explosion8', '.././assets/Explosion/explosion8.png');
};

//Called once after the preload ends
gameScene.create = function () {
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    this.physics.world.setBounds(0, 0, gameWidth, gameHeight);

    //Setup Scorecard
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

    //Explosion Animation
    this.anims.create({
        key: 'explosion',
        frames: [
            { key: 'explosion1' },
            { key: 'explosion2' },
            { key: 'explosion3' },
            { key: 'explosion4' },
            { key: 'explosion5' },
            { key: 'explosion6' },
            { key: 'explosion7' },
            { key: 'explosion8' }
        ],
        frameRate: 5,
        repeat: 0
    });

    //PLAYER
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

    //Create Attack Animation for Player
    this.anims.create({
        key: 'player_attack',
        frames: this.anims.generateFrameNumbers('player_attack', {
            start: 0,
            end: 21
        }),
        frameRate: 20,
        repeat: 0
    });

    //Create Death Animation for Player
    this.anims.create({
        key: 'player_death',
        frames: this.anims.generateFrameNumbers('player_death', {
            start: 0,
            end: 14
        }),
        frameRate: 10,
        repeat: 0
    });

    // Add the player to the scene
    player = this.physics.add.sprite(100, 100, 'player_idle');
    player.setDepth(1);

    //Set Player Position
    player.x = 20 + (player.width / 2);
    player.y = gameHeight - player.height - 10;

    //Set Player Scale
    player.setScale(1.7);
    player.setBodySize(32, 32);
    player.setOffset(16, 12);

    //Play Idle Animation
    player.play('player_idle');

    //Set Player Gravity
    player.body.setGravityY(400);

    //Set Player Bounce
    player.setBounce(0.5);

    //Set Colliders
    this.physics.add.collider(player, this.grassGroup);

    //Prevent Player from leaving the screen
    player.setCollideWorldBounds(true);

    //NECROMANCER
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

    //Create Movement Animation for Necromancer
    this.anims.create({
        key: 'necromancer_walk',
        frames: this.anims.generateFrameNumbers('necromancer_walk', {
            start: 0,
            end: 9
        }),
        frameRate: 20,
        repeat: -1
    });

    //Create Attack Animation for Necromancer
    this.anims.create({
        key: 'necromancer_attack',
        frames: this.anims.generateFrameNumbers('necromancer_attack', {
            start: 0,
            end: 46
        }),
        frameRate: 20,
        repeat: 0
    });

    //Create Get Hit Animation for Necromancer
    this.anims.create({
        key: 'necromancer_getHit',
        frames: this.anims.generateFrameNumbers('necromancer_getHit', {
            start: 0,
            end: 8
        }),
        frameRate: 20,
        repeat: 0
    });

    //Create Death Animation for Necromancer
    this.anims.create({
        key: 'necromancer_death',
        frames: this.anims.generateFrameNumbers('necromancer_death', {
            start: 0,
            end: 51
        }),
        frameRate: 20,
        repeat: 0
    });

    //Create Necromancers Group
    necromancers = this.physics.add.group();

    //NECROMANCER 1
    // Add the Necromancer to the scene
    necromancer1 = this.physics.add.sprite(50, 130, 'necromancer_idle');
    necromancer1.setDepth(1);

    //Set Necromancer Scale
    necromancer1.setScale(1.7);
    necromancer1.setBodySize(32, 52);
    necromancer1.setOffset(32, 12);


    //Play Idle Animation
    necromancer1.play('necromancer_idle');

    //Set Colliders
    this.physics.add.collider(necromancer1, this.grassGroup);

    //Add Necromancer to the Necromancers group
    necromancers.add(necromancer1);

    //NECROMANCER 2
    // Add the Necromancer to the scene
    necromancer2 = this.physics.add.sprite(gameWidth - 50, gameHeight - 210, 'necromancer_idle');
    necromancer2.flipX = true;
    necromancer2.setDepth(1);

    //Set Necromancer Scale
    necromancer2.setScale(1.7);
    necromancer2.setBodySize(32, 52);
    necromancer2.setOffset(32, 12);


    //Play Idle Animation
    necromancer2.play('necromancer_idle');

    //Set Colliders
    this.physics.add.collider(necromancer2, this.grassGroup);

    //Add Necromancer to the Necromancers group
    necromancers.add(necromancer2);

    //Add properties to all paladins
    necromancers.children.iterate((necromancer) => {
        necromancer.setCollideWorldBounds(true);
        necromancer.setGravityY(300);
        necromancer.setBounce(0.2);
        necromancer.health = 3;
    });

    //PALADIN
    //Create Idle Animation for Paladin
    this.anims.create({
        key: 'paladin_idle',
        frames: this.anims.generateFrameNumbers('paladin_idle', {
            start: 0,
            end: 26
        }),
        frameRate: 20,
        repeat: -1
    });

    //Create Movement Animation for Paladin
    this.anims.create({
        key: 'paladin_walk',
        frames: this.anims.generateFrameNumbers('paladin_walk', {
            start: 0,
            end: 9
        }),
        frameRate: 20,
        repeat: -1
    });

    //Create Attack Animation for Paladin
    this.anims.create({
        key: 'paladin_attack',
        frames: this.anims.generateFrameNumbers('paladin_attack', {
            start: 0,
            end: 40
        }),
        frameRate: 20,
        repeat: 0
    });

    //Create Get Hit Animation for Paladin
    this.anims.create({
        key: 'paladin_getHit',
        frames: this.anims.generateFrameNumbers('paladin_getHit', {
            start: 0,
            end: 11
        }),
        frameRate: 20,
        repeat: 0
    });

    //Create Death Animation for Paladin
    this.anims.create({
        key: 'paladin_death',
        frames: this.anims.generateFrameNumbers('paladin_death', {
            start: 0,
            end: 64
        }),
        frameRate: 20,
        repeat: 0
    });

    //Create Paladins Group
    paladins = this.physics.add.group();

    //PALADIN1
    // Add the Paladin to the scene
    paladin1 = this.physics.add.sprite(50, gameHeight - 350, 'paladin_idle');
    paladin1.setDepth(1);

    //Set Paladin Scale
    paladin1.setScale(1.7);
    paladin1.setBodySize(40, 50);
    paladin1.setOffset(45, 15);


    //Play Idle Animation
    paladin1.play('paladin_idle');

    //Set paladin Gravity
    paladin1.body.setGravityY(300);

    //Set Colliders
    this.physics.add.collider(paladin1, this.grassGroup);

    //Add Paladin to the Paladins group
    paladins.add(paladin1);

    //PALADIN2
    // Add the Paladin to the scene
    paladin2 = this.physics.add.sprite(gameWidth - 200, gameHeight - 500, 'paladin_idle');
    paladin2.flipX = true;
    paladin2.setDepth(1);

    //Set Paladin Scale
    paladin2.setScale(1.7);
    paladin2.setBodySize(40, 50);
    paladin2.setOffset(45, 15);


    //Play Idle Animation
    paladin2.play('paladin_idle');

    //Set paladin Gravity
    paladin2.body.setGravityY(300);

    //Set Colliders
    this.physics.add.collider(paladin2, this.grassGroup);

    //Add Paladin to the Paladins group
    paladins.add(paladin2);

    //Add properties to all paladins
    paladins.children.iterate((paladin) => {
        paladin.setCollideWorldBounds(true);
        paladin.setGravityY(300);
        paladin.setBounce(0.2);
        paladin.health = 3;
    });

    //Add collider between player and Necromancers
    this.physics.add.collider(player, necromancers, (player, necromancer) => {
        if (isAttacking) {
            necromancer.setVelocityX(0);
            necromancer.play('necromancer_death');
            score += 10;
            scoreText.setText('Score: ' + score)
        }
        else if (isAttacked) {
            player.setTint(0xff0000);
            gameOver = true;
        }
    });

    //Add collider between player and Paladins
    this.physics.add.collider(player, paladins, (player, paladin) => {
        if (isAttacking) {
            paladin.setVelocityX(0);
            paladin.play('paladin_death');
            score += 10;
            scoreText.setText('Score: ' + score)
        }
        else if (isAttacked) {
            player.setTint(0xff0000);
            gameOver = true;
        }
    });

    //BOMB
    //Add Bomb to the scene
    bombs = this.physics.add.group();
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(bombs, this.grassGroup);

    //Inittialize Cursor Keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Initialize bomb timer
    this.bombDropTimer = this.time.now;
};

gameScene.update = function (time, delta) {

    console.log(isAttacking);
    //Check whether the player is dead
    if (gameOver) {
        //Check whether the player is on the ground
        if (!player.body.touching.down) {
            player.setVelocityY(200);
        }
        else {
            this.physics.pause();
            if (player.anims.currentAnim.key !== 'player_death') {
                player.play('player_death');
            }
        }
        return;
    }
    else {
        player.setBodySize(32, 32);
        //Check whether keys are pressed
        if (this.cursors.left.isDown) {
            player.setOffset(26, 12);
            player.setVelocityX(-200);
            player.flipX = true;

            //If the player is not moving and running animation isn't playing, play the running animation
            if (player.anims.currentAnim.key === 'player_attack') {
                player.once('animationcomplete', () => {
                    isAttacking = false;
                    player.play('player_running');
                });
            }
            else if (player.anims.currentAnim.key !== 'player_running') {
                isAttacking = false;
                player.play('player_running');
            }
        }
        else if (this.cursors.right.isDown) {
            player.setOffset(35, 12);
            player.setVelocityX(200);
            player.flipX = false;

            //If the player is not moving and running animation isn't playing, play the running animation
            if (player.anims.currentAnim.key === 'player_attack') {
                player.once('animationcomplete', () => {
                    isAttacking = false;
                    player.play('player_running');
                });
            }
            else if (player.anims.currentAnim.key !== 'player_running') {
                isAttacking = false;
                player.play('player_running');
            }
        }
        else {
            player.setOffset(16, 12);
            player.setVelocityX(0);
            isAttacking = false;

            //If the player is not moving and idle or attack animation isn't playing, play the idle animation
            if (player.anims.currentAnim.key !== 'player_idle' && player.anims.currentAnim.key !== 'player_attack') {
                player.play('player_idle');
            }
        }

        //Check whether the player is on the ground and the up key is pressed
        if (this.cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-360);
        }

        if (Phaser.Input.Keyboard.JustDown(this.attackKey) && !isAttacking) {
            isAttacking = true;
            player.setBodySize(64, 32);
            player.setOffset(0, 0);

            //If the player is attacking and  animation isn't playing, play the attack animation
            if (player.anims.currentAnim.key !== 'player_attack') {
                player.play('player_attack');
            }

            player.once('animationcomplete', () => {
                isAttacking = false;
                player.play('player_idle');
            });
        }

        // Check if 5 seconds have passed since the last bomb drop
        if (time > this.bombDropTimer + 5000) {
            dropBomb();
            this.bombDropTimer = time; // Update the last bomb drop time
        }
    }
}

//Called when the player is hit by a bomb
function hitBomb(player, bomb) {
    player.setTint(0xff0000);
    gameOver = true;

    //Create explosion animation
    bomb.play('explosion');

}

//Called after set time interval to drop a bomb
function dropBomb() {
    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    if (bombs.children.getArray().filter(bomb => bomb.active).length < 7) {
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
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