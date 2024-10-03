<template>
	<view class="login-container">
		<view class="login-box">
			<view @click="navigateToHome" class="logo-container">
				<image class="logo-image" src="/static/ph_club_logo_full.png" mode="aspectFit"></image>
				<text class="logo-text">PH Clubs Login</text>
			</view>
			<form @submit.prevent="handleLogin">
				<view class="input-group">
					<view class="input-with-icon">
						<i class="iconfont icon-user"></i>
						<input type="text" id="studentId" v-model="studentId" required placeholder="Student Id">
					</view>
				</view>
				<view class="input-group">
					<view class="input-with-icon">
						<i class="iconfont icon-lock"></i>
						<input type="password" id="password" v-model="password" required placeholder="Password">
					</view>
				</view>
				<view class="input-group captcha-group">
					<!-- <label for="captcha">Captcha:</label> -->
					<view class="input-with-icon">
						<i class="iconfont icon-verification"></i>
						<view class="captcha-input-container">
							<input type="text" id="captcha" v-model="captchaInput" required placeholder="Enter captcha">
							<image :src="captchaImage" class="captcha-image" mode="aspectFit"></image>
							<button @click="refreshCaptcha" class="refresh-btn">↻</button>
						</view>
					</view>
				</view>
				<view v-if="errorMessage" class="error-message" :class="{ 'shake': showErrorAnimation }">
					{{ errorMessage }}
				</view>

				<button @click="handleLogin" type="submit" class="login-btn">
					Log In
				</button>
				<view class="user-agreement">
					<text>Login means you agree to the </text>
					<text class="user-agreement-text" @click="navigateToUserAgreement">User Agreement</text>
				</view>
			</form>
			<view class="forgot-password">
				<text @click="handleForgotPassword">Forgot Password?</text>
			</view>

		</view>

		<!-- Forgot Password Modal -->
		<view v-if="showForgotPasswordModal" class="modal">
			<view class="modal-content">
				<h3>Tips</h3>
				<p>Dear User, if you forget your password or need to register an accout, please contact Michael</p>
				<view class="email-container">
					<text class="email copy-icon" @click="copyEmail">qianxiaochuan23@shphschool.com</text>
				</view>
				<p>{{ isCopied ? 'Copied!' : 'Click on email address to copy' }}</p>
				<button @click="closeForgotPasswordModal" class="close-btn">Close</button>
			</view>
		</view>
	</view>
</template>




<script>
	import {
		api
	} from '../../services/api.js'
	import captchaService from '../../services/captchaService.js'
	import { setCredentials, getCredentials } from '../../utils/storage.js'
	export default {
		name: 'Login',
		data() {
			return {
				studentId: '',
				password: '',
				isLoading: false,
				showForgotPasswordModal: false,
				isCopied: false,
				errorMessage: '',
				captchaInput: '',
				captchaImage: '',
				captchaText: '',
				showErrorAnimation: false,
			}
		},
		methods: {
			async handleLogin() {
				console.log(this.studentId)
				try {
					if (this.captchaInput.toLowerCase() != this.captchaText.toLowerCase()) {
						this.errorMessage = "Captcha incorrect."
						this.showError()
					} else {
						const response = await api.student.login(this.studentId, this.password)
						// 登录成功，token 已经被自动保存在 cookie 中
						console.log('Request successful:', response)

						if (response.code == '4001') {
							this.errorMessage = "Student Id or Password cannot be blank."
							this.showError()
						} else if (response.code == '1001') {
							this.errorMessage = "Student Id or password incorrect."
							this.showError()
						} else if (response.code == '0') { // 假设 '0' 表示登录成功
							// 登录成功，保存用户名和密码
							setCredentials(this.studentId, this.password)
							uni.navigateTo({
								url: '../userIndex/userIndex'
							})
						}
					}
					// 在这里处理登录成功后的逻辑，比如跳转到主页

				} catch (error) {
					// 处理登录失败
					console.error('Login failed:', error)
					// 显示错误消息给用户
				}
			},
			refreshCaptcha() {
				this.captchaImage = captchaService.refreshCaptcha();
				this.captchaText = captchaService.getCaptchaText()
			},
			showError() {
				this.showErrorAnimation = true;
				setTimeout(() => {
					this.showErrorAnimation = false;
				}, 200); // 动画持续时间
			},
			handleForgotPassword() {
				this.showForgotPasswordModal = true;
				this.isCopied = false; // Reset the copy state when opening the modal
			},
			closeForgotPasswordModal() {
				this.showForgotPasswordModal = false;
				this.isCopied = false; // Reset the copy state when closing the modal
			},
			copyEmail() {
				const email = 'qianxiaochuan23@shphschool.com';
				uni.setClipboardData({
					data: email,
					success: () => {
						this.isCopied = true; // Set to true when email is successfully copied
					},
					fail: (err) => {
						console.error('Failed to copy email:', err);
					},
					showToast: false
				});
			},
			navigateToUserAgreement() {
				uni.navigateTo({
					url: '../userAgreement/userAgreement'
				});
			},
			navigateToHome() {
				uni.navigateTo({
					url: "/pages/index/index"
				})
			}

		},
		mounted() {
			this.refreshCaptcha();
		}
	}
