<!-- add change password choice -->

<template>
	<view class="user-profile">
		<view class="profile-header">
			<text class="welcome-text">{{ user.engName }}'s Profile</text>
		</view>
		<view class="profile-content">
			<view v-for="(item, index) in userInfo" :key="index" class="info-item">
				<view class="info-label">
					<text class="label-text">{{ item.label }}</text>
				</view>
				<view class="info-value">
					<text class="value-text">{{ item.value }}</text>
					<view class="copy-btn-container">
						<view v-if="item.copyable" @click="copyToClipboard(item.value)"
							class="iconfont icon-file-copy copy-btn"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="profile-footer">
			<text class="deregister-text" @click="showDeregisterModal">Deregister</text>
		</view>
		<view class="logout">
			<text class="logout-btn" @click="logout">Logout</text>
		</view>
		<view class="logo-container">
			<image class="logo-image" src="/static/ph_club_logo_full.png" mode="aspectFit"></image>
			<text class="logo-text">PH Clubs {{webVerison}}</text>
		</view>
		<view class="user-agreement-link">
			<text class="user-agreement-text" @click="navigateToUserAgreement">User Agreement</text>
		</view>

		<!-- Deregister Confirmation Modal -->
		<uni-popup ref="deregisterPopup" type="dialog">
			<uni-popup-dialog type="warning" cancelText="Cancel" confirmText="Confirm" title="Confirm Deregistration"
				content="Are you sure you want to deregister? This action cannot be undone."
				@confirm="handleDeregister"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '../../utils/auth'
	import {
		api
	} from '../../services/api.js'
	export default {
		data() {
			return {
				webVerison : "0.1.0",
				user: {
					studentId: '12345678',
					grade: '11',
					chineseName: '张三',
					englishName: 'John Doe',
					role: 'Student',
					lastLogin: '2023-09-18 14:30:00'
				},
				userInfo: [

				]
			}
		},
		mounted() {
			this.loadStudentInfo()
		},
		methods: {
			logout() {
				api.student.logout()
				uni.showToast({
					title: '已退出登录',
					icon: 'success'
				})
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			loadStudentInfo() {
				try {
					const userInfo = getUserInfo()
					this.user = {
						stuId: userInfo.stu_id,
						grade: userInfo.grade,
						chiName: userInfo.chi_name,
						engName: userInfo.eng_name,
						roleName: userInfo.role_name,
						lastLoginTime: userInfo.last_login_time
					}

					this.userInfo = [{
							label: 'Student ID',
							value: this.user.stuId,
							copyable: true
						},
						{
							label: 'Grade',
							value: this.user.grade,
							copyable: true
						},
						{
							label: 'Chinese Name',
							value: this.user.chiName,
							copyable: true
						},
						{
							label: 'English Name',
							value: this.user.engName,
							copyable: true
						},
						{
							label: 'Role',
							value: this.user.roleName,
							copyable: false
						},
						{
							label: 'Last Login',
							value: this.user.lastLoginTime,
							copyable: false
						}
					]
				} catch (error) {
					console.error('Failed to load user info:', error)
					// Handle error (e.g., show error message to user)
				}
			},
			copyToClipboard(text) {
				uni.setClipboardData({
					data: text,
					success: () => {
						// uni.showToast({
						//   title: 'Copied to clipboard',
						//   icon: 'success',
						//   duration: 2000
						// });
					},
					showToast: false
				});
			},
			showDeregisterModal() {
				this.$refs.deregisterPopup.open();
			},
			handleDeregister() {
				// Implement deregister logic here
				console.log('User confirmed deregistration');
				// After deregistration logic, close the popup
				this.$refs.deregisterPopup.close();
			},
			navigateToUserAgreement() {
				uni.navigateTo({
					url: '../userAgreement/userAgreement?showWeb=true'
				});
			}
		}
	}
</script>

<style scoped>
	.user-profile {
		padding: 20px;
		background-color: #ffffff;
	}
	.profile-header {
		padding: 20px 0;
		border-bottom: 2px solid #f0f0f0;
	}
	.welcome-text {
		color: #333333;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin-top: 20px;
	}
	.profile-content {
		padding-top: 20px;
		padding-bottom: 2px;
	}
	.info-item {
		display: flex;
		align-items: center;
		padding: 10px 0;
		min-height: 35px;
		border-bottom: 1px solid #f0f0f0;
	}
	.info-label {
		width: 120px;
		flex-shrink: 0;
	}
	.label-text {
		font-weight: bold;
		color: #666666;
		font-size: 14px;
	}
	.info-value {
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.value-text {
		color: #333333;
		font-size: 16px;
	}
	.copy-btn-container {
		width: 60px;
		display: flex;
		justify-content: flex-end;
	}
	.copy-btn {
		color: #333333;
		padding: 0px 15px;
		border-radius: 5px;
		font-size: 20px;
	}
	.copy-btn:active {
		font-size: 21px;
	}
	.profile-footer {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}
	.deregister-text {
		color: #0f652c;
		cursor: pointer;
		font-size: 14px;
		font-weight: bold;
	}
	.deregister-text:hover {
		text-decoration: underline;
	}
	
	.logout {
		margin-top: auto;
		padding-top: 10px;
	}
	
	.logout-btn {
		background-color: #0f652c;
		color: white;
		padding: 8px 15px;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
		text-align: center;
		display: block;
	}
	
	.logout-btn:hover {
		background-color: #0a4a1f;
	}
	
	.logo-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 5px;
	}
	.logo-image {
		width: 40px;
		height: 40px;
		margin-bottom: 3px;
		margin-top: 20px;
	}
	.logo-text {
		font-size: 12px;
		font-weight: bold;
		color: #0f652c;
		text-align: center;
	}
	.user-agreement-link {
		margin-top: 5px;
		text-align: center;
	}
	.user-agreement-link text {
		color: #0f652c;
		font-size: 12px;
		cursor: pointer;
		font-weight: bold;
	}
	.user-agreement-text:hover {
		text-decoration: underline;
	}
</style>