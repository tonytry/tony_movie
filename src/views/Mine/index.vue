<template>
  <div id="main">
    <Header title="关于我的" />
    <div class="content">
      <Login />
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'
export default {
  name: 'Mine',
  components: {
    Header,
    TabBar,
    Login
  }
}
</script>
<style lang="scss" scoped>

</style>
