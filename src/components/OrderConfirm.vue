<template>
  <div>
    <!-- 订单确认页 -->
    <order-detail-top {{orderinfo.imgSrc}} {{orderinfo.carInfo}} {{orderinfo.dealer}} {{orderinfo.contact}}></order-detail-top>
    <ul>
      <li>
        <label>意向金：{{orderinfo.intent}}</label>
      </li>
      <li>
        <label>姓名：{{orderinfo.name}}</label>
      </li>
      <li>
        <label>电话：{{orderinfo.phone}}</label>
      </li>
    </ul>
    <!-- 底部按钮 -->
    <btn-footer is-item-selected="selectedItem">确认开启宠爱之旅</btn-footer>
    <btn-footer is-item-selected="selectedItem">重新选择</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  import OrderDetailTop from '../elements/OrderDetailTop'
  /**
   * 填充数据的方法
   * data.lists = JSON
   */
  let data = {
    orderinfo: {
      imgSrc: '/static/images/smart-list1.png',
      carInfo: 'smart Two 双门',
      dealer: '北京波士瑞达',
      contact: '010-8865789',
      intent: 666,
      name: '潘飞',
      phone: '13824722762'
    }
  }

  export default {
    name: 'orderconfirm',
    data () {
      return data
    },
    create () {},
    components: {
      'btn-footer': Btn,
      'order-detail-top': OrderDetailTop
    }
  }
</script>

<style scoped>
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
