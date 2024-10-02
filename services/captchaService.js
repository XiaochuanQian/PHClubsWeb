// src/services/captchaService.js

class CaptchaService {
	constructor() {
		this.captcha = '';
		this.captchaImage = '';
	}

	generateCaptcha() {
		const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
		this.captcha = '';
		for (let i = 0; i < 4; i++) {
			this.captcha += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		this.generateCaptchaImage();
	}

	generateCaptchaImage() {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = 150;
		canvas.height = 50;

		// Fill background
		ctx.fillStyle = '#f0f0f0';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Add noise
		this.addNoise(ctx, canvas.width, canvas.height);

		// Add random lines
		this.addRandomLines(ctx, canvas.width, canvas.height);

		// Set text style
		ctx.font = 'bold 30px Arial';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';

		// Draw each character with increased distortion
		for (let i = 0; i < this.captcha.length; i++) {
			ctx.fillStyle = this.getRandomColor(10, 100);
			ctx.save();
			ctx.translate(40 + i * 20, 25);
			ctx.rotate((Math.random() - 0.5) * 0.7);
			ctx.scale(Math.random() * 0.2 + 0.8, Math.random() * 0.2 + 0.8);
			ctx.fillText(this.captcha[i], 0, 0);
			ctx.restore();
		}

		// Convert canvas to data URL
		this.captchaImage = canvas.toDataURL();
	}

	addNoise(ctx, width, height) {
		for (let i = 0; i < 100; i++) {
			ctx.fillStyle = this.getRandomColor(180, 240);
			ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
		}
	}

	addRandomLines(ctx, width, height) {
		for (let i = 0; i < 4; i++) {
			ctx.strokeStyle = this.getRandomColor(100, 180);
			ctx.beginPath();
			ctx.moveTo(Math.random() * width, Math.random() * height);
			ctx.lineTo(Math.random() * width, Math.random() * height);
			ctx.lineWidth = Math.random() * 2 + 1;
			ctx.stroke();
		}
	}

	getRandomColor(min, max) {
		const r = Math.floor(Math.random() * (max - min + 1) + min);
		const g = Math.floor(Math.random() * (max - min + 1) + min);
		const b = Math.floor(Math.random() * (max - min + 1) + min);
		return `rgb(${r},${g},${b})`;
	}

	getCaptchaImage() {
		return this.captchaImage;
	}

	validateCaptcha(userInput) {
		return userInput.toLowerCase() === this.captcha.toLowerCase();
	}

	refreshCaptcha() {
		this.generateCaptcha();
		return this.captchaImage;
	}

	getCaptchaText() {
		return this.captcha;
	}
}

export default new CaptchaService();