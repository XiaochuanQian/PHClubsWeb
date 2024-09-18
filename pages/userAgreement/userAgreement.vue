<template>
  <view class="container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">&#8592;</text>
        <text class="back-text">Back</text>
      </view>
      <text class="header-title">User Agreement</text>
    </view>
    <scroll-view class="content" scroll-y>
      <rich-text :nodes="parsedContent"></rich-text>
    </scroll-view>
  </view>
</template>

<script>
import { marked } from 'marked';

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

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background-color: #0f652c;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 15px;
  z-index: 1000;
}

.back-button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.back-icon {
  font-size: 20px;
  margin-right: 5px;
}

.back-text {
  font-size: 16px;
}

.header-title {
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.content {
  margin-top: 44px;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
}

.content >>> * {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.content >>> img {
  max-width: 100%;
  height: auto;
}
</style>