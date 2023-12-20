<template>
  <!--如果头像地址是正确,但显示是裂开了,大概率是源地址设置了防盗链,需要到index.html设置-->
  <van-card
      v-for="team in props.teamList"
      :desc=team.description
      :title="`${team.name}`"
      :thumb="ikun"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ '最大人数:' + team.maxNum }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间:' + team.expireTime }}
      </div>
      <div v-if="team.createTime">
        {{ '创建时间:' + team.createTime }}
      </div>
    </template>

    <template #footer>
      <!--    加入队伍就发送请求 创建人就不用显示加入队伍按钮-->
<!--      <van-button size="small" plain type="primary" v-if="team.userId !==currentUser?.id && !team.hasJoin"
                  @click="()=>{
                    //这里不能用.value
                    joinTeamId = team.id;
                    if(team.status === 0 ){
                      doJoinTeam()
                    }else {
                        showPasswordDialog = true;
                    }
                  }">加入队伍
      </van-button>-->
      <van-button size="small" plain type="primary" v-if="team.userId !==currentUser?.id && !team.hasJoin"
                  @click="preJoinTeam(team)">加入队伍
      </van-button>
      <!--      todo 这里要判定该队伍是登录用户创建的,就可以进行修改 创建用户id等于登录用户id-->
      <van-button size="small" v-if="team.userId ===currentUser?.id" plain type="primary"
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <!--      todo 仅加入队伍可见 创建人不可见-->
      <van-button size="small" v-if="team.userId !==currentUser?.id && team.hasJoin" plain type="primary"
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button size="small" v-if="team.userId ===currentUser?.id" plain type="danger"
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
  <van-dialog v-model:show="showPasswordDialog" title="输入队伍密码" show-cancel-button @confirm="doJoinTeam" @cancel="doCancel">
    <van-field v-model="password" type="password" placeholder="请输入队伍密码"/>
  </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import ikun from '../assets/队伍头像.jpg'
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "@vant/compat";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

const showPasswordDialog = ref<boolean>(false);
const password = ref('');
const joinTeamId =  ref();

interface UserCardListProps {
  teamList: TeamType[];
}

//withDefaults如果为空的话 可以设置一个默认值
const props = withDefaults(defineProps<UserCardListProps>(), {
  //@ts-ignore
  teamList: [] as teamType[]
});

const preJoinTeam=(team: TeamType)=>{
  joinTeamId.value = team.id;
  if(team.status === 0 ){
    doJoinTeam()
  }else {
    showPasswordDialog.value = true;
  }
}

const doCancel = ()=>{
  joinTeamId.value = 0;
  password.value='';
}
/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value){
    return
  }
  //todo 要判定如果房间是加密房间 就要出现密码输入框
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0) {
    Toast.success('成功加入队伍')
    doCancel();
  } else {
    Toast.fail(res.description)
    doCancel();
  }
}


/**
 * 退队伍
 */
const doQuitTeam = async (id: number) => {

  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('成功退出队伍')
  } else {
    Toast.fail(res.description)
  }
}

/**
 * 解散队伍
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {id});
  if (res?.code === 0) {
    Toast.success('成功删除队伍')
  } else {
    Toast.fail(res.description)
  }
}


const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const router = useRouter();
const doUpdateTeam = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id
    }
  })
}

</script>

<style scoped>

</style>
