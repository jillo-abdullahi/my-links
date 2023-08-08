import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createRouter, createWebHistory } from "vue-router";
import SignUpForm from "@/views/SignUpForm.vue";
import LoginForm from "@/views/LoginForm.vue";

const routes = [
  { path: "/", component: LoginForm },
  { path: "/signup", component: SignUpForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
