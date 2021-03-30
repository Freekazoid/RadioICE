<template>
  <div class="modalwindow" v-show="isModalVisible">
    <div class="window">
      <h3 class="window-title" :class="{true: modal, false: !modal}">
        <slot name="title"> Заголовок </slot>
        <div class="close" @click="closeModal" :class="{true: modal, false: !modal}">&#10006;</div>
      </h3>

      <div class="window-body">
        <slot name="body"> Изменения </slot>
      </div>
      
      <div class="window-footer">
        <slot name="footer"></slot>
          <button class="_buttom" :class="{true: modal, false: !modal}" @click="closeModal">Ок</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  props:['window'],
  data() {
    return {
      timer: false,
      isModalVisible: true,
      modal: this.window,
    }
  },
  computed: {
    ...mapGetters({
      GET_SHOW_WINDOW: 'Admin/GET_SHOW_WINDOW',
    }),
  },
  methods: {
    ...mapMutations({
      SET_SHOW_WINDOW: 'Admin/SET_SHOW_WINDOW',
    }),
    closeModal(){
      this.isModalVisible = false;
      this.SET_SHOW_WINDOW(1)
    },
  },
  mounted(){
    this.timer = setTimeout(()=>{
      if(this.GET_SHOW_WINDOW > 1){
        this.closeModal()
        this.SET_SHOW_WINDOW(1)
      }
    },3000)
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/modalAdmin.scss";
</style>