<template>
  <header>
    <div class="header-row container" :class="store.state.token ? 'note' : ''">
      <login-btn v-if="!store.state.token"/>
      <user-info v-else />

    </div>
  </header>
</template>

<script setup>
import LoginBtn from "@/components/loginBtn.vue";
import store from "@/store.js";
import UserInfo from "@/components/userInfo.vue";
import {onMounted} from "vue";


</script>


<style scoped lang="scss">
@media (min-width: 0) {
  header {
    display: flex;
    width: 100%;

    .header-row {
      justify-content: flex-end;
      background: url("@/assets/icons/logo.svg") no-repeat left 20px center;
      background-size: 154px;
      &.note {
        background-image: url("@/assets/icons/logo_sm.svg");
        background-size: 37px;
      }
    }
  }
}
@media (min-width: 768px) {
  header {
    .header-row {
      background-size: 219px;
      &.note {
        background-image: url("@/assets/icons/logo.svg");
        background-size: 219px;
      }
    }
  }

}

</style>