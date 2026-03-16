<script setup>
import { reactive, inject, onMounted, onUnmounted, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import IconUsdt from "./Icons/icon-usdt.vue";
import IconHeadWallet from "@/components/Icons/icon-head-wallet.vue";
import iconComBg from "./Icons/icon-com-Bg.vue";
import HeadShot from '@/components/Blocks/HeadShot.vue';
import { primeCoinIcon } from '@/components/Images/base64'



const { t, locale } = useI18n();

const common = inject("common");

const state = reactive({
  menu: computed(() => common.menu),
  menuReady: false,
  balance: computed(() => {
    return common.user.balance;
  }),
  user: computed(() => common.user),
  vip: computed(() => common.vip || { id: "1" }),  
});

(function Mready() { 
  setTimeout(() => {
    state.menuReady = true;
  }, 1000);
})()

const iconObj = {
  "live_game": "icon-nav-live",
  "elec_game": "icon-nav-elec",
  "chess_game": "icon-nav-qipai",
  "lottery_game": "icon-nav-lottery",
  "sport_game": "icon-nav-sport",
  "animal_game": "icon-cock-fight",
  "fish_game": "icon-nav-fish",      // 捕魚
}




function toPage(tabName) { 
  common.activeItem = "0"
  if (tabName == 'index') {
    common.activePage = 'IndexGameList'
  } else if (Object.keys(iconObj).includes(tabName)) {
    common.activePage = 'GameCategory'
    common.gameCode = tabName
  }
}

function openWallet() {
  common.toRouter("/deposit");
}

const headerBottomRef = ref(null);
const isDragging = ref(false);
let dragState = { startX: 0, scrollLeft: 0, moved: false, el: null };

const onNavMouseDown = (e) => {
  const el = headerBottomRef.value?.querySelector('.van-tabs__nav');
  if (!el) return;
  isDragging.value = true;
  dragState = { startX: e.pageX, scrollLeft: el.scrollLeft, moved: false, el };
  el.style.cursor = 'grabbing';
  el.style.userSelect = 'none';
};
const onNavMouseMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const dx = e.pageX - dragState.startX;
  if (Math.abs(dx) > 3) dragState.moved = true;
  dragState.el.scrollLeft = dragState.scrollLeft - dx;
};
const onNavMouseUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  if (dragState.el) {
    dragState.el.style.cursor = 'grab';
    dragState.el.style.userSelect = '';
  }
};

const onNavClickCapture = (e) => {
  if (dragState.moved) {
    e.stopPropagation();
    e.preventDefault();
    dragState.moved = false;
  }
};

onMounted(() => {
  document.addEventListener('mousemove', onNavMouseMove);
  document.addEventListener('mouseup', onNavMouseUp);
});
onUnmounted(() => {
  document.removeEventListener('mousemove', onNavMouseMove);
  document.removeEventListener('mouseup', onNavMouseUp);
});

</script>

