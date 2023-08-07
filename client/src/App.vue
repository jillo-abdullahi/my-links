<template>
  <!-- <LoginForm /> -->
  <SignUpForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/containers/LoginForm.vue";
import SignUpForm from "@/containers/SignUpForm.vue";


export default defineComponent({
  name: "App",
  components: {
    // LoginForm,
    SignUpForm
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
  background-color: #FAFAFA;
  min-height: 100vh;
  padding-bottom: 48px;
  padding-top: 48px;
  
}
</style>
