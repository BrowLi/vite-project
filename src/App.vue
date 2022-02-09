<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ref, reactive} from "vue";
import HelloWorld from './components/HelloWorld.vue';
import api from './apis';

const num = ref(0);
const data: any = reactive({
  resultList: []
})

api.search.getSearchResult().then((res:any) => {
  console.log(res)
  data.result = res.data
})

/**
 * 在 defineExpose 中定义的变量，会暴露在公共实例中
 * **/
// defineExpose({
//   num
// })

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <el-button type="warning">ElementPlusButton</el-button>
  <el-button>{{ num }}</el-button>
  <el-input placeholder="Please input" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
