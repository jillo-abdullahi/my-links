import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createRouter, createWebHistory } from "vue-router";
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
  { path: "/profile/:username", component: ProfilePreview, name: "profile" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(withUUID);

app.mount("#app");