<template>
  <van-sticky class="header">
    <div class="header-top">
      <div class="header-logo">
        <img
          src="../assets/img/vic_logo.png"
          alt=""
        />
      </div>
      <!-- Theme Toggle Button -->
      <!-- <div class="theme-toggle" @click="common.toggleTheme" :title="common.isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <svg v-if="common.isDarkTheme" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
        </svg>
      </div> -->
      <div
        v-if="!common.user.account"
        class="header-actions"
      >
        <div
          class="login"
          @click="common.toRouter('/login')"
        >{{ t("message.Login") }}</div>
        <div
          class="base-button register"
          @click="common.toRouter('/register')"
        >
          {{ t("message.Register") }}
        </div>
      </div>
      <div
        v-else
        class="header-actions"
      >

        <a
          class="btn-refresh"
          @click="common.balanceInit()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 12"
          >
            <path
              d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"
            ></path>
            <path
              fill-rule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
            ></path>
          </svg>
        </a>

        <div class="balance">
          <!-- <IconUsdt /> -->
          <!-- <img src="../assets/img/coin-vic.png" /> -->
          <img :src="primeCoinIcon" />
          <span>{{ state.balance }}</span>
          <div
            class="to-recharge"
            @click="openWallet"
          >
            <IconHeadWallet />
          </div>
        </div>


        <div
          class="com-my"
          style="margin-right: 9px;"
          @click="common.toRouter('/my')"
        >

          <HeadShot
            :level="Number(state.vip.id)"
            :userId="state.user.id"
          />
          <span class="message">16</span>
        </div>

      </div>
    </div>
    <div class="header-bottom" ref="headerBottomRef" @mousedown="onNavMouseDown" @click.capture="onNavClickCapture">
      <van-tabs
        class="navbar"
        v-model:active="common.gameActive"
        :ellipsis="false"
        @change="toPage"
        v-if="state.menu && state.menuReady"
      >
        <van-tab name="index">
          <template #title>
            <!-- <img src="../assets/img/house-icon.png" alt="" /> -->
            <svg
              width="0.45rem"
              height="0.45rem"
              class="za-svg-icon icon-nav-home"
            >
              <use xlink:href="#icon-home"></use>
            </svg>
            <span>{{ t("message.Home") }}</span>
          </template>
        </van-tab>
        <van-tab
          v-for="(item, index) in state.menu"
          :key="index"
          :name="item.code"
        >
          <template #title>
            <svg
              width="0.45rem"
              height="0.45rem"
              class="za-svg-icon icon-nav-home"
            >
              <use :href="`#${iconObj[item.code]}`"></use>
            </svg>
            <span>{{ item.title }}</span>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </van-sticky>


  <svg
    xmlns="www.w3.org/2000/svg"
    xmlns:xlnk="www.w3.org/1999/xlink"
    style="position: absolute;"
  >
    <symbol
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      fill="none"
      id="icon-home"
    >
      <path
        id="icon-nav-home_Subtract"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.1378 5.62715L9.71528 0.437856C9.37655 0.164967 8.94285 0.0100397 8.49086 0.000471239C8.03887 -0.00909722 7.59772 0.127314 7.24546 0.385575L0.963714 5.00708C0.663143 5.22776 0.420596 5.50694 0.253835 5.82416C0.0870744 6.14138 0.000345402 6.48859 0 6.84033V14.487C0.00129234 14.8183 0.0742161 15.1462 0.214602 15.4518C0.354989 15.7575 0.560075 16.0349 0.818165 16.2682C1.07626 16.5016 1.38227 16.6864 1.71873 16.8119C2.0552 16.9375 2.41553 17.0014 2.77911 17H5.66895V11.5606C5.66895 10.8098 6.2776 10.2012 7.02841 10.2012H9.97801C10.7288 10.2012 11.3375 10.8098 11.3375 11.5606V17H14.23C14.5936 17.0014 14.9539 16.9375 15.2904 16.8119C15.6269 16.6864 15.9329 16.5016 16.191 16.2682C16.4491 16.0349 16.6541 15.7575 16.7945 15.4518C16.9349 15.1462 17.0078 14.8183 17.0091 14.487V7.39014C17.009 7.05683 16.9313 6.72734 16.7811 6.42344C16.6309 6.11953 16.4116 5.84813 16.1378 5.62715Z"
        fill="currentColor"
      ></path>
    </symbol>
    <symbol
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 22"
      fill="none"
      id="icon-nav-live"
    >
      <path
        id="icon-nav-live_Vector"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5513 1.21808L4.64692 5.04458C3.86991 5.42072 3.57541 6.2979 3.98927 7.00417L10.0943 17.4225C10.508 18.1285 11.4735 18.3963 12.2505 18.0202L20.1549 14.1937C20.9321 13.8174 21.2263 12.9398 20.8126 12.2338L14.7077 1.81545C14.2938 1.10919 13.3286 0.841827 12.5513 1.21808ZM12.2075 6.34748C11.2388 6.20448 10.2154 5.7366 9.98689 5.49204C10.0731 5.80904 9.91276 6.87196 9.49818 7.71127C9.38392 7.94287 9.22374 8.18132 9.0568 8.42981C8.56103 9.1678 8.00564 9.99449 8.41617 10.9944C9.24794 13.0204 12.4691 12.3365 12.5235 10.3173C12.9026 11.1112 13.2855 12.622 11.7283 14.0201C11.7235 14.0242 11.7191 14.0285 11.7146 14.0328C11.7121 14.0353 11.7096 14.0377 11.7071 14.0402C11.6992 14.048 11.6913 14.0557 11.6825 14.0634L11.7975 14.0056L16.4519 11.6621L16.5284 11.6236C16.5284 11.6236 16.5103 11.6275 16.4847 11.6324C16.1828 11.6917 14.2221 11.9917 12.8076 10.1743C14.6104 11.2586 17.0087 9.11386 15.6941 7.33085C15.0452 6.45085 14.0094 6.42515 13.0846 6.40221C12.7733 6.39449 12.4746 6.38707 12.2075 6.34748ZM20.6793 15.1167L20.7615 15.077C20.792 15.0622 20.8198 15.0449 20.8477 15.0275C20.8589 15.0205 20.8702 15.0135 20.8816 15.0067L20.8845 15.0049C20.8968 14.9975 20.9094 14.9905 20.9222 14.9834C20.9427 14.972 20.9633 14.9605 20.9824 14.9476C21.0133 15.1456 21.0026 15.3403 20.9554 15.525C20.8458 15.7815 20.6626 16.0165 20.4063 16.1983L19.7107 16.6919L12.7015 21.6649C11.9442 22.2022 10.8506 22.0804 10.2587 21.3927L1.41925 11.1185C0.827113 10.4305 0.961599 9.43749 1.7188 8.90001L3.38991 7.71429L9.49754 18.1277C10.1015 19.1574 11.5156 19.5489 12.6496 19.0004L12.6526 18.999L16.1097 17.3269L20.6761 15.1183L20.6793 15.1167Z"
        fill="currentColor"
      ></path>
      <defs>
        <clipPath id="icon-nav-live_clip0_5620_13595">
          <rect
            width="21"
            height="22"
            fill="white"
          ></rect>
        </clipPath>
      </defs>
    </symbol>
    <symbol
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 21"
      fill="none"
      id="icon-nav-sport"
    >
      <path
        d="M3.35102 8.56021C4.32536 8.12465 5.51355 7.72955 6.69718 7.44768L6.7429 7.43669C9.03522 6.87405 13.2022 6.66825 14.2876 6.65616C14.1612 6.08209 14.0224 5.57969 13.9407 5.29804C13.8106 5.32157 13.661 5.33301 13.4853 5.33301C12.828 5.33301 12.0338 5.16239 11.806 5.11006C11.2315 5.01904 10.0629 4.52983 9.12408 4.13694C8.68178 3.95181 8.26408 3.77701 8.12645 3.74051C7.50099 3.55121 6.83982 3.45557 6.15926 3.45557C4.73914 3.45557 3.56924 3.8621 3.03286 4.0857C1.58093 5.77361 0.692184 7.95799 0.65625 10.3506C1.24425 9.69867 2.14453 9.09932 3.35102 8.56021Z"
        fill="currentColor"
      ></path>
      <path
        d="M14.8647 5.26832C14.9787 5.64385 15.0956 6.07347 15.2393 6.64139C17.7861 6.67436 19.1524 7.09827 19.8666 7.47138C19.3893 5.9952 18.574 4.67161 17.5101 3.59229C17.4437 3.9566 17.2916 4.26925 17.0505 4.52319C16.4793 5.1254 15.5564 5.2626 14.8647 5.26832Z"
        fill="currentColor"
      ></path>
      <path
        d="M8.26711 13.8821C8.76147 13.3374 10.7354 11.2749 11.1026 10.9041C12.0789 9.8765 13.2906 9.25955 14.6088 9.11818C14.5657 8.24707 14.4803 7.70927 14.4478 7.52832C9.97861 7.6011 6.44191 8.67449 6.40663 8.68549C3.03043 9.58958 1.47811 11.2669 0.817383 12.2867C1.18064 14.267 2.13493 16.0402 3.49321 17.4154C4.98019 16.8036 7.8272 14.3484 8.26711 13.8821Z"
        fill="currentColor"
      ></path>
      <path
        d="M9.06309 2.86086C11.2955 4.0622 12.8402 4.37969 13.3451 4.37969C13.5073 4.37947 13.5811 4.35792 13.6105 4.34561C13.6072 4.32802 13.5992 4.29569 13.5803 4.23743C13.5708 4.20885 13.5623 4.18159 13.5556 4.15674C12.5822 1.56056 10.9366 0.811036 10.5124 0.65669C10.5076 0.65669 10.5028 0.65625 10.498 0.65625C8.48163 0.65625 6.60765 1.2633 5.04663 2.30304C5.36197 2.25842 5.68885 2.23489 6.02598 2.23489C7.40145 2.23533 8.59575 2.60933 9.06309 2.86086Z"
        fill="currentColor"
      ></path>
      <path
        d="M13.9254 15.8629C14.6247 13.6394 14.6963 11.0746 14.6217 10.6021C14.584 10.364 14.4758 10.3442 14.3587 10.3442C14.1387 10.3442 13.8388 10.4729 13.6403 10.558C13.5414 10.6006 13.4629 10.634 13.3974 10.6527C11.8764 11.2989 9.96825 13.4487 8.94317 14.6035C8.71363 14.862 8.53332 15.0649 8.40135 15.2024C6.60881 17.1095 5.44262 18.025 4.69434 18.4496C6.32201 19.6395 8.32752 20.3435 10.4983 20.3435C10.5016 20.3435 10.5046 20.3433 10.5079 20.3433C11.9526 19.6529 13.0751 18.1803 13.9254 15.8629Z"
        fill="currentColor"
      ></path>
      <path
        d="M15.4072 7.54333C15.4561 7.89864 15.4845 8.42632 15.5096 8.9397L15.5175 9.09669C17.5935 9.1378 18.4076 10.654 18.6767 11.1553L18.7009 11.2002C19.3208 12.343 19.2523 14.1237 19.1259 15.243C19.9015 13.8361 20.3438 12.2197 20.3438 10.4997C20.3438 9.97747 20.3025 9.46519 20.224 8.9652C18.8414 7.68184 16.5752 7.54004 15.6487 7.54004C15.5571 7.54004 15.476 7.54135 15.4072 7.54333Z"
        fill="currentColor"
      ></path>
      <path
        d="M17.7326 11.5826C17.1949 10.6418 16.7234 10.3527 16.091 10.1709C16.0192 10.1502 15.9538 10.1396 15.8963 10.1396C15.5944 10.1396 15.5733 10.4813 15.5724 10.4958C15.4207 14.7038 15.1062 15.7895 14.8766 16.5824L14.8367 16.7206C14.5149 17.8532 13.9848 18.9796 13.3367 19.9259C15.229 19.3569 16.8817 18.2355 18.1058 16.7475C18.735 14.3022 18.179 12.3638 17.7326 11.5826Z"
        fill="currentColor"
      ></path>
      <path
        d="M14.8066 4.35065C14.8265 4.35241 14.846 4.35416 14.8649 4.35613C15.5668 4.30051 16.0785 4.08878 16.3744 3.7271C16.6942 3.33595 16.6493 2.88149 16.6487 2.87688C16.6463 2.85686 16.647 2.83664 16.6496 2.81707C15.4917 1.88901 14.1201 1.21798 12.6196 0.888184C13.585 1.90969 14.2269 3.54593 14.3788 3.95906C14.5398 4.32734 14.6633 4.33811 14.8066 4.35065Z"
        fill="currentColor"
      ></path>
      <defs>
        <clipPath id="icon-nav-sport_clip0_18868_11435">
          <rect
            width="21"
            height="21"
            fill="white"
          ></rect>
        </clipPath>
      </defs>
    </symbol>
    <symbol
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 15"
      fill="none"
      id="icon-nav-elec"
    >
      <path
        d="M5.74597 0H16.0179C16.2934 0 16.4902 0.204811 16.4902 0.491546V1.76137C16.4902 2.00714 16.4114 2.25292 16.254 2.45773C15.2701 3.60467 11.7674 8.02858 11.7281 13.6404C11.7281 13.8452 11.5707 14.009 11.3739 14.009H7.79248C7.5957 14.009 7.43828 13.8452 7.43828 13.6404C7.43828 12.4525 7.67442 8.52012 11.6494 3.60467H5.66726C5.47048 3.60467 5.2737 3.44082 5.2737 3.19505V0.491546C5.2737 0.204811 5.50984 0 5.74597 0Z"
        fill="currentColor"
      ></path>
      <path
        d="M15.4669 6.06241L21.7245 7.29127C21.8819 7.33223 22 7.45512 22 7.61897V8.27436C22 8.43821 21.9213 8.5611 21.8032 8.68398C21.0555 9.21649 18.5367 11.2646 17.7889 14.7054C17.7496 14.9102 17.5528 15.0331 17.356 14.9922L14.0894 14.3368C13.8927 14.2958 13.7352 14.05 13.814 13.8452C14.0894 12.9031 14.9946 10.4863 16.9231 9.13457L14.2862 8.43821C14.1682 8.39725 14.1288 8.27436 14.1682 8.19244L15.3095 6.10337C15.3095 6.06241 15.3882 6.02144 15.4669 6.06241Z"
        fill="currentColor"
      ></path>
      <path
        d="M0 7.2503V9.25744C0 9.50322 0.19678 9.6261 0.432916 9.58514L2.75492 8.88878C2.75492 8.88878 1.41682 11.7971 2.16458 14.6644C2.20394 14.8693 2.44007 14.9921 2.63685 14.9512L5.2737 14.3777C5.47048 14.3367 5.62791 14.1319 5.58855 13.9271C5.43113 12.8211 5.15564 9.54418 7.00537 6.71779C7.08408 6.5949 7.08408 6.47202 7.08408 6.30817L6.84794 5.48893C6.76923 5.24316 6.5331 5.12027 6.29696 5.16123L0.236136 6.9226C0.078712 6.96356 0 7.08645 0 7.2503Z"
        fill="currentColor"
      ></path>
    </symbol>
    <symbol
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      fill="none"
      id="icon-nav-lottery"
    >
      <path
        d="M21.2075 8.2764C21.2356 8.33535 21.2663 8.4078 21.2996 8.4924L21.4078 8.78632L21.5319 9.15735C21.6947 9.63877 21.5766 10.1981 21.265 10.6863C20.1532 12.4285 18.5395 14.443 16.8024 16.345C14.6595 18.6905 12.5327 20.4889 10.4719 21.7233C9.85127 22.0951 9.03445 22.0883 8.4085 21.7409L8.25632 21.6468L7.54024 21.1457L6.94763 20.7219C6.70339 20.5458 6.64266 20.1985 6.81283 19.9452C6.96365 19.7204 7.24528 19.6459 7.47751 19.7556L7.5616 19.805L8.31505 20.3427L8.84957 20.7151C9.15257 20.9216 9.61967 20.9446 9.9334 20.7564C13.2948 18.7426 17.12 14.9007 20.4335 10.0776C20.4815 10.0078 20.5148 9.84532 20.5175 9.7173L20.5136 9.63L20.4935 9.5406L20.32 9.06457C20.2466 8.7558 20.278 8.54115 20.5049 8.2974C20.7824 7.99882 21.0674 7.97782 21.2082 8.27505L21.2075 8.2764ZM6.91426 16.0308L7.09312 16.1466L7.25261 16.2631C7.49152 16.4465 7.54091 16.7966 7.36339 17.0437C7.18588 17.2909 6.84886 17.3424 6.61062 17.1589C5.75041 16.4966 4.88352 16.5914 3.86247 17.4751C3.731 17.5888 3.5575 17.6295 3.39266 17.5888L3.29522 17.5549L3.21047 17.5055L1.8364 16.5169C1.59214 16.3409 1.53142 15.9935 1.70159 15.7403C1.83172 15.546 2.06329 15.4613 2.27618 15.5182L2.37028 15.5534L2.45036 15.6008L3.47074 16.3788L3.51879 16.3416C4.67864 15.4877 5.8385 15.3787 6.91426 16.0308Z"
        fill="currentColor"
      ></path>
      <path
        d="M13.5601 2.13478L14.7006 2.90264C14.6519 2.95884 14.6065 3.01978 14.5645 3.0841C13.8991 4.0964 13.9712 5.45605 15.2071 6.36745C16.4431 7.27885 17.9613 7.09874 18.7101 6.17921C18.8121 6.05395 18.8903 5.91446 18.9463 5.76482L20.1495 6.576C20.5092 6.82045 20.6053 7.31407 20.3637 7.67901C20.3584 7.68718 20.3524 7.69528 20.3471 7.70338C18.4258 10.3699 16.5218 12.6694 14.6339 14.6005C12.802 16.4755 11.0289 17.9476 9.31579 19.018C8.96742 19.2367 8.52162 19.2124 8.19799 18.9571L7.07882 18.0667C7.17559 18.0024 7.26034 17.932 7.33041 17.8561C7.95837 17.1804 8.08849 15.6691 6.81388 14.6622C5.53924 13.6553 4.12646 13.8537 3.2222 14.522C3.11676 14.5999 3.03001 14.6913 2.96127 14.7942L1.85013 13.9119C1.59454 13.7088 1.55049 13.3336 1.75136 13.0743C1.78873 13.0255 1.83411 12.9836 1.88483 12.949C4.07841 11.4526 6.03442 9.83293 7.75285 8.08933C9.47127 6.34578 11.0475 4.43022 12.4824 2.34199C12.726 1.9865 13.2051 1.89441 13.5601 2.13478ZM8.30209 12.9253C7.96174 13.031 7.77353 13.4081 7.88164 13.767C7.98972 14.1259 8.35347 14.3317 8.69449 14.2261C9.03484 14.1205 9.22302 13.7433 9.11494 13.3844C9.00679 13.0255 8.64312 12.8197 8.30209 12.9253ZM12.2882 8.32498L12.2234 8.35956L11.0208 9.19648L9.62412 8.66218C9.55399 8.63511 9.47659 8.63443 9.40587 8.66016C9.26442 8.71161 9.18094 8.85381 9.19699 8.99938L9.21364 9.07183L9.69949 10.4559L8.82529 11.5921C8.78389 11.6456 8.76057 11.7106 8.75854 11.779C8.75322 11.9314 8.85327 12.0627 8.99209 12.1013L9.06484 12.1121L10.5844 12.1677L11.4733 13.4284C11.5134 13.486 11.5714 13.528 11.6375 13.549C11.781 13.5943 11.9325 13.5307 12.0052 13.4047L12.0345 13.337L12.453 11.9672L13.8371 11.6083C13.9085 11.59 13.9712 11.5468 14.0146 11.4865C14.1033 11.3632 14.0934 11.198 13.9992 11.0869L13.9452 11.0368L12.7233 10.1316L12.7219 8.62701C12.7219 8.56198 12.7026 8.49906 12.6666 8.44551C12.5818 8.31958 12.4243 8.27421 12.2901 8.32701L12.2882 8.32498ZM13.9085 7.24093C13.5681 7.34656 13.38 7.72371 13.488 8.08258C13.5962 8.44146 13.9599 8.64733 14.3009 8.54166C14.6412 8.43606 14.8294 8.05888 14.7213 7.70001C14.6132 7.34115 14.2495 7.1353 13.9085 7.24093Z"
        fill="currentColor"
      ></path>
    </symbol>
    <symbol
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      id="icon-nav-qipai"
    >
      <path
        d="M15.3801 13.9388L16.1229 11.3832C16.1867 11.2007 16.1827 11.0182 16.1108 10.8356C16.039 10.6531 15.9152 10.501 15.7395 10.3793L13.4635 8.89613C13.3357 8.80487 13.1959 8.78586 13.0443 8.8391C12.8925 8.89233 12.7926 8.99501 12.7448 9.14713L12.002 11.7026C11.9381 11.8852 11.9421 12.0678 12.014 12.2502C12.0859 12.4328 12.2097 12.585 12.3854 12.7066L14.6614 14.1898C14.7891 14.281 14.929 14.3001 15.0807 14.2469C15.2325 14.1936 15.3323 14.0909 15.3801 13.9388ZM4.47912 18.2285L3.6885 17.8635C3.19335 17.6657 2.85793 17.3272 2.68225 16.8481C2.50655 16.3689 2.5305 15.8934 2.75412 15.4219L4.47912 11.8624V18.2285ZM8.31245 20.2136C7.78536 20.2136 7.33415 20.031 6.95881 19.666C6.58346 19.301 6.39578 18.8673 6.39578 18.3654V12.912L8.95933 19.6203C9.00725 19.7268 9.04717 19.8295 9.07912 19.9284C9.11106 20.0272 9.16696 20.1223 9.24683 20.2136H8.31245ZM13.2479 20.0995C12.7527 20.2668 12.2575 20.2441 11.7625 20.031C11.2673 19.8181 10.9319 19.4759 10.7562 19.0043L6.51558 7.84654C6.33988 7.37497 6.36383 6.90722 6.58745 6.44326C6.81106 5.9793 7.17043 5.66366 7.66558 5.49633L14.877 2.98642C15.3722 2.81909 15.8634 2.8419 16.3505 3.05487C16.8376 3.26783 17.1691 3.61009 17.3448 4.08165L21.6093 15.2394C21.7851 15.711 21.761 16.1788 21.5375 16.6427C21.3138 17.1066 20.9544 17.4223 20.4593 17.5895L13.2479 20.0995Z"
        fill="currentColor"
      ></path>
      <path
        d="M15.3802 13.9388L16.123 11.3832C16.1868 11.2007 16.1828 11.0182 16.1109 10.8356C16.039 10.6531 15.9153 10.501 15.7395 10.3793L13.4636 8.89613C13.3357 8.80487 13.196 8.78586 13.0443 8.8391C12.8925 8.89233 12.7927 8.99501 12.7448 9.14713L12.0021 11.7026C11.9382 11.8852 11.9422 12.0678 12.0141 12.2502C12.0859 12.4328 12.2097 12.585 12.3855 12.7066L14.6614 14.1898C14.7892 14.281 14.929 14.3001 15.0807 14.2469C15.2325 14.1936 15.3323 14.0909 15.3802 13.9388ZM13.248 20.0995C12.7528 20.2668 12.2576 20.2441 11.7625 20.031C11.2673 19.8181 10.9319 19.4759 10.7562 19.0043L6.51562 7.84654C6.33992 7.37497 6.36388 6.90722 6.58749 6.44326C6.8111 5.9793 7.17048 5.66366 7.66562 5.49633L14.8771 2.98642C15.3722 2.81909 15.8634 2.8419 16.3505 3.05487C16.8377 3.26783 17.1691 3.61009 17.3448 4.08165L21.6094 15.2394C21.7851 15.711 21.7611 16.1788 21.5375 16.6427C21.3138 17.1066 20.9545 17.4223 20.4594 17.5895L13.248 20.0995Z"
        fill="currentColor"
      ></path>
    </symbol>
    <symbol id="icon-nav-fish" viewBox="0 0 512 512">
      <g transform="translate(0,0)">
        <path d="M236.977 26.432c-.48 0-.8.32-1.282.32l-2.244 1.123L95.276 85.262C86.78 89.11 79.087 93.757 71.71 99.047c0 0-.32 0-.32.48-3.526 3.046-6.89 6.573-9.937 10.42-3.526 4.97-6.572 10.74-8.976 16.83a88.928 88.928 0 0 0-2.565 16.993v1.923c0 4.65.64 8.817 2.244 13.145.32-4.65 1.602-9.62 3.526-13.947 2.244-5.29 6.09-9.938 11.06-13.464 3.046-1.924 6.573-3.847 10.1-4.97 4.648-1.12 9.136-1.922 14.265-2.724 7.695-.8 15.39-1.122 22.282-1.443 9.136 0 18.11.32 27.73.64 11.54.48 22.6 1.924 33.02 3.847 8.176 1.283 15.87 2.726 24.206 4.328l-3.848-5.77-4.168-8.815c-1.122-3.527-1.924-7.374-1.924-10.9v-1.124c.32-3.847 1.124-7.694 3.047-11.54l8.496-11.542 38.47-50.012c.8-.32.8-1.122.8-1.923 0-.803 0-1.604-.8-2.246-.32-.48-1.123-.802-1.443-.802zM31.174 144.74c-1.924 3.366-3.823 6.86-5.426 10.227a94.515 94.515 0 0 0-5.01 17.81c-.32 3.046-.765 6.556-.765 9.602 0 2.724.488 4.97.488 7.374 1.123 6.893 2.224 13.485 3.827 19.896 4.168 14.267 10.762 27.415 19.9 38.475 5.128 6.252 10.41 12.007 15.86 16.977a552.344 552.344 0 0 0 16.14 13.496c6.573 4.97 13.46 9.296 19.55 12.662 9.298 5.45 18.977 10.408 28.595 15.377 34.945 18.594 72.237 31.553 110.066 38.125 25.007 3.526 50.048 6.592 75.696 8.836 0 5.13.312 10.405 1.113 15.375.802 6.25 2.256 12.805 4.66 18.576 2.244 6.41 4.99 12.666 8.836 18.436 4.168 6.092 9.09 11.595 14.54 17.045 6.092 5.29 12.692 9.902 20.386 13.43 5.77 2.564 12.003 4.137 18.575 4.938 1.924 0 3.852.348 5.775.348 1.123 0 2.216-.348 3.338-.348l103.248-7.373h.348c.32 0 1.113-.31 1.113-1.113 0-.8-.827-1.12-1.95-1.6-3.846-1.124-7.985-2.572-12.313-4.175-4.49-1.603-9.635-3.47-14.123-4.592-6.572-2.244-13.47-4.68-20.523-6.123a379.304 379.304 0 0 0-21.15-4.313c-4.65-.32-9.615-1.105-14.264-2.227-.64-.32-1.46-1.175-1.46-2.297 0 0 .028-.443.35-.764 0-.48.485-.836.485-.836 0-.32.277-.284.277-.765 1.123-.8 2.775-1.585 3.897-2.226 2.725-1.603 5.437-2.772 8.002-3.894 6.572-3.206 13.47-5.77 20.523-8.977 3.046-1.122 6.068-2.216 9.114-3.338 4.33-1.603 8.966-2.738 15.378-4.662 1.282-.32 2.397-.793 3.2-1.113a505.871 505.871 0 0 1 8.07-2.436c-5.45-8.335-12.336-16.484-19.55-23.377l-14.332-13.775c-4.97-4.328-9.588-8.183-13.916-11.55-7.213-5.128-14.25-10.093-20.662-14.26a344.273 344.273 0 0 0-39.308-22.473c-6.893-3.368-13.933-6.38-24.352-10.228-9.938-3.526-19.525-7.063-17.602-6.262-8.816-2.725-18.107-5.318-26.923-7.722L270.158 191.7c-7.373 3.848-15.064 7.67-21.637 10.716-5.77 2.725-11.51 4.208-17.602 5.01-7.374 1.603-14.61 1.565-21.984.763l-93.436-7.653 25.324 30.264c.802 1.283 1.94 2.712 3.06 4.315.802.802.766 1.43.766 2.713-.32 1.122-1.11 1.95-2.712 1.95-4.49.32-9.127-.008-13.776-.49-6.572-.8-13.18-1.902-19.27-3.825-5.45-1.122-10.382-3.043-15.03-5.287-6.092-2.405-12.383-5.448-17.672-8.975-4.97-3.044-10.05-6.446-14.54-10.296-5.13-3.847-9.656-8.154-13.984-12.802-2.725-3.046-5.41-6.866-7.654-10.713-2.725-5.29-5.007-10.79-6.61-16.56-1.122-6.25-2.232-12.355-2.712-17.324.48-2.725.486-5.4.486-8.766zM20.6 247.3l1.12 9.296c4.65 29.975 15.87 58.83 32.382 84.636 11.22 17.793 25.487 32.7 41.998 44.243l8.816 6.25 17.63 11.06c38.632 22.762 81.272 37.83 125.995 44.402l31.1 2.565 31.737 1.924 33.502-.32c-8.817-5.45-16.833-11.863-23.886-19.237l-6.892-8.015c-5.77-7.373-10.42-15.068-13.465-23.564-1.443-5.45-2.726-10.418-3.848-15.708l-1.925-12.342-33.34-3.527-26.13-3.365-17.63-2.727c-10.1-1.922-20.037-4.647-30.136-7.692l-32.222-11.54-25.006-11.222-25.486-12.664-23.885-13.145-18.755-12.662-23.882-22.28L20.6 247.298zm393.226 92.313c7.213 0 13.15 6.125 13.15 13.498 0 7.535-5.937 13.497-13.15 13.497s-13.148-5.962-13.148-13.496c0-7.372 5.935-13.497 13.148-13.497zm-332.07 85.684c14.266 9.618 27.73 20.037 40.074 31.258 10.74 9.137 20.357 19.235 29.975 29.013 2.725 0 4.97-.802 6.892-1.443 8.496-3.847 16.19-8.015 23.885-12.664 7.374-4.167 13.786-9.135 19.236-14.905-4.167-1.603-8.496-3.046-12.664-4.328-10.42-2.565-20.356-6.092-30.134-10.42-7.214-3.046-14.108-6.41-20.68-10.258-.802.32-1.923.32-2.725.32-4.648 0-9.297-.322-13.785-1.124-13.465-1.122-26.93-3.045-40.074-5.45z" fill="currentColor"></path>
      </g>
    </symbol>
  </svg>
