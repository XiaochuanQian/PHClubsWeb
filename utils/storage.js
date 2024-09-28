// utils/storage.js

const TOKEN_KEY = 'api_token'

export const setToken = (value, days = 30) => {
  const expiryTime = Date.now() + days * 24 * 60 * 60 * 1000
  uni.setStorageSync(TOKEN_KEY, JSON.stringify({
    value,
    expiryTime
  }))
}

export const getToken = () => {
  const tokenStr = uni.getStorageSync(TOKEN_KEY)
  console.log(tokenStr)
  if (tokenStr) {
    const tokenObj = JSON.parse(tokenStr)
    if (tokenObj.expiryTime > Date.now()) {
      return tokenObj.value
    }
  }
  return null
}

export const removeToken = () => {
  uni.removeStorageSync(TOKEN_KEY)
}
