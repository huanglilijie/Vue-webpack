<template>
  <div class='orderdetailtop'>
    <!-- 订单确认页详情 -->
    <ul>
      <li>
        <img class='p-list-item-img' :src='data.imgSrc'/>
      </li>
      <li>
        <label>车型信息：{{data.carInfo}}</label>
      </li>
      <li>
        <label>经销商信息：{{data,dealer}} {{data.contact}} </label>
      </li>
    </ul>

  </div>
</template>
<script>
  var data = {
    imgSrc: '/static/images/smart-list1.png',
    carInfo: 'smart Two 双门',
    dealer: '北京波士瑞达',
    contact: '010-8865789'
  }
  export default {
    name: 'orderdetailtop',
    data () {
      return {
        data
      }
    },
    created: function () {
      // 在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。
      // 但是还没有开始 DOM 编译，$el 还不存在,但是实例存在,即this.a存在,可打印出来 。
      console.log('建立created')
    },
    beforeCompile: function () {
      console.log('未开始编译beforeCompile')
    },
    compiled: function () {
      // 在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档。
      console.log('编译完成compiled')
    },
    ready: function () {
      // 在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。
      console.log('一切准备好了ready')
    },
    // myVue.$appendTo('.test2')暂时触发不了,不知道怎么解决
    attached: function () {
      // 在 vm.$el 插入 DOM 时调用。必须是由指令或实例方法（如 $appendTo()）插入，直接操作 vm.$el 不会 触发这个钩子。
      console.log('插入DOM成功attached')
    },
    // 触发事件 myVue.$destroy(true),其中参数true控制是否删除DOM节点或者myVue.$remove()
    detached: function () {
      // 在 vm.$el 从 DOM 中删除时调用。必须是由指令或实例方法删除，直接操作 vm.$el 不会 触发这个钩子。
      console.log('删除DOM成功detached')
    },
    // 触发方式,在console里面打myVue.$destroy();
    beforeDestroy: function () {
      // 在开始销毁实例时调用。此时实例仍然有功能。
      console.log('销毁前beforeDestroy')
    },
    // 触发方式,在console里面打myVue.$destroy();其中myVue.$destroy(true)是删除DOM节点,会触发detached函数,但是实例仍然存在
    destroyed: function () {
      // 在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
      console.log('已销毁destroyed')
    }

  }
</script>

<style scoped>
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .p-list-item-img {
    width: 100%;
    display: block;
  }
</style>
