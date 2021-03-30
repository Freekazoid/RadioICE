<template>
  <div class="programs">
    <div class="title">
      <div class="a" @click="morePrograms(false)">
        <hr>
        <h1>программы</h1>
      </div>
    </div>

    <div class="wrapper" v-if="!moreProgram">
      <div class="programInfo" v-for="item in programfilter" :key="item.id" :class="{programInfoHover: item.hover}">

        <div class="images">
          <GetImages :img="`program/${item.img}`" class="img"/>
        </div>

        <div class="infoApp" @click="morePrograms(item)" @mouseenter="programInfoHover(item)" @mouseleave="programInfoHover(item, 'live')">
          <h1>{{ item.title }}</h1>
          <div class="hosts">Ведущие: 
            <div v-for="(host, index) in item.hosts" :key="index" class="host">{{ host }}</div>
          </div>
          <div class="airs">
            в эфире
            <div v-for="(air, index) in item.airs" :key="index" class="air">{{ air }}</div>
          </div>
        </div>
      </div>
    </div>


    <div class="wrapper" v-else>
      <div class="content">
        <div class="images">
          <GetImages :img="`program/${oneProgram.img}`" class="img" />
          <div class="airsMobile">
            <div v-for="(air, index) in oneProgram.airs" :key="index" class="air">{{ air }}</div>
          </div>
        </div>
        <div class="boxInfo">
          <div class="title">
            {{ oneProgram.title }}
          </div>
          <div class="hosts">Ведущие: 
            <div v-for="(host, index) in oneProgram.hosts" :key="index" class="host">{{ host }}</div>
          </div>
          {{ oneProgram.content }}
          <div class="airs">
            в эфире
            <div v-for="(air, index) in oneProgram.airs" :key="index" class="air">{{ air }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'

export default {
  components:{
    GetImages,
  },
  data() {
    return {
      moreProgram: false,
      oneProgram: {},
      program: [],
    }
  },
  computed: {
    ...mapGetters({
      Programs: 'Programs/GET_PROGRAMS',
    }),
    programfilter(){
      this.program.sort(this.filter)
      return this.program
    }
  },
  methods: {
    filter(a, b){
      if (a.id < b.id)
        return -1;
      if (a.id > b.id)
        return 1;
      return 0;
    },
    programInfoHover(data, live=false){
      if(window.innerWidth >= 800)
        this.program.forEach(item => {
          !live?(item.hover = data.id === item.id?true:false):item.hover = false
        })
    },
    morePrograms(data){
      this.moreProgram = !this.moreProgram
      if(data !== false){
        this.program.forEach(item => {
          item.active = data.id === item.id?true:false
        })
        this.oneProgram = data
        this.$router.push(`/programs/${this.oneProgram.title}`)
      } else {
        this.$router.push('/programs')
        this.oneProgram = {}
      }
      document.querySelector('.topMenu').scrollIntoView()
    },
  },
  watch: {
    $route(to, from) {
      if(to.params.name === undefined){
        this.moreProgram = false
        this.oneProgram = {}
      }
    },
    Programs(newD, lastD){
      this.program = newD
    }
  },
  created(){
    this.program = this.Programs
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/Programs.scss";
</style>