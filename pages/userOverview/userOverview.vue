<!-- add show club stats -->
<template>
	<view class="user-overview" :class="{ 'mobile': isMobile }">
		<view class="club-list-container" v-if="!isMobile || (isMobile && !selectedClub)">
			<input v-model="searchQuery" placeholder="Search clubs" class="search-input" @input="searchClubs" />
			<scroll-view scroll-y class="club-list">
				<view v-for="category in filteredClubCategories" :key="category.id" class="category">
					<text class="category-name">{{ category.category_name }}</text>
					<view v-for="club in category.clubs" :key="club.id" @tap="selectClub(club.id)"
						:class="['club-item', { active: selectedClubId === club.id }]">
						<text>{{ club.club_name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="club-info" v-if="selectedClub" :class="{ 'mobile': isMobile }">

			<scroll-view scroll-y class="club-details-scroll">
				<view v-if="isMobile" class="back-button" @tap="goBack">
					<text>← Back to Categories</text>
				</view>
				<view class="club-header">
					<image :src="selectedClub.club_bg_img" mode="aspectFill" class="club-bg-img"></image>
					<view class="club-title">
						<text class="club-name">{{ selectedClub.club_name }}</text>
						<view class="club-status">
							<text
								:class="['status-badge', selectedClub.club_status.toLowerCase()]">{{ selectedClub.club_status }}</text>
							<text class="star-rating">⭐ {{ selectedClub.star }}</text>
						</view>
						<button class="joinClub-button" @click="handleJoinClub" :disabled="selectedClub.is_member === 1">
							{{ selectedClub.is_member === 1 ? 'Already Joined' : 'Join Club' }}
						</button>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">President</text>
					<view v-for="president in selectedClub.president" :key="president.eng_name" class="president-info">
						<text class="president-name">{{ president.chi_name }} ({{ president.eng_name }})</text>
						<text class="president-grade">Grade {{ president.grade }}</text>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">Vice President</text>
					<view v-for="vice_president in selectedClub.vice_president" :key="vice_president.eng_name"
						class="president-info">
						<text class="president-name">{{ vice_president.chi_name }}
							({{ vice_president.eng_name }})</text>
						<text class="president-grade">Grade {{ vice_president.grade }}</text>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">Club Background</text>
					<text class="info-text">Established: {{ selectedClub.club_background.establish_time }}</text>
				</view>

				<view class="info-section">
					<text class="section-title">Learning Objectives</text>
					<view v-for="objective in selectedClub.learning_objectives" :key="objective" class="info-item">
						<text class="info-text">• {{ objective }}</text>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">For Whom</text>
					<view v-for="forWhom in selectedClub.for_whom" :key="forWhom" class="info-item">
						<text class="info-text">• {{ forWhom }}</text>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">Meeting Schedule</text>
					<view class="schedule-info">
						<text class="info-text">Frequency: {{ selectedClub.meeting_schedule.frequency }}\n</text>
						<text class="info-text">Day: {{ selectedClub.meeting_schedule.day }}\n</text>
						<text class="info-text">Location: {{ selectedClub.meeting_schedule.location }}\n</text>
					</view>
					<text class="sub-section-title">Requirements</text>
					<view v-for="requirement in selectedClub.meeting_schedule.requirements" :key="requirement"
						class="info-item">
						<text class="info-text">• {{ requirement }}</text>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">Past Projects</text>
					<view v-for="project in selectedClub.exp_past_projects" :key="project" class="info-item">
						<text class="info-text">• {{ project }}</text>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">Join Benefits</text>
					<view v-for="benefit in selectedClub.join_benefits" :key="benefit" class="info-item">
						<text class="info-text">• {{ benefit }}</text>
					</view>
				</view>

				<view class="info-section">
					<text class="section-title">Contact Information</text>
					<view v-for="contact in selectedClub.contact_information" :key="contact.eng_name"
						class="contact-info">
						<text selectable class="info-text">Name: {{ contact.eng_name }}\n</text>
						<text selectable class="info-text">Email: {{ contact.email }}\n</text>
						<text selectable class="info-text">WeChat ID: {{ contact.wechat_id }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../services/api.js'
import { getUserInfo } from '../../utils/auth.js';
	export default {
		data() {
			return {
				clubCategories: [],
				selectedClubId: null,
				selectedClub: null,
				searchQuery: '',
				filteredClubCategories: [],
				isMobile: false,
			};
		},
		methods: {
			async loadClubCategories() {
				try {
					const response = await api.clubCategory.index();

					if (response.code === "0" && response.msg === "ok") {
						this.clubCategories = response.data;
						this.filteredClubCategories = this.clubCategories;
					} else {
						console.error('Failed to load club categories:', response.msg);
					}
				} catch (error) {
					console.error('Error loading club categories:', error);

				}
			},
			async selectClub(clubId) {
				this.selectedClubId = clubId;
				console.log(clubId);
				try {
					const response = await api.club.getClubDetail(clubId);
					if (response.code === "0" && response.msg === "ok") {
						this.selectedClub = response.data;
					} else {
						console.error('Failed to load club details:', response.msg);
					}
				} catch (error) {
					console.error('Error loading club details:', error);
				}
				if (this.isMobile) {
					this.showCategories = false;
				}
			},
			async handleJoinClub() {
				if (this.selectedClub.isMember === 1) {
					// User is already a member, do nothing
					return;
				}

				try {
					const userInfo = getUserInfo()
					// Call the API to join the club
					const response = await api.clubMember.add(this.selectedClubId, userInfo.stu_id);
					console.log(this.selectedClubId)

					if (response.code === "0" && response.msg === "Add successfully") {
						// Successfully joined the club
						this.selectedClub.is_member = 1;
						uni.showToast({
							title: 'Successfully joined the club!',
							icon: 'success'
						});
					} else {
						// Failed to join the club
						uni.showToast({
							title: 'Failed to join the club. Please try again.',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('Error joining club:', error);
					uni.showToast({
						title: 'An error occurred. Please try again.',
						icon: 'none'
					});
				}
			},
			searchClubs() {
				const query = this.searchQuery.toLowerCase();
				this.filteredClubCategories = this.clubCategories.map(category => {
					return {
						...category,
						clubs: category.clubs.filter(club =>
							club.club_name.toLowerCase().includes(query)
						)
					};
				}).filter(category => category.clubs.length > 0);
			},
			goBack() {
				this.selectedClub = null;
				this.selectedClubId = null;
			},
			checkMobile() {
				// Use uni-app's way to get system info
				const systemInfo = uni.getSystemInfoSync();
				this.isMobile = systemInfo.windowWidth <= 768;
			}
		},
		mounted() {
			this.filteredClubCategories = this.clubCategories;
			this.checkMobile();
			this.loadClubCategories();
			window.addEventListener('resize', this.checkMobile);
		},
		beforeDestroy() {
			// Remove event listener
			window.removeEventListener('resize', this.checkMobile);
		}
	};
</script>

<style>
	page {
		height: 100%;
		overflow: hidden;
	}

	.user-overview {
		display: flex;
		height: 100vh;
		background-color: #f5f5f5;
		overflow: hidden;
	}

	.user-overview.mobile {
		flex-direction: column;
	}

	.club-list-container {
		display: flex;
		flex-direction: column;
		width: 320px;
		height: 100%;
		background-color: #ffffff;
		z-index: 10;
	}

	.search-input {
		margin: 10px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 14px;
	}

	.club-list {
		flex: 1;
		overflow-y: auto;
	}

	.club-info {
		flex: 1;
		height: 100%;
		background-color: #ffffff;
		overflow: hidden;
	}

	.club-info.mobile {
		width: 100%;
		height: 100vh;
	}

	.club-details-scroll {
		height: 100vh;
		overflow-y: auto;
	}

	.back-button {
		padding: 10px;
		background-color: #f0f0f0;
		font-weight: bold;
		cursor: pointer;
	}

	.category {
		padding: 5px;
	}

	.category-name {
		font-weight: bold;
		font-size: 20px;
		color: #333;
		margin: 10px 0;
		padding: 0 10px;

	}

	.club-item {
		padding: 10px;
		margin: 0px 0;
		/* border-radius: 3px; */
		transition: background-color 0.3s;
		border-bottom: 1px solid #e8e8e8;
	}

	.club-item:hover {
		background-color: #f0f0f0;
	}

	.club-item.active {
		background-color: #e6f7ff;
		color: #0f652c;
		font-weight: bold;
	}

	.club-header {
		position: relative;
	}

	.club-bg-img {
		width: 100%;
		height: 220px;
	}

	.club-title {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.club-name {
		font-size: 24px;
		font-weight: bold;
		color: #ffffff;
		margin-right: 10px;
	}

	.club-status {
		display: flex;
		align-items: center;
		flex-grow: 1;
	}



	.status-badge {
		padding: 3px 8px;
		border-radius: 10px;
		font-size: 12px;
		font-weight: bold;
		margin-right: 10px;
	}

	.status-badge.active {
		background-color: #52c41a;
		color: #ffffff;
	}

	.star-rating {
		color: #faad14;
		font-size: 14px;
	}

	.joinClub-button {
		background-color: #0f652c;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 5px;
		padding: 0px 10px;
		font-size: 14px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin-left: auto;
	}

	.joinClub-button:hover {
		background-color: #0a4a1f;
	}

	.joinClub-button:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	.info-section {
		background-color: #ffffff;
		padding: 15px;
		margin-bottom: 10px;
		border-bottom: 1px solid #e8e8e8;
	}

	.info-section:last-child {
		border-bottom: none;
	}

	.section-title {
		font-size: 18px;
		font-weight: bold;
		color: #0f652c;
		margin-bottom: 10px;
	}

	.sub-section-title {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin: 10px 0;
	}

	.info-item {
		margin-bottom: 5px;
	}

	.info-text {
		font-size: 15px;
		color: #333;
		line-height: 1.5;
	}

	.president-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;
	}

	.president-name {
		font-weight: bold;
	}

	.president-grade {
		color: #666;
	}

	.schedule-info {
		margin-bottom: 10px;
	}

	.contact-info {
		background-color: #f0f0f0;
		padding: 10px;
		border-radius: 5px;
		margin-top: 10px;
	}

	@media screen and (max-width: 768px) {

		.club-list-container,
		.club-info.mobile {
			width: 100%;
			height: 100vh;
		}

		.search-input {
			font-size: 14px;
			padding: 10px;
		}

		.category-name {
			font-size: 20px;
		}

		.club-item {
			padding: 15px;
			font-size: 17px;
		}

		.club-name {
			font-size: 22px;
		}

		.section-title {
			font-size: 18px;
		}

		.info-text {
			font-size: 14px;
		}

		.club-bg-img {
			height: 180px;
		}

		.president-info {
			flex-direction: column;
			align-items: flex-start;
		}

		.president-grade {
			margin-top: 5px;
		}
	}
</style>