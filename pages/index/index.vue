<template>
  <view class="container">
    <view class="header">
      <text class="logo">PH Clubs</text>
      <view class="nav">
        <text :class="['nav-item', currentPage === 'Home' ? 'active' : '']" @click="switchPage('Home')">Home</text>
        <text :class="['nav-item', currentPage === 'Documentation' ? 'active' : '']" @click="switchPage('Documentation')">Documentation</text>
        <text :class="['nav-item', currentPage === 'About' ? 'active' : '']" @click="switchPage('About')">About</text>
		<text class="nav-item1 login-btn" @click="goToLogin">Login</text>
      </view>
    </view>
    <view class="content">
      <transition name="fade" mode="out-in">
        <component :is="currentPage" :key="currentPage"></component>
      </transition>
    </view>
    <view class="footer">
      <text class="footer-text">Copyright ©PH Clubs</text>
    </view>
  </view>
</template>

<script>
import Home from '../home/home.vue'
import Documentation from '../documentation/documentation.vue'
import About from '../about/about.vue'

export default {
  components: {
    Home,
    Documentation,
    About
  },
  data() {
    return {
      currentPage: 'Home'
    }
  },
  methods: {
      switchPage(page) {
        this.currentPage = page
      },
      goToLogin() {
        uni.navigateTo({
          url: '../userLogin/userLogin'
        })
      }
    }
  
}
</script>

<style>
/* @font-face { 
  font-family: MiloTE; 
  src: url('/static/MiloTE.ttf'); 
} */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #332f22;
  flex-wrap: wrap;
}
.logo {
  font-size: clamp(18px, 5vw, 24px);
  font-weight: bold;
}
.nav {
  display: flex;
  flex-wrap: wrap;
}
.nav-item {
  margin: 5px 10px;
  cursor: pointer;
  position: relative;
  color: #333;
  font-size: clamp(14px, 3vw, 18px);
  transition: color 0.3s ease-in-out;
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
  right: 0;
  transform-origin: left;
}
.nav-item:hover::after {
  transform: scaleX(1);
}
.nav-item.active {
  color: #373633;
  font-weight: bold;
}
.nav-item.active::after {
  background-color: #373633;
  transform: scaleX(1);
}
.content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  min-height: 300px;
}
.footer {
  border-top: 2px solid #332f22;
  padding: 30px 20px;
  font-size: 14px;
  color: #666;
}
.footer-text {
  display: block;
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* Responsive design */
@media screen and (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
    text-align: right;
  }
  .content {
    padding: 20px;
  }
}
@media screen and (max-width: 540px) {
  .nav {
    flex-direction: column;
  }
  .nav-item {
    margin: 5px 0;
  }
}

.login-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #45a049;
}
</style>