<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <!--    <van-button type="primary"  to="/team/add">创建队伍</van-button>-->
    <!--    <van-button type="primary"  @click="doAddTeam" >创建队伍</van-button>-->
    <van-tabs v-model:active="activeName" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <div style="margin-bottom: 16px"/>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="!teamList || teamList.length < 1 " description="数据为空"/>
  </div>
  <!--  这里将创建队伍的按钮移出div-->
  <van-button class="add-button" icon="plus" type="primary" @click="doAddTeam"/>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

import "vant/es/toast/style";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "@vant/compat";
import {showToast} from "vant";

//标签页的变量
const activeName = ref('public');

//跳转到加入队伍页
const router = useRouter();
//搜索框的输入内容绑定
const searchText = ref('');

const doAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

//由于出现两个同类型的请求方式和路径 就定义一个方法 这里面的val判定是因为后端有进行校验,如果为空,则不作为条件判断条件
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get('/team/list', {
    params: {
      searchText: val,
      status,
    }
  })
  if (res?.code === 40100) {
    router.push('/user/login')
    Toast('请先登录');
  }
  if (res?.code === 0) {
    showToast('搜索队伍成功')
    teamList.value = res.data;
  } else {
    Toast.fail('搜索队伍失败')
    router.back();
  }
};

/*onMounted(async () =>{
  const res = await myAxios.get('/team/list')
  console.log(res);
  if (res?.code===0){
    teamList.value = res.data;
  }else {
    Toast.fail('获取队伍列表失败')
  }
})*/
onMounted(() => {
  listTeam();
})

//搜索触发事件
const onSearch = (val) => {
  listTeam(val);
};
//标签页切换时间
const onTabChange = (name: string) => {
  //查询公开
  if (name === 'public') {
    listTeam(searchText.value, 0)
  } else {
    //查询加密房间
    listTeam(searchText.value, 2)
  }
}
</script>


<style scoped>

</style>
