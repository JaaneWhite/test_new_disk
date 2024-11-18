<template>
  <header-component />
  <main>
    <div class="container">
      <notes-block v-if="store.state.token" />
      <start-page-block v-else />
    </div>
  </main>
  <login-modal />
</template>

<script setup>
import store from "@/store.js";
import HeaderComponent from "@/components/headerComponent.vue";
import StartPageBlock from "@/components/startPageBlock.vue";
import LoginModal from "@/components/loginModal.vue";
import {test, test2} from "@/api.js";
import NotesBlock from "@/components/notesBlock.vue";

//test2();
//test();


</script>

<style scoped>


</style>
