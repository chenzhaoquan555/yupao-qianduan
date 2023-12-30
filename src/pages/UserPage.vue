<template>
  <van-cell title="当前用户" :value="user?.userName" />
  <van-cell title="个人信息" is-link to="/user/update" />
  <van-cell title="我创建的队伍" is-link to="/user/create" />
  <van-cell title="我加入的队伍" is-link to="/user/join" />

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "@vant/compat";
import "vant/es/toast/style";
/*const user = {
  id: 1,
  userName: '鱼皮',
  userAccount: 'yupi',
  gender: '男',
  phone: '15218127104',
  email: '29103982@qq.com',
  avatarUrl: 'https://srv.carbonads.net/static/30242/3913207e72f710f619a5492de1f4271d876d8c0f',
  createTime: new Date(),
  planetCode: '12345',
}*/
const router = useRouter();
const user = ref()
/**
 * 在页面加载的时候就去获取用户信息
 */
onMounted(async () => {
  const res = await myAxios.get('/user/current');
  if (res.code === 0) {
    user.value = res.data;
  } else if (res.code === 40100) {
    router.push('/user/login');
    Toast.fail('请登录')
  } else {
    Toast.fail('获取用户失败')
  }
});

// TODO 后期可将重复的代码封装成函数 套用两层方法
/*const toEditCell = (editKey: string, editName: string) => {
  toEdit(editKey, editName, user.value[editKey], user.value.id);
}*/


const toEdit = (editKey: string, editName: string, currentValue: string,userId: number) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue,
      userId,
    }
  })
};


const genderText = computed(() => {
  return user.value.gender === 1 ? '男' : '女';
});

const userLayOut = async () => {
  const res = await myAxios.post('/user/logout',{});
  if (res.code === 0){
    await router.push('/user/login')
  }
}
</script>


<style scoped>

</style>
