<template>
  <!--  搜索栏页面-->
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0 ">请选择标签</div>

  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
    <!--可关闭标签 close方法就是用来关闭标签的时候,也取消选中的标签 方法需要传参,才能知道移除谁-->
  </van-row>

  <!--分割线-->
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
<!--这里有个问题 就是没选择标签,也会搜索 解决方式:这里的v-if 如果没有选择标签,则不显示搜索按钮-->
  <div style="padding: 12px">
    <van-button type="primary" v-if="activeIds.length !== 0" @click=doSearchResult() block >搜索</van-button>
  </div>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import "vant/es/toast/style";
import {useRouter} from "vue-router";



const router = useRouter();
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '学历',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大4', id: '大4'},
      {text: '大5', id: '大5'},
      {text: '大6', id: '大6'},
      {text: '大7', id: '大7'},
    ],
  }
];

let tagList = ref(originTagList);

const searchText = ref('');
const onSearch = () => {
//   把下面的两个父级数组打平,然后变成一个新的数组组合在一起
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    //复制一份数据
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(
        item => item.text.includes(searchText.value)
    );
    return tempParentTag;
  })
};

const onCancel = () => {
  searchText.value = '';
  // 还原标签
  tagList.value = originTagList;
};

const activeIds = ref([]);
const activeIndex = ref(0);


//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
}

/**
 * 执行搜索 调用后端
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>
<style scoped>


</style>
