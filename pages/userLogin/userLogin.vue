<template>
	<view class="login-container">
		<view class="login-box">
			<view @click="navigateToHome" class="logo-container">
				<image class="logo-image" src="/static/ph_club_logo_full.png" mode="aspectFit"></image>
				<text class="logo-text">PH Clubs Login</text>
			</view>
			<form @submit.prevent="handleLogin">
				<view class="input-group">
					<label for="studentId">Student ID:</label>
					<input type="text" id="studentId" v-model="studentId" required>
				</view>
				<view class="input-group">
					<label for="password">Password:</label>
					<input type="password" id="password" v-model="password" required>
				</view>

				<view class="user-agreement">
					<text>Login means you agree to the </text>
					<text class="user-agreement-text" @click="navigateToUserAgreement">User Agreement</text>
				</view>
				<button @click="handleLogin" type="submit" class="login-btn">
					 Log In
				</button>
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
	import { api } from '../../services/api.js'
	export default {
		name: 'Login',
		data() {
			return {
				studentId: '',
				password: '',
				isLoading: false,
				showForgotPasswordModal: false,
				isCopied: false,
			}
		},
		methods: {
			async handleLogin() {
				console.log(this.studentId)
				try {
					const response = await api.student.login(this.studentId, this.password)
					// 登录成功，token 已经被自动保存在 cookie 中
					console.log('Login successful:', response)
					// 在这里处理登录成功后的逻辑，比如跳转到主页
					uni.navigateTo({
						url: '../userIndex/userIndex'
					})
				} catch (error) {
					// 处理登录失败
					console.error('Login failed:', error)
					// 显示错误消息给用户
				}
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
					showToast:false
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
		padding: 45px;
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
		margin-bottom: 10px;
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
		height: 40px;
		padding: 8px 12px;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		font-size: 16px;
		transition: border-color 0.3s ease;
		box-sizing: border-box;
		text-align: left;
	}

	input:focus {
		border-color: #0f652c;
		outline: none;
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
		margin-bottom: 20px;
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