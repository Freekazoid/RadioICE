<template>
  <div class="newItems">
    <div class="title">
      <div class="a">
        <hr>
        <h1>Новинки</h1>
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
    
    <div class="newIemsList">
      <div v-for="(item, index) in NItems" :key="NItems.length>0?index:item.id" class="imagesBlock" :class="item.hover ? 'activeNewItems' : ''" @mouseenter="activeSlideNewItems(item)">
        <div class="boxPlay">
          <div class="imagesBackSelect"></div>
          <GetImages :img="item.img" class="images"/>
          
          <svg v-if="!item.play" class="playTrack" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" @click="playTrack(item)">
            <path d="M34.9997 5.83337C18.8997 5.83337 5.83301 18.9 5.83301 35C5.83301 51.1 18.8997 64.1667 34.9997 64.1667C51.0997 64.1667 64.1663 51.1 64.1663 35C64.1663 18.9 51.0997 5.83337 34.9997 5.83337ZM29.1663 48.125V21.875L46.6663 35L29.1663 48.125Z" fill="black" fill-opacity="0.6"/>
          </svg>

          <svg v-else class="playTrack" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" @click="playTrack(item)">
            <path d="M35.0002 5.83337C18.9002 5.83337 5.8335 18.9 5.8335 35C5.8335 51.1 18.9002 64.1667 35.0002 64.1667C51.1002 64.1667 64.1668 51.1 64.1668 35C64.1668 18.9 51.1002 5.83337 35.0002 5.83337ZM32.0835 46.6667H26.2502V23.3334H32.0835V46.6667ZM43.7502 46.6667H37.9168V23.3334H43.7502V46.6667Z" fill="black" fill-opacity="0.6"/>
          </svg>
        </div>
        
        <div class="content">
          <div class="text">
            <p class="author">{{item.artist}}</p>
            <p class="track">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="newItemsTrack" v-for="(item, index) in NItems" :key="NItems.length>0?index:item.id">
      <div class="newItemsTrack-data">
        <div class="number" :class="item.play ? 'playTrack' : ''">{{ index+1 }}</div>
        <div class="rating" :class="{'ratingUp': item.rating>1, 'ratingDovn': item.rating<0}">
          <span>{{ item.rating }}</span>
        </div>

        <div class="imgTrack" @click="playTrack(item)">

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
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    GetImages,
  },
  data() {
    return {
      NItems: [],
      swiper: [],
      swiperOption: {},
    }
  },
  computed: {
    ...mapGetters({
      // GET_PLAYER_SOUND: 'GET_PLAYER_SOUND',
      GET_NEW_ITEMS: 'NewItem/GET_NEW_ITEMS',
      GET_SWIPER: 'NewItem/GET_SWIPER',
      GET_SWIPER_OP: 'NewItem/GET_SWIPER_OP',
    }),
  },
  methods: {
    // ...mapActions({
    //   loader: 'preLoader/loader',
    // }),
    ...mapMutations({
      SET_PLAYER_SOUND: 'SET_PLAYER_SOUND',
    }),
    playTrack(select, e){
      this.NItems.forEach((item) => {
        item.play = item.id === select.id ? !item.play : false
      })
      // console.log(select.trackLinck)
      this.SET_PLAYER_SOUND(select)
    },
    activeSlideNewItems(data){
      this.NItems.forEach(item => {
        item.hover = false
        if(JSON.stringify(data) === JSON.stringify(item))
          item.hover = true
      })
    },
  },
  watch: {
    GET_NEW_ITEMS(newD, lastD){
      this.NItems = newD.slice(0, 20)
      //this.$forceUpdate()//Принудительное обновление страницы
    },
    GET_SWIPER(newD, lastD){
      this.swiper = newD
    },
    GET_SWIPER_OP(newD, lastD){
      this.swiperOption = newD
    },
  },
  created(){
    this.NItems = this.GET_NEW_ITEMS.slice(0, 20)
    this.swiper = this.GET_SWIPER
    this.swiperOption = this.GET_SWIPER_OP
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/NewItems.scss";
</style>