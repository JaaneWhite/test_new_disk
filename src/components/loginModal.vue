<template>
  <dialog aria-modal="true" v-if="store.state.modalShow">
    <div class="dialog-content">
      <form-block />
      <button class="text-btn">
        <img src="../assets/icons/close.svg" alt="close" @click="store.commit('setModalShow', false)" >
      </button>
    </div>

  </dialog>
</template>

<script setup>
import store from "@/store.js";
import FormBlock from "@/components/formBlock.vue";



</script>

<style scoped lang="scss">
@media (min-width: 0) {
  dialog {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: none;
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Затемнение */
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .dialog-content {
      display: flex;
      margin: 4px 4px auto;
      padding: 16px 16px 90px;
      background: var(--vt-c-dark-middle);
      border: none;
      border-radius: 40px;
      box-sizing: border-box;
      position: relative;
      .text-btn {
        width: 56px;
        min-width: 56px;
        padding: 0;
        display: flex;
        position: absolute;
        top: 24px;
        right: 24px;
        img {
          display: flex;
          margin: auto;
        }
      }
    }
  }


}
@media (min-width: 768px) {
  dialog {
    .dialog-content {
      width: 688px;
      max-width: 688px;
      margin: auto;
      padding: 20px 20px 56px;
    }
  }
}
</style>