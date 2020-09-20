<template>
  <div class="teamAdmin">
    <h1 class="tytle">team</h1>

    <div class="newBoxItem">
      Добавитть участника: <button type="button" @click="createNewItem()">+</button>
    </div>

    <fieldset class="infoRadio">
      <legend>Заголовок: </legend>
      <textarea cols="100%" rows="5" v-model="teamTitle"></textarea>
    </fieldset>
    
    <div class="team" v-for="item in team" :key="item.id">
      <div class="boxContent">

        <div class="images">
          <upload :preImgShow="item" :src="'commands'" @upload="uploadImg" />
        </div>

        <div class="info">
          <label class="name">Имя:
            <input type="text" v-model="item.name" />
          </label>

          <label class="position">Должность:
            <input type="text" v-model="item.position" />
          </label>

          <label class="email">email:
            <input type="text" v-model="item.email" />
          </label>

          <label class="password">Активация пароля:
            <input type="checkbox" v-model="item.password" @change="radioCheck(item.id)">
          </label>
        </div>
        <label>удалить: <button class="del" type="button" title="Delete this participant" @click.prevent="Delete(index)">X</button></label>
      </div>
      
      <textarea cols="80" rows="10" v-model="item.content"></textarea>
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
      teamTitle: '',
      team: [],
      createTeam: {
        id: 0,
        img: 'download.png',
        name: '',
        position: '',
        email: '',
        hover: false,
        password: false,
        content: '<p class="p">thi is content HTML format</p>',
      }
    }
  },
  computed: {
    ...mapGetters({
      GET_TITLE: 'Team/GET_TITLE',
      GET_TEAM: 'Team/GET_TEAM',
    }),
    
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_TEAM: 'Admin/SET_TEAM',
    }),
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
      let arr = this.team,
        sortArr = this.bubbleSort(this.team)
      this.createTeam.id = (sortArr[sortArr.length-1].id+1)
      let tmp = this.createTeam
      arr.unshift(tmp)
      this.team = arr
    },
    Delete(index){
      this.team.splice(index, 1)
    },
    radioCheck(Id){
      this.team.forEach(item => {
        item.password = (Id === item.id ? true : false)
      })
    },
    uploadImg(data){
      this.SET_TEAM({team: data})
    },
  },
  watch:{
    teamTitle(newD, lastD){
      this.SET_TEAM({teamTitle: newD})
    },
    team: {
      handler(newD, lastD) {
        if(lastD.length > 0)
          this.SET_TEAM({team: newD})
      },
      deep: true
    },
  },
  created(){
    this.teamTitle = this.GET_TITLE
    this.team = this.GET_TEAM
  },
}
</script>

<style lang="scss" scoped>
.teamAdmin{
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

  &>fieldset{
    border: 1.5px solid #CCA383;
    width: fit-content;
    padding: 0 4px 4px 4px;
    margin: 0 0 10px 0;

    &>.input{
      width: 100%;
      height: 20px;
    }
  }
  &>.team{
    width: calc(100% - 20px);
    border-top: 2px solid;
    border-bottom: 2px solid;
    border-radius: 10px;
    margin: 0 0 12px;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    padding: 3px 8px;

    &>.boxContent{
      display: flex;
      justify-content: space-between;
      align-items: center;

      &>.info{
        width: 240px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
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
    }
    &>textarea{
      width: 100%;
    }

  }
}
</style>