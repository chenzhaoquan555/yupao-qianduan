<!--基础的全局布局页面-->


<template>
  <!--页面显示-->
  <van-nav-bar v-if="title!==DEFAULT_USER"
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      right-text="按钮"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <!-- 最基础的跳转页面方式-->
  <!--   <div id="content">
    <template v-if="active === 'Index'">
      <Index />
    </template>
    <template v-else-if="active === 'Team'">
      <Team />
    </template>
  </div>
 -->
  <!--  下面这个是渲染路由跳转后的页面,如果没有这个,则不会渲染-->
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route v-if="title!==DEFAULT_USER" @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<script setup lang="ts">
//  定义变量和函数
import {Toast} from "@vant/compat";
import "vant/es/toast/style";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/routes.ts";

//引入router
const router = useRouter();
const route = useRoute();
//标题内容变化监听
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);
const DEFAULT_USER='用户登录';

router.beforeEach((to) => {

  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path

  })
  title.value = route?.name ?? DEFAULT_TITLE;
  //title.value=route?.name?? DEFAULT_TITLE;
})


const onClickRight = () => {
  router.push("/search");
};
const onClickLeft = () => {
  router.back();
};
const onChange = (index) => Toast(`标签 ${index}`);
//标题跳转获取值


</script>


<style scoped>
/*局部样式*/
#content {
  padding-bottom: 50px;
}
</style>


