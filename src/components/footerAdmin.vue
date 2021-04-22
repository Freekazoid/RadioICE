<template>
  <div class="footerAdmin">
    <h1 class="tytle">Подвал</h1>
    <fieldset>
      <legend>copyright:</legend>
      <input type="text" v-model="copyright">
    </fieldset>
    <fieldset>
      <legend>Дата создания:</legend>
      <input type="text" v-model="startDate">
    </fieldset>
    <fieldset>
      <legend>email:</legend>
      <input type="email" v-model="email">
    </fieldset>
    <fieldset>
      <legend>email описание в письме:</legend>
      <input type="text" v-model="emailHref">
    </fieldset>
    <fieldset>
      <legend>Подпись подвала:</legend>
      <input type="text" v-model="emailText">
    </fieldset>

    <fieldset class="socialBox">
      <legend>Соц сети:</legend>
      <div class="socialLinck" v-for="(item, index) in social" :key="index">
        <div class="check">
          показ: <input type="checkbox" v-model="item.active">
          приложение: <input type="checkbox" v-model="item.app">
        </div>
        
        <div class="boxUpload">
          <upload :preImgShow="item" @upload="uploadImg" />
        </div>
        
        названи: <input type="text" v-model="item.title">
        ссылка: <input type="text" v-model="item.linck">
        описание: <input type="text" v-model="item.description">
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
      copyright: '',
      date: '',
      email: '',
      emailHref: '',
      emailText: '',
      startDate: '',
      social: [],
    }
  },
  computed: {
    ...mapGetters({
      GET_COPYRIGHT: 'footer/GET_COPYRIGHT',
      GET_DATE: 'footer/GET_DATE',
      GET_EMAIL: 'footer/GET_EMAIL',
      GET_EMAIL_HREF: 'footer/GET_EMAIL_HREF',
      GET_EMAIL_TEXT: 'footer/GET_EMAIL_TEXT',
      GET_START_DATE: 'footer/GET_START_DATE',
      GET_SOCIAL: 'footer/GET_SOCIAL',/////////////////////////////
    }),
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_FOOTER: 'Admin/SET_FOOTER',
      SET_COPYRIGHT: 'footer/SET_COPYRIGHT',
      SET_DATE: 'footer/SET_DATE',
      SET_EMAIL: 'footer/SET_EMAIL',
      SET_EMAIL_HREF: 'footer/SET_EMAIL_HREF',
      SET_EMAIL_TEXT: 'footer/SET_EMAIL_TEXT',
      SET_START_DATE: 'footer/SET_START_DATE',
      SET_SOCIAL: 'footer/SET_SOCIAL',////////////////////
    }),
    uploadImg(data){
      this.social[data.id] = data
      // this.SET_SOCIAL(social)
      this.SET_FOOTER({social: this.social})
    },
  },
  watch: {
    social: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_FOOTER({social: newD})
      },
      deep: true
    },
    copyright(newD, lastD){
      if(lastD.length > 0)
        this.SET_FOOTER({copyright: newD})
    },
    email(newD, lastD){
      if(lastD.length > 0)
        this.SET_FOOTER({email: newD})
    },
    emailHref(newD, lastD){
      if(lastD.length > 0)
        this.SET_FOOTER({emailHref: `mailto:${this.email}?subject=`+newD})
    },
    emailText(newD, lastD){
      if(lastD.length > 0)
        this.SET_FOOTER({emailText: newD})
    },
    startDate(newD, lastD){
      if(lastD.length > 0)
        this.SET_FOOTER({startDate: newD})
    },
  },
  created(){
    this.copyright = this.GET_COPYRIGHT
    this.date = this.GET_DATE
    this.email = this.GET_EMAIL
    this.emailHref = this.GET_EMAIL_HREF.split('=')[1]
    this.emailText = this.GET_EMAIL_TEXT
    this.startDate = this.GET_START_DATE
    this.social = this.GET_SOCIAL
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/footerAdmin.scss";
</style>