<template>
  <div class="background" v-show="loading">
    <div class="e-loadholder">
      <div class="m-loader">
        <span class="e-text">Loading</span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      loading: 'preLoader/GET_LOADER',
    }),
  },
  methods: {
    ...mapActions({
      loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_LOADING: 'preLoader/SET_LOADING',
    }),
  },  
  mounted() {
    this.loader()
  },
  /* watch: {
    $route() {
      this.SET_LOADING(true)
      setTimeout(() => {
        //this.loading = false//false
        this.SET_LOADING(false)
      }, 2000)
    },
  }, */
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/component/preLoader.scss";
</style>