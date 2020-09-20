<template>
  <div class="widget">
    <GetImages :img="'image1.png'" class="images"/>
    <GetImages :img="'image2.png'" class="images"/>
  </div>
</template>

<script>
import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages
  },
  
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/wifget.scss";
</style>