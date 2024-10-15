class Paladin {
    constructor(scene, x, y, group) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'paladin_idle');
        group.add(this.sprite);
        this.sprite.setScale(1.7);
        this.sprite.setBodySize(40, 50);
        this.sprite.setOffset(45, 15);

        //Set Paladin properties
        this.sprite.health = 100;
        this.sprite.isAttacking = false;
        this.sprite.isAttacked = false;
        this.sprite.isDead = false;


        //Create Idle Animation for Paladin
        if (!this.scene.anims.exists('paladin_idle')) {
            this.scene.anims.create({
                key: 'paladin_idle',
                frames: this.scene.anims.generateFrameNumbers('paladin_idle', {
                    start: 0,
                    end: 26
                }),
                frameRate: 20,
                repeat: -1
            });
        }

        //Create Attack Animation for Paladin
        if (!this.scene.anims.exists('paladin_attack')) {
            this.scene.anims.create({
                key: 'paladin_attack',
                frames: this.scene.anims.generateFrameNumbers('paladin_attack', {
                    start: 0,
                    end: 40
                }),
                frameRate: 20,
                repeat: 0
            });
        }

        //Create Get Hit Animation for Paladin
        if (!this.scene.anims.exists('paladin_getHit')) {
            this.scene.anims.create({
                key: 'paladin_getHit',
                frames: this.scene.anims.generateFrameNumbers('paladin_getHit', {
                    start: 0,
                    end: 11
                }),
                frameRate: 20,
                repeat: 0
            });
        }

        //Create Death Animation for Paladin
        if (!this.scene.anims.exists('paladin_death')) {
            this.scene.anims.create({
                key: 'paladin_death',
                frames: this.scene.anims.generateFrameNumbers('paladin_death', {
                    start: 0,
                    end: 64
                }),
                frameRate: 20,
                repeat: 0
            });
        }

        this.sprite.play('paladin_idle');
        this.sprite.setCollideWorldBounds(true);
    }

    update() {
        if (!this.isAttacking && !this.isAttacked) {
            //Reset sprite
            this.sprite.setOffset(16, 12);
            this.sprite.play('paladin_idle', true);
        }
    }
}

export default Paladin;