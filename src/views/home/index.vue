<template>
  <div>
    <div class="home">
      <van-nav-bar title="首页"
                   fixed />
      <van-tabs v-model="activeChannelIndex">
        <!-- 列表组件 上拉加载功能 -->
        <van-tab v-for="channelItem in channels"
                 :key="channelItem.id"
                 :title="channelItem.name">
          <!-- 下拉刷新组件 -->
          <van-pull-refresh v-model="isLoading"
                            @refresh="onRefresh">
            <!-- 上拉加载更多组件 -->
            <van-list v-model="channelItem.upLoading"
                      :finished="channelItem.upPullFinished"
                      finished-text="没有更多了"
                      @load="onLoad">
              <!-- 文章列表组件 -->
              <van-cell v-for="articleItem in channelItem.articles"
                        :key="articleItem.art_id"
                        :title="articleItem.title" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticle } from '@/api/article'
export default {
  name: 'Home',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: []
    }
  },
  computed: {
    activeChannel () {
      // 当前激活的频道索引
      return this.channels[this.activeChannelIndex]
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 页面加载就加载频道列表
    async loadChannels () {
      const { user } = this.$store.state
      let channel = []
      if (user) {
        // 已登录
        const data = await getUserChannels()
        channel = data.channels
      } else {
        // 未登录获取本地存储频道
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localChannels) {
          channel = localChannels
        } else {
          const data = await getUserChannels()
          channel = data.channels
        }
      }
      // 因为每一个频道都有自己的文章列表和刷新状态，所以要单独去维护
      channel.forEach(item => {
        item.articles = []
        item.timestamp = Date.now()
        item.pullLoading = false // 控制当前频道的下拉刷新状态
        item.upLoading = false // 控制当前频道的上拉加载更多的状态
        item.upPullFinished = false // 控制当前频道是否加载完毕
      })
      this.channels = channel
    },
    // 上拉异步加载数据方法
    async onLoad () {
      await this.$sleep(800)
      let data = []
      data = await this.loadArticle()
      if (!data.pre_timestamp && !data.results.length) {
        // 如果没有时间戳数组也是空的，就意味着没有数据了
        this.activeChannel.upPullFinished = true
        this.activeChannel.upLoading = false
        return
      }
      // 解决初始化没有数据的
      if (data.pre_timestamp && !data.results.length) {
        // 如果有历史时间戳，并且当前没有最新数据
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.loadArticle()
      }
      // 数据加载完毕将pre_timestamp更新 到当前频道中用于加载下下页的数据
      this.activeChannel.timestamp = data.pre_timestamp
      this.activeChannel.articles.push(...data.results)
      this.activeChannel.upLoading = false
    },
    // 当下拉刷新的时候方法
    onRefresh () {
      console.log('下啦')
    },
    async loadArticle () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticle({
        channelId, // 当前激活的频道id
        timestamp: timestamp,
        withTop: 1
      })
      // console.log(data)
      return data
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
//让没有更多的提示展示出来
.van-tabs {
  margin-bottom: 100px;
}
.van-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.van-tabs /deep/ .van-tabs__content {
  margin-top: 100px;
}
</style>
