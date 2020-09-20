<template lang="html">
	<div class="vue-audio-container" @click.stop.prevent="startPlay">
		<slot></slot>
		<audio
			class="audio"
			:muted="muted"
			:autoplay="autoplay"
			:preload="preload"
			:src="source"
			:setVolume="volume"
			@ended="_ended"
			@playing="_playing"
			@pause="_pause"
			@error="_error"
			@timeupdate="_timeupdate"
			@waiting="_waiting"
		></audio>
	</div>
</template>

<script>
	import * as constant from '@/constant.js';
	let currentTarget;
	export default {
		data() {
			return {
				audios: {},
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
				default: constant.SINGLE,
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
				//type: String,
				default: false,
			},
		},
		watch: {
			volume(newVal) {
				let speaker = document.querySelector('.speaker');

				if (Number(newVal) <= 0.6 && Number(newVal) >= 0.4) {
					speaker.lastChild.style.fill = 'transparent';
				}
				if (Number(newVal) > 0.5) {
					speaker.lastChild.style.fill = '#2FC3FE';
				}
				if (Number(newVal) <= 0.4 && Number(newVal) >= 0.2) {
					let count = speaker.childNodes.length;
					for (let i = 0; i < count; i++) {
						if (i + 1 === count - 1)
							speaker.childNodes[i].style.fill = 'transparent';
					}
				}
				if (Number(newVal) >= 0.3 && Number(newVal) <= 0.6) {
					let count = speaker.childNodes.length;
					for (let i = 0; i < count; i++) {
						if (i + 1 === count - 1)
							speaker.childNodes[i].style.fill = '#2FC3FE';
					}
				}
				if (Number(newVal) <= 0.1 && Number(newVal) === 0) {
					let count = speaker.childNodes.length;
					for (let i = 0; i < count; i++) {
						if (i + 2 === count - 1)
							speaker.childNodes[i].style.fill = 'transparent';
					}
				}
				if (Number(newVal) > 0) {
					let count = speaker.childNodes.length;
					for (let i = 0; i < count; i++) {
						if (i + 2 === count - 1)
							speaker.childNodes[i].style.fill = '#2FC3FE';
					}
				}

				this.audios.volume = Number(newVal);
			},
		},
		mounted() {
			this.$nextTick(function() {
				this.audios = document.querySelector('audio');
			});
		},
		computed: {},
		methods: {
			startPlay(e) {
				let target = e.currentTarget;
				let audio = target.querySelector('audio');
				if (audio.paused || audio.ended) {
					audio.play();
				} else {
					audio.pause();
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
				if (this.mode === constant.SINGLE) {
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
	};
</script>

<style media="screen" lang="scss" scoped>
@import "@/assets/scss/component/audio.scss";
</style>
