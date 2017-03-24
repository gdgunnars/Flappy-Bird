class Background {
	constructor(el1, el2) {
		this.speed = 1.6;
		this.el1 = el1;
		this.el2 = el2;
		this.pos1 = {
			x: 0,
			y: 15
		};
		this.pos2 = {
			x: 31.9,
			y: 15
		};
	}

	reset() {
		this.pos1 = {
			x: 0,
			y: 15
		};
		this.pos2 = {
			x: 31.9,
			y: 15
		};
	}

	onFrame(delta) {
		this.pos1.x -= delta * this.speed;
		this.pos2.x -= delta * this.speed;

		this.pos1.x = (this.pos1.x < -32) ? this.pos2.x + 31.9 : this.pos1.x;
		this.pos2.x = (this.pos2.x < -32) ? this.pos1.x + 31.9 : this.pos2.x;

		// Update UI
		this.el1.css('transform', 'translateZ(0) translate(' + this.pos1.x + 'em, ' + this.pos1.y + 'em)');
		this.el2.css('transform', 'translateZ(0) translate(' + this.pos2.x + 'em, ' + this.pos2.y + 'em)');
	}
}