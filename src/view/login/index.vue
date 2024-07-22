<template>
  <div class="login">
    <div class="login-main">
      <div class="login-logo">
        <img src="@/assets/image/logo.svg" alt="">FastGPT
      </div>
      <div class="login-ipt">
        <el-input v-model="userName" placeholder="用户名" />
      </div>
      <div class="login-ipt login-ipt-pwd">
        <el-input
          v-model="password"
          type="password"
          placeholder="密码"
          show-password
        />
      </div>
      <el-button class="login-submit" color="#3370ff" @click="loginFun">Default</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {} from "vue-router"
import {postLogin, postRtzhLogin} from "@/api/user/api.ts";
const userName = ref('')
const password = ref('')

const props = defineProps({});
const emit = defineEmits([]);

const loginFun = () => {
  postLogin({
    username: userName.value,
    password: password.value,
  })
  // postRtzhLogin({
  //   username: userName.value,
  //   password: password.value,
  // })
}
</script>

<style lang='less' scoped>
.login {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  width: 100%;
  height: 100%;
  padding-inline-start: 0;
  padding-inline-end: 0;
  background: url("@/assets/image/login/login-bg.svg") 0 0 / cover no-repeat;

  .login-main{
    display: flex;
    flex-direction: column;
    background: var(--gpt-colors-white);
    padding-top: 5vh;
    padding-bottom: 5vh;
    width: auto;
    height: 700px;
    max-height: 90vh;
    padding-inline: 88px;
    border-radius: 24px;
    box-shadow: rgba(19, 51, 107, 0.2) 0 0 1px 0, rgba(19, 51, 107, 0.2) 0 32px 64px -12px;
  }

  .login-logo{
    display: flex;
    width: 380px;
    height: 56px;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 42px;

    font-size: var(--gpt-fontSizes-2xl);
    font-weight: var(--gpt-fontWeights-bold);

    > img{
      width: 56px;
      margin-right: var(--gpt-space-3);
    }
  }

  :deep(.el-input){

    .el-input__inner{
      height: 40px;
      font-size: var(--gpt-fontSizes-md);
      padding: 0 var(--gpt-space-4);
      border-radius: 8px;
      border: 1px solid var(--gpt-colors-borderColor-low);
      background: var(--gpt-input-bg);

      &:focus{
        border-color: var(--gpt-colors-primary-500);
        box-shadow: rgba(51, 112, 255, 0.15) 0 0 0 2.4px;
        background: var(--gpt-colors-white);
      }
    }

    .el-input__wrapper{
      padding: 0;
      box-shadow: none;
      border: none;
    }

    .el-input__suffix{
      position: absolute;
      right: 10px;
    }
  }

  .login-ipt-pwd{
    margin: 21px 0;
  }

  .login-submit{
    height: 40px;
  }
}

</style>
