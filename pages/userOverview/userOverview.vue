<!-- TODO: Optimize for Mobile View -->

<template>
	<view class="user-overview">
		<scroll-view scroll-y class="club-list">
			<view v-for="category in clubCategories" :key="category.id" class="category">
				<text class="category-name">{{ category.category_name }}</text>
				<view v-for="club in category.clubs" :key="club.id" @tap="selectClub(club.id)"
					:class="['club-item', { active: selectedClubId === club.id }]">
					<text>{{ club.club_name }}</text>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y class="club-info" v-if="selectedClub">
			<view class="club-header">
				<image :src="selectedClub.club_bg_img" mode="aspectFill" class="club-bg-img"></image>
				<view class="club-title">
					<text class="club-name">{{ selectedClub.club_name }}</text>
					<view class="club-status">
						<text
							:class="['status-badge', selectedClub.club_status.toLowerCase()]">{{ selectedClub.club_status }}</text>
						<text class="star-rating">⭐ {{ selectedClub.star }}</text>
					</view>
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
				<text class="section-title">Club Background\n</text>
				<text class="info-text"> - Established: {{ selectedClub.club_background.establish_time }}</text>
			</view>

			<view class="info-section">
				<text class="section-title">Learning Objectives</text>
				<view v-for="objective in selectedClub.learning_objectives" :key="objective" class="info-item">
					<text class="info-text"> - {{ objective }}</text>
				</view>
			</view>

			<view class="info-section">
				<text class="section-title">For Whom</text>
				<view v-for="forWhom in selectedClub.for_whom" :key="forWhom" class="info-item">
					<text class="info-text"> - {{ forWhom }}</text>
				</view>
			</view>

			<view class="info-section">
				<text class="section-title">Meeting Schedule</text>
				<view class="schedule-info">
					<text class="info-text"> - Frequency: {{ selectedClub.meeting_schedule.frequency }}\n</text>
					<text class="info-text"> - Day: {{ selectedClub.meeting_schedule.day }}\n</text>
					<text class="info-text"> - Location: {{ selectedClub.meeting_schedule.location }}</text>
				</view>
				<text class="sub-section-title">Requirements</text>
				<view v-for="requirement in selectedClub.meeting_schedule.requirements" :key="requirement"
					class="info-item">
					<text class="info-text"> - {{ requirement }}</text>
				</view>
			</view>

			<view class="info-section">
				<text class="section-title">Past Projects</text>
				<view v-for="project in selectedClub.exp_past_projects" :key="project" class="info-item">
					<text class="info-text"> - {{ project }}</text>
				</view>
			</view>

			<view class="info-section">
				<text class="section-title">Join Benefits</text>
				<view v-for="benefit in selectedClub.join_benefits" :key="benefit" class="info-item">
					<text class="info-text"> - {{ benefit }}</text>
				</view>
			</view>

			<view class="info-section">
				<text class="section-title">Contact Information</text>
				<view v-for="contact in selectedClub.contact_information" :key="contact.eng_name" class="contact-info">
					<text class="info-text">Name: {{ contact.eng_name }}\n</text>
					<text class="info-text"> - Email: {{ contact.email }}\n</text>
					<text class="info-text"> - WeChat ID: {{ contact.wechat_id }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// Script remains unchanged
	export default {
		data() {
			return {
				clubCategories: [{
						"id": 1,
						"category_name": "Academic clubs",
						"clubs": [{
								"id": 12,
								"club_name": "🧠 Soul's Journey 心理社"
							},
							{
								"id": 15,
								"club_name": " 🧠 Determination Heart Club"
							},
							{
								"id": 23,
								"club_name": " 📚 GAC ACT 备考刚需"
							},
							{
								"id": 29,
								"club_name": "🧪 Lavoisier club 化学社"
							},
							{
								"id": 30,
								"club_name": "🔬 科普社 原物理社"
							},
							{
								"id": 49,
								"club_name": "📈 Business Bear"
							},
							{
								"id": 52,
								"club_name": "💰 团长经济社 （原商社）"
							},
							{
								"id": 54,
								"club_name": "👨‍💻 Snap Hack Computer Science Club"
							},
							{
								"id": 55,
								"club_name": "🌍 SoPH"
							},
							{
								"id": 59,
								"club_name": "💻 WECS (White Envelope: CS-Python Programming Club) 白皮社"
							},
							{
								"id": 60,
								"club_name": "🔬 Biology club 生物社"
							},
							{
								"id": 63,
								"club_name": "🔭 Volta Ultra 脑洞社"
							},
							{
								"id": 64,
								"club_name": "🧬 AP Biology Workshop"
							},
							{
								"id": 65,
								"club_name": "🧪 AP Chemistry Workshop"
							},
							{
								"id": 66,
								"club_name": "⚛️ AP Physics C Workshop"
							},
							{
								"id": 69,
								"club_name": "🇺🇳 模拟联合国协会"
							},
							{
								"id": 86,
								"club_name": "🌍 Cene Anthropology Club 人类学社"
							},
							{
								"id": 88,
								"club_name": " 💻 Software Development Club 软件开发社团"
							},
							{
								"id": 93,
								"club_name": "📚 Hermes Reading and Film Club"
							},
							{
								"id": 99,
								"club_name": " 🌍 IEP Club of Humanity & Politics"
							},
							{
								"id": 103,
								"club_name": "🧮 IEP math club"
							},
							{
								"id": 107,
								"club_name": "📚 博闻社 Omniknowledge Club"
							},
							{
								"id": 109,
								"club_name": "💹 BEC Club"
							},
							{
								"id": 113,
								"club_name": "👩 PH women scholar club"
							},
							{
								"id": 134,
								"club_name": "👩‍🚀 Girls In STEM"
							},
							{
								"id": 138,
								"club_name": "😑 生命的奥秘 Mindfulness Club"
							},
							{
								"id": 139,
								"club_name": "🩸 HOSA生物与健康社"
							},
							{
								"id": 152,
								"club_name": "🦾 CyberCore AI Society"
							},
							{
								"id": 154,
								"club_name": "🍎 The Odyssey Club（English Study Club） 英语社"
							},
							{
								"id": 160,
								"club_name": "⚛️ IEP physics club"
							},
							{
								"id": 161,
								"club_name": "📜 PH English Poetry Society"
							}
						]
					},
					{
						"id": 2,
						"category_name": "Arts and creative clubs",
						"clubs": [{
								"id": 7,
								"club_name": "👩‍🍳 FORM club 动吃动吃社"
							},
							{
								"id": 10,
								"club_name": " 🎲 桌游社"
							},
							{
								"id": 11,
								"club_name": "🔊 Audio & Music Engineering Club"
							},
							{
								"id": 13,
								"club_name": "🎵 Rhythm Game Club 音游社"
							},
							{
								"id": 34,
								"club_name": "📰 HUM推理社"
							},
							{
								"id": 38,
								"club_name": "👩‍🔬 Scentstations 香氛驿站"
							},
							{
								"id": 39,
								"club_name": "🎻 CMU 古典音乐社"
							},
							{
								"id": 40,
								"club_name": " 🃏 Cardistry Club 花式切牌社"
							},
							{
								"id": 50,
								"club_name": "🀄️ 中国象棋社"
							},
							{
								"id": 51,
								"club_name": "🍊 Delish Odyssey 烹饪社"
							},
							{
								"id": 53,
								"club_name": "💃 Dansoul"
							},
							{
								"id": 67,
								"club_name": "✏️ CG绘画社"
							},
							{
								"id": 70,
								"club_name": "🎙️ 𝔯𝔞𝔡𝔦𝔬 studio 杂谈电台"
							},
							{
								"id": 74,
								"club_name": "🎥 PTV "
							},
							{
								"id": 79,
								"club_name": "🚁 Aerial photography club 航拍社"
							},
							{
								"id": 82,
								"club_name": " 📷 Découvrir 摄影之眼"
							},
							{
								"id": 83,
								"club_name": "🎬 Modern TV Society MTS"
							},
							{
								"id": 84,
								"club_name": "🇰🇷 KPop 鉴赏社"
							},
							{
								"id": 89,
								"club_name": " 🎮 PH Game Design Club"
							},
							{
								"id": 92,
								"club_name": "☕ caPHenol咖啡茶类鉴赏社"
							},
							{
								"id": 96,
								"club_name": "🍿 IEP Action"
							},
							{
								"id": 104,
								"club_name": "🎤 Music and Curiosity (MAC)"
							},
							{
								"id": 136,
								"club_name": "📷 DevStopPHix摄影社"
							},
							{
								"id": 137,
								"club_name": "🎭 IEP Vivi Musicis音乐剧社"
							},
							{
								"id": 142,
								"club_name": "💎 Jewelry Workshop"
							},
							{
								"id": 143,
								"club_name": "🍰 Sweety"
							},
							{
								"id": 144,
								"club_name": "🥰 Crafts for Healing"
							},
							{
								"id": 145,
								"club_name": "🎹 IEP Piano Club"
							},
							{
								"id": 147,
								"club_name": "👾 AIGC数字艺术社团"
							},
							{
								"id": 155,
								"club_name": "🌟 ACGN鉴赏与交流社"
							},
							{
								"id": 156,
								"club_name": "💐 X% flower design"
							},
							{
								"id": 157,
								"club_name": "🧩 Handcraft手工社"
							},
							{
								"id": 164,
								"club_name": "🆓 AFA-Healing"
							}
						]
					},
					{
						"id": 3,
						"category_name": "Community Service & Volunteering clubs",
						"clubs": [{
								"id": 26,
								"club_name": "🌱 Carbon Footprint"
							},
							{
								"id": 31,
								"club_name": "👫 ORP (Online Reading Partner) 公益社"
							},
							{
								"id": 76,
								"club_name": "🤝 TRIO 心源"
							},
							{
								"id": 85,
								"club_name": "👥 ECHO Volunteer Union"
							},
							{
								"id": 91,
								"club_name": " 🐾 Pet Discovery Club"
							},
							{
								"id": 114,
								"club_name": "✨ PH Lighthouse"
							},
							{
								"id": 130,
								"club_name": "🏪 平和印象Pstore"
							},
							{
								"id": 140,
								"club_name": "🌈 Intra-spectrum艺术公益社团"
							}
						]
					},
					{
						"id": 4,
						"category_name": "Cultural & Diversity clubs",
						"clubs": [{
								"id": 35,
								"club_name": "⚧️ Gender Studies Club 性别研究社"
							},
							{
								"id": 78,
								"club_name": "🎎 少数民族文化交流社"
							},
							{
								"id": 81,
								"club_name": "😊 ISOB边缘系统OB社"
							},
							{
								"id": 90,
								"club_name": " 🧠 GROP"
							},
							{
								"id": 94,
								"club_name": " 🎨 Ethnic Art Club 少数民族艺术社"
							},
							{
								"id": 101,
								"club_name": "👣 Ethnic tourism clubs"
							},
							{
								"id": 102,
								"club_name": "🌱 BA-BA生态环境社"
							},
							{
								"id": 141,
								"club_name": "🧵 华缎Threads"
							},
							{
								"id": 146,
								"club_name": "♟️ 国际象棋社"
							},
							{
								"id": 149,
								"club_name": "🚶 IEP WorldWalk Club"
							},
							{
								"id": 150,
								"club_name": "🎵 Heritune 民乐社"
							},
							{
								"id": 151,
								"club_name": "👟 Sneaker Club"
							},
							{
								"id": 153,
								"club_name": "🏰 Architectural Appreciation Club"
							},
							{
								"id": 158,
								"club_name": "👩🏻‍💼 ListenHER"
							}
						]
					},
					{
						"id": 5,
						"category_name": "Sport & fitness clubs",
						"clubs": [{
								"id": 28,
								"club_name": "⚽ PH football club IEP"
							},
							{
								"id": 32,
								"club_name": "🚴‍♂️ Cycling club 骑行社"
							},
							{
								"id": 37,
								"club_name": "🥏 PHD Jingang Frisbee Club 金港飞盘社"
							},
							{
								"id": 42,
								"club_name": " 🤺 Fencing club 击剑社团"
							},
							{
								"id": 57,
								"club_name": "🎱 Billiards club 台球社"
							},
							{
								"id": 61,
								"club_name": "🏀 Basketball Club 篮球社"
							},
							{
								"id": 62,
								"club_name": "🐎 Equestrian Club 马术社"
							},
							{
								"id": 72,
								"club_name": " 💪 Fitness club 健身社"
							},
							{
								"id": 75,
								"club_name": " 🎾 Tennis club 网球社"
							},
							{
								"id": 77,
								"club_name": "🏓 Ping Pong Club 乒乓社"
							},
							{
								"id": 80,
								"club_name": "🏸 Badminton club 羽毛球社"
							},
							{
								"id": 87,
								"club_name": " 🤿 Diving club 潜水社"
							},
							{
								"id": 95,
								"club_name": "🤾‍♂️ Dodgeball club 躲避球社"
							},
							{
								"id": 98,
								"club_name": " ⚽ Table Soccer Club 桌上足球社"
							},
							{
								"id": 105,
								"club_name": "⚽ MOONSHOTS 🌚🌚"
							},
							{
								"id": 106,
								"club_name": "🏐 IEP VOLLEYBALL CLUB"
							},
							{
								"id": 112,
								"club_name": "🏹 PH Archery club"
							},
							{
								"id": 159,
								"club_name": "🏈 Pinghe Magicians Flag Football Club"
							},
							{
								"id": 162,
								"club_name": "🦾 BFI (biological fitness innovation)"
							},
							{
								"id": 163,
								"club_name": "🏓 AP 乒乓球社  "
							}
						]
					},
					{
						"id": 6,
						"category_name": "Language clubs",
						"clubs": [{
								"id": 71,
								"club_name": " 🇪🇸 Spanish club 西班牙语社"
							},
							{
								"id": 148,
								"club_name": "⛩️ IEP 日语社"
							}
						]
					},
					{
						"id": 7,
						"category_name": "School Teams",
						"clubs": [{
								"id": 73,
								"club_name": " 🚣‍♂️ PH Varsity Rowing team 赛艇队"
							},
							{
								"id": 97,
								"club_name": " 🏊 Varsity swim team 游泳队"
							},
							{
								"id": 111,
								"club_name": "🏫 IEP Student Union"
							},
							{
								"id": 123,
								"club_name": "🏫 跨校区活动 Inter-campus activities"
							},
							{
								"id": 132,
								"club_name": "🎤 平和高中合唱团 Pinghe High School Choir"
							},
							{
								"id": 133,
								"club_name": "🎻 平和学生交响乐团"
							},
							{
								"id": 135,
								"club_name": "🎻 平和学生民族乐团  Pinghe Chinese Orchestra"
							}
						]
					},
					{
						"id": 9,
						"category_name": "学生会",
						"clubs": [{
								"id": 124,
								"club_name": "🫡 主席部"
							},
							{
								"id": 125,
								"club_name": "🔗 执行部"
							},
							{
								"id": 126,
								"club_name": "📝 宣传部"
							},
							{
								"id": 127,
								"club_name": "🍽️ 生活部"
							},
							{
								"id": 129,
								"club_name": "📖 学习部"
							}
						]
					},
					{
						"id": 10,
						"category_name": "Houses",
						"clubs": [{
								"id": 115,
								"club_name": "🟦 House Fairytales"
							},
							{
								"id": 116,
								"club_name": "🟥 House Blood Sweat and Tears"
							},
							{
								"id": 117,
								"club_name": "🟨 House Invincibles"
							},
							{
								"id": 118,
								"club_name": "🟩 House Oasis"
							},
							{
								"id": 119,
								"club_name": "🟧 House Legolas"
							},
							{
								"id": 120,
								"club_name": "🟪 House Virtus"
							},
							{
								"id": 121,
								"club_name": "🍓 House Strawberry Tree"
							},
							{
								"id": 122,
								"club_name": "🟫 House Pluto"
							}
						]
					}
				],
				selectedClubId: null,
				selectedClub: null,
			};
		},
		methods: {
			selectClub(clubId) {
				this.selectedClubId = clubId;
				// Your club selection logic
				this.selectedClub = {
					"club_name": "🎙️ 𝔯𝔞𝔡𝔦𝔬 studio 杂谈电台",
					"club_status": "Active",
					"star": 0,
					"club_bg_img": "http://101.34.211.174:8088/upload/club/bgimg/20240224213350_Picture1.png",
					"is_member": 0,
					"president": [{
						"chi_name": "孙萌萌",
						"eng_name": "Megan ",
						"grade": "12.11"
					}],
					"vice_president": [],
					"club_background": {
						"establish_time": "2023-03-09"
					},
					"learning_objectives": [
						"Chat",
						"Recording the dailies."
					],
					"for_whom": [
						"Ideal for Students who like to share their ideas of the day."
					],
					"meeting_schedule": {
						"frequency": "Bi-weekly",
						"day": "Thursday P10",
						"location": "Room 303",
						"requirements": [
							"(No requirements)",
							"We just talk and do things together (nothing interested)."
						]
					},
					"exp_past_projects": [
						"Recording daily chat.",
						"Make our school time more relax."
					],
					"join_benefits": [
						"Records your high school memories.",
						"A chance to have a private room and free chatting."
					],
					"contact_information": [{
						"eng_name": "Megan ",
						"email": "sunmengmeng22@shphschool.com",
						"wechat_id": "okumula-070302LU"
					},
					{
						"eng_name": "Test",
						"email": "q@q",
						"wechat_id": "aaa"
					}
					
					]
				
				};

			},
		},
	};
</script>

<style>
	page {
		height: 100%;
		overflow: hidden;
	}

	.user-overview {
		display: flex;
		height: 100%;
		background-color: #f5f5f5;
		overflow: hidden;
	}

	.club-list {
		width: 300px;
		height: 100%;
		background-color: #ffffff;
		box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
	}

	.club-info {
		flex: 1;
		height: 100%;
		padding: 20px;
		background-color: #ffffff;
		overflow-y: auto;
	}

	.category {
		padding: 10px;
	}

	.category-name {
		font-weight: bold;
		font-size: 16px;
		color: #333;
		margin: 10px 0;
	}

	.club-item {
		padding: 10px;
		margin: 5px 0;
		border-radius: 5px;
		transition: background-color 0.3s;
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
		margin-bottom: 20px;
	}

	.club-bg-img {
		width: 100%;
		height: 200px;
		border-radius: 10px;
	}

	.club-title {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
		padding: 20px;
		border-radius: 0 0 10px 10px;
	}

	.club-name {
		font-size: 24px;
		font-weight: bold;
		color: #ffffff;
	}

	.club-status {
		display: flex;
		align-items: center;
		margin-top: 5px;
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

	.info-section {
		background-color: #ffffff;
		border-radius: 10px;
		padding: 15px;
		margin-bottom: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
		font-size: 14px;
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
		user-select: text;
	}
</style>