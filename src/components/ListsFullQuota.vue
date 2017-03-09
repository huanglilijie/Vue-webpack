<template>
  <!-- 活动名额已满 -->
  <div class="lists" v-else>
    <ul class="p-list" v-for="item in lists">
        <li class="p-list-item" >
            <div class="p-list-item-label">
                <div class="p-list-item-title"></div>
                <div class="p-list-item-price">
                    <h4></h4>
                    <p></p>
                    <p></p>
                    <img class="p-list-item-color" :src=""/>
                </div>
            </div>
            <img class="p-list-item-img" :src="item.picture">
        </li>
    </ul>
    <p class="text1">本次活动名额已满</p>
    <p class="text2">奔驰世界，无限精彩</p>
    <p class="text2">https://estore.mercedes-benz.com.cn</p>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  import Config from '../../config/config'
  /**
   * 填充数据的方法
   * data.lists = JSON
   */
  let data = {
    lists: []
  }

  export default {
    name: 'lists',
    data () {
      return data
    },
    create () {
      // 初始化lists
    },
    components: {
      'btn-footer': Btn
    },
    ready: function () {
      this.setData()
    },
    beforeDestory: function () {

    },
    methods: {
      // 选中一个item
      setData: function () {
        // 获取车型列表
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/vehicles/models')
        .then((response) => {
          this.$set('lists', response.data)
        }).catch((response) => {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
      font-family: 微软雅黑;
  }
  .lists>p{
      text-align: center;
  }
  ul, li {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  .p-list {
      /*margin-bottom: 10px;*/
  }
  .p-list-item {
      position: relative;
      margin-bottom: 10px;
  }
  .p-list-item-title {
      font-size: 1.5rem;
  }
  .p-list-item-img {
      width: 100%;
      display: block;
  }
  .p-list-item-color{
      position: absolute;
      bottom: 5px;
      width: 70%;
      display: block;
  }
  .p-list-item-price > h4,
  .p-list-item-price > p {
      margin: 0;
      margin-top: 5px;
  }
  .p-list-item-price > p:nth-child(3){
      position: absolute;
      bottom: 32px;
      /*width: 70%;*/
      display: block;
  }
  .p-list-item-label{
     position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 10px;
      transition: all .5s ease;
  }
  .p-list-item-label-change {
      background-color: rgba(0,0,0,0);
      color: #000;
  }
  .text1{
      font-size: .45rem;
      /*margin-top:.3rem;*/
  }
  .text2{
      font-size: .35rem;
      /*margin-top: .1rem;*/
  }

</style>
