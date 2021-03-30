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
      <div class="video" v-for="(item, index) in objItem" :key="index" @click="playTrack(item)">
        <iframe :title="item.name" style="margin:0" width="100%" height="100%" :src="item.linck" allowfullscreen></iframe>
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
      listVideoShow: [],
      objItem: [],
      swiper: [],
      swiperOption: {},
      activeIndex: 0,
      elementToPage: 16,
      style: '<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style>',
      lastScroll: 0,
      lastIndex: 0,
      scrolling: false,
    }
  },
  computed: {
    ...mapGetters({
      GET_VIDEO: 'Video/GET_VIDEO',
      GET_SWIPER: 'Video/GET_SWIPER',
      GET_SWIPER_OP: 'Video/GET_SWIPER_OP',
    }),   
  },
  methods: {
    listVideoFilter(){
      let returnArr = [],
        arr = this.listVideo
      for (let i = 0; i < Math.ceil(arr.length/this.elementToPage); i++)
          returnArr[i] = arr.slice((i*this.elementToPage), (i*this.elementToPage) + this.elementToPage)

      this.listVideoShow = returnArr

      if(this.objItem.length === 0)
        this.objItem = returnArr[this.activeIndex].slice(0)
        
      return returnArr
    },
    nextList(index){
      this.activeIndex = index

      if(index > this.lastIndex && this.activeIndex <= this.listVideoShow.length){        
        let tmp = this.objItem

        for(let i=0; i<this.listVideoShow[this.activeIndex].length; i++)
          tmp.push(this.listVideoShow[this.activeIndex][i])

        this.$router.replace(`/video/`).catch(()=>{})
        this.$router.push(`/video/${this.activeIndex}`).catch(()=>{})
      }else if (index < this.lastIndex && this.activeIndex > 0){        
        this.$router.replace(`/video/`).catch(()=>{})
        this.$router.push(`/video/${this.activeIndex}`).catch(()=>{})
      }else if (this.activeIndex === 0){
        this.$router.push(`/video`).catch(()=>{})
      }
      this.lastIndex = index
    },
     elementInView(el) {
      let top = el.getBoundingClientRect().top,
          height = el.offsetHeight
      return (top < (window.pageYOffset + window.innerHeight) && (top + height) > window.pageYOffset)
    },
   
  },
  watch: {
    GET_VIDEO(newD, lastD){
      if( JSON.stringify(newD) !== JSON.stringify(this.listVideo)){
        this.listVideo = newD
        this.listVideoFilter()
      }      
    },
    GET_SWIPER(newD, lastD){
      this.swiper = newD
    },
    GET_SWIPER_OP(newD, lastD){
      this.swiperOption = newD
    },
  },
  mounted(){
    this.scrolling = setInterval(()=>{
      let summ = Number(document.querySelector('.ps__rail-y').style.top.split('px')[0])
      if(this.lastScroll !== summ){
        let arr = document.querySelectorAll('.video'),
            indexFirst = arr[arr.length>16?this.elementToPage*this.activeIndex-this.elementToPage==-16?0:this.elementToPage*this.activeIndex-this.elementToPage:0],
            indexLast = arr[arr.length-1]
            
        if(this.elementInView(indexLast)){
          this.nextList(this.activeIndex+1)
        }else if(this.elementInView(indexFirst))
          if(this.activeIndex > 0)
            this.nextList(this.activeIndex-1)          
        
        this.lastScroll = summ
      }
    }, 500)
    if(this.listVideo.length)
      this.listVideoFilter()
  },
  created(){
    if( typeof this.$router.currentRoute.fullPath.split('/')[2] !== 'undefined')
      this.activeIndex = Number(this.$router.currentRoute.fullPath.split('/')[2])

    this.listVideo = this.GET_VIDEO
    this.swiper = this.GET_SWIPER
    this.swiperOption = this.GET_SWIPER_OP
  },
  destroyed(){
    clearInterval(this.scrolling)
    this.scrolling = false
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Video.scss";
</style>