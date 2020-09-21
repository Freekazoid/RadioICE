<template>
	<div class="stream">
		<div class="box">
			<VueAudio :source="list.source" :index="1" :mode="mode" :volume="setValum" @timeupdate="timeupdate" @playing="playing" @pause="pause" @ended="ended" @waiting="waiting" @error="error">
				<div class="player">
					<div class="imgTrack">
						<a class="play" href="javascript:void(0)" alt="play"> </a>
						<img :src="online.img" alt="">
						<!-- <GetImages :img="`online/${online.img}`" class="images" /> -->
					</div>
					<div class="nameTrack">
						<div class="author">{{ online.artist }}</div>
						<div class="track">{{ online.name }}</div>
					</div>
				</div>
			</VueAudio>
			<div class="volume">
				<svg class="speaker" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
					<path d="M2.7812 4.03137H0.468741C0.209871 4.03137 0 4.24124 0 4.50011V11.5C0 11.7588 0.209871 11.9687 0.468741 11.9687H2.7812V4.03137Z" fill="#2FC3FE" />
					<path d="M7.33127 1.46705L3.71875 3.66601V12.334L7.33127 14.5329C8.2686 15.1035 9.46864 14.4295 9.46864 13.3317V2.66825C9.46864 1.57089 8.26885 0.896314 7.33127 1.46705Z" fill="#2FC3FE"/>
					<path d="M10.8023 6.78463C10.6193 6.96769 10.6193 7.26447 10.8023 7.44753C11.1076 7.75286 11.1077 8.24701 10.8023 8.55235C10.6193 8.73541 10.6193 9.03218 10.8023 9.21524C10.9854 9.3983 11.2822 9.39833 11.4652 9.21524C12.1353 8.54513 12.1353 7.45475 11.4652 6.78463C11.2822 6.60157 10.9854 6.60157 10.8023 6.78463Z" fill="#2FC3FE" />
					<path d="M12.8793 5.37045C12.6963 5.18739 12.3995 5.18739 12.2164 5.37045C12.0333 5.55351 12.0333 5.85028 12.2164 6.03334C13.3008 7.11773 13.3008 8.88216 12.2164 9.96655C12.0333 10.1496 12.0333 10.4464 12.2164 10.6294C12.3994 10.8125 12.6962 10.8125 12.8793 10.6294C14.3292 9.17953 14.3292 6.82036 12.8793 5.37045Z" fill="#2FC3FE" />
					<path d="M14.2934 3.95626C14.1103 3.7732 13.8135 3.7732 13.6305 3.95626C13.4474 4.13932 13.4474 4.4361 13.6305 4.61916C15.5262 6.51493 15.5262 9.48497 13.6305 11.3807C13.4474 11.5638 13.4474 11.8606 13.6305 12.0436C13.8135 12.2267 14.1103 12.2267 14.2934 12.0436C16.5675 9.7695 16.5699 6.23281 14.2934 3.95626Z" fill="#2FC3FE"/>
				</svg>

				<label for=""><input ref="volume" v-model="volume" type="range" name="volume" min="0" max="1" step="0.1" @change="setValumFunc" /></label>
			</div>
			<div class="activeLessonUser">
				<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.5 8C14.3 8 12.43 8.34 11 9C9.57 8.33 7.7 8 6.5 8C4.33 8 0 9.08 0 11.25V14H22V11.25C22 9.08 17.67 8 15.5 8ZM11.5 12.5H1.5V11.25C1.5 10.71 4.06 9.5 6.5 9.5C8.94 9.5 11.5 10.71 11.5 11.25V12.5ZM20.5 12.5H13V11.25C13 10.79 12.8 10.39 12.48 10.03C13.36 9.73 14.44 9.5 15.5 9.5C17.94 9.5 20.5 10.71 20.5 11.25V12.5ZM6.5 7C8.43 7 10 5.43 10 3.5C10 1.57 8.43 0 6.5 0C4.57 0 3 1.57 3 3.5C3 5.43 4.57 7 6.5 7ZM6.5 1.5C7.6 1.5 8.5 2.4 8.5 3.5C8.5 4.6 7.6 5.5 6.5 5.5C5.4 5.5 4.5 4.6 4.5 3.5C4.5 2.4 5.4 1.5 6.5 1.5ZM15.5 7C17.43 7 19 5.43 19 3.5C19 1.57 17.43 0 15.5 0C13.57 0 12 1.57 12 3.5C12 5.43 13.57 7 15.5 7ZM15.5 1.5C16.6 1.5 17.5 2.4 17.5 3.5C17.5 4.6 16.6 5.5 15.5 5.5C14.4 5.5 13.5 4.6 13.5 3.5C13.5 2.4 14.4 1.5 15.5 1.5Z" fill="white"/>
				</svg>
				<p>22</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	import GetImages from '@/components/getImages.vue'
	import VueAudio from '@/components/audio.vue'
	

	export default {
		components: {
			GetImages,
			VueAudio,
		},
		data() {
			return {
				online: {},
				list: { source: 'http://onair.radioice.ru:8000/mp3_128' },
				mode: '',
				volume: 0,
				setValum: 0,  
				svgOptions: {
					width: 40,
					height: 40,
					fill: 'none',
					stroke: '#007aff',
					strokeWidth: 2,
				},
			}
		},
		computed: {
			...mapGetters({
      streamLive: 'stream/GET_STREAM_LIVE',
			})
		},
		methods: {
			setValumFunc(e) {
				this.setValum = Number(e.target.value);
			},
			timeupdate(e) {
				let target = e.target;
				let currentTime = target.currentTime;
				let duration = target.duration;
				let percent = ((100 / duration) * currentTime).toFixed(1);
				if (isNaN(percent) || percent === '0.0')
					percent = 0
			},
			playing(e) {
				let ele = e.path ? e.path[1] : e.target.parentElement;
				ele.querySelector('a').className = process.env.VUE_APP_PLAY_CLASS;
			},
			pause(e) {
				let ele = e.path ? e.path[1] : e.target.parentElement;
				ele.querySelector('a').className = process.env.VUE_APP_PAUSE_CLASS;
			},
			ended(e) {
				let ele = e.path ? e.path[1] : e.target.parentElement;
				ele.querySelector('a').className = process.env.VUE_APP_PAUSE_CLASS;
			},
			waiting(e) {
				let ele = e.path ? e.path[1] : e.target.parentElement;
				ele.querySelector('a').className = process.env.VUE_APP_LOAD_CLASS;
			},
			error(e) {
				console.log(e);
			},
		},
		watch: {
			streamLive: {
				handler(newD, lastD) {
					this.online = newD
				},
				deep: true
			},
		},
		mounted() {
			//this.$refs.volume.value = Number(this.volume)
		},
		created() {
			this.online = this.streamLive
			this.mode = String(process.env.VUE_APP_SINGLE)
			this.volume = Number(process.env.VUE_APP_VOLUME)
  },
	};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/stream.scss";
</style>