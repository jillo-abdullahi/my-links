<template>
  <LoginForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/containers/LoginForm.vue";


export default defineComponent({
  name: "App",
  components: {
    LoginForm,
  },
});
</script>

<style>
#app {
  font-family: 'Instrument Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
