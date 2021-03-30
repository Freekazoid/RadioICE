<template>
  <div class="videoAdmin">
    <h1 class="tytle">video</h1>

    <div class="newBoxItem">
      Добавить видео: <button type="button" @click="createNewItem()">+</button>
    </div>
    <div class="videoList">
      <div class="video" v-for="(item, index) in listVideo" :key="item.id">
        <div class="num">№: 
          <input type="number" :value="item.id" min="1" @change="indexSet($event, item.id)">
        </div>
        <label class="name">Название:
          <input type="text" v-model="item.name" />
        </label>
        <label class="linck">Ссылка на youtube:
          <input type="text" v-model="item.linck" />
        </label>
        <label>удалить: <button class="del" type="button" title="Delete this video" @click.prevent="Delete(index)">X</button></label>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'
import upload from '@/components/upload.vue'

export default {
  components: {
    GetImages, upload,
  },
  data() {
    return {
      listVideo: [],
      createVideo: {
        id: 0,
        name: '',
        linck: 'https://youtube.com/',
        play: false
      }
    }
  },
  computed: {
    ...mapGetters({
      GET_VIDEO: 'Video/GET_VIDEO',
      GET_MENU_ADMIN: 'Admin/GET_MENU_ADMIN',
    }),
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_VIDEO: 'Admin/SET_VIDEO'
    }),
    indexSet(e, Id){
      let respons = false,
        serchId = Number(e.target.value),
        sortArr = this.bubbleSort(this.listVideo)
      this.listVideo.forEach(item => {
        (item.id === serchId && item.id !== Id ? (respons = true) : null);
      })
      if(respons){
        e.target.value = Id
      } else {
        this.listVideo.find(item => {
          (item.id === Id ? (item.id = serchId) : null)
        })
      }
    },
    bubbleSort(arr){
      for (let i = 0, endI = arr.length - 1; i < endI; i++) {
        let wasSwap = false;
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
          if (arr[j].id > arr[j + 1].id) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            wasSwap = true;
          }
        }
        if (!wasSwap) break;
      }
      return arr;
    },
    createNewItem(){
      let arr = this.listVideo,
        sortArr = this.bubbleSort(this.listVideo)
      this.createVideo.id = (sortArr[sortArr.length-1].id+1)
      let tmp = this.createVideo
      arr.unshift(tmp)
      this.listVideo = arr
    },
    Delete(index){
      this.listVideo.splice(index, 1)
    },
  },
  watch: {
    listVideo: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_VIDEO({listVideo: newD})
      },
      deep: true
    },
  },
  created(){
    this.listVideo = this.GET_VIDEO
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/VideoAdmin.scss";
</style>