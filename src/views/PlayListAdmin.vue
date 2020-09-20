<template>
  <div class="PlayListAdmin">
    <h1 class="tytle">Play List</h1>

    PlayListAdmin ?
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      GET_MENU_ADMIN: 'Admin/GET_MENU_ADMIN',
    }),
  },
  methods:{
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_MENU_ADMIN: 'Admin/SET_MENU_ADMIN',
    }),
  },
}
</script>

<style lang="scss" scoped>
.PlayListAdmin{
  width: 100%;
  height: 100%;
  
  .tytle{
    color: tan;
    font-size: 30px;
    font-family: Tahoma;
    text-transform: capitalize;
    padding: 0 0 20px;
    user-select: none;
  }
}
</style>