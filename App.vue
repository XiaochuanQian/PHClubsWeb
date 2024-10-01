<script>
	import initPermission from './utils/guard'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			initPermission()
			
		},
		onShow: function() {
			console.log('App Show')
			initPermission()
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/icons/icons.css");
</style>
