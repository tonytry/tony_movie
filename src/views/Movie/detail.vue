/* eslint-disable no-new */
<template>
  <div
    id="detailContrainer"
    class="slide-enter-active"
  >
    <Header title="影片详情">
      <i
        class="iconfont icon-right"
        @touchstart="handleToBack"
      ></i>
    </Header>
    <Loading v-if="isLoading" />
    <div
      v-else
      id="content"
      class="contentDetail"
    >
      <div class="detail_list">
        <div class="detail_list_bg" :style=" {'background-image': 'url('+detailMovie.img.replace(/w\.h/,'148.208') + ')'} " ></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <!-- <img :src="detailMovie.img | setWH('148.208')" alt=""> -->
            <img :src="detailMovie.img | setWH('120.128')">
          </div>
          <div class="detail_list_info">
            <h2> {{detailMovie.nm}} </h2>
            <p> {{detailMovie.cnm}} </p>
            <p> {{detailMovie.sr}} </p>
            <p> {{detailMovie.cat}} </p>
            <p> {{detailMovie.src}} / {{detailMovie.dur}}分钟 </p>
            <p> {{detailMovie.pubDesc}} </p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p> {{detailMovie.dra}} </p>
      </div>
      <div
        class="detail_player swiper-container"
        ref="detail_player"
      >
        <ul class="swiper-wrapper" ref="detail_tab">
          <li v-for="(item,index) in detailMovie.photos" :key="index" class="detail-item">
            <div>
              <img
                :src=" item | setWH('120.240') "
                alt=""
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import BScroll from 'better-scroll'

export default {
  name: 'Detail',
  data () {
    return {
      detailMovie: {},
      isLoading: true,
      liNum: 6
    }
  },
  components: {
    Header
  },
  props: ['movieId'],
  mounted () {
    this.axios.get('/api/detailmovie?movieId=' + this.movieId).then((res) => {
      var msg = res.data.msg
      if (msg === 'ok') {
        this.isLoading = false
        this.detailMovie = res.data.data.detailMovie
        this.liNum = res.data.data.detailMovie.photos.length
        // 视频原带的教程方法
        // this.$nextTick(() => {
        //   new Swiper(this.$refs.detail_player, {
        //     slidesPerView: 'auto',
        //     freeMode: true,
        //     freeModeSticky: true
        //   })
        // })

        // 运用better-scroll的方法
        this.$nextTick(() => {
          this.deatailPhotoScroll()
        })
      }
    })
  },
  methods: {
    handleToBack () {
      this.$router.back()
    },
    deatailPhotoScroll () {
      // 通过better-scroll 方法 宽度用照片数量 * 120 的数值总宽度
      var width = this.liNum * 120
      this.$refs.detail_tab.style.width = width + 'px'
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.detail_player, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}
.slide-enter-active {
  animation: 0.3s slideMove;
}

@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
 .detail-item {
          display: inline-block;
          height: 50px;
          width: 120px;
          margin-right: 10px;
          border: 1px solid #ccc;
        }
</style>
