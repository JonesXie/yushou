<template>
  <div>{{hello}}</div>
</template>
<script>
import { getMusic , getNews } from '@/api/index.js'
export default {
  data(){
    return {
      hello:'首页'
    }
  },
  mounted () {
    getMusic().then((response)=>{
      // console.log(response)
    })
    
    let _data = {page:1,count:5}
    getNews(_data).then((response)=>{
      // console.log(response)
    })
  }
};
</script>
<style>
</style>


