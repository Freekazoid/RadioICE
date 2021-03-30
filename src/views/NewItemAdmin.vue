<template>
  <div class="NewItemAdmin">
    <h1 class="tytle">New Item</h1>
    <div class="newBoxItem">
      Создать новый: <button type="button" @click="createNewItem()">+</button>
    </div>
    <div v-for="(item, index) in newItems" :key="item.id" class="imagesBlock">
      <div class="number">
        <div class="num">№: 
          <input type="number" :value="item.id" min="1" @change="indexSet($event, item.id)">
        </div>
        <div class="delet">удалить: <button type="button" class="del" @click.prevent="delItem(item.id)">X</button></div>
      </div>

      <div class="rating">
        <button type="button" @click.prevent="ratingChange(index, 'up')">&#x25B2;</button>
        <div class="rat">{{ item.rating }}</div>
        <button type="button" @click.prevent="ratingChange(index, 'dovn')">&#x25BC;</button>
      </div>

      <upload class="boxPlay" :preImgShow="item" src="" @upload="uploadImg"/>
      
      <div class="content">
        <div class="author"><input type="text" v-model="item.artist"></div>
        <div class="delimiters" v-html="item.delimiters"></div>
        <div class="track"><input type="text" v-model="item.name"></div>
      </div>
      
      <div class="linck">
        <div class="timeRating">
          <uploadFile class="boxPlay" :preImgShow="item" @trackLinck="updateTrack" :src="item" />
        </div>
        <div class="timeRating"><input type="text" v-model="item.youTubeLinck"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import GetImages from '@/components/getImages.vue'
import upload from '@/components/upload.vue'
import uploadFile from '@/components/uploadFile.vue'

export default {
  components: {
    GetImages, upload, uploadFile,
  },
  data() {
    return {
      newItems: {},
      createItem: {
        id: 0,
        active: true,
        play: false,
        hover: false,
        rating: 1,
        name: "",
        artist: "",
        img: 'download.png',
        delimiters: '&mdash;',
        timeRating: 'newItem',
        youTubeLinck: 'https://youtube.com/'
      }
    }
  },
  computed: {
    ...mapGetters({
      GET_NEW_ITEMS: 'NewItem/GET_NEW_ITEMS',
    }),
  },
  methods: {
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_NEW_ITEM: 'Admin/SET_NEW_ITEM',
      _request: 'SOCKET_request',
    }),
    updateTrack(data){
      this.newItems.forEach((item, key) =>{
        ((item.id === data.id)? this.newItems[key]=data : null)
      })
    },
    indexSet(e, Id){
      let respons = false,
        serchId = Number(e.target.value),
        sortArr = this.bubbleSort(this.newItems)
      this.newItems.forEach(item => {
        (item.id === serchId && item.id !== Id ? (respons = true) : null);
      })
      if(respons){
        e.target.value = Id
      } else {
        this.newItems.find(item => {
          (item.id === Id ? (item.id = serchId) : null)
        })
      }
    },
    uploadImg(data){
      this.SET_NEW_ITEM({newItems: data})
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
      let arr = this.newItems,
        sortArr = this.bubbleSort(this.newItems)
      this.createItem.id = (sortArr[sortArr.length-1].id+1)
      let tmp = this.createItem
      arr.unshift(tmp)
      this.newItems = arr
    },
    delItem(Id){
      let data = this.newItems.filter(a => a.id != Id)
      this.newItems = data
      this.SET_NEW_ITEM({newItems: data})
    },
    ratingChange(Id, param){
      this.newItems[Id].rating = (param === 'up'? (parseInt(this.newItems[Id].rating)+1) : (parseInt(this.newItems[Id].rating)-1))
    },
  },
  watch: {
    newItems: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_NEW_ITEM({newItems: newD})
      },
      deep: true
    },
  },
  created() {
    this.newItems = this.GET_NEW_ITEMS
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/NewItemAdmin.scss";
</style>