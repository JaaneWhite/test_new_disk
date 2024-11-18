<template>
<div class="note-grid-item">
  <div class="note-item">
    <div class="note-title">
      <slot name="title"></slot>
      <div class="decor">
        <img src="../assets/icons/corner.svg" alt="corner">
      </div>
    </div>
    <div class="note-content">
      <slot name="content"></slot>
    </div>
    <div class="note-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>

</div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@use '../assets/main.scss' as main;
@media (min-width: 0) {
  .note-grid-item {
    display: grid;
    width: auto;
    .note-item {
      width: 100%;
      position: relative;
      background-color: var(--vt-c-green-light); /* Цвет блока */
      color: white;
      border-radius: 12px; /* Скругленные углы */
      box-shadow: 0 4px 6px var(--vt-c-dark); /* Тень */
      margin-bottom: 20px;
      box-sizing: border-box;
      padding: 20px 0;

      .note-title {
        display: flex;
        border-bottom: 1px solid var(--vt-c-green-middle);
        padding-bottom: 20px;
        padding-left: 28px;
        padding-right: 68px;
        @include main.h4-text-mob;
        .decor {
          background-color: var(--vt-c-dark);
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          img{
            width: 40px;
            height: 40px;
          }
        }
      }
      .note-content {
        padding-top: 20px;
        padding-left: 28px;
        padding-right: 28px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 12;
        -webkit-box-orient: vertical;
        overflow: hidden;

        @include main.normal-text-mob;
      }
      .note-bottom {
        display: flex;
        width: 100%;
        padding-left: 28px;
        padding-right: 28px;
        padding-top: 20px;
        box-sizing: border-box;
      }

    }
  }

  @media (min-width: 768px) {
    .note-item {
      .note-title {
        @include main.h4-text;
      }
      .note-content {
        @include main.normal-text;
      }
    }
  }
  @media (min-width: 1366px) {
    .note-grid-item {
      display: flex;
      width: auto;
      max-width: 380px;
      .note-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        //max-width: 380px;

      }
    }

  }
  @media (min-width: 1920px) {
    .note-grid-item {
      max-width: 505px;
    }
  }

}
</style>