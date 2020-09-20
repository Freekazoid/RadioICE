<template>
  <div class="life">
    <div class="title">
      <div class="a">
        <hr>
        <h1>ICE Новости</h1>
      </div>
      <div class="b">
      </div>
    </div>

    <div class="wrapper">
        <nav>
          <li class="titleNews" v-for="item in newsLinck" :key="item.id" v-on:click="toggle(item)" :class="{'active': item.active}">
            {{ item.title }}
          </li>
        </nav>
      <div class="main">
        <div class="news" v-if="readMore" :class="{newsMore: readMore}">
          <div class="content">
            <div class="images">
              <GetImages :img="`news/${onliRead.img}`"/>
              <div class="date">{{ onliRead.date }}</div>
            </div>
            <div class="title">
              {{ onliRead.title }}
            </div>
            {{ onliRead.content }}
          </div>
        </div>

        <div class="news" v-else v-for="item in filterN" :key="item.id">
          <div class="images">
            <GetImages :img="`news/${item.img}`"/>
            <div class="date">{{ item.date }}</div>
          </div>
          <div class="box">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="content">
              {{ item.content }}
            </div>
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
      menu: 'Life/GET_MENU',
      news: 'Life/GET_NEWS',
    }),
  },
  methods: {
    moreNews(item){
      this.readMore = !this.readMore
      this.onliRead = item
      document.querySelector('nav').scrollIntoView({block: "end", behavior: "smooth"})
    },
    filterNews(filterCategory = 'news'){
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
    menu(newD, lastD){
      this.newsLinck = newD
    },
    news(newD, lastD){
      this.dataNews = newD
    },
  },
  created(){
    this.newsLinck = this.menu
    this.dataNews = this.news
  },
  mounted() {
    this.filterNews()
  } 
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Life.scss";
</style>
