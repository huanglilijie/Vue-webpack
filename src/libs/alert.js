import Vue from 'vue'
import $ from 'webpack-zepto'

/**
 * 全局注册弱提示
 */
export default {
  install () {
    let timer = null
    Vue.prototype.$alert = (msg) => {
      $('#comAlert').remove()
      let $alert = $('<div class="com-alert" id="comAlert"></div>')
      $('body').append($alert)
      $alert.html(msg)
      $alert.addClass('alert-show')
      clearTimeout(timer)
      timer = setTimeout(() => {
        $alert.remove()
      }, 2000)
    }
  }
}
