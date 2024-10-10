import Player from '../characters/player.js';
import Necromancer from '../characters/necromancer.js';
import Paladin from '../characters/paladin.js';

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.bombDropTimer = 0;
        this.gameOver = false;
        this.score = 100;
        this.enemies = 1;
    }

    create() {
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;

        this.physics.world.setBounds(0, 0, gameWidth, gameHeight);

        //Setup Scorecard
        this.scoreText = this.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#000' });
        this.scoreText.setDepth(2);

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

        // Create Player
        this.player = new Player(this, 100, gameHeight - 100);

        // Create Necromancers
        this.necromancers = this.physics.add.group();
        new Necromancer(this, 50, 130, this.necromancers);

        //Create flipped Necromancer
        const flipNecromancer = new Necromancer(this, gameWidth - 50, gameHeight - 210, this.necromancers);
        flipNecromancer.sprite.setFlipX(true); // Flip the second Necromancer horizontally

        // Create Paladins
        this.paladins = this.physics.add.group();

        // Create the first Paladin
        new Paladin(this, 50, gameHeight - 350, this.paladins);

        // Create flipped Paladin
        const flipPaladin = new Paladin(this, gameWidth - 200, gameHeight - 500, this.paladins);
        flipPaladin.sprite.setFlipX(true); // Flip the second Paladin horizontally

        // Bomb group
        this.bombs = this.physics.add.group();

        // Handle collisions
        this.physics.add.collider(this.player.sprite, this.grassGroup);
        this.physics.add.collider(this.necromancers, this.grassGroup);
        this.physics.add.collider(this.paladins, this.grassGroup);
        this.physics.add.collider(this.bombs, this.grassGroup);
        this.physics.add.collider(this.player.sprite, this.bombs, this.hitBomb.bind(this));
        this.physics.add.collider(this.player.sprite, this.necromancers, this.handleCollisionNecromancer.bind(this));
        this.physics.add.collider(this.player.sprite, this.paladins, this.handleCollisionPaladin.bind(this));
    }

    //Handle Collision for Necromancer and Player
    handleCollisionNecromancer(player, enemy) {
        if (enemy.isDead) {
            return;
        }
        else {
            // Check who is attacking
            if (this.player.isAttacking && enemy.body.enable) {
                enemy.isAttacked = true;

                if (enemy.health < 1) {
                    //Play animation, update score and decrement enemy count
                    enemy.isDead = true;
                    this.score += 20;
                    this.enemies -= 1;
                    enemy.play('necromancer_death');
                    enemy.body.enable = false;

                    if (this.enemies === 0) {
                        this.gameOver = true;
                    }
                } else {
                    enemy.health -= 1;
                    enemy.setOffset(32, 12);
                    enemy.play('necromancer_getHit');

                    // Set a delay to finish the attack animation before resuming other actions
                    this.time.delayedCall(1100, () => {
                        if (!enemy.isDead) {
                            enemy.isAttacked = false;
                            enemy.play('necromancer_idle');
                            enemy.setOffset(32, 12);
                        }
                    });
                }
            }
        }
    }

    //Handle Collision for Paladin and Player
    handleCollisionPaladin(player, enemy) {
        if (enemy.isDead) {
            return;
        }
        else {
            // Check who is attacking
            if (this.player.isAttacking && enemy.body.enable) {
                enemy.isAttacked = true;

                if (enemy.health < 1) {
                    //Play animation, update score and decrement enemy count
                    enemy.isDead = true;
                    this.score += 20;
                    this.enemies -= 1;
                    enemy.play('paladin_death');
                    enemy.once('animationcomplete', () => {
                        enemy.body.enable = false;
                    });

                    if (this.enemies === 0) {
                        this.gameOver = true;
                    }
                } else {
                    enemy.health -= 1;
                    enemy.play('paladin_getHit');

                    // Set a delay to finish the attack animation before resuming other actions
                    this.time.delayedCall(1100, () => {
                        if (!enemy.isDead) {
                            enemy.isAttacked = false;
                            enemy.play('paladin_idle');
                        }
                    });
                }
            }
        }
    }

    //Check if player is in attack range of enemy
    isPlayerInAttackRange(enemy) {
        const HORIZONTAL_ATTACK_DISTANCE = 100;
        const VERTICAL_ATTACK_DISTANCE = 50;
        const playerX = this.player.sprite.x;
        const playerY = this.player.sprite.y;
        const enemyX = enemy.x;
        const enemyY = enemy.y;

        // Check the horizontal and vertical distances
        const horizontalDistance = Math.abs(playerX - enemyX);
        const verticalDistance = Math.abs(playerY - enemyY);

        return horizontalDistance < HORIZONTAL_ATTACK_DISTANCE && verticalDistance < VERTICAL_ATTACK_DISTANCE;
    }

    //Called after set time interval to drop a bomb
    dropBomb() {
        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        if (this.bombs.children.getArray().filter(bomb => bomb.active).length < 4 && this.score - 5 > 0) {
            //Create bomb with properties
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.body.allowGravity = false;
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            //Reduce score by 5
            this.score -= 5;
        }
    }

    //Called when the player is hit by a bomb
    hitBomb(bomb) {
        this.player.sprite.setTint(0xff0000);
        this.gameOver = true;

        //Create explosion animation
        bomb.play('explosion');
    }

    update(time) {
        //Update Score
        this.scoreText.setText('score: ' + this.score);

        //Check if game is over
        if (this.gameOver) {

            if (this.enemies === 0) {
                this.physics.pause();
                this.player.sprite.setTint(0xffffff);
                this.time.delayedCall(2000, () => {
                    this.scene.start('GameOverScene'); // Change to the Game Over scene
                });
                return;
            }
            else {
                //Check whether the player is on the ground
                if (!this.player.sprite.body.touching.down) {
                    this.player.sprite.setVelocityY(200);
                }
                else {
                    this.physics.pause();
                    if (this.player.sprite.anims.currentAnim.key !== 'player_death') {
                        this.player.sprite.play('player_death');
                    }
                }

                this.time.delayedCall(2000, () => {
                    this.scene.start('GameOverScene'); // Change to the Game Over scene
                });
                return;
            }
        }
        else {
            //Add player update states
            this.player.update();

            this.necromancers.children.iterate(necromancer => {
                if (!necromancer.isDead) {
                    necromancer.update();

                    if (this.isPlayerInAttackRange(necromancer) && !necromancer.isAttacking && necromancer.body.enable) {
                        necromancer.isAttacking = true;
                        necromancer.play('necromancer_attack');
                        necromancer.setOffset(45, 28);

                        this.time.delayedCall(1700, () => {
                            if (this.isPlayerInAttackRange(necromancer) && !this.player.isAttacking) {
                                this.player.sprite.setTint(0xff0000);
                                this.gameOver = true;
                            }
                        });

                        // Set a delay to finish the attack animation before resuming other actions
                        this.time.delayedCall(2000, () => {
                            if (!necromancer.isDead) {
                                necromancer.isAttacking = false;
                                necromancer.play('necromancer_idle');
                                necromancer.setOffset(32, 12);
                            }
                        });
                    }
                }
            });

            this.paladins.children.iterate(paladin => {
                if (!paladin.isDead) {
                    paladin.update();
                    if (this.isPlayerInAttackRange(paladin) && !paladin.isAttacking && paladin.body.enable) {
                        paladin.isAttacking = true;
                        paladin.play('paladin_attack');

                        // Set a delay to finish the attack animation before resuming other actions
                        this.time.delayedCall(1500, () => {
                            if (this.isPlayerInAttackRange(paladin) && !this.player.isAttacking) {
                                this.player.sprite.setTint(0xff0000);
                                this.gameOver = true;
                            }
                        });

                        // Set a delay to finish the attack animation before resuming other actions
                        this.time.delayedCall(2000, () => {
                            if (!paladin.isDead) {
                                paladin.isAttacking = false;
                                paladin.play('paladin_idle');
                            }
                        });
                    }
                }
            });

            // Check if 5 seconds have passed since the last bomb drop
            if (time > this.bombDropTimer + 5000) {
                this.dropBomb();
                this.bombDropTimer = time; // Update the last bomb drop time
            }
        }
    }
}

export default MainScene;