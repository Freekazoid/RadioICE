<template>
  <div class="contentBox">    
    <label class="box" v-if="!image">
      <svg class="upload" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
        <g>
          <path d="M446.844,208.875C447.625,203.313,448,197.656,448,192c0-70.563-57.406-128-128-128
            c-40.938,0-78.531,19.344-102.344,51.063C209.25,113.031,200.688,112,192,112c-61.75,0-112,50.25-112,112
            c0,1.563,0.031,3.094,0.094,4.625C33.813,242.375,0,285.313,0,336c0,61.75,50.25,112,112,112h272c70.594,0,128-57.406,128-128
            C512,273.344,486.344,231.188,446.844,208.875z M384,416H112c-44.188,0-80-35.813-80-80s35.813-80,80-80
            c2.438,0,4.75,0.5,7.125,0.719c-4.5-10-7.125-21.031-7.125-32.719c0-44.188,35.813-80,80-80c14.438,0,27.813,4.125,39.5,10.813
            C246,120.25,280.156,96,320,96c53.031,0,96,42.969,96,96c0,12.625-2.594,24.625-7.031,35.688C449.813,238.75,480,275.688,480,320
            C480,373.031,437.031,416,384,416z"/>
          <polygon points="288,192 224,192 224,288 160,288 256,384 352,288 288,288 	"/>
        </g>
      </svg>
      <GetImages :img="dataConvert" class="images"/>
      <!-- gif|jpe?g|png|svg -->
      <input accept=".jpeg,.jpg,.png,.gif"  style="display: none;" type="file" id="file" ref="file" v-on:change="onFileChange($event)"/>
    </label>

    <div class="preBox" v-else>
      <img class="preImages" :src="image" />
      <label class="label">
        <button v-on:click="submitForm()">Upload</button>
        <button @click="removeImage">Remove</button>
      </label>
    </div>
  </div>
</template>

<script>
import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages
  },
  props: ['preImgShow', 'src'],
  data() {
    return {
      image: '',
    }
  },
  computed: {
    dataConvert(){
      // console.log( !this.findImg.indexOf('base64') )
      return !this.findImg.indexOf('base64')? this.findImg : `${this.findSrc}${this.findImg}`
    },
    findSrc(){
      return (typeof this.src !== 'string'? '' : this.src)
    },
    findImg(){
      return (this.preImgShow.img.length?this.preImgShow.img:'download.png')
    },
  },
  methods: {
    submitForm(){
      this.preImgShow.img = this.image
      this.$emit('upload', this.preImgShow)
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      
      this.createImage(files[0])
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(e) {
      this.image = '';
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/upload.scss";
</style>