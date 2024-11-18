<template>
  <div class="start-page-block">
    <div class="start-page-left">
      <div class="start-page-title">
        <h1>Мои<br> заметки</h1>
      </div>
      <div class="start-page-text">
        <h3>Не забывай о важном, храни его в облаке.</h3>
      </div>
    </div>
    <div class="start-page-image">
      <img src="../assets/home.png" alt="home">
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@use '../assets/main.scss' as main;
@media (min-width: 0) {
  .start-page-block {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    .start-page-left {
      width: 100%;
      .start-page-title {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        h1 {
          @include main.h1-text-mob;
          text-align: center;
          padding: 0;
          margin: 0;
        }
      }
      .start-page-text {
        display: flex;
        justify-content: center;
        h3 {
          @include main.h3-text-mob;
          text-align: center;
          padding: 0;
          margin: 0;
          color: var(--vt-c-gray);
        }
      }
    }

    .start-page-image {
      display: flex;
      width: 100%;
      img {
        display: flex;
        width: 100%;
      }
    }
  }
  @media (min-width: 768px) {
    .start-page-block {
      .start-page-title {
        h1 {
          @include main.h1-text;
          text-align: center;
          padding: 0;
          margin: 0;
        }
      }
      .start-page-text {
        display: flex;
        justify-content: center;
        h3 {
          @include main.h3-text;
          text-align: center;
          padding: 0;
          margin: 0;
          color: var(--vt-c-gray);
        }
      }
    }
  }
  @media (min-width: 1366px) {
    .start-page-block {
      flex-direction: row;
      .start-page-left {
        width: 50%;
        margin-top: auto;
        margin-bottom: auto;
        .start-page-title {
          justify-content: flex-start;
          h1 {
            @include main.h1-text;
            text-align: left;
            padding: 0;
            margin: 0;
          }
        }

        .start-page-text {
          display: flex;
          justify-content: flex-start;

          h3 {
            @include main.h3-text;
            text-align: left;
            padding: 0;
            margin: 0;
            color: var(--vt-c-gray);
          }
        }
      }
      .start-page-image {
        width: 50%;
      }
    }
  }
}
</style>