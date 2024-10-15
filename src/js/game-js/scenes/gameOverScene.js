class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;

        // Access score from MainScene
        const mainScene = this.scene.get('MainScene');
        const score = mainScene.score;

        //Check if the user is logged in and their score
        const username = sessionStorage.getItem('logged_in_user');

        if (username) {
            const user_data = JSON.parse(localStorage.getItem(username));

            // Update the high score if the current score is higher
            if (user_data) {
                if (score > user_data.high_score) {
                    user_data.high_score = score;
                    localStorage.setItem(username, JSON.stringify(user_data));
                }
            }
        }

        // Add the game over text
        this.add.text(0 + gameWidth / 2 - 200, gameHeight / 2 - 100, 'Game Over', { fontSize: '64px', fill: '#fff' });
        this.add.text(0 + gameWidth / 2 - 125, gameHeight / 2 - 15, `Score: ${score}`, { fontSize: '32px', fill: '#fff' });
        this.add.text(0 + gameWidth / 2 - 200, gameHeight / 2 + 50, 'Press R to Restart', { fontSize: '32px', fill: '#fff' });

        // Restart the game
        this.input.keyboard.on('keydown-R', () => {
            window.location.reload();
        });
    }
}

export default GameOverScene;