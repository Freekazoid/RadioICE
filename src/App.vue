<template>
  <div id="root">
    <div :is="UIDescktop"></div>
    <Player/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import Client from '@/views/Client.vue'
import Admin from '@/views/Admin.vue'
import Player from '@/views/Player.vue'

export default {
  components: {
    Client, Admin, Player
  },
  data() {
    return {
      changeTitleTimer: 0,
      screen: false,
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
      this.changeTitleTimer = setTimeout(this.changeTitle, 600)
    },
  },
  created() {
    setTimeout(this.changeTitle(), 5000)
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/reset.scss";
</style>