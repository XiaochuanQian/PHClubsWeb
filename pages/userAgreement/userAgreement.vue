<template>
	<view class="container">
		<view class="header">
			<view class="back-button" @click="goBack">
				<!-- <text class="back-text">Back</text> -->
				<view class="iconfont icon-Import"></view>
			</view>
			<text class="header-title">User Agreement</text>
		</view>
		<scroll-view class="content" scroll-y>
			<rich-text :nodes="parsedContent"></rich-text>
		</scroll-view>
		<view class="footer">
			<text class="footer-text">Copyright ©PH Clubs</text>
		</view>

	</view>

</template>

<script>
	import {
		marked
	} from 'marked';

	export default {
		data() {
			return {
				parsedContent: ''
			}
		},
		onLoad() {
			this.loadMarkdownContent();
		},
		methods: {
			loadMarkdownContent() {
				// Read the markdown file
				uni.request({
					url: '/static/user_agreement.md',
					success: (res) => {
						// Parse the markdown content
						this.parsedContent = marked(res.data);
					},
					fail: (err) => {
						console.error('Failed to load markdown file:', err);
					}
				});
			},
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		font-family: Arial, sans-serif;
	}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 44px;
		background-color: #0f652c;
		color: black;
		font-weight: bold;
		display: flex;
		align-items: center;
		padding: 0 15px;
		z-index: 1000;
	}

	.back-button {
		display: flex;
		align-items: center;
		cursor: pointer;
		/* border-radius: 5px; */
		padding: 6px;
		/* background-color: ; */
		color: white;
		
	}


	.back-text {
		font-size: 16px;
	}

	.header-title {
		flex-grow: 1;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		color: white;
	}

	.content {
		margin-top:44px;
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 10px;
		flex-grow: 1;
		overflow-y: auto;
		width: 100%;
		box-sizing: border-box;
	}

	.content>>>* {
		max-width: 100%;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.content>>>img {
		max-width: 100%;
		height: auto;
	}

	.footer {
		/* border-top: 2px solid #332f22; */
		padding-bottom: 10px;
		font-size: 14px;
		color: #666;
	}

	.footer-text {
		display: block;
		text-align: center;
	}
</style>