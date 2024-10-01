<template>
	<view :class="['container', { 'mobile': isMobile }]">
		<view :class="['dock', { 'collapsed': isDockCollapsed, 'mobile': isMobile }]">
			<view v-if="!isMobile || !isDockCollapsed" @click="switchPage('Profile')" class="user-info">
				<image class="avatar-image" src="/static/person.circle.fill.png" mode="aspectFit"></image>
				<view class="user-details">
					<text class="name-text">{{engName}}</text>
					<text class="name-text">{{chiName}}</text>
					<text class="info-text">{{stu_id}} | {{grade}} | {{role}}</text>
				</view>

			</view>

			<view :class="['nav', { 'mobile': isMobile }]">
				<text v-if="isDockCollapsed" class="name-text" @click="switchPage('Profile')">{{engName}}</text>
				<text :class="['nav-item', currentPage === 'PersonalData' ? 'active' : '']"
					@click="switchPage('PersonalData')">Personal Data</text>
				<text :class="['nav-item', currentPage === 'Overview' ? 'active' : '']"
					@click="switchPage('Overview')">Overview</text>
			</view>
			<view v-if="!isMobile" class="logout"> <!-- || !isDockCollapsed -->
				<!-- <text class="logout-btn" @click="logout">Logout</text> -->
				<view class="dock-logo-container">
					<image class="logo-image" src="/static/ph_club_logo_full.png" mode="aspectFit"></image>
					<text class="logo-text">PH Clubs {{webVerison}}</text>
				</view>
				<a href="https://www.google.com" class="feedback-text">Tell us your thoughts!</a>
			</view>
		</view>
		<view :class="['content', { 'mobile': isMobile }]">
			<button v-if="!isMobile" class="collapse-btn" @click="toggleDock">
				{{ isDockCollapsed ? '▶' : '◀' }}
			</button>
			<transition name="fade" mode="out-in">
				<component :is="currentPage" :key="currentPage"></component>
			</transition>
		</view>
		<button v-if="isMobile" class="mobile-toggle" @click="toggleDock">
			<span class="toggle-icon">{{ isDockCollapsed ? '▼' : '▲' }}</span>
			{{ isDockCollapsed ? '展开菜单' : '收起菜单' }}
		</button>
	</view>
</template>

<script scoped>
	import PersonalDataForm from '../userPersonalData/userPersonalData.vue'
	import DashboardOverview from '../userOverview/userOverview.vue'
	import Profile from '../userProfile/userProfile.vue'
	import {
		getUserInfo
	} from '../../utils/auth'
	import {
		api
	} from '../../services/api.js'

	export default {
		components: {
			PersonalData: PersonalDataForm,
			Overview: DashboardOverview,
			Profile: Profile,
		},
		data() {
			return {
				currentPage: 'PersonalData',
				isDockCollapsed: false,
				isMobile: false,
				engName: "JohnnyAppleSeed",
				chiName: "John",
				role: "student",
				grade: "11.6",
				stu_id: "123456",
				webVerison : "0.1.0",
			}
		},
		methods: {
			loadStudentInfo() {
				try {
					const userInfo = getUserInfo()
					this.engName = userInfo.eng_name
					this.chiName = userInfo.chi_name
					this.role = userInfo.role_name
					this.stu_id = userInfo.stu_id
				} catch (error) {
					console.error('Failed to load user info:', error)
					// Handle error (e.g., show error message to user)
				}

			},
			switchPage(page) {
				this.currentPage = page
			},
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
			toggleDock() {
				this.isDockCollapsed = !this.isDockCollapsed
			},
			checkMobile() {
				this.isMobile = window.innerWidth <= 768
				if (this.isMobile && !this.isDockCollapsed) {
					this.isDockCollapsed = true
				}
			},
			navigateToFeedback() {
				
			}
			
		},
		mounted() {
			this.checkMobile()
			this.loadStudentInfo()
			window.addEventListener('resize', this.checkMobile)
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.checkMobile)
		}
	}
</script>

