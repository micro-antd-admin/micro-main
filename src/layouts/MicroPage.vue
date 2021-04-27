<template>
  <page-layout :desc="desc" :linkList="linkList">
    <div v-if="this.extraImage && !isMobile" slot="extra" class="extraImg">
      <img :src="extraImage"/>
    </div>
    <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
        <router-view ref="page" />
    </page-toggle-transition>
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
    ...mapState('account', {currUser: 'user'})
  },
  mounted() {
    microAppRegister(this)
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