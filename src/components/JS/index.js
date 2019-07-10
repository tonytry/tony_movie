import Vue from 'vue'
import MessageBox from './MessageBox'

// 因为可能有很多对外接口所以这边用export 而不是用 export default
// ()()为了做闭包出来
export var messageBox = (function () {
  var defaults = {
    // 默认值
    title: '',
    content: '',
    cancel: '',
    ok: '',
    handleCancel: null,
    handleOk: null
  }
  // 为解决vue与component结合这边用了vue.expend并且通过结合得到他里面的东西并且返回个新累
  var MyComponent = Vue.extend(MessageBox)

  return function (opts) {
    // 配置参数
    for (var attr in opts) {
      defaults[attr] = opts[attr]
    }

    var vm = new MyComponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCancel () {
          //   判断有没有handleCancel如果有就 用call的方法拿到我们的vm对象 bind是指向但不调用所以用call
          defaults.handleCancel && defaults.handleCancel.call(this)
          //   点击按钮移除el messagebox
          document.body.removeChild(vm.$el)
        },
        handleOk () {
          //   判断有没有handleOk如果有就 用call的方法拿到我们的vm对象 bind是指向但不调用所以用call
          defaults.handleOk && defaults.handleOk.call(this)
          //   点击按钮移除el messagebox
          document.body.removeChild(vm.$el)
        }
      }
    })
    // 把el做的MessageBox添加到body里面
    document.body.appendChild(vm.$el)
  }
})()
