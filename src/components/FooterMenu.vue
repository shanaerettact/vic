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
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  bottom: 0;
  z-index: 888;
  border-radius: 0.32rem 0.32rem 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.08);

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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    // Hover effect for all items
    &:hover {
      :deep(.van-badge__wrapper img:not(.home-icon)) {
        transform: scale(1.15);
      }
    }

    // Active ripple effect background
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(240, 205, 79, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.4s ease, height 0.4s ease;
    }

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
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      filter: grayscale(30%) opacity(0.7);
    }

    :deep(.van-badge__wrapper img.home-icon) {
      width: 1.3rem;
      height: 1.3rem;
      position: relative;
      bottom: .62rem;
      filter: none;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      // Glow effect for home icon
      filter: drop-shadow(0 4px 8px rgba(240, 205, 79, 0.3));
    }

    :deep(.van-tabbar-item__text) {
      font-size: 0.29333rem;
      color: var(--font-color);
      word-break: break-word;
      text-align: center;
      font-weight: 650;
      transition: all 0.3s ease;
      opacity: 0.7;
    }
  }
}

// Active state with animations
:deep(.van-tabbar-item--active) {
  background-color: transparent;
  color: var(--theme-color);
  
  // Active ripple glow
  &::before {
    width: 1.6rem;
    height: 1.6rem;
  }
  
  .van-badge__wrapper img:not(.home-icon) {
    transform: scale(1.2) translateY(-2px);
    filter: grayscale(0%) opacity(1) drop-shadow(0 2px 8px rgba(240, 205, 79, 0.4));
    animation: iconBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .van-badge__wrapper img.home-icon {
    transform: scale(1.1) translateY(-4px);
    filter: drop-shadow(0 6px 16px rgba(240, 205, 79, 0.5));
    animation: homePulse 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .van-tabbar-item__text {
    color: var(--theme-color);
    opacity: 1;
    transform: translateY(-1px);
    text-shadow: 0 0 8px rgba(240, 205, 79, 0.3);
  }
}

// Icon bounce animation
@keyframes iconBounce {
  0% {
    transform: scale(1) translateY(0);
  }
  40% {
    transform: scale(1.3) translateY(-6px);
  }
  60% {
    transform: scale(1.15) translateY(-1px);
  }
  100% {
    transform: scale(1.2) translateY(-2px);
  }
}

// Home icon pulse animation
@keyframes homePulse {
  0% {
    transform: scale(1) translateY(0);
  }
  30% {
    transform: scale(1.2) translateY(-8px);
  }
  50% {
    transform: scale(1.05) translateY(-2px);
  }
  100% {
    transform: scale(1.1) translateY(-4px);
  }
}

// Glow pulse for home icon (continuous)
@keyframes glowPulse {
  0%, 100% {
    filter: drop-shadow(0 6px 16px rgba(240, 205, 79, 0.5));
  }
  50% {
    filter: drop-shadow(0 8px 24px rgba(240, 205, 79, 0.7));
  }
}

// Light theme adjustments
:root.light-theme {
  .tabbar {
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
  
  .tabbar-item {
    &::before {
      background: radial-gradient(circle, rgba(201, 162, 39, 0.12) 0%, transparent 70%);
    }
    
    :deep(.van-badge__wrapper img) {
      filter: grayscale(30%) opacity(0.6);
    }
    
    :deep(.van-badge__wrapper img.home-icon) {
      filter: drop-shadow(0 4px 8px rgba(201, 162, 39, 0.25));
    }
    
    :deep(.van-tabbar-item__text) {
      color: var(--font-color);
      opacity: 0.6;
    }
  }
  
  :deep(.van-tabbar-item--active) {
    .van-badge__wrapper img:not(.home-icon) {
      filter: grayscale(0%) opacity(1) drop-shadow(0 2px 8px rgba(201, 162, 39, 0.35));
    }
    
    .van-badge__wrapper img.home-icon {
      filter: drop-shadow(0 6px 16px rgba(201, 162, 39, 0.4));
    }
    
    .van-tabbar-item__text {
      color: #8b6914;
      text-shadow: 0 0 8px rgba(201, 162, 39, 0.2);
    }
  }
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
