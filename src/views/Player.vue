<template>
  <div class="playerBox">
    <audio class="playerAudio" id="player" controls>
         <source :src="'mp3/'+sound[0]" type="audio/mp3" />     
    </audio>

    <button id="play-music-button" @click="playAudio()" >PLAY</button>
  </div>
</template>

<script>
const  PROTOCOL = window.location.protocol,
  HOST = process.env.VUE_APP_CLIENT_HOST_NAME,
  SERVER_NAME = `${PROTOCOL}://${HOST}`

import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      sound: ['Ed Sheeran - Afterglow.mp3', 'ATB, Topic, A7S - Your Love (9PM) - Отрывок.mp3', 'Gwen Stefani - Let Me Reintroduce Myself.mp3'],
      player: new Audio(),
      play_music_button: [],
    }
  },
  computed: {
    ...mapGetters({
      GET_PLAYER_SOUND: 'GET_PLAYER_SOUND',
      SET_PLAYER: 'SET_PLAYER',
    }),
  },
  methods: {
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      // SET_PLAYER_SOUND: 'SET_PLAYER_SOUND',
    }),
    toggleHeader(x){
      
    },
    playAudio(){
      if (this.player.paused) {
        this.player.play();
        this.play_music_button.className = 'pause';
      } else {
        this.player.pause();
        this.play_music_button.className = 'play';
      }
    }
  },
  watch:{
    GET_PLAYER_SOUND(newD, lastD){        
      if(!!newD.trackLinck.indexOf(SERVER_NAME)){
        console.log( 'not track play' )
      } else {
        if (newD.trackLinck === lastD.trackLinck && !this.player.paused){
          console.log('pause')
          this.player.pause()
          this.play_music_button.className = 'play'
        } else if (newD.trackLinck !== lastD.url){
          // let index = Math.floor(Math.random() * Math.floor(3))
          console.log('re trackLinck' )
          this.player.src = newD.trackLinck
          this.player.play()
        } else if(this.player.paused){
          console.log('play', newD)
          this.player.src = newD.trackLinck
          this.player.play()
          this.play_music_button.className = 'pause'
        }
      }      
    }
  },
  mounted(){
    this.player = document.getElementById("player")
    this.play_music_button = document.getElementById("play-music-button")
  }
}
</script>

<style lang="scss" scoped>
.playerBox{
  position: absolute;
  top: 30%;
  display: none;

  .playerAudio{
    display: none;
  }
}
</style>