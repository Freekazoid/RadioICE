<template>
  <div class="headerAdmin">
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

import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages,
  },
  data() {
    return {
      password: '',
      admin: false,
      passwordBase: 'qwerty',
      comment: '',
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
      this.reChangePassword(newD)      
    },
  },
  methods: {
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_PASSWORD: 'Admin/SET_PASSWORD',
    }),
    reChangePassword(newPass){
      if(newPass !== this.GET_PASSWORD)
        this.admin = true
    },
    baseSetPassword(evt){
      evt.target.focus()
      if(evt.target.value === this.passwordBase){
        this.comment = 'пароль сменен'
        this.comClass = false
        this.SET_PASSWORD(this.password)
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

    .comment{
      background: green;
      color: wheat;
    }
    .comClass{
      background: red;
      color: black;
    }

    &>input{
      width: 97%;
    }
  }

}
</style>