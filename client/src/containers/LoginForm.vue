<template>
    <h1>devlinks</h1>
    <InputField type="email" name="email" id="email" placeholder="Enter your email" :icon="EmailIcon" label="Email address" />
    <InputField type="password" name="password" id="password" placeholder="Enter your password" :icon="PasswordIcon" label="Password" />
</template>
  
<script lang="ts">
import InputField from "../components/InputField.vue";
import EmailIcon from "../assets/icons/EmailIcon.vue";
import PasswordIcon from "../assets/icons/PasswordIcon.vue";

export default {
    name: "LoginForm",
    components: {
        InputField,
    },
    data() {
        return {
            EmailIcon,
            PasswordIcon,
        }
    }
};
</script>
  

  