<template>
  <div class="playList">
    <div class="title">
      <div class="a">
        <hr>
        <h1>Playlist</h1>
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

    <div class="filter">
      <select name="radio" id="radio" v-model="filter.radio">
        <option value="radio-ice">radio ice</option>
        <option value="test 1">test 1</option>
        <option value="test 2">test 2</option>
        <option value="test 3">test 3</option>
      </select>
      <input type="date" name="date" id="date" v-model="filter.date">
      <div class="setTime">
        <input type="time" name="timeStart" id="timeStart" v-model="filter.timeStart">
        &mdash;
        <input type="time" name="timeStop" id="timeStop" v-model="filter.timeEnd">
      </div>

      <button class="show" @click.prevent="filterSort()">показать</button>
    </div>

    <div class="List">
      <div class="listRadio">
        <div v-for="(item, index) in filterList" :key="item.id" class="itemTrack" :class="sortBoxClass(item.id)" >
          <svg  class="delimeterTrackList" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30.5" cy="29.5" r="2.5" fill="black"/>
            <line x1="4.37114e-08" y1="29.5" x2="60" y2="29.5" stroke="black"/>
            <line x1="10" y1="19.5" x2="50" y2="19.5" stroke="black"/>
            <line x1="10" y1="39.5" x2="50" y2="39.5" stroke="black"/>
            <path d="M20 10L40 10" stroke="black"/>
            <path d="M20 50L40 50" stroke="black"/>
            <line x1="30.5" y1="2.18557e-08" x2="30.5" y2="60" stroke="black"/>
          </svg>

          <svg class="delimeterTrackListMobile" width="29" height="60" viewBox="0 0 29 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="60">
            <rect width="29" height="60" fill="white"/>
            </mask>
            <g mask="url(#mask0)">
            <circle cx="-0.5" cy="29.5" r="2.5" fill="black"/>
            <line x1="-31" y1="29.5" x2="29" y2="29.5" stroke="black"/>
            <line x1="-21" y1="19.5" x2="19" y2="19.5" stroke="black"/>
            <line x1="-21" y1="39.5" x2="19" y2="39.5" stroke="black"/>
            <path d="M-11 10L9 10" stroke="black"/>
            <path d="M-11 50L9 50" stroke="black"/>
            </g>
          </svg>

          <div class="timeTrack">{{ item.time }}</div>
          <div class="imgTrack">
            <svg  class="img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z" fill="black"/>
            </svg>

            <GetImages :img="`voice/${item.img}`" class="images"/>
          </div>
          <a class="youTubeLinck" target="_blank" rel="noopener" :href="item.youTubeLinck">
            <svg height="70px" class="imgYoutobe" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="70px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="形状_1_3_" style="enable-background:new    ;">
                <g id="形状_1">
                  <g>
                    <path d="M58.442,241.547l-13.048-48.208H26.053     c3.873,11.386,7.907,22.816,11.784,34.205c5.895,17.121,9.57,30.03,11.236,38.833v49.719h18.384v-49.719l22.111-73.038H70.982     L58.442,241.547z M183.409,224.619v69.916c-3.672,5.191-7.15,7.759-10.464,7.759c-2.225,0-3.526-1.314-3.892-3.88     c-0.2-0.542-0.2-2.56-0.2-6.444v-67.351h-16.523v72.337c0,6.457,0.556,10.828,1.471,13.601c1.653,4.633,5.336,6.799,10.671,6.799     c6.046,0,12.34-3.674,18.937-11.237v9.978h16.578v-91.477H183.409z M114.204,223.519c-8.257,0-14.711,3.119-19.292,9.375     c-3.526,4.622-5.193,11.771-5.193,21.549v32.037c0,9.722,1.667,16.934,5.193,21.511c4.582,6.238,11.036,9.365,19.292,9.365     c8.306,0,14.756-3.127,19.341-9.365c3.475-4.577,5.144-11.789,5.144-21.511v-32.037c0-9.777-1.669-16.927-5.144-21.549     C128.96,226.638,122.51,223.519,114.204,223.519z M122.111,289.598c0,8.465-2.563,12.696-7.907,12.696     c-5.344,0-7.91-4.231-7.91-12.696v-38.481c0-8.463,2.566-12.684,7.91-12.684c5.345,0,7.907,4.221,7.907,12.684V289.598z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#1B1B1B;"/>
                  </g>
                </g>
              </g>
              <g id="形状_1_2_" style="enable-background:new    ;">
                <g id="形状_1_1_">
                  <g>
                    <path d="M441.2,239.52c-5.486,0-8.222,4.178-8.222,12.55v8.384h16.4     v-8.384C449.379,243.697,446.63,239.52,441.2,239.52z M380.336,239.52c-2.696,0-5.432,1.283-8.177,3.989v55.172     c2.745,2.742,5.48,4.036,8.177,4.036c4.731,0,7.14-4.036,7.14-12.214v-38.628C387.476,243.697,385.067,239.52,380.336,239.52z      M481.299,191.571c-3.319-14.435-15.128-25.081-29.337-26.669c-31.583-3.528-63.526-3.762-95.37-3.762     c-2.088,0-4.178,0.002-6.265,0.002c-2.088,0-4.175-0.002-6.264-0.002c-31.843,0-63.789,0.233-95.37,3.762     c-14.21,1.588-26.012,12.234-29.332,26.669c-4.724,20.558-4.779,42.993-4.779,64.158v1.519     c0.002,20.719,0.113,42.569,4.725,62.638c3.32,14.434,15.121,25.08,29.331,26.667c31.618,3.534,63.595,3.763,95.475,3.763     c2.053,0,4.108,0,6.159-0.002c2.054,0.002,4.104,0.002,6.158,0.002c31.879,0,63.86-0.229,95.476-3.763     c14.21-1.587,26.018-12.233,29.338-26.667c4.657-20.268,4.75-42.359,4.752-63.261v-0.896     C485.996,234.564,486.023,212.129,481.299,191.571z M292,211.995h-19.642V316.38H254.11V211.995h-19.292v-17.104H292V211.995z      M341.56,316.38h-16.406v-9.874c-6.52,7.479-12.716,11.12-18.746,11.12c-5.284,0-8.927-2.146-10.568-6.729     c-0.893-2.742-1.444-7.073-1.444-13.462v-71.583h16.396v66.65c0,3.844,0,5.838,0.152,6.38c0.399,2.541,1.647,3.835,3.839,3.835     c3.292,0,6.73-2.534,10.371-7.672v-69.193h16.406V316.38z M403.87,289.207c0,8.378-0.56,14.41-1.646,18.248     c-2.2,6.729-6.584,10.171-13.113,10.171c-5.831,0-11.471-3.24-16.951-10.021v8.774H355.76V194.891h16.399v39.68     c5.296-6.518,10.919-9.813,16.951-9.813c6.529,0,10.913,3.436,13.113,10.215c1.087,3.643,1.646,9.626,1.646,18.192V289.207z      M465.771,274.104h-32.793v16.053c0,8.378,2.735,12.561,8.37,12.561c4.044,0,6.392-2.195,7.329-6.584     c0.149-0.894,0.36-4.529,0.36-11.108h16.733v2.396c0,5.276-0.195,8.925-0.349,10.561c-0.547,3.643-1.835,6.931-3.833,9.832     c-4.534,6.572-11.264,9.813-19.83,9.813c-8.58,0-15.11-3.088-19.853-9.272c-3.486-4.53-5.274-11.667-5.274-21.286v-31.702     c0-9.674,1.59-16.751,5.073-21.329c4.744-6.196,11.272-9.279,19.643-9.279c8.229,0,14.76,3.083,19.354,9.279     c3.435,4.578,5.069,11.655,5.069,21.329V274.104z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#A62423;"/>
                  </g>
                </g>
              </g>
            </svg>
          </a>
          <div :class="index%2 ? 'soundTrackR' : 'soundTrackL'">
            <div class="author">{{ item.author }}</div>
            <div class="delimiters" v-html="item.delimiters"></div>
            <div class="track">{{ item.track }}</div>
          </div>
        </div>
      </div>
    </div>

    <Widget/>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'