<style>
	.container {
		display: flex;
		height: 100vh;
		font-family: Arial, sans-serif;
		overflow: hidden;
	}

	.container.mobile {
		flex-direction: column;
	}

	.dock {
		width: 280px;
		background-color: #f5f5f5;
		border-right: 2px solid #332f22;
		display: flex;
		flex-direction: column;
		transition: all 0.3s ease;
		overflow-y: auto;
	}

	.dock.collapsed:not(.mobile) {
		width: 0px;
		padding: 20px 0px;
		overflow: hidden;
	}

	.dock.mobile {
		width: 100%;
		border-right: 0;
		border-bottom: 2px solid #332f22;
		box-sizing: border-box;
		margin: 0;
		transition: max-height 0.3s ease;
		overflow: hidden;
	}

	.dock.mobile.collapsed {
		max-height: 60px;
	}

	.user-info {
		display: flex;
		align-items: flex-start;
		padding: 20px 10px;
		margin-bottom: 20px;
		background-color: #ffffff;
		cursor: pointer;
		border-bottom: 1.5px solid #333;
	}

	.avatar-image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-right: 10px;
		border: .2px solid #333;
	}

	.user-details {
		display: flex;
		flex-direction: column;
	}

	.name-text {
		font-size: 20px;
		font-weight: bold;
		color: #333;
	}

	.info-text {
		font-size: 14px;
		color: #666;
		margin-top: 5px;
	}

	/* 	.name-text:hover {
		text-decoration: underline;
	} */

	.nav {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 15px;
	}

	.nav.mobile {
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 60px;
		margin-bottom: 10px;
		padding: 10px;
	}

	.nav-item {
		margin: 10px 0;
		cursor: pointer;
		position: relative;
		color: #333;
		font-size: 16px;
		transition: color 0.3s ease-in-out;
	}

	.nav.mobile .nav-item {
		margin: 0 10px;
	}

	.nav-item::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: #333;
		transform: scaleX(0);
		transition: transform 0.3s ease-in-out;
		bottom: -2px;
		left: 0;
		transform-origin: left;
	}

	.nav-item:hover::after {
		transform: scaleX(1);
	}

	.nav-item.active {
		color: #0f652c;
		font-weight: bold;
	}

	.nav-item.active::after {
		background-color: #0f652c;
		transform: scaleX(1);
	}

	.logout {
		margin-top: auto;
		padding: 15px;
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


	.dock-logo-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 10px;
		padding-bottom: 2px;
		border-bottom: #666 5px solid;
	}
	.logo-image {
		width: 50px;
		height: 50px;
		margin-bottom: 3px;
	}
	.logo-text {
		font-size: 16px;
		font-weight: bold;
		color: #666;
		text-align: right;
	}
	
	.feedback-text {
		color: #0f652c;
		font-weight: bold;
	}
	.feedback-text:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.content {
		flex: 1;
		/* padding: 20px; */
		padding-left: 30px;
		overflow-y: auto;
		position: relative;
	}

	.content.mobile {
		/* padding: 20px; */
		padding: 0;
	}

	.collapse-btn {
		position: absolute;
		top: 20px;
		left: 0;
		background-color: #0f652c;
		color: white;
		border: none;
		border-radius: 0 5px 5px 0;
		padding: 5px;
		cursor: pointer;
		font-size: 18px;
		transition: background-color 0.3s;
	}

	.collapse-btn:hover {
		background-color: #0a4a1f;
	}

	.mobile-toggle {
		position: fixed;
		bottom: 10px;
		right: 10px;
		background-color: #0f652c;
		color: white;
		border: none;
		border-radius: 30px;
		padding: 0px 15px;
		cursor: pointer;
		font-size: 16px;
		transition: background-color 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}

	.mobile-toggle:hover {
		background-color: #0a4a1f;
	}

	.toggle-icon {
		margin-right: 8px;
		font-size: 18px;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	@media screen and (max-width: 768px) {
		.user-info {
			display: flex;
			align-items: center;
			margin-bottom: 5px;
		}
	}
</style>