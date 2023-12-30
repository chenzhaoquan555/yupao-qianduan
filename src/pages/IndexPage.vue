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
  <UserCardList :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1 " description="数据为空"/>

  <van-pagination v-model="currentPages" :page-count="total" mode="simple" />
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "@vant/compat";
import "vant/es/toast/style";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

//获取上个界面传过来的参数 在把参数传到后端去


//获取用户列表 {}是为了骨架屏效果
const userList = ref([{},{},{},{},{},{},{},{}]);
const loading = ref(true);
const router = useRouter();
const total = ref(12)
const currentPage = async () =>{
  loading.value = true;
  // 这下面的url  是后端的请求接口url
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1
    }
  })
      .then(function (response) {
        if (response.code === 40100) {
          router.push('/user/login')
          Toast('请先登录');
          return ;
        }
        Toast('获取用户列表成功');
        total.value=response?.data?.pages;
        return response?.data?.records
      })
      .catch(function (error) {
        console.log('/user/search/tags succeed', error);
      })

  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;

  }
  loading.value = false;
}
//该页面初始化渲染的时候 就去执行这个方法
onMounted(async () => {
  currentPage();
})

/*/!**
 * 制作假数据 展示效果
 *!/
const muckUser = {
  id: 1,
  userName: 'muck',
  userAccount: 'muck',
  gender: 1,
  phone: '13000000000',
  email: 'muck@qq.com',
  planetCode: '100',
  avatarUrl: 'https://profile-avatar.csdnimg.cn/0cef25e0d2ea42078701a20a3d952f76_tisg0.jpg!1',
  tags: ["java", "python", "大一", "emo", "单身"],
  createTime: Date,
  profile: '一名精神小伙,目前还有头发~哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
}*/


</script>
<style scoped>


</style>
