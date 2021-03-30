<template lang="html">
	<div class="vue-audio-container" @click.stop.prevent="startPlay">
		<slot></slot>
		<audio class="audio" :muted="muted" :autoplay="autoplay" :preload="preload" :src="source" :setVolume="volume" @ended="_ended" @playing="_playing" @pause="_pause" @error="_error" @timeupdate="_timeupdate" @waiting="_waiting"></audio>
	</div>
</template>

<script>
	let currentTarget;
	export default {
		data() {
			return {
				vueAudio: {},
				audios: {},
				speaker: {},
				Volume: this.setVolume,
			};
		},
		props: {
			source: {
				type: String,
				required: true,
				validator: function(value) {
					return value;
				},
			},
			mode: {
				type: Number,
				default: false,
			},
			index: {
				type: Number,
				default: 0,
				required: true,
			},
			preload: {
				type: String,
				default: 'none',
				validator: function(value) {
					return value === 'none' || value === 'auto' || value === 'metadata';
				},
			},
			autoplay: {
				type: Boolean,
				default: false,
			},
			muted: {
				type: Boolean,
				default: false,
			},
			volume: {
				default: 1,
			},
		},
		watch: {
			volume(newVal) {
				let count = (this.speaker.childNodes.length - 1)
				
				if(Number(newVal) >= 0.7 && Number(newVal) <= 1) {
					for (let i = 0; i < count; i++) {
						if(i === count)
							this.speaker.childNodes[i].style.fill = 'transparent'
						this.speaker.childNodes[i].style.fill = '#2FC3FE'
					}
					this.speaker.childNodes[count].style.fill = 'transparent'
				} else if(Number(newVal) >= 0.4 && Number(newVal) <= 0.6) {
					for (let i = 0; i < count; i++) {
						if(i >= count-1)
							this.speaker.childNodes[i].style.fill = 'transparent'
						else
							this.speaker.childNodes[i].style.fill = '#2FC3FE'
					}
					this.speaker.childNodes[count].style.fill = 'transparent'
				} else if(Number(newVal) >= 0.1 && Number(newVal) <= 0.4) {
					for (let i = 0; i < count; i++) {
						if(i > 2)
							this.speaker.childNodes[i].style.fill = 'transparent'
						else
							this.speaker.childNodes[i].style.fill = '#2FC3FE'
					}
					this.speaker.childNodes[count].style.fill = 'transparent'
				} else if(Number(newVal) >= 0 && Number(newVal) <= 0.1) {
					for (let i = 0; i < count; i++) {
						if(i >= 2)
							this.speaker.childNodes[i].style.fill = 'transparent'
					}
					this.speaker.childNodes[count].style.fill = '#FFFFFF'
				}
				this.audios.volume = Number(newVal);
			},
		},
		mounted() {
			this.$nextTick(function() {
				this.audios = document.querySelector('audio')
				this.speaker = document.querySelector('.speaker')
				this.vueAudio = document.querySelector('.vue-audio-container')
			});
		},
		computed: {},
		methods: {
			start(audio){
				if (audio.paused || audio.ended) {
					audio.play()
				} else {
					audio.pause()
				}
			},
			startPlay(e) {
				if(document.querySelector('.client') !== null){
					e.preventDefault()
					if(e.keyCode === 32)
						this.start(this.vueAudio.querySelector('audio'))
					else if(e.target.className.indexOf('button') >= 0)
						this.start(e.currentTarget.querySelector('audio'))
				}
			},
			_timeupdate(e) {
				this.$emit('timeupdate', e);
			},
			_playing(e) {
				this.$emit('playing', e);
				let ele = e.path ? e.path[1] : e.target.parentElement;
				this._stopOther(ele);
			},
			_pause(e) {
				this.$emit('pause', e);
			},
			_waiting(e) {
				this.$emit('waiting', e);
			},
			_ended(e) {
				this.$emit('ended', e);
				this._modeControl();
			},
			_error(e) {
				this.$emit('error', e);
			},
			_modeControl() {
				// single mode
				if (this.mode === Number(process.env.VUE_APP_SINGLE)) {
					return;
				}
			},
			_stopOther(target) {
				// stop other audio which is playing
				if (currentTarget && currentTarget !== target) {
					let audio = currentTarget.querySelector('audio');
					audio.pause();
					audio.currentTime = 0;
				}
				currentTarget = target;
			},
		},
		created() {
			window.addEventListener('keyup', this.startPlay, false)
		},
	};
</script>

<style media="screen" lang="scss" scoped>
@import "@/assets/scss/component/audio.scss";
</style>
