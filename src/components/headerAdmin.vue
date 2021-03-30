<template>
  <div class="headerAdmin">
    <h1 class="tytle">header</h1>
    <fieldset>
      <legend>Логотип:</legend>            
      <div class="box">
        <upload :preImgShow="logotype" @upload="uploadImg" />
      </div>
    </fieldset>
    
    <fieldset>
      <legend>Верхнее меню:</legend>
      <div class="linckItem" v-for="item in routerLink" :key="item.id">
        <div class="num">№: 
          <input type="number" :value="item.id" min="1" @change="indexSet($event, item.id)">
        </div>

        вкл страницу
        <input type="checkbox" v-model="item.use" :checked="item.use">
        <input type="text" v-model="item.title">

        <div class="subItem"  v-for="(subItem, index) in item.subMenu" :key="index">
          вкл страницу
          <input type="checkbox" v-model="subItem.use" :checked="subItem.use">
          <input type="text" v-model="subItem.title">
        </div>

      </div>
    </fieldset>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'
import upload from '@/components/upload.vue'

export default {
  components: {
    GetImages, upload,
  },
  data() {
    return {
      logoImg: '',
      routerLink: [],
    }
  },
  computed: {
    ...mapGetters({
      GET_ROUTER_LINK: 'header/GET_ROUTER_LINK',
      GET_LOGOS: 'header/GET_LOGOS',
      GET_LOGO_IMG: 'Admin/GET_LOGO_IMG',
    }),
    logotype(){
      return {img: this.logoImg}
    },
  },
  watch: {
    routerLink: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_HEADER({routerLink: newD})
      },
      deep: true
    },
  },
  methods: {
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_HEADER: 'Admin/SET_HEADER',
    }),
    indexSet(e, Id){
      let respons = false,
        serchId = Number(e.target.value),
        sortArr = this.bubbleSort(this.routerLink)
      this.routerLink.forEach(item => {
        (item.id === serchId && item.id !== Id ? (respons = true) : null);
      })
      if(respons){
        e.target.value = Id
      } else {
        this.routerLink.find(item => {
          (item.id === Id ? (item.id = serchId) : null)
        })
      }
    },
    uploadImg(data){
      this.SET_HEADER({logoImg: data.img})
    },
    
  },
  created(){
    this.logoImg = this.GET_LOGOS
    this.routerLink = this.GET_ROUTER_LINK
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/headerAdmin.scss";
</style>