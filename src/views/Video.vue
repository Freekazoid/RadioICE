<template>
  <div class="hotVideo">
    <div class="title">
      <div class="a">
        <hr>
        <h1>новое видео</h1>
      </div>
      <div class="b">
        <div class="rectangle">
          <Swiper class="swiper" :options="swiperOption">
            <SwiperSlide class="boxBanner" v-for="item in swiper" :key="item.id">
              <div class="images" v-if="item.showImg">
                <router-link :to="item.linck" v-if="item.selfLinck">
                  <GetImages :img="`\slider/${item.img}`"/>
                </router-link>

                <a target="_blank" rel="noopener" :href="item.linck" v-else>
                  <GetImages :img="`\slider/${item.img}`"/>
                </a>
              </div>
              <div class="textslide" v-if="item.showText">
                <router-link :to="item.linck" v-if="item.selfLinck">
                  {{item.text}}
                </router-link>

                <a target="_blank" rel="noopener" :href="item.linck" v-else>
                  {{item.text}}
                </a>
              </div>
            </SwiperSlide>
            
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </Swiper>
        </div>
      </div>
    </div>

    <div class="videoList">
      <div class="video" v-for="item in listVideo" :key="item.id" @click="playTrack(item)">
        <svg v-if="!item.play" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.9997 0.833496C13.8851 0.833496 0.833008 13.8856 0.833008 30.0002C0.833008 46.1147 13.8851 59.1668 29.9997 59.1668C46.1143 59.1668 59.1663 46.1147 59.1663 30.0002C59.1663 13.8856 46.1143 0.833496 29.9997 0.833496ZM24.1663 43.1252V16.8752L41.6663 30.0002L24.1663 43.1252Z" fill="white"/>
        </svg>
        <svg v-else width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.0002 0.833252C13.9002 0.833252 0.833496 13.8999 0.833496 29.9999C0.833496 46.0999 13.9002 59.1666 30.0002 59.1666C46.1002 59.1666 59.1668 46.0999 59.1668 29.9999C59.1668 13.8999 46.1002 0.833252 30.0002 0.833252ZM27.0835 41.6666H21.2502V18.3333H27.0835V41.6666ZM38.7502 41.6666H32.9168V18.3333H38.7502V41.6666Z" fill="white"/>
        </svg>
      </div>
    </div>

    <Widget/>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import Widget from '@/components/widget.vue'
import GetImages from '@/components/getImages.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

export default {
  components: {
    Widget,
    Swiper,
    SwiperSlide,
    GetImages,
  },
  data() {
    return {
      listVideo: [],
      swiper: [],
      swiperOption: {},
    }
  },
  computed: {
    ...mapGetters({
      video: 'Video/GET_VIDEO',
      swip: 'Video/GET_SWIPER',
      swiperOP: 'Video/GET_SWIPER_OP',
    }),
  },
  methods: {
    playTrack(select){
      this.listVideo.forEach((item) => {
        item.play = item.id === select.id ? true : false
      })
    },
  },
  watch: {
    video(newD, lastD){
      this.listVideo = newD
    },
    swip(newD, lastD){
      this.swiper = newD
    },
    swiperOP(newD, lastD){
      this.swiperOption = newD
    },
  },
  created(){
    this.listVideo = this.video
    this.swiper = this.swip
    this.swiperOption = this.swiperOP
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Video.scss";
</style>