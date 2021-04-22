<template>
  <footer class="footer">
    <p>
      {{GET_START_DATE}} - {{GET_DATE}} {{GET_COPYRIGHT}}<br><br>{{GET_EMAIL_TEXT}} <a :href="GET_EMAIL_HREF">{{GET_EMAIL}}</a>
    </p>
    <div class="social">
      <div class="socIco">
        <template v-for="(item,index) in GET_SOCIAL">
          <a :key="index" v-if="item.active && !item.app" :href="item.linck" target="_blank" rel="noopener noreferrer">
            <GetImages :img="item.img" :alt="item.title" :title="item.description" class="soc"/>
          </a>
        </template>
      </div>

      <div class="socApp">
        <template v-for="(item,index) in GET_SOCIAL">
          <a :key="index" v-if="item.active && item.app" :href="item.linck" target="_blank" rel="noopener noreferrer">
            <GetImages :img="item.img" :alt="item.title" :title="item.description" class="soc"/>
          </a>
        </template>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapGetters} from 'vuex'

import GetImages from '@/components/getImages.vue'

export default {
  components: {
    GetImages,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      GET_START_DATE: 'footer/GET_START_DATE',
      GET_COPYRIGHT: 'footer/GET_COPYRIGHT',
      GET_EMAIL_TEXT: 'footer/GET_EMAIL_TEXT',
      GET_EMAIL: 'footer/GET_EMAIL',
      GET_EMAIL_HREF: 'footer/GET_EMAIL_HREF',
      GET_DATE: 'footer/GET_DATE',
      GET_SOCIAL: 'footer/GET_SOCIAL',
    }),
  },
  mounted() {
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/component/footer.scss";
</style>
