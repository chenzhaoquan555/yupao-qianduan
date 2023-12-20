<!--编辑用户信息-->
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import { ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "@vant/compat";
import "vant/es/toast/style";
//获取路由参数
const route = useRoute();

const  router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});
//获得当前用户id
const userId = route.query.userId;



const oldValue = ref(editUser.value.currentValue);

const onSubmit = async () => {
  //如果修改的值与原来的值不变,则不向后端提交请求
  if (oldValue.value === editUser.value.currentValue){
    Toast.success('修改成功')
    router.back(); //返回上一层
    return;
  }
  const res = await myAxios.post('/user/update',{
    'id' : userId,
    // 动态语法 不写死
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  if (res.code === 0 && res.data > 0 ){
    Toast.success('修改成功')
    router.back(); //返回上一层
  }else {
  Toast.fail('修改失败');
  }
};

</script>

<style scoped>

</style>
