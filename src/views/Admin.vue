<template>
  <div class="admin">
    <ModalWindow v-if="showWindow === 2" :window="true">
      <template v-slot:title>Success</template>
      <template v-slot:body>Изменения сохранены</template>
    </ModalWindow>
    
    <ModalWindow v-if="showWindow === 3" :window="false">
      <template v-slot:title>Error</template>
      <template v-slot:body>Не удалось сохраить</template>
    </ModalWindow>

    <MenuAdmin v-bind:component="component" :menuSelect='menuSelect'/>

    <ContentAdmin :selectComponent="component"/>
  </div>
</template>

<script>
import MenuAdmin from '@/components/menuAdmin.vue'
import ContentAdmin from '@/components/contentAdmin.vue'
import ModalWindow from '@/components/modalWindow.vue'

import {mapActions, mapGetters, mapMutations} from 'vuex'


export default {
  data() {
    return {
      component: '',
      showWindow: 1,
    }
  },
  components:{
    MenuAdmin, ContentAdmin, ModalWindow
  },
  computed: {
    ...mapGetters({
      GET_SHOW_WINDOW: 'Admin/GET_SHOW_WINDOW',
    }),
  },
  watch: {
    GET_SHOW_WINDOW(newD){
      this.showWindow = newD
    },
  },
  methods: {
    menuSelect(data) {
      this.component = data
    },
  },
  created() {
     this.showWindow = this.GET_SHOW_WINDOW
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Admin.scss";
</style>