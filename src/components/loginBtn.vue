<template>
  <button class="login-btn" @click.stop="store.dispatch('openModal', {formName: 'loginForm'})">
    <img class="btn-icon" src="@/assets/icons/login.svg" alt="login">
    <span>Вход</span>
  </button>
</template>

<script setup>
import store from "@/store.js";

</script>

<style scoped lang="scss">
@use '../assets/main.scss' as main;

.login-btn {
  @include main.button-style;
  width: 144px;
}
</style>