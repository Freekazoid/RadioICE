<template>
  <div class="admin">
    <MenuAdmin v-bind:component="component" :menuSelect='menuSelect'/>

    <ContentAdmin :selectComponent="component"/>
  </div>
</template>

<script>
import MenuAdmin from '@/components/menuAdmin.vue'
import ContentAdmin from '@/components/contentAdmin.vue'

export default {
  data() {
    return {
      component: ''
    }
  },
  components:{
    MenuAdmin, ContentAdmin
  },
  methods: {
    menuSelect(data) {
      this.component = data
    }
  }
  
}
</script>

<style lang="scss" scoped>
.admin{
  width: calc(100% - 50px);
  height: 100%;
  display: flex;
  flex-direction: row !important;
  align-items: baseline !important;
}
</style>