<template>
  <div class="menu">
    <nav class="navigation">
      <li>
        <router-link :to="'/'">На сайт</router-link>
      </li>
      <li v-for="item in adminMenu" :key="item.id" @click="activeContext(item)" :class="{active: item.active}">
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
@import "@/assets/scss/component/menuAdmin.scss";
</style>