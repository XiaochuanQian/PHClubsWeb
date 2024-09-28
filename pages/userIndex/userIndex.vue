<template>
	<view :class="['container', { 'mobile': isMobile }]">
		<view :class="['dock', { 'collapsed': isDockCollapsed, 'mobile': isMobile }]">
			<view v-if="!isMobile || !isDockCollapsed" class="user-info">
				<image class="avatar-image" src="/static/person.circle.fill.png" mode="aspectFit"></image>
				<text class="name-text" @click="switchPage('Profile')">{{engName}}</text>
			</view>
			<view :class="['nav', { 'mobile': isMobile }]">
				<text v-if="isDockCollapsed" class="name-text" @click="switchPage('Profile')">{{engName}}</text>
				<text :class="['nav-item', currentPage === 'PersonalData' ? 'active' : '']"
					@click="switchPage('PersonalData')">Personal Data</text>
				<text :class="['nav-item', currentPage === 'Overview' ? 'active' : '']"
					@click="switchPage('Overview')">Overview</text>
			</view>
			<view v-if="!isMobile || !isDockCollapsed" class="logout">
				<text class="logout-btn" @click="logout">Logout</text>
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

<script>
	import PersonalDataForm from '../userPersonalData/userPersonalData.vue'
	import DashboardOverview from '../userOverview/userOverview.vue'
	import Profile from '../userProfile/userProfile.vue'
import { getUserInfo } from '../../utils/auth'

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
				engName: "JohnnyAppleSeed"
			}
		},
		methods: {
			loadStudentInfo() {
				try {
					const userInfo = getUserInfo()
					this.engName = userInfo.eng_name
				} catch (error) {
					console.error('Failed to load user info:', error)
					// Handle error (e.g., show error message to user)
				}
				
			},
			switchPage(page) {
				this.currentPage = page
			},
			logout() {
				clearAuth()
				clearUserInfo()
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
		width: 250px;
		background-color: #f5f5f5;
		border-right: 2px solid #332f22;
		display: flex;
		flex-direction: column;
		padding: 20px;
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
		align-items: center;
		margin-bottom: 20px;
	}

	.avatar-image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.name-text {
		font-size: 20px;
		font-weight: bold;
		color: #0f652c;
		cursor: pointer;
	}
	
	.name-text:hover {
		text-decoration: underline;
	}

	.nav {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.nav.mobile {
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 60px;
		margin-bottom: 10px;
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