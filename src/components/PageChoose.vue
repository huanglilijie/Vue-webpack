<template lang="html">
</template>
<script>
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  export default {
    data () {
      return {
        useropenid: '',
        uid: '123',
        status: ''
      }
    },
    ready: function () {
      this.$set('useropenid', 1231231)
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
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + this.uid + '/orders').then((response) => {
          if (response.data != null) {
            console.log(response.data.orderStatus)
            this.status = response.data.orderStatus
            // 判断状态是否是筹款中
            if (this.status === 'FUNDING' || this.status === 'PAID') {
              this.$router.go({name: 'friendsdream', query: {useropenid: this.useropenid}})
            }
            // 判断状态是否是筹款完成
            if (this.status === 'FUNDED' || this.status === 'FUNDED') {
              this.$router.go({name: 'friendsdreamfinish'})
            }
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    }
  }
</script>