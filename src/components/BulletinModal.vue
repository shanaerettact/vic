<script setup>
import { inject, ref, watch, onMounted } from "vue";
import ActiveList_sec from "@/components/Blocks/ActiveList_sec.vue";

const common = inject("common");
const noShowToday = ref(false);

const COOKIE_NAME = "bulletin_no_show_date";

function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function getCookie(name) {
  const v = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return v ? v.pop() : "";
}

function setCookie(name, value, date) {
  document.cookie = name + "=" + value + "; path=/; expires=" + date.toUTCString();
}

function shouldHideToday() {
  return getCookie(COOKIE_NAME) === getTodayStr();
}

watch(
  () => common.showActive,
  (show) => {
    if (show) {
      if (!common.openActiveBypassCookie && shouldHideToday()) {
        common.showActive = false;
      } else {
        noShowToday.value = false;
      }
    } else {
      common.openActiveBypassCookie = false;
    }
  }
);

onMounted(() => {
  if (common.showActive && !common.openActiveBypassCookie && shouldHideToday()) {
    common.showActive = false;
  }
});

function onPopupClose() {
  if (noShowToday.value) {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    setCookie(COOKIE_NAME, getTodayStr(), d);
  }
}
</script>

<template>
  <div class="bulletinModal">
    <van-popup
      v-model:show="common.showActive"
      :style="{ width: '100%', height: '80%', background: 'var(--bg-color)', margin: '0 auto' }"
      position="center"
      closeable
      @close="onPopupClose"
    >
    
      <div class="contentBox relative">
        <div v-show="!common.openActiveBypassCookie" class="no-show-row absolute top-1 left-0">
          <van-checkbox v-model="noShowToday" shape="square">今日不再顯示</van-checkbox>
        </div>
        <ActiveList_sec />
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.bulletinModal {
  :deep(.van-popup) {
    border-radius: 10px;
    background-color: var(--bg-color);
    max-width: 10rem;
  }

  .contentBox {
    height: 100%;
    padding-top: 40px;
  }

  .no-show-row {
    padding: 8px 16px;
    :deep(.van-checkbox__label) {
      color: var(--font-color, #333);
    }
    :deep(.van-checkbox__icon--checked .van-icon) {
      background-color: #f0cd4f !important;
      border-color: #f0cd4f !important;
    }
  }
}
</style>
