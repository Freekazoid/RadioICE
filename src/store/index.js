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

const isEmptyObject = (obj) => {
  try {
    for (const i of Object.keys(obj))
      if (Object.keys(obj[i]).length)
        return true    
  } catch (e) {
    console.log('Error', e)
    return false
  }
}

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    isLoggedIn: false,
    playerSound: {},
    Player: ''
  },
  mutations: {
    SET_LOGGED(state, payload) {
      state.isLoggedIn = payload
    },
    SET_PLAYER_SOUND(state, payload) {
      state.playerSound = payload
    },
    SET_PLAYER(state, payload) {
      state.Player = payload
    },
  },
  getters: {
    GET_LOGGED(state, payload) {
      return state.isLoggedIn
    },
    GET_PLAYER_SOUND(state, payload) {
      return state.playerSound
    },
    GET_PLAYER(state, payload) {
      return state.Player
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
        SOCKET_response(state, from){
          this.state.lastData = new Date().getTime()

          this.state.footer   = JSON.stringify(this.state.footer) !== JSON.stringify(from.footer)?from.footer:this.state.footer
          this.state.header   = JSON.stringify(this.state.header) !== JSON.stringify(from.header)?from.header:this.state.header
          this.state.Radio    = JSON.stringify(this.state.Radio) !== JSON.stringify(from.radio)?from.radio:this.state.Radio
          this.state.NewItem  = JSON.stringify(this.state.NewItem) !== JSON.stringify(from.newitem)?from.newitem:this.state.NewItem
          this.state.Programs = JSON.stringify(this.state.Programs) !== JSON.stringify(from.programs)?from.programs:this.state.Programs
          this.state.IceHot   = JSON.stringify(this.state.IceHot) !== JSON.stringify(from.icehot)?from.icehot:this.state.IceHot
          this.state.Team     = JSON.stringify(this.state.Team) !== JSON.stringify(from.team)?from.team:this.state.Team
          this.state.Life     = JSON.stringify(this.state.Life) !== JSON.stringify(from.life)?from.life:this.state.Life
          this.state.PlayList = JSON.stringify(this.state.PlayList) !== JSON.stringify(from.playlist)?from.playlist:this.state.PlayList
          this.state.Video    = JSON.stringify(this.state.Video) !== JSON.stringify(from.video)?from.video:this.state.Video
          
          if(isEmptyObject(this.state.Admin.request)){//  || this.state.Admin.password === ''
            this.state.Admin.id = from.admin.id
            this.state.Admin.menuAdmin = from.admin.menuAdmin
            this.state.Admin.social = from.admin.social
            this.state.Admin.password = from.admin.password
            this.state.Admin.passwordReadmin = from.admin.passwordReadmin
            this.state.Admin.showWindow = from.admin.showWindow
          } else
            this.state.Admin = from.admin

          this.state.stream   = from.stream
          this.state.Admin.listStream = (typeof this.state.Admin.listStream === 'undefined'?from.liststream:!this.state.Admin.listStream.some((e, i) => e != from.liststream[i])?this.state.Admin.listStream:from.liststream)                    
          // console.log('SOCKET_response', from)
        },
        SOCKET_request(state, data) {
          (new Vue()).$socket.emit(data.to, data.data)
          this.state.Admin.showWindow = 2
          // console.log('SOCKET_request', state, data)
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
