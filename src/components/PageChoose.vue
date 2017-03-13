<template lang="html">
</template>
<script>
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  export default {
    data () {
      return {
        useropenid: '',
        useruid: '',
        status: ''
      }
    },
    ready: function () {
      var useruid = this.$route.query.useruid
      var useropenid = this.$route.query.useropenid
      this.$set('useruid', useruid)
      this.$set('useropenid', useropenid)
      this.ifInactivity()
    },
    methods: {
      ifInactivity () {
        var nd = new Date()
        var ld = new Date(Golab.endDate)
        var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
        if (dates <= 0) {
          dates = 0
          this.$router.go({name: 'friendsactivityend'})
        } else {
          this.initOrderDetail()
        }
      },
      initOrderDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + this.useruid + '/orders').then((response) => {
          if (response.data != null) {
            console.log(response.data.orderStatus)
            this.status = response.data.orderStatus
            // 判断状态是否是筹款中
            if (this.status === 'FUNDING' || this.status === 'PAID') {
              this.$router.go({name: 'friendsdream', query: {useropenid: this.useropenid}})
            }
            // 判断状态是否是筹款完成/已核销
            if (this.status === 'FUNDED' || this.status === 'CONFIRMED') {
              this.$router.go({name: 'friendsdreamfinish'})
            }
            // 判断状态是否是退款中/退款完成
            if (this.status === 'REFUNDING' || this.status === 'REFUNDED') {
              this.$router.go({name: 'friendsdreamunsubscribe'})
            }
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    }
  }
</script>