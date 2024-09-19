// src/services/api.js

import {
	setToken,
	getToken,
	removeToken
} from '../utils/storage'

const BASE_URL = 'http://101.34.211.174'

// 请求拦截器
const requestInterceptor = (config) => {
	const token = getToken()
	if (token) {
		config.header = {
			...config.header,
			'Authorization': `Bearer ${token}`
		}
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
				if (res.statusCode === 200 && res.data.code === 0) {
					resolve(res.data)
				} else {
					reject(res.data)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export const api = {
	// 学生相关接口
	student: {
		login: (stuId, password) => {
			const formData = new FormData()
			formData.append('stu_id', stuId)
			formData.append('password', password)
			for (let [key, value] of formData.entries()) {
			        console.log(key, value)
			    }
			return request({
				url: `${BASE_URL}/student/login`,
				method: 'POST',
				data: formData,
				header: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(response => {
				if (response.data && response.data.api_token) {
					setToken(response.data.api_token)
				}
				return response
			})
		},
		logout: () => {
			return request({
				url: `${BASE_URL}/student/logout`,
				method: 'POST'
			}).then(() => {
				removeToken()
			})
		},
		modifyPassword: (password) => {
			return request({
				url: `${BASE_URL}/student/modify-pass`,
				method: 'POST',
				data: {
					password
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
				}
			})
		},
		getClubTime: (stuId) => {
			return request({
				url: `${BASE_URL}/student/club-time`,
				method: 'POST',
				data: {
					stu_id: stuId
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
				}
			})
		},
		quit: (clubMemberId) => {
			return request({
				url: `${BASE_URL}/club-member/quit`,
				method: 'POST',
				data: {
					club_member_id: clubMemberId
				}
			})
		},
		batchQuit: (clubMemberIds) => {
			return request({
				url: `${BASE_URL}/club-member/batch-quit`,
				method: 'POST',
				data: {
					club_member_ids: clubMemberIds
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
				}
			})
		},
		search: (keywords) => {
			return request({
				url: `${BASE_URL}/club/search`,
				method: 'POST',
				data: {
					keywords
				}
			})
		},
		presidentClubs: () => {
			return request({
				url: `${BASE_URL}/club/president-club`,
				method: 'POST'
			})
		}
	},

	// 社团分类相关接口
	clubCategory: {
		index: () => {
			return request({
				url: `${BASE_URL}/club-category/index`,
				method: 'GET'
			})
		}
	}
}