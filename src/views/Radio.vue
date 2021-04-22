<template>
  <div class="wrapper">
    <Swiper class="swiperHead" :options="swiperHeadOp" :auto-update="true" ref="swiperHead" dir="rtl">
      <Swiper-Slide v-for="item in swiperHead" :key="item.id">        
        <router-link :to="item.linck" v-if="item.selfLinck">
          <GetImages :img="`headerSlider/${item.img}`" class="headSlide"/>
        </router-link>
        
        <a target="_blank" rel="noopener" :href="item.linck" v-else>
          <GetImages :img="`headerSlider/${item.img}`" class="headSlide"/>
        </a>
      </Swiper-Slide>
    
      <div class="swiper-pagination swiper-button-bullets" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
    </Swiper>
    
    <div class="radio">
      <div class="newItems">
        <div class="title">
          <div class="a">
            <hr>
            <label @click="scrollTo">
              <router-link to="/newItems">
                <h1>новинки</h1>
              </router-link>
            </label>
          </div>
          <div class="b">
            <label @click="scrollTo">
              <router-link to="/newItems" @click="scrollTo">
                <h1>Все новинки</h1>
                <div class="arrow">
                  &#8594;
                </div>
              </router-link>
            </label>
          </div>
        </div>

        <Swiper :options="swiperNewItemsOp" ref="swiperNewItems" class="swipeTrack">
          <Swiper-Slide v-for="item in swiperNewItems" :key="item.id" class="newTrack">

            <div class="new-block" :class="{'activeNewItems': item.hover}" @click="activeSlideNewItems(item)" @mouseenter="activeSlideNewItems(item)">
              <div class="imagesBlock">
                <div class="imagesBackSelect"></div>
                  <div v-lazy:background-image="getImges(item.img)" class="images" @click="playTrack(item, 'swiperNewItems')">
                
                  <svg v-if="!item.play" class="img" width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z" fill="black"/>
                  </svg>
                  <svg v-else class="img" width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 14H7V6H9V14ZM13 14H11V6H13V14Z" fill="black"/>
                  </svg>
                </div>
                <div class="content">
                  &#8592;
                  <div class="text">
                    <p class="author">{{item.artist}}</p>
                    <p class="track">{{item.name}}</p>
                  </div>
                  &#8594;
                </div>
              </div>
            </div>

          </Swiper-Slide>
        </Swiper>
      </div>

      <div class="conteiner">
        <div class="icehot">
          <div class="title">
            <div class="a">
              <hr>
              <label @click="scrollTo">
                <router-link to="/ice-hot" @click="scrollTo">
                  <h1>ICE Hot 30</h1>
                </router-link>
              </label>
            </div>
            <div class="b">
              <label @click="scrollTo">
                <router-link to="/ice-hot" @click="scrollTo">
                  <h1>Весь чарт</h1>
                  <div class="arrow">
                    &#8594;
                  </div>
                </router-link>
              </label>
            </div>
          </div>

          <div class="newItemsTrack" v-for="(item, index) in newItems" :key="item.id">
            <div class="newItemsTrack-data">
              <div class="number" :class="{'playTrack': item.play}">{{ index+1 }}</div>
              <div class="rating" :class="{'ratingUp': item.rating>1, 'ratingDovn': item.rating<0}">
                <span>{{ item.rating }}</span>
              </div>

              <div class="imgTrack" @click="playTrack(item, 'newItems')">
                <svg v-if="!item.play" class="img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z" fill="black"/>
                </svg>
                <svg v-else class="img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 14H7V6H9V14ZM13 14H11V6H13V14Z" fill="black"/>
                </svg>
                <GetImages :img="item.img" class="images"/>
              </div>

              <div class="name-track">
                <div class="author">{{ item.artist }}</div>
                <div class="delimiters" v-html="item.delimiters"></div>
                <div class="track">{{ item.name }}</div>
              </div>
            </div>

            <div class="newItemsTrack-info">
              <div class="timeRating">{{ item.timerating }}</div>
              <a class="youTubeLinck" target="_blank" rel="noopener" :href="item.youTubeLinck">
                <svg height="70px" class="imgYoutobe" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="70px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="形状_1_3_" style="enable-background:new;">
                    <g id="形状_1">
                      <g>
                        <path d="M58.442,241.547l-13.048-48.208H26.053     c3.873,11.386,7.907,22.816,11.784,34.205c5.895,17.121,9.57,30.03,11.236,38.833v49.719h18.384v-49.719l22.111-73.038H70.982     L58.442,241.547z M183.409,224.619v69.916c-3.672,5.191-7.15,7.759-10.464,7.759c-2.225,0-3.526-1.314-3.892-3.88     c-0.2-0.542-0.2-2.56-0.2-6.444v-67.351h-16.523v72.337c0,6.457,0.556,10.828,1.471,13.601c1.653,4.633,5.336,6.799,10.671,6.799     c6.046,0,12.34-3.674,18.937-11.237v9.978h16.578v-91.477H183.409z M114.204,223.519c-8.257,0-14.711,3.119-19.292,9.375     c-3.526,4.622-5.193,11.771-5.193,21.549v32.037c0,9.722,1.667,16.934,5.193,21.511c4.582,6.238,11.036,9.365,19.292,9.365     c8.306,0,14.756-3.127,19.341-9.365c3.475-4.577,5.144-11.789,5.144-21.511v-32.037c0-9.777-1.669-16.927-5.144-21.549     C128.96,226.638,122.51,223.519,114.204,223.519z M122.111,289.598c0,8.465-2.563,12.696-7.907,12.696     c-5.344,0-7.91-4.231-7.91-12.696v-38.481c0-8.463,2.566-12.684,7.91-12.684c5.345,0,7.907,4.221,7.907,12.684V289.598z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#1B1B1B;"/>
                      </g>
                    </g>
                  </g>
                  <g id="形状_1_2_" style="enable-background:new;">
                    <g id="形状_1_1_">
                      <g>
                        <path d="M441.2,239.52c-5.486,0-8.222,4.178-8.222,12.55v8.384h16.4     v-8.384C449.379,243.697,446.63,239.52,441.2,239.52z M380.336,239.52c-2.696,0-5.432,1.283-8.177,3.989v55.172     c2.745,2.742,5.48,4.036,8.177,4.036c4.731,0,7.14-4.036,7.14-12.214v-38.628C387.476,243.697,385.067,239.52,380.336,239.52z      M481.299,191.571c-3.319-14.435-15.128-25.081-29.337-26.669c-31.583-3.528-63.526-3.762-95.37-3.762     c-2.088,0-4.178,0.002-6.265,0.002c-2.088,0-4.175-0.002-6.264-0.002c-31.843,0-63.789,0.233-95.37,3.762     c-14.21,1.588-26.012,12.234-29.332,26.669c-4.724,20.558-4.779,42.993-4.779,64.158v1.519     c0.002,20.719,0.113,42.569,4.725,62.638c3.32,14.434,15.121,25.08,29.331,26.667c31.618,3.534,63.595,3.763,95.475,3.763     c2.053,0,4.108,0,6.159-0.002c2.054,0.002,4.104,0.002,6.158,0.002c31.879,0,63.86-0.229,95.476-3.763     c14.21-1.587,26.018-12.233,29.338-26.667c4.657-20.268,4.75-42.359,4.752-63.261v-0.896     C485.996,234.564,486.023,212.129,481.299,191.571z M292,211.995h-19.642V316.38H254.11V211.995h-19.292v-17.104H292V211.995z      M341.56,316.38h-16.406v-9.874c-6.52,7.479-12.716,11.12-18.746,11.12c-5.284,0-8.927-2.146-10.568-6.729     c-0.893-2.742-1.444-7.073-1.444-13.462v-71.583h16.396v66.65c0,3.844,0,5.838,0.152,6.38c0.399,2.541,1.647,3.835,3.839,3.835     c3.292,0,6.73-2.534,10.371-7.672v-69.193h16.406V316.38z M403.87,289.207c0,8.378-0.56,14.41-1.646,18.248     c-2.2,6.729-6.584,10.171-13.113,10.171c-5.831,0-11.471-3.24-16.951-10.021v8.774H355.76V194.891h16.399v39.68     c5.296-6.518,10.919-9.813,16.951-9.813c6.529,0,10.913,3.436,13.113,10.215c1.087,3.643,1.646,9.626,1.646,18.192V289.207z      M465.771,274.104h-32.793v16.053c0,8.378,2.735,12.561,8.37,12.561c4.044,0,6.392-2.195,7.329-6.584     c0.149-0.894,0.36-4.529,0.36-11.108h16.733v2.396c0,5.276-0.195,8.925-0.349,10.561c-0.547,3.643-1.835,6.931-3.833,9.832     c-4.534,6.572-11.264,9.813-19.83,9.813c-8.58,0-15.11-3.088-19.853-9.272c-3.486-4.53-5.274-11.667-5.274-21.286v-31.702     c0-9.674,1.59-16.751,5.073-21.329c4.744-6.196,11.272-9.279,19.643-9.279c8.229,0,14.76,3.083,19.354,9.279     c3.435,4.578,5.069,11.655,5.069,21.329V274.104z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#A62423;"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="newVideo">
          <div class="title">
            <div class="a">
              <hr>
              <label @click="scrollTo">
                <router-link to="/video" @click="scrollTo">
                  <h1>новое видео</h1>
                </router-link>
              </label>
            </div>
            <div class="b">
              <label @click="scrollTo">
                <router-link to="/video" @click="scrollTo">
                  <h1>Больше клипов</h1>
                  <div class="arrow">
                    &#8594;
                  </div>
                </router-link>
              </label>
            </div>
          </div>

          <Swiper :options="swiperNewVideoOp" ref="swiperNewVideo" class="videoSwiper">
            <Swiper-Slide v-for="(item, index) in swiperNewVideo" :key="index">
              <div class="video-block" @click="playVideo(item, $event)">
                <!-- <svg class="playVideo" @click="playVideo(item)" v-if="!item.play" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.9997 0.833496C13.8851 0.833496 0.833008 13.8856 0.833008 30.0002C0.833008 46.1147 13.8851 59.1668 29.9997 59.1668C46.1143 59.1668 59.1663 46.1147 59.1663 30.0002C59.1663 13.8856 46.1143 0.833496 29.9997 0.833496ZM24.1663 43.1252V16.8752L41.6663 30.0002L24.1663 43.1252Z" fill="white"/>
                </svg>
                <svg class="playVideo" @click="playVideo(item)" v-else width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30.0002 0.833252C13.9002 0.833252 0.833496 13.8999 0.833496 29.9999C0.833496 46.0999 13.9002 59.1666 30.0002 59.1666C46.1002 59.1666 59.1668 46.0999 59.1668 29.9999C59.1668 13.8999 46.1002 0.833252 30.0002 0.833252ZM27.0835 41.6666H21.2502V18.3333H27.0835V41.6666ZM38.7502 41.6666H32.9168V18.3333H38.7502V41.6666Z" fill="white"/>
                </svg> -->
                
                <iframe :title="item.name" width="100%" height="100%" :src="`${item.linck}?enablejsapi=1`" frameborder="0" allowscriptaccess="always" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </div>
            </Swiper-Slide>
          </Swiper>
        </div>
      </div>
      
      <Widget/>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';

