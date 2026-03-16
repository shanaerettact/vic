<script setup>
import { ref, reactive, provide, computed, watch } from "vue";
import { useCustomRouter, useRouterAnimate } from "./router/custRouter";
import { showToast } from "vant";
import { baseAjax, baseAjaxImage } from "./api/index";
import { useI18n } from "vue-i18n";
import { GlobalData } from "./global.data";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import FooterMenu from "./components/FooterMenu.vue";
import FooterRulesModal from "./components/FooterRulesModal.vue";
import IconData from "./components/Icons/IconData.vue";

const router = useCustomRouter();
const route = useRoute();
const needAnimate = useRouterAnimate();
const transitionMode = ref("out-in");

const showFooter = computed(() => {
  return !route.meta.hideFooter
})

const { t, locale } = useI18n();


// Theme management
const isDarkTheme = ref(localStorage.getItem('vic-theme') !== 'light');

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.remove('light-theme');
  } else {
    document.documentElement.classList.add('light-theme');
  }
  localStorage.setItem('vic-theme', isDark ? 'dark' : 'light');
};

// Apply theme on load
applyTheme(isDarkTheme.value);

const common = reactive({
  user: {},
  banner: [],
  group: [],
  activePage: "IndexGameList",
  activeItem: "",
  gameCode: "",
  hall: [],
  menu: [],
  qrcode: "",
  vip: {},
  vips: [],
  loading: true,
  gameActive: 1,
  rankActive: true,
  showCross: true,
  showSideBar: false,
  showActive: false,
  openActiveBypassCookie: false,
  showFooterRules: false,
  footerRulesType: "",
  baseUrl: "",
  addrBook: false,
  languageReady: false,
  invite: "",
  primeCoinName: "VicCoin",
  isDarkTheme: isDarkTheme,
  toggleTheme: () => {
    isDarkTheme.value = !isDarkTheme.value;
    applyTheme(isDarkTheme.value);
  },
  baseAjax: baseAjax,
  baseAjaxImage: baseAjaxImage,
  $t: t,
  alert: (type, text) => {
    showToast({
      message: text,
      icon: type == "" ? "success" : "/fail.webp",
      duration: 3000,
      wordBreak: 'break-word',
    });
  },
  toBack: () => {
    router.back();
  },
  toRouter: (url) => {
    router.push({
      path: url,
    });
  },
  toRouterArg: (url, args) => {
    let data = {};
    for (const key in args) {
      if (Object.hasOwnProperty.call(args, key)) {
        data[key] = args[key];
      }
    }
    router.push({
      path: url,
      query: data,
    });
  },
  systemInit: async () => {
    try {
      const res = await common.baseAjax("GET", "/file/system.json");
      let siteTitle = res.site_title;
      document.title = localStorage.getItem("site_title");
      if (document.title == "") {
        localStorage.setItem("site_title", res.site_title);
        document.title = localStorage.getItem("site_title");
      } else if (document.title !== siteTitle) {
        localStorage.setItem("site_title", res.site_title);
        document.title = res.site_title;
      } else {
        document.title = siteTitle;
      }
    } catch (error) {
      console.log(error);
    }
  },
  userInit: async () => {
    try {
      const res = await common.baseAjax("POST", "/user/index");
      if (res.code == 1) {
        common.user = res.data.user;
        common.vip = res.data.vip;
        common.vips = res.data.vips;
        return true
      } else if (res.code == 4) {
        common.user = {};
        return false
      }
    } catch (error) {
      console.log(error);
    }
  },
  homeInit: async () => {
    try {
      const res = await common.baseAjax("POST", "/site/home");
      if (res.code == 1) {
        common.banner = res.data.banner;
        common.group = res.data.group;
        common.hall = res.data.hall;
      }
    } catch (error) {
      console.log(error);
    }
  },
  menuInit: async () => {
    try {
      const res = await common.baseAjax("POST", "/site/menu");
      common.languageReady = false;
      if (res.code == 1) {
        common.menu = res.data.menu;
        let lang = localStorage.getItem("lang")
        let serverLang = res.data.language
        if (!['tw', 'cn', 'en'].includes(serverLang)) {
          common.alert("fail", "Language error")
          common.languageReady = true;
          common.loading = false;
          return
        }
        if (lang == serverLang) {
          common.languageReady = true;
        } else if (lang && lang !== serverLang) {
          locale.value = lang
          let form = {
            language: lang,
          };
          try {
            let res2 = await common.baseAjax("POST", "/site/language", form)
            if (res2.code == 1) {
              common.menuInit()
            } else {
              common.alert("fail", res2.msg)
            }
          } catch (error) { console.log(error) }
        } else if (!lang) {
          locale.value = res.data.language;
          common.languageReady = true;
        }
      }
    } catch (error) {
      console.log(error);
    }
    common.loading = false
  },
  toGame: async (code, url) => {
    window.open(`/#/game?code=${code}&url=${url}`)
    
  },
  balanceInit: async () => {
    common.loading = true;
    try {
      const res = await common.baseAjax("POST", "/gc-api/refresh-balance");
      if (res.code == 1) {
        common.user.balance = res.data.balance;
      } else {
        common.alert("fail", res.msg);
      }
      common.loading = false;
    } catch (error) {
      console.log(error);
    }
  },
  onChange: (index) => {
    if (index == 1) {
      if (common.activeItem == "1") {
        common.activeItem = "0";
      }
      common.showSideBar = true;
    } else if (index == "sport_game") {
      common.activePage = "GameCategory"
      common.gameCode = index
    } else if (index == "IndexGameList") {
      common.activePage = "IndexGameList"
    }
    else {
      return false
    }
  },
  changeLanguage: async (val) => {
    let form = {
      language: val,
    };
    common.loading = true
    common.showSideBar = false
    try {
      const res = await common.baseAjax("POST", "/site/language", form);
      if (res.code == 1) {
        localStorage.setItem("lang", val);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 600);
    
  },
  logout: async () => {
    common.loading = true;
    try {
      const res = await common.baseAjax("POST", "/site/logout")
      if (res.code == 1) {
        common.loading = true;
        common.alert("", res.msg)
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        common.toRouter("/")
        
      } else {
        common.alert("fail", res.msg)
      }
    } catch (error) {
      console.log(error)
    }
  },
  userController: (code, msg) => {
    common.alert("fail", msg)
    if (code == 4) {
      common.user = {};
      common.alert("fail", msg)
      setTimeout(() => {
        common.toRouter("/login")
      }, 1500)
    }
    setTimeout(() => {
      common.loading = false;
    }, 1000)
  },
  catchError: (error) => {
    console.log(error);
    common.alert("fail", "其他錯誤, 請稍後再試")
    setTimeout(() => {
      common.loading = false
    })
  },
});

provide("common", common);

common.systemInit();
common.userInit();
common.menuInit();


router.beforeEach((to, from) => {
  const toDepth = to.meta.depth;
  const fromDepth = from.meta.depth;

  if ((toDepth === 0 && fromDepth == void 0) || toDepth === fromDepth) {
    return true;
  }

  if (!from.name) {
    return true;
  }

  if (!needAnimate.value) {
    return true;
  }

  if (GlobalData.animationMode.value === "slide") {
    transitionMode.value = "";
    to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  } else {
    transitionMode.value = "out-in";
    to.meta.transitionName = "animation";
  }

  return true;
});

router.afterEach((to, from) => {
  needAnimate.value = false;
});

</script>

<template>
  <div
    v-if="common.loading"
    class="loading"
  >
    <img src="./assets/img/vic_logo.png" />
  </div>
  <div
    class="container router"
    v-if="common.languageReady"
  >
    <IconData />

    <router-view v-slot="{ Component, route }">
      <transition
        :name="route.meta.transitionName"
        :mode="transitionMode"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <FooterMenu
      v-if="showFooter"
      :active="1"
    />
    <FooterRulesModal />
  </div>
</template>

<style scoped>
.container.router {
  all: unset;
}
</style>

<style lang="scss">
:root {
  // --theme-color: #c9fc01;
  --theme-color: #f0cd4f;
  --bg-color: #000; // 網站背景
  --bg-header-color: #000; // header 背景
  --bg-body-color: #0d0119; // body 背景
  --bg-light-color: #2c1b3e; // 淺背景、按鈕 group 背景
  --bg-lighter-color: #2f253a; // 淺背景、錢包刷新功能背景
  --bg-lighter-color2: #3a2e45; // 更淺背景
  --bg-nav-active-color: #2b262e; // nav active 背景
  --bg-other: #414141; // 次要背景(如輸入框)
  --bg-back-icon: #1c1e22; // arrow 返回按鈕背景
  --bg-range-dark: #0e021d;
  --bg-range-light: #26232a;
  --bg-switch-btn-dark: #19171c;
  --bg-switch-btn-light: #302d35;
  --bg-switch-btn-lighter: #453f4e;
  --swiper-pagination-bullet: rgba(0, 0, 0, 0.4); // 首頁 banner 分頁按鈕底色
  --primary-color: linear-gradient(135deg,
      #d4af37 0%,
      #f9f295 45%,
      #e6be8a 50%,
      #f9f295 55%,
      #d4af37 100%); // active 按鈕背景
  --primary-btn-font-color: #0f021f; // active 按鈕字體顏色
  --font-color: #fff;
  --font-dark-color: #c4cacf;
  --font-darker-color: #7d858e;
  --font-dark-theme-color: #0f021f;
  --font-primary-color: #aee6f8; // 次要字體顏色
  --mod-pwd-placeholder: #696969;
  --gold-text: #fec11a;
  --info-bg: rgba(9, 18, 22, 0.6); // info 提示背景
  --error-color: #ff7792;
  --warning-color-dark: #dfcb65;
  --gold-color-dark: #a67c00; // badge、hash(flag) 標籤背景
  --other-color: #637283; // 分隔線、次要按鈕背景
  --other-color-light: #b3872892; // 分隔線 or 次要按鈕 hover
  --success-color: #3beabb;
  --success-color-light: #94eed8;
  --error-color-dark: #da3947;
  --border-color: #c7ffbe;
  --border-input: #46424d;
  --border-dashed: 2px dashed #ffffff7b; // 上傳圖片按鈕(銀行帳號頁)
  --qr-background: #fff; // qr-code 背景
  --warning-color: #fbe98b; // 驚嘆號

  // box-shadow、divider、linear-gradient、彈窗 blur不設定
  --success-color-dark: #7fc4b2;
  --warning-color-light: #fff3b7;
  --error-color-light: #ffa9bd;
  --info-color: #84cce3;
  --info-color-light: #cae9f3;
  --info-color-dark: #83abbf;

}

// Light Theme
:root.light-theme {
  --theme-color: #c9a227; // 金色調整為較深色以適應亮色背景
  --bg-color: #f5f5f7; // 網站背景 - 柔和灰白
  --bg-header-color: #ffffff; // header 背景 - 純白
  --bg-body-color: #eeeef0; // body 背景 - 淺灰
  --bg-light-color: #e8e8ec; // 淺背景、按鈕 group 背景
  --bg-lighter-color: #ffffff; // 淺背景、錢包刷新功能背景
  --bg-lighter-color2: #f8f8fa; // 更淺背景
  --bg-nav-active-color: #e0e0e5; // nav active 背景
  --bg-other: #e5e5ea; // 次要背景(如輸入框)
  --bg-back-icon: #d8d8dc; // arrow 返回按鈕背景
  --bg-range-dark: #f0f0f3;
  --bg-range-light: #e8e8ec;
  --bg-switch-btn-dark: #d0d0d5;
  --bg-switch-btn-light: #e0e0e5;
  --bg-switch-btn-lighter: #eaeaef;
  --swiper-pagination-bullet: rgba(0, 0, 0, 0.2); // 首頁 banner 分頁按鈕底色
  --primary-color: linear-gradient(135deg,
      #c9a227 0%,
      #e8d47a 45%,
      #d4af37 50%,
      #e8d47a 55%,
      #c9a227 100%); // active 按鈕背景
  --primary-btn-font-color: #1a1a1a; // active 按鈕字體顏色
  --font-color: #1a1a1a; // 主字體顏色 - 深灰黑
  --font-dark-color: #4a4a4a; // 次級字體
  --font-darker-color: #6a6a6a; // 更淺字體
  --font-dark-theme-color: #1a1a1a;
  --font-primary-color: #2563eb; // 次要字體顏色 - 藍色
  --mod-pwd-placeholder: #999999;
  --gold-text: #b8860b; // 金色文字調整
  --info-bg: rgba(255, 255, 255, 0.85); // info 提示背景
  --error-color: #dc2626;
  --warning-color-dark: #b8860b;
  --gold-color-dark: #996515; // badge、hash(flag) 標籤背景
  --other-color: #9ca3af; // 分隔線、次要按鈕背景
  --other-color-light: rgba(179, 135, 40, 0.4); // 分隔線 or 次要按鈕 hover
  --success-color: #059669;
  --success-color-light: #34d399;
  --error-color-dark: #b91c1c;
  --border-color: #d1d5db;
  --border-input: #c7c7cc;
  --border-dashed: 2px dashed rgba(0, 0, 0, 0.3); // 上傳圖片按鈕(銀行帳號頁)
  --qr-background: #fff; // qr-code 背景
  --warning-color: #f59e0b; // 驚嘆號

  // box-shadow、divider、linear-gradient、彈窗 blur不設定
  --success-color-dark: #047857;
  --warning-color-light: #fde68a;
  --error-color-light: #fca5a5;
  --info-color: #3b82f6;
  --info-color-light: #93c5fd;
  --info-color-dark: #1d4ed8;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root:root {
  --van-toast-default-width: 160px; // 調整 van-toast 寬度
}


::-webkit-scrollbar {
  display: none;
}

html {
  font-size: 10vw;

  @media screen and (min-width: 600px) {
    font-size: 2.34667rem !important;
  }
}

@font-face {
  font-family: 'Geogrotesque-Md';
  src: url('./assets/fonts/Geogtq-Md.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

body,
html {
  height: 100%;
  width: 100%;
  overflow-y: visible;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  background: var(--bg-body-color);
}

#app {
  width: 100%;
  height: 100%;
  font-size: 0.37333rem;
  color: var(--font-color);
  max-width: 11.41333rem;
  margin: 0 auto;
  font-family: 'Geogrotesque-Md', sans-serif;
  // 原本用的 google 字體
  // font-family: "Noto Sans TC", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  background: var(--bg-color);
}

img {
  max-width: 100%;
}

.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  // background: #202125;
  background: var(--bg-color);
  touch-action: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  img {
    max-width: 100px;
    animation: loading-logo 1s ease infinite;
  }
}

@keyframes loading-logo {
  0% {
    transform: scale(1)
  }

  50% {
    transform: scale(1.2)
  }

  100% {
    transform: scale(1)
  }
}

.loadings,
.router {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  min-width: 2.08rem;
  height: 0.85333rem;
  font-size: 0.33787rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--bg-range-dark);
  border-radius: 0.13333rem;
  background-image: linear-gradient(135deg, #BF953F 0%, #FCF6BA 20%, #B38728 50%, #FBF5B7 80%, #AA771C 100%) !important;
  // background: var(--primary-color);
  // box-shadow: 0 0.10667rem 0 0 #89a617, inset 0 0 0.16rem 0.10667rem #bbfc01,
  //   0 0 0.10667rem 0.13333rem rgba(252, 197, 1, 0.07);
}

// Glassmorphism Button Styles
.glass-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.26667rem 0.53333rem;
  font-size: 0.37333rem;
  font-weight: 600;
  border-radius: 0.21333rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &.glass-primary {
    background: rgba(240, 205, 79, 0.25);
    color: var(--theme-color);
    border-color: rgba(240, 205, 79, 0.35);
    box-shadow: 0 4px 16px rgba(240, 205, 79, 0.15);
    
    &:hover {
      background: rgba(240, 205, 79, 0.35);
      box-shadow: 0 6px 20px rgba(240, 205, 79, 0.25);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(240, 205, 79, 0.2);
    }
  }
  
  &.glass-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--font-color);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.18);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.glass-dark {
    background: rgba(0, 0, 0, 0.3);
    color: var(--font-color);
    border-color: rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  }
}

