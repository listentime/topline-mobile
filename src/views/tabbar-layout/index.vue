<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search"
                       to="qa">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o"
                       to="video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
export default {
  name: 'TabBarLayout',
  data () {
    return {

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped lang="less">
</style>
