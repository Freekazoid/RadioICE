<template>
  <div class="content" >
    <div :is="showComponent"></div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import configAdmin from '@/components/configAdmin.vue'
import headerAdmin from '@/components/headerAdmin.vue'
import streamAdmin from '@/components/streamAdmin.vue'
import slidersAdmin from '@/components/slidersAdmin.vue'
import footerAdmin from '@/components/footerAdmin.vue'
import NewItemAdmin from '@/views/NewItemAdmin.vue'
import ProgramsAdmin from '@/views/ProgramsAdmin.vue'
import IceHotAdmin from '@/views/IceHotAdmin.vue'
import TeamAdmin from '@/views/TeamAdmin.vue'
import LifeAdmin from '@/views/LifeAdmin.vue'
import PlayListAdmin from '@/views/PlayListAdmin.vue'
import VideoAdmin from '@/views/VideoAdmin.vue'

export default {
  components:{
    configAdmin,
    headerAdmin,
    streamAdmin,
    slidersAdmin,
    footerAdmin,
    NewItemAdmin,
    ProgramsAdmin,
    IceHotAdmin,
    TeamAdmin,
    LifeAdmin,
    PlayListAdmin,
    VideoAdmin
  },
  data() {
    return {
      showComponent: ''
    }
  },
  props: ['selectComponent'],
  computed: {
    ...mapGetters({
      GET_MENU_ADMIN: 'Admin/GET_MENU_ADMIN',
    }),
  },
  watch: {
    selectComponent(newD){
      this.showComponent = newD.component
    }
  },
  created() {
    this.GET_MENU_ADMIN.forEach(item => (item.active?(this.showComponent = item.component) : null))
    
    if(this.showComponent.length <= 0)
      this.showComponent = this.GET_MENU_ADMIN[0].component
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/contentAdmin.scss";
</style>