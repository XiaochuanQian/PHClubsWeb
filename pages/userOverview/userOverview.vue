<template>
	<view class="user-overview" :class="{ 'mobile': isMobile }">
		<view class="club-list-container" :class="{ 'mobile': isMobile }" v-if="!isMobile || (isMobile && !selectedClub)">
			<input v-model="searchQuery" placeholder="Search clubs" class="search-input" @input="searchClubs" />
			<scroll-view scroll-y class="club-list">
				<view v-for="category in filteredClubCategories" :key="category.id" class="category">
					<view class="category-name sticky">{{ category.category_name }}</view>
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
					<text class="section-title">Club Background\n</text>
					<text class="info-text">• Established: {{ selectedClub.club_background.establish_time }}</text>
				</view>

				<view class="info-section">
					<view class="section-title" @click="toggleStatistics">
						Statistics
						<text :class="['toggle-icon', { 'open': showStatistics }]">▼</text>
					</view>
					<view v-if="showStatistics" class="statistics-content">
						<view v-if="clubStatistics">
							<view id="pieChart" class="chart"></view>
							<view id="lineChart" class="chart"></view>
						</view>
						<view v-else class="loading-text">Loading...</view>
					</view>
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
// 导入图表库，这里假设使用 echarts
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components';
import { PieChart, LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([PieChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer, GridComponent])

	export default {
		data() {
			return {
				clubCategories: [],
				selectedClubId: null,
				selectedClub: null,
				searchQuery: '',
				filteredClubCategories: [],
				isMobile: false,
				// ... 其他现有的数据
				clubStatistics: null,
				showStatistics: false,
				charts: {
					pieChart: null,
					lineChart: null
				},
				stickyCategory: null,
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
				// 重置图表相关的状态
				this.clubStatistics = null;
				this.showStatistics = false;
				this.destroyCharts(); // 新增：销毁现有的图表实例

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
			},
			async loadClubStatistics() {
				if (this.selectedClubId) {
					try {
						const response = await api.club.statistic(this.selectedClubId)
						if (response.code === "0" && response.msg === "ok") {
							if (response.data && response.data.chart1 && response.data.chart2) {
								this.clubStatistics = response.data
								this.$nextTick(() => {
									this.renderCharts()
								})
							} else {
								console.error('Invalid statistics data:', response.data)
								this.clubStatistics = null
							}
						} else {
							console.error('Failed to load club statistics:', response.msg)
							this.clubStatistics = null
						}
					} catch (error) {
						console.error('Error loading club statistics:', error)
						this.clubStatistics = null
					}
				}
			},
			renderCharts() {
				if (this.clubStatistics) {
					this.$nextTick(() => {
						this.renderPieChart();
						this.renderLineChart();
						this.resizeCharts();
					});
				}
			},
			renderPieChart() {
				const chartDom = document.getElementById('pieChart');
				if (!chartDom) {
					console.error('Pie chart container not found');
					return;
				}
				if (this.charts.pieChart) {
					this.charts.pieChart.dispose();
				}
				this.charts.pieChart = echarts.init(chartDom);
				const option = {
					title: {
						text: 'Member Activity',
						left: 'center'
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						orient: 'vertical',
						left: 'left'
					},
					series: [
						{
							name: 'Member Status',
							type: 'pie',
							radius: '50%',
							data: [
								{ value: this.clubStatistics.chart1.active, name: 'Active' },
								{ value: this.clubStatistics.chart1.inactive, name: 'Inactive' }
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
				this.charts.pieChart.setOption(option)
			},
			renderLineChart() {
				if (!this.clubStatistics || !this.clubStatistics.chart2 || !Array.isArray(this.clubStatistics.chart2)) {
					console.error('Invalid chart data:', this.clubStatistics);
					return;
				}

				const chartDom = document.getElementById('lineChart');
				if (!chartDom) {
					console.error('Line chart container not found');
					return;
				}
				if (this.charts.lineChart) {
					this.charts.lineChart.dispose();
				}
				this.charts.lineChart = echarts.init(chartDom);

				const chartData = this.clubStatistics.chart2.filter(item => item && item.month && item.amount !== undefined);

				if (chartData.length === 0) {
					console.error('No valid data for line chart');
					return;
				}

				const option = {
					title: {
						text: 'Monthly Activities',
						left: 'center'
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						data: chartData.map(item => item.month)
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							data: chartData.map(item => item.amount),
							type: 'line'
						}
					]
				}
				this.charts.lineChart.setOption(option)
			},
			resizeCharts() {
				if (this.charts.pieChart) {
					this.charts.pieChart.resize()
				}
				if (this.charts.lineChart) {
					this.charts.lineChart.resize()
				}
			},
			handleResize() {
				this.checkMobile()
				this.resizeCharts()
			},
			toggleStatistics() {
				this.showStatistics = !this.showStatistics;
				if (this.showStatistics) {
					if (!this.clubStatistics && this.selectedClubId) {
						this.loadClubStatistics();
					} else if (this.clubStatistics) {
						// 如果统计数据已存在，直接重新渲染图表
						this.$nextTick(() => {
							this.renderCharts();
						});
					}
				}
			},
			destroyCharts() {
				if (this.charts.pieChart) {
					this.charts.pieChart.dispose();
					this.charts.pieChart = null;
				}
				if (this.charts.lineChart) {
					this.charts.lineChart.dispose();
					this.charts.lineChart = null;
				}
			},
		},
		watch: {
			selectedClubId() {
				this.clubStatistics = null;
				this.showStatistics = false;
				this.destroyCharts(); // 在这里也调用销毁图表的方法
			}
		},
		mounted() {
			this.filteredClubCategories = this.clubCategories;
			this.checkMobile();
			this.loadClubCategories();
			window.addEventListener('resize', this.handleResize);
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.handleResize)
			this.destroyCharts(); // 使用新的销毁方法
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
		background-color: #f0f4f8;
		overflow: hidden;
	}

	.user-overview.mobile {
		flex-direction: column;
	}

	.club-list-container {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 100%;
		background-color: #ffffff;
		z-index: 10;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.club-list-container.mobile {
		width: 100%;
		height: auto;
		min-height: 100vh;
	}

	@media screen and (max-width: 768px) {
		.club-list-container,
		.club-info.mobile {
			width: 100%;
			height: auto;
			min-height: 100vh;
		}

		.club-list {
			height: auto;
			min-height: calc(100vh - 60px); /* 减去搜索框的高度 */
		}
	}

	.search-input {
		margin: 15px;
		padding: 12px;
		border: none;
		border-radius: 10px;
		font-size: 14px;
		background-color: #f0f4f8;
		transition: all 0.3s ease;
	}

	.search-input:focus {
		outline: none;
		box-shadow: 0 0 5px rgba(15, 101, 44, 0.5);
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
		height: 100%;
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
		padding: 0px;
	}

	.category-name {
		font-size: 18px;
		color: #0f652c;
		/* margin: 15px 0 10px; */
		padding: 0 15px;
	}

	.club-item {
		padding: 12px 15px;
		margin: 5px 10px;
		border-radius: 5px;
		transition: all 0.3s ease;
	}

	.club-item:hover {
		background-color: #e6f7ff;
		transform: translateX(5px);
	}

	.club-item.active {
		background-color: #0f652c;
		color: #ffffff;
	}

	.club-header {
		position: relative;
	}

	.club-bg-img {
		width: 100%;
		height: 250px;
		object-fit: cover;
	}

	.club-title {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.club-name {
		font-size: 28px;
		font-weight: bold;
		color: #ffffff;
		margin-right: 10px;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
	}

	.club-status {
		display: flex;
		align-items: center;
		flex-grow: 1;
	}



	.status-badge {
		padding: 5px 10px;
		border-radius: 15px;
		font-size: 13px;
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
		padding: 6px 12px; 
		font-size: 14px; 
		cursor: pointer;
		transition: all 0.3s ease;
		margin-left: auto;
	}

	.joinClub-button:hover {
		transform: scale(1.05);
		background-color: #0a4a1f; 
	}

	.joinClub-button:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	.info-section {
		background-color: #ffffff;
		padding: 20px;
		margin-bottom: 20px; 
		border-radius: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}

	.info-section:last-child {
		border-bottom: none;
	}

	.section-title {
		font-size: 22px;
		color: #0f652c;
		margin-bottom: 15px;
		padding-bottom: 10px;
		font-weight: bold; 
		border-bottom: none; 
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
		font-size: 16px;
		color: #333;
		line-height: 1.6;
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
		background-color: #f0f4f8;
		padding: 15px;
		border-radius: 5px;
		margin-top: 15px;
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
			margin: 5px 0;
			border-radius: 0;
		}

		.club-name {
			font-size: 24px;
		}

		.section-title {
			font-size: 20px; 
			padding-bottom: 8px;
		}

		.info-text {
			font-size: 14px;
		}

		.club-bg-img {
			height: 200px;
		}

		.president-info {
			flex-direction: column;
			align-items: flex-start;
		}

		.president-grade {
			margin-top: 5px;
		}

		.info-section {
			padding: 15px;
			margin-bottom: 15px; 
			border-radius: 0;
		}

		.section-title {
			padding-bottom: 8px;
		}

		.joinClub-button {
			padding: 5px 10px; 
			font-size: 13px; 
		}
	}

	.toggle-icon {
		font-size: 12px;
		margin-left: 5px;
		transition: transform 0.3s ease;
	}

	.toggle-icon.open {
		transform: rotate(180deg);
	}

	.statistics-content {
		overflow: hidden;
		transition: max-height 0.3s ease;
		max-height: 1000px; /* 调整这个值以适应您的内容 */
	}

	.loading-text {
		text-align: center;
		padding: 20px;
		color: #666;
	}

	/* 响应式设计 */
	@media screen and (max-width: 768px) {
		.chart {
			height: 250px;
		}
	}

	.chart {
		width: 100%;
		height: 300px;
	}

	.club-list-container {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 100%;
		background-color: #ffffff;
		z-index: 10;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.club-list {
		flex: 1;
		overflow-y: auto;
	}

	.category-name.sticky {
		position: sticky;
		top: 0;
		background-color: #ffffff;
		z-index: 1;
		padding: 10px 15px;
		font-size: 18px;
		color: #0f652c;
		font-weight: bold;
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
	}
</style>