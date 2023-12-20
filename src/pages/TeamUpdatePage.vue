<template>
  <div id="teamUpdate">
    <van-form @submit="doSubmit">
      <van-cell-group inset>
        <van-field
            v-model="updateTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请输入队伍名称' }]"
        />
        <van-field
            v-model="updateTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <!--时间选择器 todo 无法精确到时分秒,这个后续优化-->
        <van-field
            v-model="updateTeamData.expireTime"
            is-link
            :rules="[{ required: true, message: '请选择过期时间' }]"
            readonly
            name="datePicker"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              :min-date="minData"
              title="选择过期时间"
              @confirm="onConfirm"
              @cancel="showPicker = false"/>
        </van-popup>
        <!--        分割线-->

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="updateTeamData.status" direction="horizontal">
              <van-radio name="0" >公开</van-radio>
              <van-radio name="1" >私有</van-radio>
              <van-radio name="2" >加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="String(updateTeamData.status) === '2'"
            v-model="updateTeamData.password"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
        />


      </van-cell-group>

      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          创建队伍
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "@vant/compat";
import "vant/es/toast/style";
import {showToast} from "vant";
import {TeamType} from "../models/team";


const router = useRouter()
const route = useRoute();
const id: number = route.query.id;

//定义对象接受 并进行传参 三个点的意思代表addTeamData数据被改变 不会影响initFormData的数据
const updateTeamData = ref<TeamType>({})
//获取之前的队伍信息

onMounted(async ()=>{
  if (id <= 0){
    Toast.fail('加载队伍失败')
  }
  const res = await myAxios.get('/team/get',{
    params:{
      id
    }})
  if (res?.code ===0){
    showToast('搜索队伍成功')
    updateTeamData.value = res.data;

  }else {
    Toast.fail('搜索队伍失败')
    router.back();
  }
})

const minData = ref(new Date());
//时间选择的相关变量
const result = ref('');
const showPicker = ref(false);
const onConfirm = ({selectedValues}) => {
  updateTeamData.value.expireTime = selectedValues.join('-');
  console.log(updateTeamData.value.expireTime)
  showPicker.value = false;
};

const currentTime = ref(['12', '00']);

const doSubmit = async () => {
  const postData = {
    ...updateTeamData.value,
    status: Number(updateTeamData.value.status)
  }
  //todo 前端参数校验
  const res = await myAxios.post("team/update",
      updateTeamData.value
  )

  if (res?.code === 0) {
    Toast.success('更新成功')
    router.push({
      path: '/team',
      //不记录创建队伍路径,直接返回队伍页面
      replace: true
    })
  } else {
    Toast.fail('更新失败')
  }


}


</script>


<style scoped>

</style>
