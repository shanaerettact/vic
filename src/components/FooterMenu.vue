<script setup>
import { reactive, inject, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import SideBar from "./Pages/SideBar.vue";
import PromotionList from "./Pages/PromotionList.vue";

const common = inject("common");
const { t, locale } = useI18n();

const route = useRoute();

watch(
  () => route.path,
  (path) => {
    if (path === "/promotionlist") {
      common.activeItem = "activity";
    } else if (path === "/" && (common.activeItem === "activity" || common.activeItem === "")) {
      common.activeItem = "IndexGameList";
    }
  },
  { immediate: true }
);

// const props = defineProps(["active"]);

// 下選單由左至右 改為 選單 體育 首頁 優惠 (活動的圖跟連結) 客服

const list = computed(() => [
  {
    value: "1",
    title: t("message.nav-Menu"),
    icon: "/images/menu-icon.webp",
    active: "/images/menu-icon-active.webp",
    to: "",
  },
  {
    value: "sport_game",
    title: t("message.nav-SportsEvents"),
    // icon: "/images/sport-icon.webp",
    icon: "/images/sport-icon.webp",
    active: "/images/sport-icon-active.webp",
    // active: "/images/sport-icon-active.webp",
    to: "/",
  },
  {
    value: "IndexGameList",
    title: t("message.Home"),
    icon: "/images/Index_ico.png",
    active: "/images/Index_ico.png",
    to: "/",
  },
  {
    value: "activity",
    title: t("message.nav-Activity"),
    icon: "/images/activity-icon.webp",
    active: "/images/activity-icon-active.webp",
    to: "/promotionlist",
  },
  // {
  //   value: "elec_game",
  //   title: t("message.nav-Referrals"),
  //   icon: "/images/recommend-icon.webp",
  //   active: "/images/recommend-icon-active.webp",
  //   to: "/",
  // },
  {
    value: "5",
    title: t("message.nav-Service"),
    icon: "/images/chat-icon.webp",
    active: "/images/chat-icon-active.webp",
    to: "",
  },
])


</script>

<template>
  <div class="footer-menu-wrapper">
    <van-tabbar
      class="tabbar"
      v-model="common.activeItem"
      @change="common.onChange"
    >
      <van-tabbar-item
        class="tabbar-item"
        v-for="(item, index) in list"
        :key="index"
        :name="item.value"
        :to="item.to"
      >
        <!-- .home-icon -->
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img
            :src="props.active
              ? common.baseUrl + item.active
              : common.baseUrl + item.icon"
            :class="item.value == 'IndexGameList' ? 'home-icon' : ''"
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- sideBar -->
    <div class="sideBar">
      <van-popup
        v-model:show="common.showSideBar"
        :style="{ width: '100%', height: '80%', background: 'var(--bg-color)', margin: '0 auto' }"
        position="left"
        closeable
        round
      >
        <div style="bottom: 10px; height: 100%;">
          <SideBar />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  display: flex;
  width: 100%;
  background: var(--bg-color);
  bottom: 0;
  z-index: 888;
  // padding-bottom: env(safe-area-inset-bottom);   // iphone16 往下滑有懸浮問題, 取消此項後觀察
  border-radius: 0.21333rem 0.21333rem 0 0;

  @media screen and (min-width: 600px) {
    max-width: 11.41333rem;
    left: 50% !important;
    bottom: 0 !important;
    transform: translate(-50%) !important;
  }

  &:after {
    content: initial;
  }

  &-item {
    position: relative;
    width: 25%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    :deep(.van-badge__wrapper) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      height: 0.53333rem;
      margin-bottom: 0.1111rem;
    }

    :deep(.van-badge__wrapper img) {
      width: 0.48rem;
      height: 0.42667rem;
    }

    :deep(.van-badge__wrapper img.home-icon) {
      width: 1.3rem;
      height: 1.3rem;
      position: relative;
      bottom: .62rem;
    }

    :deep(.van-tabbar-item__text) {
      font-size: 0.29333rem;
      color: var(--font-color);
      word-break: break-word;
      text-align: center;
      font-weight: 650;
    }
  }
}

:deep(.van-tabbar-item--active) {
  // background-color: var(--bg-nav-active-color);
  background-color: #00000000;
  color: var(--theme-color);
}

:deep(.sideBar .van-popup) {
  // background-color: #202115;
  transition: .15s;

  @media screen and (min-width:600px) {
    max-width: 11.413rem;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

}
</style>