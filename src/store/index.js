import Vue from "vue"
import Vuex from "vuex"

import {preLoader} from '@/store/modules/preLoader'
import {header} from '@/store/modules/header'
import {footer} from '@/store/modules/footer'
import {stream} from '@/store/modules/stream'

import {Radio} from '@/store/modules/Radio'
import {NewItem} from '@/store/modules/NewItem'
import {Programs} from '@/store/modules/Programs'
import {IceHot} from '@/store/modules/IceHot'
import {Team} from '@/store/modules/Team'
import {Life} from '@/store/modules/Life'
import {PlayList} from '@/store/modules/PlayList'
import {Video} from '@/store/modules/Video'

import {Admin} from '@/store/modules/Admin'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isLoggedIn: false,
  },
  mutations: {
    SET_LOGGED(state, payload) {
      state.isLoggedIn = payload
    },
  },
  getters: {
    GET_LOGGED(state, payload) {
      return state.isLoggedIn
    },
  },
  modules: {
    sockets:{
      state: {},
      getters:{
        SOCKET_data(state, payload) {
          return state.data
        },
      },
      mutations:{
        SOCKET_test(state, from) {/////////////////////////////////////
          console.log( state.data, from )
        },
        SOCKET_response(state, from) {
          state.data = from
          this.state.lastData = new Date().getTime()
          this.state.Admin = from.admin
          this.state.footer = from.footer
          this.state.header = from.header
          this.state.Radio = from.radio
          this.state.NewItem = from.newitem
          this.state.Programs = from.programs
          this.state.IceHot = from.icehot
          this.state.Team = from.team
          this.state.Life = from.life
          this.state.PlayList = from.playlist
          this.state.Video = from.video
          this.state.stream = from.stream
          //console.log('SOCKET_response', this.state, from)
        },
        SOCKET_request(state, data) {
          (new Vue()).$socket.emit(data.to, data.data)
          //console.log('SOCKET_request', state, data)
        },
      }
    },
    preLoader,
    header,
    footer,
    stream,
    Radio,
    NewItem,
    Programs,
    IceHot,
    Team,
    Life,
    PlayList,
    Video,
    Admin
	}
});
