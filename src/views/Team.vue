<template>
  <div class="team">

    <div class="title">
      <div class="a">
        <hr>
        <h1 @click.prevent="moreInfo()">команда</h1>
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

    <div class="wrapper">
      <div class="infoRadio" v-if="!moreInfos">
        {{ teamTitle }}
      </div>

      <div class="newIemsList" v-if="!moreInfos">
        <div v-for="item in commandFilter" :key="item.id" class="imagesBlock" :class="item.hover ? 'activeNewItems' : ''" @mouseenter="activeSlideNewItems(item)">
          <div class="imagesBackSelect"></div>
          <div class="images"><GetImages :img="`commands/${item.img}`"  class="img"/></div>
          <div class="content" @click.prevent="moreInfo(item)">
            <p class="name">{{item.name}}</p>
            <p class="position">{{item.position}}</p>
            <p class="email">{{item.email}}</p>
          </div>
        </div>
      </div>

      <div class="newIemsMore" v-else>
        <div class="content">
          <div class="box">
            <div class="images">
              <GetImages :img="`commands/${onliRead.img}`" class="imag" />
            </div>
            <div class="name">
              {{ onliRead.name }}
            </div>
            <div class="position">
              {{onliRead.position}}
            </div>
            <div class="email">
              {{onliRead.email}}
            </div>
          </div>
          <HTMLContent v-html="onliRead.content"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'
import HTMLContent from '@/components/HTMLContent.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    GetImages,
    HTMLContent
  },
  data() {
    return {
      moreInfos: false,
      onliRead: {},
      teamTitle: '',
      command: [],
      swiper: [],
      swiperOption: {},
      passwordEnter: '',
    }
  },
  computed: {
    ...mapGetters({
      title: 'Team/GET_TITLE',
      team: 'Team/GET_TEAM',
      swip: 'Team/GET_SWIPER',
      swiperOP: 'Team/GET_SWIPER_OP',
      GET_PASSWORD: 'Admin/GET_PASSWORD',
      GET_LOGGED: 'GET_LOGGED',
    }),
    commandFilter(){
      this.command.sort(this.filter)
      return this.command
    },
  },
  methods: {
    ...mapMutations({
      SET_LOGGED: 'SET_LOGGED',
    }),
    filter(a, b){
      if (a.id < b.id)
        return -1;
      if (a.id > b.id)
        return 1;
      return 0;
    },
    moreInfo(item=false){
      if(item !== false ){
        this.moreInfos = !this.moreInfos
        this.onliRead = item
        this.passwordSerch(item.password)
        this.$router.push(`/team/${this.onliRead.name}`).catch(()=>{})
        //document.querySelector('.infoRadio').scrollIntoView({block: "end", behavior: "smooth"})
      } else {
        if(typeof this.$route.params.name === 'string')
          this.$router.push('/team')
        
        this.moreInfos = false
        this.onliRead = {}
      }
      document.querySelector('.topMenu').scrollIntoView()
    },
    keyPres(e){
      //console.log(e.key)
      setTimeout(() => window.removeEventListener('keypress', this.keyPres, false), 20000)
      if(e.key === 'Enter'){
        if(this.passwordEnter === this.GET_PASSWORD){
          this.SET_LOGGED(true)
          this.$router.push('/admin')
        }
        
        this.passwordEnter = ''
      } else
        this.passwordEnter += e.key
    },
    passwordSerch(pass){
      if(typeof(window.keypress) === 'undefined')
        this.passwordEnter = ''

      if(pass)
        window.addEventListener('keypress', this.keyPres, false)
    },
    activeSlideNewItems(data){
      this.command.forEach(item => {
        item.hover = (data.id === item.id ? true : false)
      });
    },
  },
  watch: {
    $route(to, from) {
      if(to.params.name === undefined){
        this.moreInfos = false
        this.onliRead = {}
      }
    },
    title(newD, lastD){
      this.teamTitle = newD
    },
    team(newD, lastD){
      this.command = newD
    },
    swip(newD, lastD){
      this.swiper = newD
    },
    swiperOP(newD, lastD){
      this.swiperOption = newD
    },
  },
  created(){
    this.teamTitle = this.title
    this.command = this.team
    this.swiper = this.swip
    this.swiperOption = this.swiperOP
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Team.scss";
</style>