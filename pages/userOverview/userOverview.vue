<template>
	<view class="overview">
		<h2>Overview</h2>
		<view class="stats">
			<view class="stat-item">
				<h3>Total Clubs</h3>
				<p class="stat-value">{{ totalClubs }}</p>
			</view>
			<view class="stat-item">
				<h3>Active Memberships</h3>
				<p class="stat-value">{{ activeMemberships }}</p>
			</view>
			<view class="stat-item">
				<h3>Upcoming Events</h3>
				<p class="stat-value">{{ upcomingEvents }}</p>
			</view>
		</view>
		<view class="recent-activity">
			<h3>Recent Activity</h3>
			<ul>
				<li v-for="(activity, index) in recentActivities" :key="index">
					{{ activity }}
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			totalClubs: 5,
			activeMemberships: 3,
			upcomingEvents: 2,
			recentActivities: [
				'Joined Photography Club',
				'Attended Debate Club meeting',
				'Registered for Chess Tournament',
				'Updated profile information'
			]
		}
	}
}
</script>

<style scoped>
.overview {
	max-width: 800px;
	margin: 0 auto;
}

h2, h3 {
	color: #0f652c;
}

.stats {
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
}

.stat-item {
	background-color: #f5f5f5;
	border-radius: 8px;
	padding: 20px;
	text-align: center;
	flex: 1;
	margin: 0 10px;
}

.stat-value {
	font-size: 24px;
	font-weight: bold;
	color: #0f652c;
}

.recent-activity {
	background-color: #f5f5f5;
	border-radius: 8px;
	padding: 20px;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	margin-bottom: 10px;
	padding-left: 20px;
	position: relative;
}

li::before {
	content: '•';
	color: #0f652c;
	position: absolute;
	left: 0;
}

@media screen and (max-width: 768px) {
	.stats {
		flex-direction: column;
	}

	.stat-item {
		margin: 10px 0;
	}
}
</style>