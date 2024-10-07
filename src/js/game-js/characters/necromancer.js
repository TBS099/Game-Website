class Necromancer {
    constructor(scene, x, y, group) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'necromancer_idle');
        group.add(this.sprite);
        this.sprite.setScale(1.7);
        this.sprite.setBodySize(32, 52);
        this.sprite.setOffset(32, 12);

        this.sprite.health = 100;
        this.sprite.isAttacking = false;
        this.sprite.isAttacked = false;
        this.sprite.isDead = false;

        //Create Idle Animation for Necromancer
        if (!this.scene.anims.exists('necromancer_idle')) {
            this.scene.anims.create({
                key: 'necromancer_idle',
                frames: this.scene.anims.generateFrameNumbers('necromancer_idle', {
                    start: 0,
                    end: 49
                }),
                frameRate: 40,
                repeat: -1
            });
        }

        //Create Movement Animation for Necromancer
        if (!this.scene.anims.exists('necromancer_walk')) {
            this.scene.anims.create({
                key: 'necromancer_walk',
                frames: this.scene.anims.generateFrameNumbers('necromancer_walk', {
                    start: 0,
                    end: 9
                }),
                frameRate: 20,
                repeat: -1
            });
        }

        //Create Attack Animation for Necromancer
        if (!this.scene.anims.exists('necromancer_attack')) {
            this.scene.anims.create({
                key: 'necromancer_attack',
                frames: this.scene.anims.generateFrameNumbers('necromancer_attack', {
                    start: 0,
                    end: 46
                }),
                frameRate: 20,
                repeat: 0
            });
        }

        //Create Get Hit Animation for Necromancer
        if (!this.scene.anims.exists('necromancer_getHit')) {
            this.scene.anims.create({
                key: 'necromancer_getHit',
                frames: this.scene.anims.generateFrameNumbers('necromancer_getHit', {
                    start: 0,
                    end: 8
                }),
                frameRate: 20,
                repeat: 0
            });
        }

        //Create Death Animation for Necromancer
        if (!this.scene.anims.exists('necromancer_death')) {
            this.scene.anims.create({
                key: 'necromancer_death',
                frames: this.scene.anims.generateFrameNumbers('necromancer_death', {
                    start: 0,
                    end: 51
                }),
                frameRate: 20,
                repeat: 0
            });
        }

        this.sprite.play('necromancer_idle');
        this.sprite.setCollideWorldBounds(true);
    }

    update() {
        if (this.sprite.isDead) {
            return; // Prevent any further animations if dead
        }

        if (!this.sprite.isAttacking && !this.sprite.isAttacked) {
            this.sprite.setOffset(32, 12);
            this.sprite.setBodySize(32, 52);
            this.sprite.play('necromancer_idle', true);
        }
    }
}

export default Necromancer;