</script>





<style scoped>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #f5f5f5;
		font-family: Arial, sans-serif;
		padding: 20px;
		box-sizing: border-box;
	}

	.logo-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 30px;
	}

	.logo-image {
		width: 40px;
		height: 40px;
		margin-right: 10px;
	}

	.logo-text {
		margin: 0;
		font-size: 25px;
		font-weight: bold;
		color: #333;
	}

	.login-box {
		width: 100%;
		max-width: 400px;
		padding: 50px;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.logo-text {
		text-align: center;
		color: #333;
		font-weight: bold;
	}

	.input-group {
		margin-bottom: 15px;
	}

	label {
		display: block;
		margin-bottom: 5px;
		color: #333;
		font-size: 14px;
		font-weight: 500;
	}

	input {
		width: 100%;
		height: 45px;
		padding: 8px 12px;
		border-bottom: 1px solid #e0e0e0;
		/* border-radius: 4px; */
		font-size: 16px;
		transition: border-color 0.3s ease;
		box-sizing: border-box;
		text-align: left;
	}

	input:focus {
		border-color: #0f652c;
		outline: none;
	}
	
	.input-with-icon {
	  position: relative;
	  display: flex;
	  align-items: center;
	}
	
	.input-with-icon input {
	  padding-left: 40px; /* 为图标留出空间 */
	  width: 100%;
	}
	
	.input-with-icon i {
	  position: absolute;
	  left: 12px;
	  top: 50%;
	  transform: translateY(-50%);
	  color: #999;
	  transition: color 0.3s ease;
	}
	
	.input-with-icon input:focus + i {
	  color: #0f652c; /* 当输入框获得焦点时改变图标颜色 */
	}
	
	/* 使用伪元素创建图标 */
	.icon-user::before {
	  content: '\e7ae'; /* 用户图标的 Unicode */
	  font-style: normal;
	}
	
	.icon-lock::before {
	  content: '\e7c9'; /* 锁定图标的 Unicode */
	  font-style: normal;
	}

	.captcha-group {
		margin-bottom: 15px;
	}

	.captcha-input-container {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.captcha-input-container input {
		flex: 1;
		margin-right: 10px;
	}

	.captcha-image {
		width: 120px;
		height: 40px;
		margin-right: 10px;
	}

	.refresh-btn {
		background-color: #0f652c;
		color: white;
		border: none;
		border-radius: 4px;
		width: 40px;
		height: 40px;
		font-size: 20px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
	}

	.refresh-btn:hover {
		background-color: #0a4a1f;
	}


	.error-message {
		color: #fd5257;
		font-size: 14px;
		margin-top: 10px;
		text-align: center;
		background-color: #ffebee;
		padding: 10px 20px;
		border-radius: 5px;
		transition: color 0.3s ease, background-color 0.3s ease;
	}

	@keyframes shake {

		0%,
		100% {
			transform: translateX(0);
		}

		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-5px);
		}

		20%,
		40%,
		60%,
		80% {
			transform: translateX(5px);
		}
	}

	.shake {
		animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
	}

	.login-btn {
		width: 100%;
		height: 40px;
		background-color: #0f652c;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		transition: background-color 0.3s ease;
		margin-top: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-btn:hover {
		background-color: #0f652c;
	}

	.forgot-password {
		text-align: center;
		margin-top: 20px;
	}

	.forgot-password text {
		color: #0f652c;
		cursor: pointer;
		font-size: 14px;
	}

	.forgot-password text:hover {
		text-decoration: underline;
	}

	.login-btn {
		width: 100%;
		height: 40px;
		background-color: #0f652c;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		transition: background-color 0.3s ease, opacity 0.3s ease;
		margin-top: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-btn:hover {
		background-color: #0f652c;
	}

	.login-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	@media (max-width: 534px) {

		.logo-text {
			font-size: 26px;
			font-weight: bold;
		}

		input,
		.login-btn {
			font-size: 18px;
		}

		.login-container {
			background-color: #ffffff;
		}

		.login-box {
			width: 100%;
			max-width: 400px;
			min-width: 200px;
			padding-left: 10px;
			padding-right: 10px;
			background-color: #ffffff;
			border-radius: 0px;
			box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
		}

	}



	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;

	}

	.modal-content {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		max-width: 80%;
		text-align: center;
		max-width: 400px;
	}

	.email-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
	}

	.email {
		font-weight: bold;
		margin-right: 10px;
	}

	.copy-icon {
		cursor: pointer;
		font-size: 17px;
	}

	.close-btn {
		margin-top: 15px;
		background-color: #0f652c;
		color: white;
		/* border: none; */
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		/* padding: 0px 0px; */
		/* Add this line to give some padding to the button */
	}

	.user-agreement {
		text-align: left;
		font-size: 14px;
		margin-bottom: 0px;
		margin-top: 10px;
	}

	.user-agreement-text {
		color: #0f652c;
		cursor: pointer;
		font-size: 14px;
		font-weight: bold;
	}

	.user-agreement-text :hover {
		text-decoration: underline;
	}
</style>