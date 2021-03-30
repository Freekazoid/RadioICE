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
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      copyright: '',
      date: '',
      email: '',
      emailHref: '',
      emailText: '',
      startDate: '',
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
    }),
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_COPYRIGHT: 'footer/SET_COPYRIGHT',
      SET_DATE: 'footer/SET_DATE',
      SET_EMAIL: 'footer/SET_EMAIL',
      SET_EMAIL_HREF: 'footer/SET_EMAIL_HREF',
      SET_EMAIL_TEXT: 'footer/SET_EMAIL_TEXT',
      SET_START_DATE: 'footer/SET_START_DATE',
      SET_FOOTER: 'Admin/SET_FOOTER'
    }),
  },
  watch: {
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
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/footerAdmin.scss";
</style>