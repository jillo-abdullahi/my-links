<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "App",
});
</script>

<style>
#app {
  font-family: 'Instrument Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #FAFAFA;
  min-height: 100vh;
  padding-bottom: 48px;
  padding-top: 48px;

}
</style>
