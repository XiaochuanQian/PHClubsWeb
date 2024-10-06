<template>
	<view class="container">
		<uni-segmented-control :current="current" :values="['社团成员', '课程管理']" @clickItem="onSegmentChange" style-type="button" active-color="#0f652c"></uni-segmented-control>
		
		<view v-if="current === 0">
			<!-- 社团成员管理 -->
			<view class="section">
				<input type="text" v-model="memberSearchKey" placeholder="搜索成员" @input="searchMembers" />
				<button @click="addMember" class="btn">添加成员</button>
			</view>
			
			<view v-if="isAddingMember">
				<!-- 添加成员表单 -->
				<input type="text" v-model="newMember.name" placeholder="姓名" />
				<input type="text" v-model="newMember.studentId" placeholder="学号" />
				<input type="text" v-model="newMember.major" placeholder="专业" />
				<button @click="submitNewMember" class="btn">提交</button>
				<button @click="cancelAddMember" class="btn btn-cancel">取消</button>
			</view>
			
			<view v-for="(member, index) in filteredMembers" :key="member.id" class="member-item">
				<text>{{ member.name }} - {{ member.studentId }} - {{ member.major }}</text>
				<button @click="editMember(index)" class="btn btn-small">编辑</button>
				<button @click="deleteMember(member.id)" class="btn btn-small btn-danger">删除</button>
			</view>
		</view>
		
		<view v-else>
			<!-- 课程管理 -->
			<view class="section">
				<input type="text" v-model="courseSearchKey" placeholder="搜索课程" @input="searchCourses" />
				<button @click="addCourse" class="btn">添加课程</button>
			</view>
			
			<view v-if="isAddingCourse">
				<!-- 添加课程表单 -->
				<input type="text" v-model="newCourse.name" placeholder="课程名称" />
				<input type="text" v-model="newCourse.teacher" placeholder="授课教师" />
				<input type="text" v-model="newCourse.time" placeholder="上课时间" />
				<button @click="submitNewCourse" class="btn">提交</button>
				<button @click="cancelAddCourse" class="btn btn-cancel">取消</button>
			</view>
			
			<view v-for="(course, index) in filteredCourses" :key="course.id" class="course-item">
				<text>{{ course.name }} - {{ course.teacher }} - {{ course.time }}</text>
				<button @click="editCourse(index)" class="btn btn-small">编辑</button>
				<button @click="deleteCourse(course.id)" class="btn btn-small btn-danger">删除</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
		api
	} from '../../services/api.js'

export default {
	data() {
		return {
			current: 0,
			memberSearchKey: '',
			courseSearchKey: '',
			isAddingMember: false,
			isAddingCourse: false,
			newMember: { name: '', studentId: '', major: '' },
			newCourse: { name: '', teacher: '', time: '' }
		}
	},
	computed: {
		...mapState(['members', 'courses']),
		filteredMembers() {
			if (!this.memberSearchKey) return this.members
			return this.members.filter(member => 
				member.name.includes(this.memberSearchKey) ||
				member.studentId.includes(this.memberSearchKey) ||
				member.major.includes(this.memberSearchKey)
			)
		},
		filteredCourses() {
			if (!this.courseSearchKey) return this.courses
			return this.courses.filter(course => 
				course.name.includes(this.courseSearchKey) ||
				course.teacher.includes(this.courseSearchKey) ||
				course.time.includes(this.courseSearchKey)
			)
		}
	},
	methods: {
		...mapActions(['fetchMembers', 'fetchCourses', 'addMemberAction', 'updateMemberAction', 'deleteMemberAction', 'addCourseAction', 'updateCourseAction', 'deleteCourseAction']),
		onSegmentChange(e) {
			this.current = e.currentIndex
		},
		searchMembers() {
			// 搜索功能已通过计算属性实现
		},
		searchCourses() {
			// 搜索功能已通过计算属性实现
		},
		addMember() {
			this.isAddingMember = true
		},
		cancelAddMember() {
			this.isAddingMember = false
			this.newMember = { name: '', studentId: '', major: '' }
		},
		async submitNewMember() {
			await this.addMemberAction(this.newMember)
			this.cancelAddMember()
		},
		async editMember(index) {
			// 实现编辑成员逻辑
		},
		async deleteMember(id) {
			await this.deleteMemberAction(id)
		},
		addCourse() {
			this.isAddingCourse = true
		},
		cancelAddCourse() {
			this.isAddingCourse = false
			this.newCourse = { name: '', teacher: '', time: '' }
		},
		async submitNewCourse() {
			await this.addCourseAction(this.newCourse)
			this.cancelAddCourse()
		},
		async editCourse(index) {
			// 实现编辑课程逻辑
		},
		async deleteCourse(id) {
			await this.deleteCourseAction(id)
		}
	},
	mounted() {
		this.fetchMembers()
		this.fetchCourses()
	}
}
</script>

<style scoped>
.container {
	padding: 20rpx;
}
.section {
	margin-bottom: 20rpx;
}
.btn {
	background-color: #0f652c;
	color: white;
	margin: 10rpx 0;
}
.btn-cancel {
	background-color: #999;
}
.btn-danger {
	background-color: #d9534f;
}
.btn-small {
	font-size: 24rpx;
	padding: 4rpx 8rpx;
}
.member-item, .course-item {
	border-bottom: 1rpx solid #eee;
	padding: 10rpx 0;
}
</style>
