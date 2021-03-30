<template>
  <div class="notfound">
    <div class="box">
      <div class="text left">4</div>
      <div class="center">
        <GetImages img="TurtleDJ.svg" class="dj"/>
      </div>
      <div class="text right">4</div>
    </div>

    <div class="oops">
      Страница не найдена :(
    </div>
    <router-link to="/"  class="btn">
      Перейти на главную
    </router-link>
  </div>
</template>

<script>
import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages,
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/PageNotFound.scss";
</style>