</template>

<style lang="scss" scoped>
.header {
  :deep(.van-sticky) {
    background: var(--bg-header-color);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  }

&-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: .26667rem;
    position: relative;
    z-index: 1;
    
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.85rem;
      height: 0.85rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      cursor: pointer;
      transition: all 0.3s ease;
      margin-left: 0.26667rem;
      
      svg {
        width: 0.45rem;
        height: 0.45rem;
        fill: var(--theme-color);
        transition: transform 0.4s ease;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.18);
        transform: scale(1.08);
        box-shadow: 0 0 15px rgba(240, 205, 79, 0.3);
        
        svg {
          transform: rotate(15deg);
        }
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
  }

  &-logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 40px;
    }
  }

  .btn-refresh {
    vertical-align: middle;
    border-radius: 50%;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    padding: .08rem .12rem;
    margin-right: .15rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 0 12px rgba(240, 205, 79, 0.2);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }

  .balance {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 3.13333rem;
    max-width: 5.33333rem;
    height: .934rem;
    padding-left: .18667rem;
    padding-right: .08rem;
    border-radius: 0.21333rem;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-glow);
    justify-content: space-between;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: var(--neon-glow);
    }

    img {
      width: .6rem;
      height: .6rem;
      filter: drop-shadow(0 0 4px rgba(240, 205, 79, 0.4));
    }

    span {
      font-size: .4rem;
      // font-family: Geogrotesque-Md;
      font-weight: 650;
      padding: 0 .37333rem 0 .16rem;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
    }
  }

  .to-recharge {
    margin-bottom: .05333rem;
    width: .8267rem;
    height: .72rem;
    border-radius: 0 .133rem .133rem 0;
    background: var(--theme-color);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .com-get {
    margin-left: .26667rem;
    width: .88rem;
    height: .85333rem;
  }

  .com-my {
    position: relative;
    margin-left: .24rem;
    width: .9067rem;
    height: .9067rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    //background-color: var(--bg-lighter-color);
    border-radius: .133rem;

    img {
      position: absolute;
      width: .946rem;
      height: .946rem;

    }

    .message {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(40%, -40%);
      color: var(--font-color);
      min-width: .37333rem;
      text-align: center;
      font-size: .32rem;
      padding: .02667rem .05333rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      border-radius: .08rem;
      background: #2ab53e;
      background: var(--bg-lighter-color);
      background: var(--gold-color-dark);
    }
  }

  &-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .login,
    .logout {
      padding-top: 0.10667rem;
      font-weight: 700;
      margin-right: 0.53333rem;
      font-size: 0.34667rem;
      word-break: break-all;
      text-align: center;
      text-transform: uppercase;
    }

    .base-button.register {
      width: 2.72rem;

      background-image: linear-gradient(135deg, #BF953F 0%, #FCF6BA 20%, #B38728 50%, #FBF5B7 80%, #AA771C 100%) !important;
      color: #000000 !important;
      font-weight: bold !important;
      border: 1px solid #996515 !important;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3),
        inset 0 1px 1px rgba(255, 255, 255, 0.8) !important;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 16px !important;
    }
  }

  &-bottom {
    padding: 0 0.26667rem 0.10667rem;
    background-color: var(--bg-color);
    border-bottom: .02667rem solid var(--other-color-light);
  }
}

.navbar {
  :deep(.van-tabs__wrap) {
    height: 0.88rem;
  }

  :deep(.van-tabs__nav) {
    background: transparent;
    padding-bottom: 0 !important;
    height: 0.88rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    cursor: grab;
  }

  :deep(.van-tabs__nav)::-webkit-scrollbar {
    display: none;
  }

  :deep(.van-tab) {
    color: var(--font-darker-color);
    height: 0.88rem;
    padding: 0 0.34667rem;
    flex-shrink: 0;
    line-height: normal !important;
    border-radius: 0.13333rem;
    flex: none;

    img {
      width: 17px;
      height: 17px;
    }

    span {
      height: 0.88rem;
      font-size: 0.37333rem;
      font-style: normal;
      font-weight: 700;
      margin-left: 0.10667rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }

  :deep(.van-tab--active) {
    color: var(--theme-color);
    color: #f0cd4f;
  }

  :deep(.van-tab__text) {
    display: flex;
    align-items: center;
  }
}
</style>
