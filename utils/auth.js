// src/utils/auth.js

import { getToken, setToken, removeToken } from './storage'

export function isAuthenticated() {
  return !!getToken()
}

export function setAuth(token, expiresIn) {
  setToken(token, expiresIn)
}

export function clearAuth() {
  removeToken()
  removeUserInfo()
}


export function getUserInfo() {
  // 从本地存储获取用户信息
  const userInfo = uni.getStorageSync('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

export function setUserInfo(userInfo) {
  uni.setStorageSync('userInfo', JSON.stringify(userInfo))
}

export function clearUserInfo() {
  uni.removeStorageSync('userInfo')
}