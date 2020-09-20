<template>
    <img :alt="img" v-if="base64" :src="dataConvert">
    <img :alt="img" v-else v-lazy="require(`../assets/img/${this.img}`)">
</template>

<script>
export default {
    props: {
        img: String
    },
    computed: {
        base64(){
            return this.img.indexOf('base64') + 1? true : false
        },
        dataConvert(){
            return `data:image/png;${this.img}`
        },
    },
}
</script>