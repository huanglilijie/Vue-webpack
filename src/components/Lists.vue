<template>
  <div class="lists">
    <!-- 列表页 -->
    <ul class="p-list">
      <li class="p-list-item" v-for="item in lists" @click="select($index)">
        <div :class="['p-list-item-label',{'p-list-item-label-change': item.selected}]">
          <div class="p-list-item-title">{{ item.title }}</div>
          <div class="p-list-item-price">
            <h4>市场指导价：</h4>
            <p>{{ item.priceFrom }} - {{ item.priceTo }}</p>
            <p>内饰:</p>
            <img class="p-list-item-color" :src="item.colorSrc"/>
          </div>
        </div>
        <img class="p-list-item-img" :src="item.imgSrc">
      </li>
    </ul>
    <!-- 底部按钮 -->
    <btn-footer is-item-selected="selectedItem">就它啦</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  /**
   * 填充数据的方法
   * data.lists = JSON
   */
  let data = {
    lists: [
      {id: 1, selected: false, title: 'Smart fortwo', priceFrom: '125,000元', priceTo: '176,000元', 'imgSrc': '/static/images/smart-list1.png', 'colorSrc': '/static/images/smart-color1.png'},
      {id: 2, selected: false, title: '全新smart forfour 4门4座车', priceFrom: '125,000元', priceTo: '176,000元', 'imgSrc': '/static/images/smart-list2.png', 'colorSrc': '/static/images/smart-color2.png'},
      {id: 3, selected: false, title: '全新smart fortwo敞篷版', priceFrom: '125,000元', priceTo: '176,000元', 'imgSrc': '/static/images/smart-list3.png', 'colorSrc': '/static/images/smart-color3.png'}
//    {id: 4, selected: false, title: 'Smart Fortwo', priceFrom: '12500元', priceTo: '17600元', 'imgSrc': '/static/images/smart-list1.png'}
    ],
    selectedItem: null
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
    methods: {
      // 选中一个item
      select (index) {
        if (this.selectedItem != null) {
          this.lists[this.selectedItem].selected = false
        }
        this.lists[index].selected = true
        this.selectedItem = index
      },
      getSelected () {
        if (this.selectedItem === null) {
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
        this.$router.go({name: 'user', params: {id: selected.id}})
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
  
</style>