import Widget from '@/components/widget.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import GetImages from '@/components/getImages.vue'

import 'swiper/css/swiper.css'

export default {
  components: {
    Widget,
    Swiper,
    SwiperSlide,
    GetImages
  },
  data() {
    return {
      newItems: [],//дальше заменить на часть из items страницы
      swiperHead: [],
      swiperHeadOp: {},
      swiperNewItems: [],
      swiperNewItemsOp: {},
      swiperNewVideo: [],
      swiperNewVideoOp: {},
    }
  },
  computed: {
    ...mapGetters({
      GET_NEW_ITEM: 'Radio/GET_NEW_ITEM',
      GET_SWIPER_HEAD: 'Radio/GET_SWIPER_HEAD',
      GET_SWIPER_HEAD_OP: 'Radio/GET_SWIPER_HEAD_OP',
      GET_SWIPER_NEW_ITEM: 'Radio/GET_SWIPER_NEW_ITEM',
      GET_SWIPER_NEW_ITEM_OP: 'Radio/GET_SWIPER_NEW_ITEM_OP',
      GET_SWIPER_NEW_VIDEO: 'Radio/GET_SWIPER_NEW_VIDEO',
      GET_SWIPER_NEW_VIDEO_OP: 'Radio/GET_SWIPER_NEW_VIDEO_OP',
    }),
  },
  methods: {
    ...mapMutations({
      SET_LOADING: 'preLoader/SET_LOADING',
      SET_PLAYER_SOUND: 'SET_PLAYER_SOUND',
    }),
    playTrack(select, nameArr){
      let arr = eval('this.'+nameArr)
      arr.forEach((item) => {
        item.play = item.id === select.id ? !item.play : false
      })
      // console.log(select)
      this.SET_PLAYER_SOUND(select)
    },
    scrollTo(){
      // console.log('scroll', document.querySelector("header"))
      document.querySelector("header").scrollIntoView(true)
    },
    playVideo(select, e){
      let iframe = e.target.firstChild,
          iframes = document.querySelectorAll('iframe')
      for(const i in iframes)
        if(typeof iframes[i] === 'object')
          iframes[i].contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', "*")
      
      this.swiperNewVideo.forEach((item) => item.play = item.id === select.id ? !item.play : false)
      
      if(select.play)
          iframe.contentWindow.postMessage('{"event": "command", "func": "playVideo", "args": ""}', "*")
    },
    activeSlideNewItems(data){
      this.swiperNewItems.forEach(item => {
        item.hover = false
        if(JSON.stringify(data) === JSON.stringify(item))
          item.hover = true
      });
    },
    getImges(img){
      let tmpImg = '',
          re = /[^A-Z0-9+\/=]/gi
      if (typeof img !== "undefined"){
        !img.search(/(http)|(https)/)>0? tmpImg = img : null
        img.search(/base64/gi)>0? tmpImg = img.replace('commands/', '') : null
        if(tmpImg === '') return img
        return tmpImg
      }
    },

  },
  watch: {
    GET_NEW_ITEM(newD, lastD){
      if(JSON.stringify(newD) !== JSON.stringify(lastD))
        this.newItems = newD.slice(0, 10)
    },
    GET_SWIPER_HEAD(newD, lastD){
      if(JSON.stringify(newD) !== JSON.stringify(lastD))
        this.swiperHead = newD
    },
    GET_SWIPER_HEAD_OP(newD, lastD){
      if(JSON.stringify(newD) !== JSON.stringify(lastD))
        this.swiperHeadOp = newD
    },
    GET_SWIPER_NEW_ITEM(newD, lastD){
      if(JSON.stringify(newD) !== JSON.stringify(lastD))
        this.swiperNewItems = newD
    },
    GET_SWIPER_NEW_ITEM_OPм(newD, lastD){
      if(JSON.stringify(newD) !== JSON.stringify(lastD))
        this.swiperNewItemsOp = newD
    },
    GET_SWIPER_NEW_VIDEO(newD, lastD){
      if(JSON.stringify(newD) !== JSON.stringify(lastD))
        this.swiperNewVideo = newD
    },
    GET_SWIPER_NEW_VIDEO_OP(newD, lastD){
      if(JSON.stringify(this.swiperNewVideoOp) !== JSON.stringify(newD))
        this.swiperNewVideoOp = newD
    },
  },
  created() {
    this.newItems = (this.GET_NEW_ITEM.length>0?this.GET_NEW_ITEM.slice(0, 10):[])
    this.swiperHead = this.GET_SWIPER_HEAD
    this.swiperHeadOp = this.GET_SWIPER_HEAD_OP
    this.swiperNewItems = this.GET_SWIPER_NEW_ITEM
    this.swiperNewItemsOp = this.GET_SWIPER_NEW_ITEM_OP
    this.swiperNewVideo = this.GET_SWIPER_NEW_VIDEO
    this.swiperNewVideoOp = this.GET_SWIPER_NEW_VIDEO_OP
  },
}
</script>


<style lang="scss">
@import "@/assets/scss/Radio.scss";
</style>