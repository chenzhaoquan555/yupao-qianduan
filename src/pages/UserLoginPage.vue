<template>
  <!--页面显示-->
  <van-nav-bar title="用户登录" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "@vant/compat";
import "vant/es/toast/style";

const  router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount : userAccount.value,
    userPassword : userPassword.value
  })
  console.log(res,'用户登录');
  if (res.code === 0 && res.data){
    Toast.success('登录成功')
    router.push('/')
    //router.replace(redirectUrl) //replace替换掉历史记录
  }
  else {
    Toast.fail('登录失败')
  }
};



</script>


<style scoped>

</style>
