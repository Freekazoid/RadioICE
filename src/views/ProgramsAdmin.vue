<template>
  <div class="ProgramsAdmin">
    <h1 class="tytle">programs</h1>
    <div class="newBoxItem">
      Создать новый: <button type="button" @click="createNewItem()">+</button>
    </div>
    <div class="program" v-for="(item, index) in program" :key="item.id">
      <div class="title">
        <p>
          Заголовок: <input type="text" v-model="item.title">
        </p>
        <div class="num">№: 
          <input type="number" :value="item.id" min="1" @change="indexSet($event, item.id)">
        </div>
        <label>удалить: <button class="del" type="button" title="Delete this program" @click.prevent="Delete(index)">X</button></label>
      </div>
      <div class="box">
        <upload :preImgShow="item" src="program/" @upload="uploadImg" />

        <div class="infoProgra">
          <fieldset>
            <legend>Время: { создать новый: <button type="button" title="Create new air" @click.prevent="airsNew(item.id)">+</button> }</legend>
            <div class="box" v-for="(ai, index) in item.airs" :key="index">
              <input type="text" v-model="item.airs[index]" />
              <button type="button" title="Delete this air" @click.prevent="airsDelete(index, item.id)">-</button>
            </div>
          </fieldset>

          <fieldset>
            <legend>ведушие: {  создать новый: <button type="button" title="Create new host" @click.prevent="hostsNew(item.id)">+</button> }</legend>
            <div class="box" v-for="(ho, index) in item.hosts" :key="index">
              <input type="text" v-model="item.hosts[index]" />
              <button type="button" title="Delete this host" @click.prevent="hostsDelete(index, item.id)">-</button>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="content">Описание: 
        <textarea v-model="item.content"></textarea>
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
      program: [],
      createProgram: {
        id: 0,
        hover: false,
        active: false,
        img: "download.png",
        title: "",
        hosts: [],
        airs: [],
        content: ""
      },
    }
  },
  computed: {
    ...mapGetters({
      GET_PROGRAMS: 'Programs/GET_PROGRAMS',
      GET_MENU_ADMIN: 'Admin/GET_MENU_ADMIN',
    }),
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_PROGRAMS: 'Admin/SET_PROGRAMS',
    }),
    indexSet(e, Id){
      let respons = false,
        serchId = Number(e.target.value),
        sortArr = this.bubbleSort(this.program)
      this.program.forEach(item => {
        (item.id === serchId && item.id !== Id ? (respons = true) : null);
      })
      if(respons){
        e.target.value = Id
      } else {
        this.program.find(item => {
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
      let arr = this.program,
        sortArr = this.bubbleSort(this.program)
      this.createProgram.id = (sortArr[sortArr.length-1].id+1)
      let tmp = this.createProgram
      arr.unshift(tmp)
      this.program = arr
    },
    Delete(index){
      this.program.splice(index, 1)
    },
    hostsDelete(index, Id){
      this.program.forEach(item => {
        (item.id === Id ? item.hosts.splice(index, 1) : null)
      })
    },
    hostsNew(Id){
      this.program.forEach(item => {
        (item.id === Id ? item.hosts.push("") : null)
      })
    },
    airsDelete(index, Id){
      this.program.forEach(item => {
        (item.id === Id ? item.airs.splice(index, 1) : null)
      })
    },
    airsNew(Id){
      this.program.forEach(item => {
        (item.id === Id ? item.airs.push("") : null)
      })
    },
    uploadImg(data){
      this.SET_PROGRAMS({program: data})
    },
  },
  watch:{
    program: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_PROGRAMS({program: newD})
      },
      deep: true
    },
  },
  created(){
    this.program = this.GET_PROGRAMS
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ProgramsAdmin.scss";
</style>