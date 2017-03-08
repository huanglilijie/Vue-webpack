<template>
  <div class="btnfooter">
    <a :class="['btn', 'btn-footer', {'btn-footer-selected': itemSelected}]" @click="submit">
      <slot></slot>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'btnfooter',
    data () {
      return {
      }
    },
    props: [
      'is-item-selected'
    ],
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
  .btn-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    /* padding: 15px 0; */
    background-color: #969DA3;
    font-size: .6rem;
    text-align: center;
    color: #fff;
    height: 1.94rem;
    line-height: 1.94rem;
  }

  .btn-footer-selected {
    background-color: #F7B835;
  }
</style>
