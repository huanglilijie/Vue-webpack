<template>
  <title>创建我的宠爱之旅</title>
  <div class="wrap-mydear">
    <img src="/static/title-img.jpg" alt="" />
    <div class="bottom">
      <div class="text1">
        <p>我的生活有smart和远方</p>
        <p>还有可爱又美好的你伴我前行</p>
      </div>
      <div class="text1">
        <p>宠爱我一次，</p>
        <p>为了答谢你，我会：</p>
      </div>
      <li class="t-list-item" v-for="item in lists" @click="select($index)">
        <div :class="['text2',{'text2-change': selected[$index]}]">
          <p class="sayMing">{{item.thankway}}</p>
        </div>
      </li>
      <p class="text3">*内容确定后不能修改哦</p>
    </div>
    <div v-if='checks'>
      <div class="mask" @click="submit"></div>
<!--       <img class="mask-img" src="/static/images/pump-bg.png"/> -->
      <div class="pump">
        <p>撒娇模式已上线</p>
        <p>快让大家来宠爱你吧！</p>
      </div>
    </div>
    <a class="btn-mydear" @click="submit">开启宠爱之旅</a>
  </div>
</template>
<script type='text/babel'>
  import Config from '../../config/config'
  export default {
    name: 'lists',
    data () {
      return {
        lists: [
          {id: 1, thankway: '从此乖乖听你话，每天把你送回家'},
          {id: 2, thankway: '带你兜风带你飞，带你去见谁谁谁'},
          {id: 3, thankway: '从你的全世界路过，顺便给你留个座'}
        ],
        selectedItem: null,
        selected: [false, false, false],
        orders_number: 0,
        checks: false,
        orderId: ''
      }
    },
    created () {
      // 初始化lists
      // 获取页面传参
      var orderId = this.$route.query.orderId
      this.$set('orderId', orderId)
    },
    components: {
    },
    ready () {
    },
    methods: {
      select (index) {
        // 将已选择的置为未选择
        if (this.selectedItem != null) {
          this.selected.$set(this.selectedItem, false)
        }
        // 将本次选择的置为选中
        this.selected.$set(index, true)
        // 将序列赋值给selectedItem
        this.selectedItem = index
        console.log(this.selectedItem + 'item')
      },
      getSelected () {
        if (this.selectedItem == null) {
          this.$alert('请选择答谢方式')
          this.checks = false
          return false
        }
        return this.lists[this.selectedItem]
      },
      submit () {
        var self = this
        const selected = this.getSelected()
        if (!selected) {
          return false
        }
        this.makshow()
        // 调用邀请函创建api
        // console.log(selected.thankway)
        this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.orderId + '/funding', {memo: selected.thankway}).then((response) => {
          if (response != null) {
            console.log(response)
            var isfirst = window.localStorage.getItem('isfirst')
            if (isfirst == null) {
              isfirst = true
            }
            setTimeout(function () {
              self.$router.go({name: 'dealerlist', query: {orderId: self.orderId, isfirst: isfirst}})
            }, 2000)
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      makshow () {
        var self = this
        self.checks = !self.checks
      }
    }
  }
</script>
<style>
  .wrap-mydear img{
  	width: 100%;
  	display: block;
  }
  .bottom{
  	background: url(/static/img-bg.png) center center;
  	background-size: 100% 100%;
  	/*height: auto;*/
    background-size: 100%;
    /*padding-bottom: 1.6rem;*/
  }
  .bottom .text1{
  	width: 60%;
  	margin: 0 auto;
  	text-align: left;
  	margin-top:10px;
  	font-size: .5rem;
  	font-weight: 600;
  }
  .text2{
  	padding: 25px 0px;
  	background: url(/static/text-bg.png) no-repeat center;
  	background-size: contain;
  	width: 85%;
  	text-align: center;
  	margin:  0 auto;
  	font-size: .5rem;
  	font-weight: 500;
  	margin-top:20px ;
  }
  .sayMing{
  	display: inline;
  }
  .text2-change{
	  background-color: rgba(0,0,0,0);
  	color: #000;
	}
  .btn-mydear{
		display: inline-block;
		width: 90%;
		margin: 0 auto;
		height: 1.6rem;
		line-height: 1.6rem;
		text-align: center;
		font-size: .6rem;
		text-decoration: none;
		color: #FFFFFF;
		border-radius: .2rem;
		background-color: #F7B835;
		/*margin-top: 1rem;*/
    position: fixed;
    left: 5%;
    bottom:.2rem;
	}
	.text3{
		width: 40%;
		text-align: center;
		margin: 0 auto;
    padding-bottom: 2rem;
    font-size: .35rem;
	}
	.mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
  }
  .pump{
    position: fixed;
    top: 2rem;
    height: 300px;
    width: 80%;
    text-align: center;
    left: 10%;
    background: url(/static/images/pump-bg.png) no-repeat;
    background-size: contain;
    /*display: none;*/
    z-index: 3;
  }
  .pump p{
    text-align: center;
  }
  .pump p:first-child{
    margin-top: 4rem;
    font-size: .5rem;
    font-weight: 500;
    /*line-height:3rem;*/
  }
  .pump p:last-child{
    font-size: .5rem;
    font-weight: 600;
    margin-top: 1rem;
  }
	.text2-change{
		background: url(/static/images/text-bg-checked.png) no-repeat center;
		background-size: contain;
	}
  .mask-img{
    position:absolute;
    top:0;
    z-index: 2;
  }
</style>
