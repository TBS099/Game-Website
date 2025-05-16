class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        //Load Background
        this.load.image('level1', '.././assets/Backgrounds/game_background_1.png');

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
        this.load.image('bomb', '.././assets/Items/bomb.png');

        //Explosion
        this.load.image('explosion1', '.././assets/Explosion/explosion1.png');
        this.load.image('explosion2', '.././assets/Explosion/explosion2.png');
        this.load.image('explosion3', '.././assets/Explosion/explosion3.png');
        this.load.image('explosion4', '.././assets/Explosion/explosion4.png');
        this.load.image('explosion5', '.././assets/Explosion/explosion5.png');
        this.load.image('explosion6', '.././assets/Explosion/explosion6.png');
        this.load.image('explosion7', '.././assets/Explosion/explosion7.png');
        this.load.image('explosion8', '.././assets/Explosion/explosion8.png');
    }

    create() {
        this.scene.start('MainScene');
    }
}

export default PreloadScene;
