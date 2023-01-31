<template>
  <tm-app _class="c-relative">
    <video :src="src" class="video" autoplay />
    <cover-view class="close">
      X
    </cover-view>
  </tm-app>
</template>

<script setup lang='ts'>
const src = ref('rtsp://admin:Abcd1234@192.168.1.118/Streaming/Channels/101')
</script>

<style>
	.video{
		position: relative;
		width: 100vw;
		height: 50vh;
	}

	.close{
		position: absolute;
		top:130px;
		left:10px;
		font-size: 32px;
		color:red;
	}
</style>
