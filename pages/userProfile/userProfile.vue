<template>
  <view class="user-profile">
    <h2>Welcome {{ user.englishName }}</h2>
    <view class="user-info">
      <view class="info-row">
        <p><strong>Student ID:</strong> {{ user.studentId }}</p>
        <button class="copy-btn" @click="copyToClipboard(user.studentId)">Copy</button>
      </view>
      <p><strong>Password:</strong> ••••••••</p>
      <view class="info-row">
        <p><strong>Grade:</strong> {{ user.grade }}</p>
        <button class="copy-btn" @click="copyToClipboard(user.grade)">Copy</button>
      </view>
      <view class="info-row">
        <p><strong>Chinese Name:</strong> {{ user.chineseName }}</p>
        <button class="copy-btn" @click="copyToClipboard(user.chineseName)">Copy</button>
      </view>
      <view class="info-row">
        <p><strong>English Name:</strong> {{ user.englishName }}</p>
        <button class="copy-btn" @click="copyToClipboard(user.englishName)">Copy</button>
      </view>
      <p><strong>Role:</strong> {{ user.role }}</p>
      <p><strong>Last Login:</strong> {{ user.lastLogin }}</p>
    </view>
    <button class="deregister-btn" @click="deregister">Deregister</button>
  </view>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        studentId: '12345678',
        grade: '11',
        chineseName: '张三',
        englishName: 'John Doe',
        role: 'Student',
        lastLogin: '2023-09-18 14:30:00'
      }
    }
  },
  methods: {
    deregister() {
      // Implement deregister logic here
      console.log('Deregister clicked')
    },
    copyToClipboard(text) {
      // Using the Clipboard API
      navigator.clipboard.writeText(text).then(() => {
        // You can add a notification here to inform the user that the text was copied
        console.log('Text copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #0f652c;
  margin-bottom: 20px;
}

.user-info {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.info-row p {
  margin: 0;
}

.copy-btn {
  background-color: #0f652c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.copy-btn:hover {
  background-color: #0a4a1f;
}

.deregister-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.deregister-btn:hover {
  background-color: #c82333;
}
</style>