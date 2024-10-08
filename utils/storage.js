// TODO: add cookie support for safari and phone

// utils/storage.js

const TOKEN_KEY = 'api_token'
const CREDENTIALS_KEY = 'user_credentials'

export const setToken = (value, days = 30) => {
  const expiryTime = Date.now() + days * 24 * 60 * 60 * 1000
  uni.setStorageSync(TOKEN_KEY, JSON.stringify({
    value,
    expiryTime
  }))
}

export const getToken = () => {
  const tokenStr = uni.getStorageSync(TOKEN_KEY)
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

export const setCredentials = (username, password) => {
  const credentials = `${username}:${password}`
  const encodedCredentials = btoa(credentials)
  uni.setStorageSync(CREDENTIALS_KEY, encodedCredentials)
}

export const getCredentials = () => {
  try {
    const encodedCredentials = uni.getStorageSync(CREDENTIALS_KEY)
    console.log('Encoded Credentials:', encodedCredentials)
    if (encodedCredentials) {
      const decodedCredentials = atob(encodedCredentials)
      console.log('Decoded Credentials:', decodedCredentials)
      const [username, password] = decodedCredentials.split(':')
      return { username, password }
    }
  } catch (error) {
    console.error('Error getting credentials:', error)
  }
  return null
}

export const removeCredentials = () => {
  uni.removeStorageSync(CREDENTIALS_KEY)
}
