<template>
  <div class="large">
    <input type="text" v-model="srcfile">

    <div class="file-listing">
      <span class="file-name" v-if="file.name">File: {{ file.name }}</span>
      <button v-if="file.name" class="remove-file" @click="removeFile()">Remove</button>
      <button v-if="!file.name" @click="addFiles($event)">Add Files</button>
      <input class="input" accept=".mp3" type="file" @change="handleFileUpload($event)"/>
      <button @click="submitFile()">Submit</button>
    </div>      
  </div>
</template>


<script>
  const  PROTOCOL = window.location.protocol,
    PORT = (PROTOCOL === 'http:')? process.env.VUE_APP_SERVER_PORT : process.env.VUE_APP_SERVER_PORT_SSL,
    HOST = process.env.VUE_APP_CLIENT_HOST_NAME,
    URL = `${PROTOCOL}//${HOST}:${PORT}`,
    URLs = `${PROTOCOL}//${HOST}`
  export default {
     data: () => ({
      file: {},
      srcloc: ''
    }),
    props: ['src'],
    computed:{
      srcfile(){
        return this.src && this.srcloc==='' ? this.src.trackLinck : this.srcloc
      }
    },
    methods: {
      submitFile(){
        if (typeof this.file.name !== 'undefined') {
          let formData = new FormData()
          formData.append('file', this.file)
          this.srcloc = ''
          this.axios.post( URL+'/upload', formData, {headers:{'Content-Type': 'multipart/form-data'}}).
            then((data) => {
              this.srcloc = URLs+'/mp3/'+data.data.Done
              this.src.trackLinck = this.srcloc
              this.$emit('trackLinck', this.src)
              this.file = ''
              // console.log('this.srcloc', data)
            })
            .catch((e) => {
              console.error('FAILURE!!', e)
              this.file = ''
            })
        }
      },
      handleFileUpload(e){
        this.file = e.target.files[0]
      },
      addFiles(e){
        let parent = e.target.closest('.large')
        parent.querySelector('.input').click()
      },
      removeFile(){
        this.file = ''
      }
    },
    mounted(){
      // this.srcloc = this.src
    }
  }
</script>

<style lang="scss" scoped>
.large{
  input{
    border: 0.1px solid;
  }
  .input[type="file"]{
    display: none;
  }
  .file-listing{
    width: 200px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    .remove-file{
      color: red;
      cursor: pointer;
      float: right;
    }
    .file-name{
      font-size: 11px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>