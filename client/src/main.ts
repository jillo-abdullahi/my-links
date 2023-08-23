import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createRouter, createWebHistory } from "vue-router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import withUUID from "vue-uuid";
import SignUpForm from "@/views/SignUpForm.vue";
import LoginForm from "@/views/LoginForm.vue";
import ForgotPasswordForm from "@/views/ForgotPasswordForm.vue";
import ProfileEditor from "@/views/profileEditor/ProfileEditor.vue";
import ProfilePreview from "@/views/profilePreview/ProfilePreview.vue";

const routes = [
  { path: "/", component: LoginForm },
  { path: "/signup", component: SignUpForm },
  { path: "/login", component: LoginForm },
  { path: "/forgot-password", component: ForgotPasswordForm },
  {
    path: "/profile-editor",
    component: ProfileEditor,
    name: "profile-editor",
  },
  { path: "/profile", component: ProfilePreview, name: "profile" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

withUUID(createApp(App))
  .use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true,
  })
  .use(router)
  .mount("#app");
