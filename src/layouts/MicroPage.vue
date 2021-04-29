<template>
  <page-layout :avatar="currUser.avatar">
    <div id="micro-page" class="micro-page-cls"></div>
  </page-layout>
</template>

<script>
import { mapState } from 'vuex'
import PageLayout from '@/layouts/PageLayout'
import microAppRegister from '@/microAppRegister'

export default {
  name: 'MicroPage',
  components: { PageLayout },
   computed: {
    ...mapState('account', {currUser: 'user'}),
    // desc() {
    //   return this.page.desc
    // },
    // linkList() {
    //   return this.page.linkList
    // },
    extraImage() {
      return this.page.extraImage
    }
  },
  mounted() {
    microAppRegister(this)
    //  this.page = this.$refs.page
  },
  updated () {
    // this.page = this.$refs.page
  }
}
</script>

<style lang="less" scoped>
.micro-page-cls {
  background: white;
  padding: 20px;
  min-height: 50vh;
}
.loading-div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>