<template>
  <div class="NewItemAdmin">
    <h1 class="tytle">New Item</h1>
    <div class="newBoxItem">
      Создать новый: <button type="button" @click="createNewItem()">+</button>
    </div>
    <div v-for="(item, index) in newItems" :key="item.id" class="imagesBlock">
      <div class="number">
        <div class="num">№: <input type="number" v-model="item.id" min="1" @change="indexStop($event)"></div>
        <div class="act">вкл: <input type="checkbox" :checked="item.active"></div>
        <div class="delet">удалить: <button type="button" class="del" @click.prevent="delItem($event, index)">X</button></div>
      </div>

      <div class="rating">
        <button type="button" @click.prevent="ratingChange(index, 'up')">&#x25B2;</button>
        <div class="rat">{{ item.rating }}</div>
        <button type="button" @click.prevent="ratingChange(index, 'dovn')">&#x25BC;</button>
      </div>

      <upload class="boxPlay" :preImgShow="item" :src="'newItams'" @upload="uploadImg"/>
      
      <div class="content">
        <div class="author"><input type="text" v-model="item.author"></div>
        <div class="delimiters" v-html="item.delimiters"></div>
        <div class="track"><input type="text" v-model="item.track"></div>
      </div>
      
      <div class="linck">
        <div class="timeRating"><input type="text" v-model="item.timeRating"></div>
        <div class="timeRating"><input type="text" v-model="item.youTubeLinck"></div>
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
      newItems: {},
      createItem: {
        id: 0,
        active: true,
        play: false,
        hover: false,
        rating: 1,
        img: 'download.png',
        author: '',
        delimiters: '&mdash;',
        track: '',
        timeRating: '1 day',
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
      SET_NEW_ITEM: 'Admin/SET_NEW_ITEM'
    }),
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
    indexStop(e){
      this.newItems.forEach(item => {
        ((item.id !== parseInt(e.target.value))? true : false)
      })
    },
    delItem(Id){
      this.GET_NEW_ITEMS.splice(Id, 1)
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
.NewItemAdmin{
  width: calc(100% - 10px);
  height: 100%;
  padding: 0 10px 0 0;

  &>.newBoxItem{
    padding: 0 0 20px 0;
    &>button{
      cursor: pointer;
    }
  }
  
  .tytle{
    color: tan;
    font-size: 30px;
    font-family: Tahoma;
    text-transform: capitalize;
    padding: 0 0 20px;
    user-select: none;
  }
  .imagesBlock{
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    margin: 0 0 12px;
    border-top: 2px solid;
    border-bottom: 2px solid;
    border-radius: 10px;
    max-width: 1000px;
    min-width: 550px;
    padding: 0 6px;

    input{
      border: 0.1px solid;
    }
    &>.number{
      width: 70px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      &>.num{
        &>input[type="number"]{
          width: 32px;
        }
      }
      &>.delet{
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;

        .del{
          width: 24px;
          height: 24px;
          background: brown;
          color: chartreuse;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          cursor: pointer;
        }
      }
    }
    &>.rating{
      &>.rat{
        text-align: center;
      }
      &>button{
        cursor: pointer;
      }
    }
    &>.boxPlay{
      width: 70px;
    }
    &>.content{
      max-width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &>.delimiters{
        margin: 0 4px;
      }
    }
    &>.linck{
      max-width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 60px;
    }
  }
}
</style>