<template>
  <div class="liveAdmin">
    <h1 class="tytle">Карточки треков эфира</h1>

    <fieldset class="list">
      <legend class="option">
        <div class="sett">
          <div>new: <button class="newLive" @click="newLIve()"> + </button></div>

          <div>рейтинг: <input type="text" class="select" @change="changeFilter($event)" placeholder="рейтинг 5 | -5"></div>
          
          <div>
            <input type="text" placeholder="поиск по Имя | Артист | №" v-on:keyup.enter="search($event)"/>
            <div class="searchRes"></div>
          </div>
        </div>
      </legend>
      

      <div class="pajesNumb">
        <div class="boxNot" :class="{window: window}">Нет данных</div>
        <div class="listStream" v-for="(item, index) in listSteamInd" :key="index" :class="{active: activeIndex == index, window: !window}" @click="nextList(item, index)">{{ index+1 }}</div>
      </div>

      <div class="dataItemList" :class="{window: searchClass}">
        <div class="listOne ratingLine" v-for="(itemObj, index) in searchOne" :key="itemObj.id">
          <div class="number">
            <div class="num id">№: {{ itemObj.id }}
            </div>
            <div class="delet">удалить: <button type="button" class="del" @click.prevent="delItem($event, index)">X</button></div>
          </div>

          <label>Имя: <input type="text" name="name" v-model="itemObj.name" v-on:change="changeItem(itemObj)"></label>
          <label>Артист: <input type="text" name="artist" v-model="itemObj.artist" v-on:change="changeItem(itemObj)"></label>
          <label>время трека: <input type="text" name="duration" v-model="itemObj.duration" v-on:change="changeItem(itemObj)"></label>

          <label>Райтинг: <span>{{ itemObj.rating }}</span></label>
          <label>был в Эфире: 
            <span class="listPlay">
              <ul v-for="(item, index) in itemObj.time_live" :key="index">
                <li>{{item}}</li>
              </ul>
            </span>
          </label>
          <label>кол-во Звучаний: <span>{{itemObj.broadcasting}}</span></label>
          <label>Сколько в эфире: <span>{{itemObj.timerating}}</span></label>

          <label>Начало слежения: {{timeStr(itemObj.start_time)}} </label>
          <label>Конец слежения: {{timeStr(itemObj.end_time)}}</label>

          <div class="box">
            <label class="label">Аватар: 
              <upload class="boxPlay" :preImgShow="itemObj" src="" @upload="changeItem(itemObj)"/>
            </label>
          </div>
          <div class="box">
            <label class="label">Трек ссылка: 
              <uploadFile class="boxPlay" @trackLinck="changeItem" :src="itemObj" />
            </label>
          </div>
          <div class="box">
            <div class="clear" @click="hideVideo($event)">show video</div>
            <iframe style="display: none;" :title="itemObj.name" class="video" width="300" height="150" :src="itemObj.videoLinck" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <label class="label">Видео ссылка: 
              <input type="text" name="trackLinck" v-model="itemObj.videoLinck" v-on:change="changeItem(itemObj)">
            </label>
          </div>
        </div>
      </div>

      <div class="dataItemList" :class="{window: !window, window: !searchClass}">
        <div class="listOne ratingLine" v-for="(itemObj, index) in objItem" :key="itemObj.id">
          <div class="number">
            <div class="num id">№: {{ itemObj.id }}
            </div>
            <div class="delet">удалить: <button type="button" class="del" @click.prevent="delItem($event, index)">X</button></div>
          </div>

          <label>Имя: <input type="text" name="name" v-model="itemObj.name" v-on:change="changeItem(itemObj)"></label>
          <label>Артист: <input type="text" name="artist" v-model="itemObj.artist" v-on:change="changeItem(itemObj)"></label>
          <label>время трека: <input type="text" name="duration" v-model="itemObj.duration" v-on:change="changeItem(itemObj)"></label>

          <label :class="{saveHide: itemObj.save}">Райтинг: <span>{{ itemObj.rating }}</span></label>
          <label :class="{saveHide: itemObj.save}">был в Эфире: 
            <span class="listPlay">
              <ul v-for="(item, index) in itemObj.time_live" :key="index">
                <li>{{item}}</li>
              </ul>
            </span>
          </label>
          <label :class="{saveHide: itemObj.save}">кол-во Звучаний: <span>{{itemObj.broadcasting}}</span></label>
          <label :class="{saveHide: itemObj.save}">Сколько в эфире: <span>{{itemObj.timerating}}</span></label>

          <label>Начало слежения: {{timeStr(itemObj.start_time)}} </label>
          <label>Конец слежения: {{timeStr(itemObj.end_time)}}</label>

          <div class="box">
            <label class="label">Аватар: 
              <upload class="boxPlay" :preImgShow="itemObj" src="" @upload="changeItem(itemObj)"/>
            </label>
          </div>
          <div class="box">
            <label class="label">Трек ссылка: 
              <uploadFile class="boxPlay" @trackLinck="changeItem" :src="itemObj" />
            </label>
          </div>
          <div class="box">
            <div class="clear" :class="{saveHide: itemObj.save}" @click="hideVideo($event)">show video</div>
            <iframe style="display: none;" :class="{saveHide: itemObj.save}" :title="itemObj.name" class="video" width="300" height="150" :src="itemObj.videoLinck" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <label class="label">Видео ссылка: 
              <input type="text" name="trackLinck" v-model="itemObj.videoLinck" v-on:change="changeItem(itemObj)">
            </label>
          </div>
          <button class="save" :class="{saveHide: !itemObj.save}" @click="saveCreate(itemObj, $event)">Добавить поля</button>
        </div>
      </div>

    </fieldset>
  </div>
