<template>
  <div id="root" :is="UIDescktop"></div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import Client from '@/views/Client.vue'
import Admin from '@/views/Admin.vue'

export default {
  components: {
    Client, Admin
  },
  data() {
    return {
      changeTitleTimer: 0,

    }
  },
  computed: {
    ...mapGetters({
      GET_LOGGED: 'GET_LOGGED',
    }),
    UIDescktop(){
      return (this.$route.name === 'Admin' && this.GET_LOGGED) ? 'Admin' : 'Client'
    }
  },
  methods: {
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_LOGGED: 'SET_LOGGED',
    }),
    changeTitle(){
      var letter = document.title[0]
      document.title = document.title.substr(1) + letter
      this.changeTitleTimer = setTimeout(this.changeTitle, 800)
    },
  },
  created() {
    setTimeout(this.changeTitle(), 4000)
  },
}
</script>

<style lang="scss"></style>