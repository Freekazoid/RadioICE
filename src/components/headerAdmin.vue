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
      SET_HEADER: 'Admin/SET_HEADER'
    }),
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
.headerAdmin{
  width: 100%;
  height: 100%;

  .tytle{
    color: tan;
    font-size: 30px;
    font-family: Tahoma;
    text-transform: capitalize;
    padding: 0 0 20px;
    user-select: none;
  }
  fieldset {
    border: 1.5px solid #CCA383;
    width: 320px;
    padding: 0 4px 4px 4px;

    .box{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }
    .preBox{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .label{
        width: 100px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .preImages{
        width: 90px;
        height: 110px;
      }
    }
    .linckItem{
      width: 100%;
      margin: 0 0 16px 0;

      .subItem{
        margin: 5px 0 0 0;

        &>input{
          width: 98%;
        }
        &>input[type="checkbox"]{
          width: 20px;
        }
      }

      &>input{
        width: 98%;
      }
      &>input[type="checkbox"]{
        width: 20px;
      }

    }
  }

}
</style>