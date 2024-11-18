<template>
<div class="user-info">
  <div class="user-email">{{store.state.userEmail}}</div>
  <button type="button" class="user-btn" @click="menuOpen = !menuOpen"></button>
  <div class="user-menu" v-show="menuOpen">
    <a class="green-link" @click="store.dispatch('logout')">Выход</a>
  </div>
</div>
</template>

<script setup>
import store from "@/store.js";
import {ref} from "vue";
let menuOpen = ref(false);


</script>

<style scoped lang="scss">
@use '../assets/main.scss' as main;


@media (min-width: 0) {
  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .user-email {
      @include main.small-text-mob;
      overflow: hidden;
    }
    .user-btn{
      width: 36px;
      height: 36px;
      cursor: pointer;
      border-radius: 50%;
      background-color: var(--vt-c-dark-middle);
      background-image: url("@/assets/icons/user.svg");
      background-repeat: no-repeat;
      background-position: center;
      border: none;
      margin-left: 12px;
    }
    .user-menu {
      position: absolute;
      top: 51px;
      right: 0;
      padding: 40px;
      background-color: var(--vt-c-dark-middle);
      border-radius: 12px;
      z-index: 500;
      &::before {
        content: ''; /* Псевдоэлемент должен иметь content */
        position: absolute;
        top: -10px;
        right: 20px; /* Центрирование относительно всплывашки */
        transform: translateX(50%);
        border-left: 10px solid transparent; /* Левая сторона прозрачная */
        border-right: 10px solid transparent; /* Правая сторона прозрачная */
        border-bottom: 10px solid var(--vt-c-dark-middle); /* Верхняя сторона соответствует фону всплывашки */
      }


    }
  }
}

</style>