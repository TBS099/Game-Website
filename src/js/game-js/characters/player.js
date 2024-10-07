class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'player_idle');
        this.sprite.setScale(1.7);
        this.sprite.setBodySize(32, 32);
        this.sprite.setOffset(16, 12);

        // Create Idle Animation for Player
        if (!this.scene.anims.exists('player_idle')) {
            this.scene.anims.create({
                key: 'player_idle',
                frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 14 }),
                frameRate: 20,
                repeat: -1
            });
        }

        // Create Running Animation for Player
        if (!this.scene.anims.exists('player_running')) {
            this.scene.anims.create({
                key: 'player_running',
                frames: this.scene.anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
        }

        // Create Attack Animation for Player
        if (!this.scene.anims.exists('player_attack')) {
            this.scene.anims.create({
                key: 'player_attack',
                frames: this.scene.anims.generateFrameNumbers('player_attack', { start: 0, end: 21 }),
                frameRate: 20,
                repeat: 0
            });
        }

        // Create Death Animation for Player

        if (!this.scene.anims.exists('player_death')) {
            this.scene.anims.create({
                key: 'player_death',
                frames: this.scene.anims.generateFrameNumbers('player_death', { start: 0, end: 14 }),
                frameRate: 10,
                repeat: 0
            });
        }

        this.sprite.play('player_idle');  // Start with idle animation
        this.sprite.body.setGravityY(400);
        this.sprite.setCollideWorldBounds(true);

        this.sprite.isAttacking = false;

        // Player control keys (assuming cursors for movement and space for attack)
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Reset horizontal velocity
        this.sprite.body.setVelocityX(0);

        // If the player is currently attacking, don't process movement
        if (this.isAttacking) {
            return;
        }

        // Player movement logic
        if (this.cursors.left.isDown) {
            // Move left
            this.sprite.setOffset(26, 12);
            this.sprite.body.setVelocityX(-200);
            this.sprite.setFlipX(true);  // Flip sprite to face left
            this.sprite.play('player_running', true);
        } else if (this.cursors.right.isDown) {
            // Move right
            this.sprite.setOffset(35, 12);
            this.sprite.body.setVelocityX(200);
            this.sprite.setFlipX(false);  // Face right
            this.sprite.play('player_running', true);
        } else {
            // No movement, play idle animation if not attacking
            if (!this.isAttacking) {
                this.sprite.setOffset(16, 12);
                this.sprite.play('player_idle', true);
            }
        }

        // Jumping
        if (this.cursors.up.isDown && this.sprite.body.onFloor()) {
            this.sprite.body.setVelocityY(-500);  // Jump velocity
        }

        // Attack logic
        if (Phaser.Input.Keyboard.JustDown(this.attackKey) && !this.isAttacking) {
            this.attack();
        }
    }

    attack() {
        this.isAttacking = true;
        this.sprite.setOffset(50, 12);
        this.sprite.play('player_attack', true);

        if (this.sprite.flipX) {
            this.scene.time.delayedCall(800, () => {
                this.sprite.setOffset(30, 12);
            });
        }
        else {
            this.scene.time.delayedCall(800, () => {
                this.sprite.setOffset(80, 12);
            });
        }

        // Set a delay to finish the attack animation before resuming other actions
        this.scene.time.delayedCall(1100, () => {
            this.isAttacking = false;
        });
    }
}

export default Player;