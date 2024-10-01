// src/services/api.js

import {
	setUserInfo,
	clearUserInfo
} from '../utils/auth'
import {
	setToken,
	getToken,
	removeToken,
} from '../utils/storage'

// const BASE_URL = 'http://101.34.211.174'

// const BASE_URL = 'http://localhost:5173/api'
const BASE_URL = 'http://101.34.211.174' // 生产环境使用实际的 URL

// 请求拦截器
const requestInterceptor = (config) => {
	const token = getToken()

	if (token) {
		console.log(config)
		if (1) { //config.method.toUpperCase() === 'GET'
			config.url = `${config.url}?token=${token}`
			console.log(config.url)
		}
		// else {
		// 	config.data = {
		// 		...config.data,
		// 		token: token
		// 	}
		// }
	}
	
	return config
}

// 封装请求函数
const request = (options) => {
	const interceptedOptions = requestInterceptor(options)
	return new Promise((resolve, reject) => {
		uni.request({
			...interceptedOptions,
			success: (res) => {
				console.log(res)
				if (res.statusCode ===
					200) { //removed res.data.code === "0" because of backend issues
					resolve(res.data)
				} else if (res.statusCode === 401) {
					uni.navigateTo({
						url: '/pages/userLogin/userLogin'
					})
				} else {
					reject(res.data)
				}
			},
			fail: (err) => {
				console.log("no")
				reject(err)
			}
		})
	})
}

export const api = {
	// 学生相关接口
	student: {
		login: (stuId, password) => {
			return request({
				url: `${BASE_URL}/student/login`,
				method: 'POST',
				data: {
					stu_id: stuId,
					password: password
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(response => {
				if (response.data && response.data.api_token) {
					setToken(response.data.api_token)
					setUserInfo(response.data)
				}
				return response
			})
		},
		logout: () => {
			return request({
				url: `${BASE_URL}/student/logout`,
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(() => {
				removeToken()
				clearUserInfo()

			})
		},
		modifyPassword: (password) => {
			return request({
				url: `${BASE_URL}/student/modify-pass`,
				method: 'POST',
				data: {
					password
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		getProfile: () => {
			return request({
				url: `${BASE_URL}/student/student-profile`,
				method: 'GET'
			})
		},
		getTimeList: () => {
			return request({
				url: `${BASE_URL}/student/time-list`,
				method: 'GET'
			})
		},
		search: (searchType, keyword) => {
			return request({
				url: `${BASE_URL}/student/search`,
				method: 'POST',
				data: {
					search_type: searchType,
					keyword
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		getClubTime: (stuId) => {
			return request({
				url: `${BASE_URL}/student/club-time`,
				method: 'POST',
				data: {
					stu_id: stuId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		getPersonalData: () => {
			return request({
				url: `${BASE_URL}/student/personal-data`,
				method: 'GET'
			})
		},
		exportData: () => {
			return request({
				url: `${BASE_URL}/student/export-student-data`,
				method: 'GET',
				responseType: 'blob'
			})
		}
	},

	// 社团成员相关接口
	clubMember: {
		list: (clubId) => {
			return request({
				url: `${BASE_URL}/club-member/list`,
				method: 'POST',
				data: {
					club_id: clubId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		search: (clubId, searchType, keyword) => {
			return request({
				url: `${BASE_URL}/club-member/search`,
				method: 'POST',
				data: {
					club_id: clubId,
					search_type: searchType,
					keyword
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		add: (clubId, stuId) => {
			return request({
				url: `${BASE_URL}/club-member/add`,
				method: 'POST',
				data: {
					club_id: clubId,
					stu_id: stuId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		delete: (clubId, clubMemberIds) => {
			return request({
				url: `${BASE_URL}/club-member/del`,
				method: 'POST',
				data: {
					club_id: clubId,
					club_member_ids: clubMemberIds
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		quit: (clubMemberId) => {
			return request({
				url: `${BASE_URL}/club-member/quit`,
				method: 'POST',
				data: {
					club_member_id: clubMemberId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		batchQuit: (clubMemberIds) => {
			return request({
				url: `${BASE_URL}/club-member/batch-quit`,
				method: 'POST',
				data: {
					club_member_ids: clubMemberIds
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		setTimeValid: (clubId, stuId, isValid) => {
			return request({
				url: `${BASE_URL}/club-member/time-valid`,
				method: 'POST',
				data: {
					club_id: clubId,
					stu_id: stuId,
					is_valid: isValid
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		}
	},

	// 课程相关接口
	session: {
		list: (clubId) => {
			return request({
				url: `${BASE_URL}/club/attendance`,
				method: 'POST',
				data: {
					club_id: clubId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		add: (clubId, sessionName, sessionTimes, sessionDate, createType) => {
			return request({
				url: `${BASE_URL}/session/add`,
				method: 'POST',
				data: {
					club_id: clubId,
					session_name: sessionName,
					session_times: sessionTimes,
					session_date: sessionDate,
					create_type: createType
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		getStudents: (clubId, sessionId) => {
			return request({
				url: `${BASE_URL}/session/students`,
				method: 'POST',
				data: {
					club_id: clubId,
					session_id: sessionId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		sign: (clubStudentId, sessionId, signStatus) => {
			return request({
				url: `${BASE_URL}/session/sign`,
				method: 'POST',
				data: {
					club_student_id: clubStudentId,
					session_id: sessionId,
					sign_status: signStatus
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		delete: (clubId, sessionIds) => {
			return request({
				url: `${BASE_URL}/session/del`,
				method: 'POST',
				data: {
					club_id: clubId,
					session_ids: sessionIds
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		searchMember: (searchType, keyword, clubId, sessionId) => {
			return request({
				url: `${BASE_URL}/session/search-member`,
				method: 'POST',
				data: {
					search_type: searchType,
					keyword,
					club_id: clubId,
					session_id: sessionId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		modifyName: (sessionId, sessionName) => {
			return request({
				url: `${BASE_URL}/session/modify-name`,
				method: 'POST',
				data: {
					session_id: sessionId,
					session_name: sessionName
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		setTime: (clubStudentId, sessionId, sessionTime) => {
			return request({
				url: `${BASE_URL}/session/set-time`,
				method: 'POST',
				data: {
					club_student_id: clubStudentId,
					session_id: sessionId,
					session_time: sessionTime
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		}
	},

	// 社团相关接口
	club: {
		ranking: () => {
			return request({
				url: `${BASE_URL}/club/ranking`,
				method: 'POST'
			})
		},
		statistic: (clubId) => {
			return request({
				url: `${BASE_URL}/club/statistic`,
				method: 'POST',
				data: {
					club_id: clubId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		search: (keywords) => {
			return request({
				url: `${BASE_URL}/club/search`,
				method: 'POST',
				data: {
					keywords
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
		presidentClubs: () => {
			return request({
				url: `${BASE_URL}/club/president-club`,
				method: 'POST'
			})
		},
		getClubDetail: (clubId) => {
			return request({
				url: `${BASE_URL}/club/detail`,
				method: 'POST',
				data: {
					club_id: clubId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			})
		},
	},

	// 社团分类相关接口
	clubCategory: {
		index: () => {
			return request({
				url: `${BASE_URL}/club-category/index`,
				method: 'GET'
			})
		},

	}
}