// Light theme glassmorphism adjustments
:root.light-theme {
  .glass-button {
    &.glass-primary {
      background: rgba(201, 162, 39, 0.2);
      color: #8b6914;
      border-color: rgba(201, 162, 39, 0.35);
      box-shadow: 0 4px 16px rgba(201, 162, 39, 0.12);
      
      &:hover {
        background: rgba(201, 162, 39, 0.3);
      }
    }
    
    &.glass-secondary {
      background: rgba(0, 0, 0, 0.05);
      color: var(--font-color);
      border-color: rgba(0, 0, 0, 0.1);
      
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

// Theme Toggle Button
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    width: 0.48rem;
    height: 0.48rem;
    fill: var(--theme-color);
    transition: transform 0.4s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: scale(1.08);
    
    svg {
      transform: rotate(15deg);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
}

:root.light-theme .theme-toggle {
  background: rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

.van-tabs__line {
  height: 0 !important;
  border-radius: 0 !important;
}

.van-field__control {
  color: var(--font-color) !important;
}

.animation-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.animation-leave-active {
  will-change: transform;
  transition: all 0.1s ease;
}

.animation-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.animation-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.animation-enter-active {
  will-change: transform;
  transition: all 0.1s ease;
}

.animation-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  box-shadow: -20px 0 20px 0px rgba(0, 0, 0, 0.1);
  will-change: transform;
  transition: all 0.1s ease-out;
  position: absolute;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50%);
}

.slide-right-leave-to {
  z-index: 100;
  transform: translateX(102%);
}

.slide-right-leave-from {
  box-shadow: -20px 0 20px 0px rgba(0, 0, 0, 0.1);
}

.slide-left-enter-from {
  z-index: 100;
  transform: translateX(100%);
  box-shadow: -20px 0 20px 0px rgba(0, 0, 0, 0.1);
}

.slide-left-leave-to {
  opacity: 0.4;
  transform: translateX(-50%);
}
</style>
