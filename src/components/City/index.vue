<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item in hotList" :key="item.id"> {{item.nm}} </li>
        </ul>
      </div>
      <!-- 添加ref属性，使在点击handleToIndex 这个功能时，可以进行位置的定位 -->
      <div class="city_sort" ref="city_sort">
        <div v-for="item in cityList" :key="item.index">
          <h2> {{item.index}} </h2>
          <ul>
            <li v-for="itemList in item.list" :key="itemList.id"> {{itemList.nm}} </li>
          </ul>
        </div>
      </div>
    </div>

     <div class="city_index">
      <ul>
        <!-- 这边的index 是(item, index) in cityList 的index 位置 -->
        <li v-for="(item, index) in cityList" :key="item.index" @touchstart = "handleToIndex (index)"> {{item.index}} </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'City',
  // 创建数据空实例
  data () {
    return {
      cityList: [],
      hotList: []
    }
  },
  // 引入api数据
  mounted () {
    this.axios.get('/api/cityList').then((res) => {
      var msg = res.data.msg
      if (msg === 'ok') {
        var cities = res.data.data.cities
        // [ { index: 'A', list: [ { nm: '安徽', id= 123 }]}] 这种形式
        var { cityList, hotList } = this.formatCityList(cities)
        // 进行映射
        this.cityList = cityList
        this.hotList = hotList
      }
    })
  },
  methods: {
    formatCityList (cities) {
      // 创建一个初始化的结果集
      var cityList = []
      var hotList = []
      // 进行循环选择出热门城市
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i])
        }
      }
      // 循环cities这个数组
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase()
        if (toCom(firstLetter)) { // 新添加索引
          cityList.push({ index: firstLetter, list: [{ nm: cities[i].nm, id: cities[i].id }] })
        } else { // 累加已有索引
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id })
            }
          }
        }
      }
      // cityList 进行有序排列
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1
        } else if (n1.index < n2.index) {
          return -1
        } else {
          return 0
        }
      })

      function toCom (firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false
          }
        }
        return true
      }
      return {
        cityList,
        hotList
      }
    },
    handleToIndex (index) {
      // 转跳到对应的h2位置上
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // 这边是让citysort父元素滚动到h2的位置
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
    }
  }
}
</script>
<style lang="scss" scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
