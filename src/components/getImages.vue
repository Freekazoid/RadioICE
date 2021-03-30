<template>
  <figure class="image__wrapper">
    <div class="cssload-loader" v-if="lazyloading">
      <span class="cssload-inner cssload-one"></span>
      <span class="cssload-inner cssload-two"></span>
      <span class="cssload-inner cssload-three"></span>
    </div>

    <img @load="lazyloading=false" :alt="img" :data-url="img" v-if="getImges()" :src="getImges()" />
    <img @load="lazyloading=false" :alt="img" :data-url="img" v-else-if="!getImges()" :src="showImg" />
  </figure>
</template>

<script>
export default {
  props: {
    img: String,
    required: true,
  },
  data(){
    return {
      lazyloading: true,
    }
  },
  computed: {
    showImg(){
      if(typeof this.img !== 'undefined')
        return !this.img.indexOf(/img/i)?this.img:`img/${this.img}`
    }
  },
  methods:{
    getImges(){
      let tmpImg = '',
          re = /[^A-Z0-9+\/=]/gi
      if (typeof this.img !== "undefined"){
        !this.img.search(/(http)|(https)/)>0? tmpImg = this.img : null
        this.img.search(/base64/gi)>0? tmpImg = this.img.replace('commands/', '') : null
        if(tmpImg === '') return false
        return tmpImg
      }
    },

  },
}
</script>

<style lang="scss">
@import "@/assets/scss/component/getimages.scss";
</style>