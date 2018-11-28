<template>
	<div id="TeacherCourseShareSetting">
		<app-bar titleName="OOAD-共享设置" :showMessages="true"></app-bar>
		<div class="main-content"></div>
	</div>
</template>
<script>
import AppBar from '../../components/ReuseComponents/AppBar'
	export default{
		name:'TeacherCourseShareSetting',
		components:{
			AppBar
		}
	}
</script>
<style lang="less">
#TeacherCourseShareSetting{
	width:100vw;

	.main-content{
		
	}
}

</style>