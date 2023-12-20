

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <!--如果头像地址是正确,但显示是裂开了,大概率是源地址设置了防盗链,需要到index.html设置-->
  <van-card
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
      <!--     点击联系我 就跳转出用户的个人联系方式-->
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>


</template>

<script setup lang="ts">
import  {UserType} from "../models/user";

interface UserCardListProps{
  loading: boolean;
  userList: UserType[];
}
//withDefaults如果为空的话 可以设置一个默认值
const props = withDefaults(defineProps<UserCardListProps>(),{
  loading: true,
  //@ts-ignore
  userList: [] as UserType[]
});
</script>

<style scoped>

</style>
