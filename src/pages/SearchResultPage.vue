<!--  搜索结果页面-->

<template>
<!--  &lt;!&ndash;如果头像地址是正确,但显示是裂开了,大概率是源地址设置了防盗链,需要到index.html设置&ndash;&gt;
  <van-card
      v-for="user in userList"
      :desc=user.profile
      :title="`${user.userName}(${user.planetCode})` "
      :thumb=user.avatarUrl
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tags in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tags }}
      </van-tag>
    </template>
    <template #footer>
&lt;!&ndash;     点击联系我 就跳转出用户的个人联系方式&ndash;&gt;
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>-->
<!--  上面的代码优化成一个组件 : UserCardList.vue-->

  <UserCardList :user-list="userList" :loading="loading"/>
  <van-empty v-if ="!userList || userList.length < 1 " description="暂无符合结果" />


</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import qs from "qs";
import { Toast } from "@vant/compat";
import "vant/es/toast/style";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

//获取上个界面传过来的参数 在把参数传到后端去
const {tags} = route.query;


//获取用户列表
const userList = ref([{},{},{},{},{},{},{}]);
const loading = ref(true);

//该页面初始化渲染的时候 就去执行这个方法
onMounted(async () => {
  loading.value=true;
  // 这下面的url  是后端的请求接口url
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList : tags
    },
    // 序列化
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  })
      .then(function (response) {
        Toast('获取用户列表成功');
        return response ?.data
      })
      .catch(function (error) {
        console.log('/user/search/tags succeed',error);
      })

  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags =JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value=false;

})


/**
 * 制作假数据 展示效果
 */
const muckUser = {
  id: 1,
  userName: 'muck',
  userAccount: 'muck',
  gender: 1,
  phone: '13000000000',
  email: 'muck@qq.com',
  planetCode: '100',
  avatarUrl: 'https://profile-avatar.csdnimg.cn/0cef25e0d2ea42078701a20a3d952f76_tisg0.jpg!1',
  tags: ["java", "python", "大一","emo","单身"],
  createTime: Date,
  profile: '一名精神小伙,目前还有头发~哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
}




</script>
<style scoped>


</style>
