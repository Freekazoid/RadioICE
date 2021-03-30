<template>
  <div class="life">
    <div class="title">
      <div class="a" @click="moreNews(false)">
        <hr>
        <h1>ICE Новости</h1>
      </div>
      <div class="b">
      </div>
    </div>

    <div class="wrapper">
      <nav>
        <li class="titleNews" v-for="item in newsLinckFilter" :key="item.id" v-on:click="toggle(item)" :class="{'active': item.active}">
          {{ item.title }}
        </li>
      </nav>

      <div class="main">
        <div class="news" v-if="readMore" :class="{newsMore: readMore}">
          <div class="content">
            <div class="images">
              <GetImages :img="onliRead.img"/>
              <div class="date">{{ onliRead.date }}</div>
            </div>
            <div class="title">
              {{ onliRead.title }}
            </div>
            <div v-html="onliRead.content"> </div>
          </div>
        </div>

        <div class="news" v-else v-for="item in newsFilter" :key="item.id">
          <div class="images">
            <GetImages :img="item.img"/>
          </div>
          <div class="box">
            <div class="title">
              {{ item.title }}
              <div class="date">{{ dataStrind(item.dateStart) }}</div>
            </div>
            <div class="content" v-html="item.content"></div>
            <div class="more" @click.prevent="moreNews(item)">
            Читать дальше
            </div>
          </div>
        </div>
      </div>

      <Widget/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import Widget from '@/components/widget.vue'
import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages,
    Widget,
  },
  data (){
    return {
      readMore: false,
      onliRead: {},
      filterN: [],
      newsLinck: [],
      dataNews: [],
    }
  },
  computed: {
    ...mapGetters({
      GET_MENU: 'Life/GET_MENU',
      GET_NEWS: 'Life/GET_NEWS',
    }),
    newsLinckFilter(){
      return this.newsLinck.sort(this.filter)
    },
    newsFilter(){
      let arr = this.filterN.filter(item => {
        let now = new Date(),
          today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()).valueOf(),
          dateS = this.convertDate(item.dateStart),
          dateE = this.convertDate(item.dateEnd),
          start = new Date(dateS.yar, dateS.mounth, dateS.day, dateS.hour, dateS.min, dateS.sec).valueOf(),
          end = new Date(dateE.yar, dateE.mounth, dateE.day, dateE.hour, dateE.min, dateE.sec).valueOf()

        if (today >= start && today <= end)
            return item
      })      
      arr.sort(this.filter)
      return arr
    },
  },
  methods: {
    convertDate(dates){
      let date = dates.split(' '),
        dat = date[0].split('.'),
        tim = date[1].split(':'),
        day = Number(dat[0]),
        mounth = (Number(dat[1])-1),
        yar = Number(dat[2]),
        hour = Number(tim[0]),
        min = Number(tim[1]),
        sec = Number(tim[2])
        
      return {day: day, mounth: mounth, yar: yar, hour: hour, min: min, sec: sec}
    },
    dataStrind(dates){
      if( typeof dates !== 'undefined'){
        let date = this.convertDate(dates),
          mounthString = new Date(date.yar, date.mounth, date.day).toLocaleString('ru', { month: 'long' })

        return `${date.day} ${mounthString}`
      }
    },
    filter(a, b){
      if (a.id < b.id)
        return -1;
      if (a.id > b.id)
        return 1;
      return 0;
    },
    moreNews(data){
      this.readMore = !this.readMore
      if(data !== false){
        this.onliRead = data
        document.querySelector('nav').scrollIntoView({block: "end", behavior: "smooth"})
        this.$router.push(`/life/${this.onliRead.title}`)
      } else {
        this.$router.push('/life')
        this.onliRead = {}
      }
    },
    filterNews(filterCategory = "radioStation"){
      let tmp = []
      this.filterN = []

      this.dataNews.find((item, i, array) => {
        if( !tmp.includes(item.category) && filterCategory === 'news' ){
          tmp.push(item.category)
          this.filterN.push(item)
        } else if( filterCategory === item.category )
          this.filterN.push(item)
      })
    },
    toggle(data){
      this.filterNews(data.category)
      this.newsLinck.forEach(item => item.active = (item.id === data.id? true : false))
      this.readMore = false
    }
  },
  watch: {
    $route(to, from) {
      if(to.params.name === undefined){
        this.readMore = false
        this.onliRead = {}
      }
    },
    GET_MENU(newD, lastD){
      this.newsLinck = newD
    },
    GET_NEWS(newD, lastD){
      this.dataNews = newD
    },
  },
  created(){
    this.newsLinck = this.GET_MENU
    this.dataNews = this.GET_NEWS
  },
  mounted() {
    this.filterNews()
  } 
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Life.scss";
</style>
