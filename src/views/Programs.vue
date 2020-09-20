<template>
  <div class="programs">
    <div class="title">
      <div class="a" @click="morePrograms(false)">
        <hr>
        <h1>программы</h1>
      </div>
    </div>

    <div class="wrapper" v-if="!Object.keys(moreProgram).length">
      <div class="programInfo" v-for="item in program" :key="item.id" :class="{programInfoHover: item.hover}">

        <div class="images">
          <GetImages :img="`program/${item.img}`"/>
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
          <GetImages :img="`program/${moreProgram.img}`" class="images" />
          <div class="airsMobile">
            <div v-for="(air, index) in moreProgram.airs" :key="index" class="air">{{ air }}</div>
          </div>
        </div>
        <div class="boxInfo">
          <div class="title">
            {{ moreProgram.title }}
          </div>
          <div class="hosts">Ведущие: 
            <div v-for="(host, index) in moreProgram.hosts" :key="index" class="host">{{ host }}</div>
          </div>
          {{ moreProgram.content }}
          <div class="airs">
            в эфире
            <div v-for="(air, index) in moreProgram.airs" :key="index" class="air">{{ air }}</div>
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
      moreProgram: {},
      program: [],
    }
  },
  computed: {
    ...mapGetters({
      Programs: 'Programs/GET_PROGRAMS',
    }),
  },
  methods: {
    programInfoHover(data, live=false){
      if(window.innerWidth >= 800)
        this.program.forEach(item => {
          !live?(item.hover = data.id === item.id?true:false):item.hover = false
        })
    },
    morePrograms(data){
      if(data !== false){
        this.program.forEach(item => {
          item.active = data.id === item.id?true:false
        })
        this.moreProgram = data
      } else
        this.moreProgram = {}
    },
  },
  watch: {
    Programs(newD, lastD){
      this.program = newD
    }
  },
  created(){
    this.program = this.Programs
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Programs.scss";
</style>