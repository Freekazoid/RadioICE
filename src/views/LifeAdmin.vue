<template>
  <div class="LifeAdmin">
    <h1 class="tytle">Life</h1>

    <div class="newBoxItem">
      Создать категорию: <button type="button" @click="createNewMenu()">+</button>
      Создать новость: <button type="button" @click="createNewNews()">+</button>
    </div>

    <div class="boxCategory">
      <div class="titleNews" v-for="(item, index) in menuItem" :key="item.id" >
        <div class="num">№: 
          <input type="number" :value="item.id" min="1" @change="indexSets($event, item.id)">
        </div>
        <fieldset>
          <legend>категория:</legend>
          <input type="text" v-model="item.category" />
        </fieldset>
        <fieldset>
          <legend>заголовок:</legend>
          <input type="text" v-model="item.title" />
        </fieldset>
        <label>удалить: <button class="del" type="button" title="Delete this news" @click.prevent="DeleteCategory(index)">X</button></label>
      </div>
    </div>

    <div class="news" v-for="(item, index) in newsItem" :key="item.id">
      <div class="box">
        <upload :preImgShow="item" src="news/" />
        <div class="info">
          <div class="num">№: 
            <input type="number" :value="item.id" min="1" @change="indexSet($event, item.id)">
          </div>
          <label class="category">Категория:
            <select v-model="item.category">
              <option v-for="ite in menuItem" :key="ite.id" :value="ite.category">
                {{ ite.category }}
              </option>
            </select>
          </label>
          <label class="date">Дата Н:
            <input type="text" v-model="item.dateStart" />
          </label>
          <label class="date">Дата О:
            <input type="text" v-model="item.dateEnd" />
          </label>
          <label class="title">Заголовок:
            <input type="text" v-model="item.title" />
          </label>
        </div>

        <label>
          удалить:
          <button class="del" type="button" title="Delete this news" @click.prevent="DeleteNews(index)">X</button>
        </label>
        
      </div>
      <label class="content">content:
        <textarea cols="80" rows="10" v-model="item.content"></textarea>
      </label>
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
      newsItem: [],
      menuItem: [],
      cteateNews: {
        id: 0,
        date: '',
        category: 'news',
        img: 'download.png',
        title: '',
        content: 'this context new news',
      },
      createMenu: {
        id: 0,
        title: '',
        category: '',
        active: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      GET_MENU: 'Life/GET_MENU',
      GET_NEWS: 'Life/GET_NEWS',
    }),
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_LIFE: 'Admin/SET_LIFE'
    }),
    indexSets(e, Id){
      let respons = false,
        serchId = Number(e.target.value),
        sortArr = this.bubbleSort(this.menuItem)
      this.menuItem.forEach(item => {
        (item.id === serchId && item.id !== Id ? (respons = true) : null);
      })
      if(respons){
        e.target.value = Id
      } else {
        this.menuItem.find(item => {
          (item.id === Id ? (item.id = serchId) : null)
        })
      }
    },
    indexSet(e, Id){
      let respons = false,
        serchId = Number(e.target.value),
        sortArr = this.bubbleSort(this.newsItem)
      this.newsItem.forEach(item => {
        (item.id === serchId && item.id !== Id ? (respons = true) : null);
      })
      if(respons){
        e.target.value = Id
      } else {
        this.newsItem.find(item => {
          (item.id === Id ? (item.id = serchId) : null)
        })
      }
    },
    DeleteCategory(index){
      this.menuItem.splice(index, 1)
    },
    DeleteNews(index){
      this.newsItem.splice(index, 1)
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
    createNewMenu(){
      let arr = this.menuItem,
        sortArr = this.bubbleSort(this.menuItem)
      this.createMenu.id = (sortArr[sortArr.length-1].id+1)
      let tmp = this.createMenu
      arr.unshift(tmp)
      this.menuItem = arr
    },
    createNewNews(){
      let arr = this.newsItem,
        sortArr = this.bubbleSort(this.newsItem)
      this.cteateNews.id = (sortArr[sortArr.length-1].id+1)
      let tmp = this.cteateNews
      arr.unshift(tmp)
      this.newsItem = arr
    },
  },
  watch: {
    menuItem: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_LIFE({newsLinck: newD})
      },
      deep: true
    },
    newsItem: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_LIFE({dataNews: newD})
      },
      deep: true
    },
  },
  created(){
    this.menuItem = this.GET_MENU
    this.newsItem = this.GET_NEWS
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/LifeAdmin.scss";
</style> 