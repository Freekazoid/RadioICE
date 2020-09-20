<template>
  <div class="menu">
    <nav class="navigation">
      <li>
        <router-link :to="'/'">На сайт</router-link>
      </li>
      <li v-for="(item, index) in adminMenu" :key="index" @click="activeContext(item)" :class="{active: item.active}">
        {{ item.context }}
      </li>
    </nav>
    <button type="button" @click.prevent="saveChange()">Сохранить изменения</button>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      adminMenu: [],
      component: ''
    }
  },
  props: ['menuSelect'],
  computed: {
    ...mapGetters({
      GET_MENU_ADMIN: 'Admin/GET_MENU_ADMIN',
      GET_REQUEST: 'Admin/GET_REQUEST',
    }),
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),

    ...mapMutations({
      SET_MENU_ADMIN: 'Admin/SET_MENU_ADMIN',
      SET_REQEST: 'Admin/SET_REQEST',
      _request: 'SOCKET_request',
    }),
    activeContext(select){
      this.adminMenu.forEach((item) => {
        item.active = (select.id===item.id?true:false);
        (select.id===item.id?(this.component = item.component, this.menuSelect(item)):null);
      })
      this.SET_MENU_ADMIN(this.adminMenu)
    },
    saveChange(){
      let request = {},
          arr = this.GET_REQUEST
      for (let i in arr)
        if (Object.keys(arr[i]).length)
          request[i] = arr[i]
      this._request({to: 'config', data: request })//Отправка на сервер данных. из любого места
      this.SET_REQEST({})
    },
  },
  created() {
    this.adminMenu = this.GET_MENU_ADMIN
  },
}
</script>

<style lang="scss" scoped>
.menu{
  width: 200px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;

  .navigation{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    .active{
      background: #adc8f9;
    }
    &>li{
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      align-items: center;
      background: cornsilk;
      border-radius: 0 30px;
      margin: 10px 0 0 0;

      a{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    &>li:hover{
      background: #f9e79f;
    }
  }
  button{
    background: forestgreen;
    width: 100%;
    height: 40px;
    color: aliceblue;
    font-size: 16px;
    font-family: Tahoma;
    border: none;
    box-shadow: 0 0 5px black;
    cursor: pointer;
  }
  button:hover{
    box-shadow: inset 0 0 5px white;
  }
}
</style>