</template>

<script async src="https://cdn.iframe.ly/embed.js" charset="utf-8"></script>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import uploadFile from '@/components/uploadFile.vue'
import upload from '@/components/upload.vue'
import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages, upload, uploadFile,
  },
  data() {
    return {
      listSteam: [],
      allList: [],
      objItem: [],
      searchOne: [],
      activeIndex: 0,
      elementToPage: 50,
      selectRating: ['-99 99','-25 -30','-20 -25','-15 -20','-10 -15','-5 -10','-1 -5',' 0','1 5','5 10','10 15','15 20','20 25','25 30'],
      ratingSort: '-99 99',
      window: true,
      searchClass: true,
      clearError: false,
      createNewLive: {
        save: true,
        name: "",
        artist: "",
        duration: '00:03:00',
        rating: 0,
        timerating: 'newItem',
        time_live: "{}",
        start_time: new Date().toJSON().slice(0,19),//время слежения за рейтингом начало 
        end_time: new Date(new Date().setDate(new Date().getDate() + 21)).toJSON().slice(0,19),//время слежения за рейтингом конец +21 день
        broadcasting: 0,
        img: 'download.png',
        delimiters: '&mdash;',
        trackLinck: '',
        videoLinck: ''
      },
    }
  },
  computed: {
    ...mapGetters({
      GET_LIST_STREAM: 'Admin/GET_LIST_STREAM',
    }),
    listSteamInd(){
      let returnArr = [],
        arr = this.listSteam
      if(isNaN(this.listSteam)){
        for (let i = 0; i < Math.ceil(arr.length/this.elementToPage); i++)
            returnArr[i] = arr.slice((i*this.elementToPage), (i*this.elementToPage) + this.elementToPage)

        if(this.objItem.length === 0)
          this.objItem = returnArr[0]

        return returnArr
      }
    },
  },
  watch: {
    GET_LIST_STREAM: {
      handler(newD, lastD) {
        if(newD.length != lastD.length){
          this.listSteam = newD
          this.allList = newD
        }
          
      },
      deep: true
    },
  },
  methods:{
    // ...mapActions({
    //   loader: 'preLoader/loader',
    // }),
    ...mapMutations({
      SET_LIST_STREAM: 'Admin/SET_LIST_STREAM',
    }),
    newLIve(){
      let sortArr = this.bubbleSort(this.objItem)
      this.createNewLive.id = (sortArr[sortArr.length-1].id+1)
      let tmp = this.createNewLive
      this.objItem.unshift(tmp)
    },
    saveCreate(ins, e){
      let insert = {}
      Object.assign(insert, ins)
      delete insert.save
      delete insert.id
      insert.start_time = this.timeStr(insert.start_time)
      insert.end_time = this.timeStr(insert.end_time)
      e.target.disabled = true
      this.SET_LIST_STREAM({insert: insert})
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
    hideVideo(e){
      let iframe = e.target.closest('.box').querySelector('.video')
      if (iframe.style.display == 'none') {
        e.target.innerHTML = 'hide video'
        e.target.style.color = 'white';
        e.target.style.position = 'absolute'
        iframe.removeAttribute('style')
      } else {
        e.target.innerHTML = 'show video'
        e.target.style.color = 'black';
        e.target.style.position = 'initial'
        iframe.style.display = 'none'
      }
    },
    search(e){
      this.clearError = false
      this.searchOne = []
      let enter = e.target.value.trim().toLowerCase(),
        searchRes = e.target.closest('.sett').querySelector('.searchRes'),
        one = []
      this.listSteam.forEach(elem => {
        if( elem.name.toLowerCase().indexOf(enter)>0 || String(elem.id).indexOf(enter)>0 || elem.artist.toLowerCase().indexOf(enter)>0 )
          one.push(elem)
        })
      if(one.length>0){
        this.searchOne = one
        e.target.style.color = 'green'
        this.searchClass = false
      } else {
        this.searchClass = true
        e.target.removeAttribute('style')
        searchRes.style.display = 'flex'
        searchRes.innerHTML = `${enter} <span class="find">&nbsp;Not find</span>`
        this.clearError = setInterval(()=>{
          searchRes.removeAttribute('style')
          searchRes.innerHTML = ''
          this.clearError = false
        }, 5000)
      }
      // console.log('searchOne', one)
    },
    timeStr(time){
      return time.split('.')[0].replace(/\T/ig, ' ')
    },
    sortingListbyRating(){
      this.listSteam = this.listSteam.sort((a, b) => a.rating > b.rating ? 1 : -1)
    },
    delItem(e, Id){
      const elem = e.target.closest('.ratingLine'),
        id = parseInt(elem.querySelector('.id').childNodes[0].textContent.replace(/ +(?=\s)|:|\s|№/gmi, '' )),
        item = this.listSteam.filter(x => x.id===id)[0]
      this.listSteam.splice(Id, 1)
      this.objItem.splice(Id, 1)
      this.SET_LIST_STREAM({delete: item})
    },
    changeFilter(event){
      this.window = true
      const val = event.target.value
      this.ratingSort = val
      this.listSteam = this.allList.filter(a => a.rating.toString() == val?a:null )
      if(this.listSteam.length === 0){
        this.window = false
        this.listSteam = this.allList
      } else {
        this.activeIndex = 0
        this.objItem = this.listSteamInd[0]
      }
    },
    changeItem(obj){
      if(!obj.save){
        this.listSteam[this.listSteam.findIndex(x => x.id === obj.id)] = obj

      obj.start_time = this.timeStr(obj.start_time)
      obj.end_time = this.timeStr(obj.end_time)
      this.SET_LIST_STREAM({update: obj})
      }
    },
    nextList(data, index){
      this.searchOne = []
      this.searchClass = true
      this.activeIndex = index
      this.objItem = data
    },
  },
  created() {
    this.listSteam = this.GET_LIST_STREAM
    this.allList = this.GET_LIST_STREAM
    this.sortingListbyRating()
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/streamAdmin.scss";
</style>