<template>
  <perfect-scrollbar>
    <div class="client">
      <preLoader/>
      
      <Header/>

      <router-view/>

      <Footer/>

      <Stream/>
    </div>
  </perfect-scrollbar>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import preLoader from '@/components/preLoader.vue'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Stream from '@/components/stream.vue'

export default {
  components: {
    preLoader, Header, Footer, Stream
  },
  computed: {
    ...mapGetters({
      SOCKET_data: 'SOCKET_data',
    }),
  },
  updated() {
    //console.log('SOCKET_data', isNaN(this.SOCKET_data), Object.keys(this.SOCKET_data).length )
  },
}
</script>


<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/App.scss";
</style>