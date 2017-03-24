/**
 * Main game class.
 * @param {Element} el jQuery element containing the game.
 * @constructor
 */

class Game {
	/**
	 * Some shared constants.
	 */

	constructor (el) {
		this.el = el;
		this.player = new Player(this.el.find('.Player'), this);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);

		this.WORLD_WIDTH = 102.4;
		this.WORLD_HEIGHT = 57.6;
	}

	static get WORLD_WIDTH() { return WORLD_WIDTH; }
	static get WORLD_HEIGHT() { return WORLD_HEIGHT; }
	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	onFrame () {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	}

	/**
	 * Starts a new game.
	 */
	start () {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	}

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	reset () {
		this.player.reset();
	}

	/**
	 * Signals that the game is over.
	 */
	gameover () {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl.addClass('is-visible')
					.find('.Scoreboard-restart')
					.one('click', function() {
						scoreboardEl.removeClass('is-visible');
						that.start();
					});
	}
}


