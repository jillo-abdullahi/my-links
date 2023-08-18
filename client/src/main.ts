import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createRouter, createWebHistory } from "vue-router";
import withUUID from "vue-uuid";
import SignUpForm from "@/views/SignUpForm.vue";
import LoginForm from "@/views/LoginForm.vue";
import ForgotPasswordForm from "@/views/ForgotPasswordForm.vue";
import ProfileView from "@/views/profile/ProfileView.vue";
import ProfilePreview from "@/views/ProfilePreview.vue";

const routes = [
  { path: "/", component: LoginForm },
  { path: "/signup", component: SignUpForm },
  { path: "/login", component: LoginForm },
  { path: "/forgot-password", component: ForgotPasswordForm },
  { path: "/profile-settings", component: ProfileView },
  { path: "/profile", component: ProfilePreview, name: "profile" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

withUUID(createApp(App)).use(router).mount("#app");
