<template>
  <div class="btntimer">
    <a :class="['btn', 'btn-timer', {'btn-timer-selected': itemSelected}]" @click="submit">
      <slot></slot>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'btntimer',
    data () {
      return {
      }
    },
    props: {
      second: {
        type: Number,
        default: 60
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      itemSelected () {
        return this.selectedItem !== null
      }
    },
    methods: {
      submit () {
        this.$parent.submit()
      }
    }
  }
</script>
<style scoped>
  .btn-timer {
    height: 48px;
    width: 100px;
    position: absolute;
    right: -8px;
    top: 1px;
    background-color: rgb(150,157,163);
    text-align: center;
    line-height: 48px;
    color: #fff;
    border-radius: 3px;
  }
  
</style>