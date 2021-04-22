<template>
  <div class="Admin">
    <h1 class="tytle">config</h1>
    <fieldset>
      <legend>Пароль администратора:</legend>
      <input type="text" v-model="password">
    </fieldset>
    
    <fieldset v-if="admin">
      <legend>сменить проль администратора:</legend>
      <input type="password" @change="baseSetPassword">
      <div class="comment" :class="{'comClass': comClass}">
        {{comment}}
      </div>
    </fieldset>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

// import GetImages from '@/components/getImages.vue'
// import upload from '@/components/upload.vue'

export default {
  components: {
    // GetImages, upload,
  },
  data() {
    return {
      password: '',
      comment: '',
      admin: false,
      passwordBase: 'qwerty',
      comClass: false,
    }
  },
  computed: {
    ...mapGetters({
      GET_PASSWORD: 'Admin/GET_PASSWORD',
    }),
  },
  watch: {
    password(newD, lastD){
      if(newD !== this.GET_PASSWORD)
        this.admin = true
    },
  },
  methods: {
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_PASSWORD: 'Admin/SET_PASSWORD',
    }),
    baseSetPassword(evt){
      evt.target.focus()
      if(evt.target.value === this.passwordBase){
        this.comment = 'пароль сменен'
        this.comClass = false
        this.SET_PASSWORD({password: this.password})
      } else {
        this.password = this.GET_PASSWORD
        this.comClass = true
        this.comment = 'не удалось сменить пароль'
      }
      setTimeout(() => {
        this.comment = '';
        this.admin = false
      }, 3000)
    },
  },
  created() {
    this.password = this.GET_PASSWORD
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/configAdmin.scss";
</style>