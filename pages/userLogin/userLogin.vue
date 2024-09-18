<template>
  <view class="login-container">
    <view class="login-box">
      <h2>Welcome Back</h2>
      <form @submit.prevent="handleLogin">
        <view class="input-group">
          <label for="studentId">Student ID:</label>
          <input type="text" id="studentId" v-model="studentId" required>
        </view>
        <view class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </view>
        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>
      <view class="forgot-password">
        <text @click="handleForgotPassword">Forgot Password?</text>
      </view>
    </view>

    <!-- Forgot Password Modal -->
    <view v-if="showForgotPasswordModal" class="modal">
      <view class="modal-content">
        <h3>Forgot Password</h3>
        <p>Please contact:</p>
        <view class="email-container">
          <text class="email copy-icon" @click="copyEmail">qianxiaochuan23@shphschool.com</text>
        </view>
        <p>{{ isCopied ? 'Copied!' : 'Click on email address to copy' }}</p>
        <button @click="closeForgotPasswordModal" class="close-btn">Close</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      studentId: '',
      password: '',
      isLoading: false,
      showForgotPasswordModal: false,
      isCopied: false,
    }
  },
  methods: {
    handleLogin() {
      // ... (login logic remains unchanged)
    },
    handleForgotPassword() {
      this.showForgotPasswordModal = true;
      this.isCopied = false; // Reset the copy state when opening the modal
    },
    closeForgotPasswordModal() {
      this.showForgotPasswordModal = false;
      this.isCopied = false; // Reset the copy state when closing the modal
    },
    copyEmail() {
      const email = 'qianxiaochuan23@shphschool.com';
      uni.setClipboardData({
        data: email,
        success: () => {
          this.isCopied = true; // Set to true when email is successfully copied
        },
        fail: (err) => {
          console.error('Failed to copy email:', err);
        }
      });
    }
  }
}
</script>





<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 500;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  text-align: left;
}

input:focus {
  border-color: #4CAF50;
  outline: none;
}

.login-btn {
  width: 100%;
  height: 40px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn:hover {
  background-color: #45a049;
}

.forgot-password {
  text-align: center;
  margin-top: 20px;
}

.forgot-password text {
  color: #4CAF50;
  cursor: pointer;
  font-size: 14px;
}

.forgot-password text:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-box {
    padding: 30px 20px;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 25px;
  }

  input, .login-btn {
    font-size: 15px;
  }
}

.login-btn {
  width: 100%;
  height: 40px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn:hover {
  background-color: #45a049;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  text-align: center;
}

.email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.email {
  font-weight: bold;
  margin-right: 10px;
}

.copy-icon {
  cursor: pointer;
  font-size: 17px;
}

.close-btn {
  margin-top: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0px 0px; /* Add this line to give some padding to the button */
}



</style>