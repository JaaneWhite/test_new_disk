<template>
  <div class="form-block" >
    <template v-if="store.state[store.state.currentFormName]">
      <div class="form-title">
        <span>{{ store.state[store.state.currentFormName].title }}</span>
      </div>
      <div class="warning-message" v-if="store.state[store.state.currentFormName].errorMessage">
        {{store.state[store.state.currentFormName].errorMessage}}
      </div>
      <div class="success-message" v-if="store.state[store.state.currentFormName].regSuccessMessage">
        {{store.state[store.state.currentFormName].regSuccessMessage}}
      </div>
      <div class="login-form">
        <div class="form-item" v-for="(field, index) in store.state[store.state.currentFormName].fields" :key="index">
          <label :for="field.id">{{ field.title }}</label>
          <div class="input-block">
            <input
                :type="field.type"
                v-model="field.value"
                :class="field.class"
                :id="field.id"
                :name="field.id"
                :maxlength="field.size ? field.size : 50"
                :placeholder="field.placeholder"
                @input="checkField(field)"
                v-if="field.id !== 'content'"
                required>
            <textarea
                v-else
                v-model="field.value"
                :class="field.class"
                :id="field.id"
                :name="field.id"
                :maxlength="field.size ? field.size : 50"
                :placeholder="field.placeholder"
                @input="checkField(field)"
            ></textarea>

            <button v-if="field.class === 'password'"
                    @click="store.commit('switchFieldType', {formName: store.state.currentFormName, fieldName: field.id} )">
              <img v-if="field.type === 'password'" src="../assets/icons/on-password.svg" alt="show password">
              <img v-else src="../assets/icons/off-password.svg" alt="hide password">
            </button>
            <div class="info-message" v-if="field.size">{{field.value.length}} / {{field.size}}</div>
            <div class="warning-message" v-if="warnings[field.id]">{{ warnings[field.id] }}</div>
          </div>

        </div>
        <div class="confirm-row">
          <div class="switch-text">
            <span>{{ store.state[store.state.currentFormName].text }}</span>
            <a class="green-link"
               @click="store.commit('switchForm')">{{ store.state[store.state.currentFormName].link.text }}</a>
          </div>
          <button
              class="text-btn no-img"
              @click.stop="goAction"
              type="button"
          >{{ store.state[store.state.currentFormName].btnText }}
          </button>
        </div>


      </div>
    </template>

  </div>
</template>

<script async setup>
import store from "@/store.js";
import {reactive} from "vue";

let warnings = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})


function checkField(field) {
  warnings[field.id] = '';
  if (!field.value) {
    warnings[field.id] = 'Поле должно быть заполнено'
  }
  else {
    if (field.id === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        warnings.email = 'Введите корректный Email'
      } else {
        warnings.email = ''
      }
    }
    else if (field.id === 'password') {

      if (field.value.length < 4 || field.value.length >= 12) {
        warnings.password = 'Длина пароля должна быть от 4 до 12 символов'
      } else {
        warnings.password = ''
      }
    }
    else if (field.id === 'confirmPassword') {
      if (store.state.registerForm.fields.password.value !== store.state.registerForm.fields.confirmPassword.value) {
        warnings.confirmPassword = 'Введенные пароли должны совпадать'
      } else {
        warnings.confirmPassword = ''
      }
    }
  }
  return !warnings[field.id]
}

function checkForm() {
  let formChecked = true;
  for (const fieldKey in store.state[store.state.currentFormName].fields) {
    if (!checkField(store.state[store.state.currentFormName].fields[fieldKey])) {
      formChecked = false
    }
  }
  return formChecked
}

async function goAction() {
  console.log('goAction')
  if (checkForm()) {
    console.log('checkForm', store.state[store.state.currentFormName].action)
    try {
      await store.dispatch(store.state[store.state.currentFormName].action)
    } catch (e) {
      console.log(e)
    }

  }

}


</script>

<style scoped lang="scss">
@use '../assets/main.scss' as main;
@media (min-width: 0) {
  .form-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
    padding-top: 36px;
    .form-title {
      display: flex;
      flex-direction: row;
      position: relative;
      margin-bottom: 28px;
      margin-right: 30px;
      @include main.h2-text-mob;
      color: var(--vt-c-white);
    }
    .login-form {
      width: 100%;
    }
    .confirm-row {
      display: flex;
      flex-direction: column-reverse;

      .switch-text {
        display: flex;
        margin-left: auto;
        margin-right: auto;
        margin-top: 12px;

        span {
          @include main.small-text-mob;
          color: var(--vt-c-gray);
          margin-right: 4px;
        }
      }
    }
  }
}

@media (min-width: 768px) {

  .form-block {
    padding-left: 36px;
    padding-right: 36px;
    padding-top: 36px;

    .form-title {
      @include main.h2-text;
    }

    .confirm-row {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;

      .switch-text {
        margin-left: 0;

        span {
          @include main.small-text;
        }
      }
    }
  }
}
</style>