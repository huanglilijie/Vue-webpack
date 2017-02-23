<template>
  <div class="lists">
    <!-- 列表页 -->
    <ul class="p-list">
      <li class="p-list-item" v-for="item in lists" @click="select($index)">
        <div :class="['p-list-item-label',{'p-list-item-label-change': selected[$index]}]">
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
    <!-- 底部按钮 -->
    <btn-footer :is-item-selected="selectedItem">就它啦</btn-footer>
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
    lists: [],
    selectedItem: null,
    selected: [false, false, false],
    orders_number: 0
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
        // 获取订单数量
        this.$http.get(Config.API_ROOT + 'ecommerce/orders-number')
        .then((response) => {
          this.$set('orders_number', response.data)
          console.log(this.orders_number)
          if (this.orders_number >= 400) {
            this.$router.go({path: '/listsfullquota/'})
          }
        }).catch((response) => {
          console.log(response)
        })
        // 获取车型列表
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/vehicles/models')
        .then((response) => {
          /* var data = response.data
          for (var i in data) {
            data[i].selected = false
          }
          console.log(data)*/
          this.$set('lists', response.data)
        }).catch((response) => {
          console.log(response)
        })
      },
      select (index) {
        // 将已选择的置为未选择
        if (this.selectedItem != null) {
          this.selected.$set(this.selectedItem, false)
        }
        // 将本次选择的置为选中
        this.selected.$set(index, true)
        // 将序列赋值给selectedItem
        this.selectedItem = index
        console.log(this.selectedItem)
      },
      getSelected () {
        if (this.selectedItem == null) {
          this.$alert('请选择车型')
          return false
        }
        return this.lists[this.selectedItem]
      },
      // 选中后页面跳转
      submit () {
        const selected = this.getSelected()
        if (!selected) {
          return false
        }
        // 路由跳转页面带参数传递
        this.$router.go({name: 'user', query: {id: selected.id, price: '66666'}})
      }
    }
  }
</script>

<style scoped>
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .p-list {
    margin-bottom: 55px;
  }
  .p-list-item {
    position: relative;
    color: #fff;
    margin-bottom: 10px;
  }
  .p-list-item-title {
    font-size: 18px;
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
  .p-list-item-label {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,.3);
    padding: 10px;
    transition: all .5s ease;
  }
  .p-list-item-label-change {
    background-color: rgba(0,0,0,0);
    color: #000;

  }
  .lists>p{
      text-align: center;
  }
  .text1{
      font-size: 1.5rem;
      margin-top: 10px;
  }
  .text2{
      font-size: 1.2rem;
      margin-top: 5px;
  }

</style>
