<script setup>
import IconLeftBack from '../../components/Icons/icon-leftBack.vue';
import IconComService from '../../components/Icons/icon-com-service.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  text: String,     // 標題
  url: String,      // 路由
  default: "標題",
})



const onClickLeft = (url) => {
  if (url) {        // 如果 props 有帶入路由path，就前往該目的地
    router.push({
      path: url,
    })
  } else if (!window.previousRoute.name) {  // 若首次進來, 就回到首頁
    router.push({
      path: '/'
    })
  } else {          // 否則就回上一頁
    history.back();
  }
}
</script>


<template>
  <div class="headerCross-wrapper">
    <van-nav-bar
      :title="props.text"
      left="返回"
      left-arrow
      @click-left="onClickLeft(url)"
    >
      <template #left>
        <IconLeftBack />
      </template>
      <template #right>
        <IconComService />
      </template>
    </van-nav-bar>
  </div>
</template>


<style lang="scss" scoped>
.van-nav-bar {
  background: var(--bg-color)
}

:deep(.van-nav-bar__content) {
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 1.2267rem;
}

:deep(.van-nav-bar__title) {
  color: var(--font-color) !important;
  font-weight: 650;
  font-size: .42667rem !important;
  max-width: 60%;
  margin: 0 auto;
}

.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
</style>