import Widget from '@/components/widget.vue'
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
      playList: [],
      swiper: [],
      swiperOption: {},
      filter:{
        radio: 'radio-ice',
        date: '',
        timeStart: '16:00',
        timeEnd: '17:00',
      },
    }
  },
  computed: {
    ...mapGetters({
      list: 'PlayList/GET_PLAY_LIST',
      swip: 'PlayList/GET_SWIPER',
      swiperOP: 'PlayList/GET_SWIPER_OP',
    }),
    filterList(){
      let tmp = [],
        date = new Date(),
        filterTimeS = this.filter.timeStart.split(':'),
        filterTimeE = this.filter.timeEnd.split(':'),
        filterTime = {
          start: {h: date.setHours(Number(filterTimeS[0])), m: date.setMinutes(Number(filterTimeS[1])) },
          end: {h: date.setHours(Number(filterTimeE[0])), m: date.setMinutes(Number(filterTimeE[1])) },
        }
      
      this.playList.map((item, i) => {
        var chunks = item.time.split(':'),
            date = new Date(),
            trackTime = { h: date.setHours(Number(chunks[0])), m: date.setMinutes(Number(chunks[1])) };
        
        if(item.radio === this.filter.radio && item.date === this.filter.date && (trackTime.h > filterTime.start.h && trackTime.h <= filterTime.end.h) ){
          tmp.push(item)
        }
      })

      return tmp
    },
  },
  methods: {
    sortBoxClass(index){
      return index%2 ? 'right' : 'left'
    },
    filterSort(){
      console.log( 'filter', this.filter )
    },
  },
  watch: {
    list(newD, lastD){
      this.playList = newD
    },
    swip(newD, lastD){
      this.swiper = newD
    },
    swiperOP(newD, lastD){
      this.swiperOption = newD
    },
  },
  mounted() {
    const date = new Date()
    const dateTimeFormat = new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute}] = dateTimeFormat.formatToParts(date)

    this.filter.timeStart = `${hour}:${minute}`
    this.filter.timeEnd = `${Number(hour)+1}:${minute}`
    this.filter.date = `${year}-${day}-${month}`
  },
  created(){
    this.playList = this.list
    this.swiper = this.swip
    this.swiperOption = this.swiperOP
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/PlayList.scss";
</style>