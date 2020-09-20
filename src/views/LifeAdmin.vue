<template>
  <div class="LifeAdmin">
    <h1 class="tytle">Life</h1>

    <div class="newBoxItem">
      Создать категорию: <button type="button" @click="createNewMenu()">+</button>
      Создать новость: <button type="button" @click="createNewNews()">+</button>
    </div>

    <div class="boxCategory">
      <div class="titleNews" v-for="(item, index) in menuItem" :key="item.id" >
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
        <upload :preImgShow="item" :src="'news'" />
        <div class="info">
          <label class="category">category:
            <select v-model="item.category">
              <option v-for="ite in menuItem" :key="ite.id" :value="ite.category">
                {{ ite.category }}
              </option>
            </select>
          </label>
          <label class="date">date:
            <input type="text" v-model="item.date" />
          </label>
          <label class="title">title:
            <input type="text" v-model="item.title" />
          </label>
        </div>

        <label>
          delete news:
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
.LifeAdmin{
  width: 100%;
  height: 100%;
  
  input{
    border: 0.1px solid;
  }
  button{
    cursor: pointer;
  }
  .tytle{
    color: tan;
    font-size: 30px;
    font-family: Tahoma;
    text-transform: capitalize;
    padding: 0 0 20px;
    user-select: none;
  }
  .news{
    width: calc(100% - 20px);
    padding: 4px 10px;
    border-top: 2px solid;
    border-bottom: 2px solid;
    border-radius: 10px;
    margin: 0 0 12px;
    justify-content: space-around;
    display: flex;
    flex-direction: column;

    &>.box{
      display: flex;
      justify-content: space-between;
      align-items: center;

      &>label{
        &>.del{
          width: 24px;
          height: 24px;
          background: brown;
          color: chartreuse;
          border-radius: 50%;
          margin: 0;
          cursor: pointer;
        }
      }

      &>.info{
        display: flex;
        flex-direction: column;
        width: 250px;
        align-items: flex-end;
      }
    }
    &>.content{
      width: 100%;
      display: flex;
      height: 170px;
      flex-direction: column;
    }

  }

  .boxCategory{
    display: flex;
    width: calc(100% - 20px);
    justify-content: space-between;
    flex-flow: wrap row;
    padding: 12px 10px;
    
    .titleNews{
      height: 110px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 5px 0;

      &>label{
        &>.del{
          width: 24px;
          height: 24px;
          background: brown;
          color: chartreuse;
          border-radius: 50%;
          margin: 0;
          cursor: pointer;
        }
      }

      fieldset {
        border: 1.5px solid #CCA383;
        padding: 0 4px 4px 4px;

      }
    }
  }
}
</style>