<template>
  <div class="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
// 引用better-scroll
import BScroll from 'better-scroll'

export default {
  name: 'Scroller',
  //   为实现父子通讯，用props创建两个方法
  props: {
    handleToScroll: {
      type: Function,
      default: function () {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {}
    }

  },
  mounted () {
    //   声明两个函数然后把pos回调出去
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    })
    // 把局部变成属性
    this.scroll = scroll
    scroll.on('scroll', (pos) => {
      this.handleToScroll(pos)
    })
    scroll.on('touchEnd', (pos) => {
      this.handleToTouchEnd(pos)
    })
  },
  methods: {
    toScrollTop (y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
    height: 100%;
}
</style>
