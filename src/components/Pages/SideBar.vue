<script setup>
import { reactive, inject, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import PopupSimple from "@/components/Utilities/Popup_simple.vue"

const common = inject("common");

const { t, locale } = useI18n();

const toRouter = (url, isPrivate, arg) => {
  common.showSideBar = false;
  let isLogin = {
    len: Object.keys(common.user).length
  }
  if (isPrivate) {
    if (isLogin.len > 0) {
      common.toRouter(url);
      common.sidebar = true;
    } else {
      common.alert("fail", t("message.Not-login"));
      // common.showSideBar = false;
      common.toRouter("/login");
    }
  } else {
    common.toRouterArg(url, arg);
  }
}

const state = reactive({

});

const dropdownOpen = ref(Array(7).fill(false)) 

const showActive = () => { 
  common.showSideBar = false
  common.openActiveBypassCookie = true
  common.showActive = true
}

</script>

<template>
  <div class="sideBar-wrapper">
    <div class="header">
      <div class="header-box">
        <div class="header-top">
          <img
            src="../../assets/img/vic_logo.png"
            alt=""
          />
        </div>
        <div class="menu-wrapper">
          <div class="link-items">
            <!-- 舊的遊戲頁面 /gamelist 先不使用了 -->
            <!-- <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[0] = !dropdownOpen[0]"
              >
                <div class="left">{{ t("message.Game-list-title") }}</div>
                <div class="right"><i
                    class="fas fa-chevron-right"
                    :class="{ rotated: dropdownOpen[0] }"
                  ></i></div>
              </div>
              <transition name="dropdown">
                <div
                  class="dropdown-container"
                  v-show="dropdownOpen[0]"
                >
                  <div
                    v-for="(item, index) in common.menu"
                    :key="index"
                    @click="toRouter('/gamelist', false, { gameType: item.code })"
                  >
                    <img
                      class="img-icon"
                      :src="item.icon"
                    />
                    {{ item.title }}
                  </div>
                </div>
              </transition>
            </div> -->

            <!-- 公告, 待更新(要有彈窗) -->
            <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="showActive"
              >
                <!-- <div class="left">{{ t("message.Profile") }}++</div> -->
                <div class="left">公告</div>
                <!-- <div class="right"><i class="fas fa-chevron-right"></i></div> -->
              </div>
              <!-- <transition name="dropdown">
                <div
                  class="dropdown-container"
                >
                  <div @click="toRouter('/my', true)">
                    {{ t("message.Dashboard")}}</div>
                  <div @click="toRouter('/vip', true)">{{ t("message.VIP") }}
                  </div>
                  <div @click="toRouter('/transrecord', true)">{{
                    t("message.Record") }}</div>
                </div>
              </transition> -->
            </div>
          </div>
        </div>
        <div class="menu-wrapper">
          <div class="link-items">

            <!-- <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[0] = !dropdownOpen[0]"
              >
                <div class="left">{{ t("message.Game-list-title") }}</div>
                <div class="right"><i
                    class="fas fa-chevron-right"
                    :class="{ rotated: dropdownOpen[0] }"
                  ></i></div>
              </div>
              <transition name="dropdown">
                <div
                  class="dropdown-container"
                  v-show="dropdownOpen[0]"
                >
                  <div
                    v-for="(item, index) in common.menu"
                    :key="index"
                    @click="toRouter('/gamelist', false, { gameType: item.code })"
                  >
                    <img
                      class="img-icon"
                      :src="item.icon"
                    />
                    {{ item.title }}
                  </div>
                </div>
              </transition>
            </div> -->
            <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[1] = !dropdownOpen[1]"
              >
                <div class="left">{{ t("message.Profile") }}</div>
                <div class="right"><i
                    class="fas fa-chevron-right"
                    :class="{ rotated: dropdownOpen[1] }"
                  ></i></div>
              </div>
              <transition name="dropdown">
                <div
                  class="dropdown-container"
                  v-show="dropdownOpen[1]"
                >
                  <div @click="toRouter('/my', true)">{{ t("message.Dashboard")
                  }}</div>
                  <div @click="toRouter('/vip', true)">{{ t("message.VIP") }}
                  </div>
                  <div @click="toRouter('/transrecord', true)">{{
                    t("message.Record") }}</div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <div class="menu-wrapper">
          <div class="link-items">
            <div class="item">
              <!-- 雖無 dropdown 功能，但預留dropdownOpen[] -->
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[2] = !dropdownOpen[2]"
              >
                <div class="left">{{ t("message.ResponsibleBetting") }}</div>
                <div class="right"></div>
              </div>
            </div>
            <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[3] = !dropdownOpen[3]"
              >
                <div class="left">{{ t("message.Language") }}</div>
                <div class="right"><i
                    class="fas fa-chevron-right"
                    :class="{ rotated: dropdownOpen[3] }"
                  ></i></div>
              </div>
              <transition name="dropdown">
                <div
                  class="dropdown-container"
                  v-show="dropdownOpen[3]"
                >
                  <div @click="common.changeLanguage('tw')">
                    <img
                      class="img-icon"
                      src="../../assets/img/Icon-flag/flag-tw.svg"
                    />繁體中文
                  </div>
                  <div @click="common.changeLanguage('cn')">
                    <img
                      class="img-icon"
                      src="../../assets/img/Icon-flag/flag-cn.svg"
                    />简体中文
                  </div>
                  <div @click="common.changeLanguage('en')">
                    <img
                      class="img-icon"
                      src="../../assets/img/Icon-flag/flag-us.png"
                    />English
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <div class="menu-wrapper">
          <div class="link-items">
            <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[4] = !dropdownOpen[4]"
              >
                <div class="left">{{ t("message.Footer-Learn") }}</div>
                <div class="right"><i
                    class="fas fa-chevron-right"
                    :class="{ rotated: dropdownOpen[4] }"
                  ></i></div>
              </div>
              <transition name="dropdown">
                <div
                  class="dropdown-container"
                  v-show="dropdownOpen[4]"
                >
                  <div
                    @click="toRouter('/learn/learn', false, { article: 'BuyUSDT' })"
                  >{{ t("message.Footer-BuyUSDT") }}</div>
                  <!-- <div>{{ t("message.Footer-USDTNews") }}</div> -->
                  <!-- USDT 新聞 先拿掉 -->
                  <div
                    @click="toRouter('learn/learn', false, { article: 'USDTintro' })"
                  >{{ t("message.Footer-USDTIntroduction") }}</div>
                </div>
              </transition>
            </div>
            <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[5] = !dropdownOpen[5]"
              >
                <div class="left">{{ t("message.Footer-Help") }}</div>
                <div class="right"><i
                    class="fas fa-chevron-right"
                    :class="{ rotated: dropdownOpen[5] }"
                  ></i></div>
              </div>
              <transition name="dropdown">
                <div
                  class="dropdown-container"
                  v-show="dropdownOpen[5]"
                >
                  <div>{{ t("message.Footer-CustomerSupport") }}</div>
                  <div>{{ t("message.Footer-FAQ") }}</div>
                </div>
              </transition>
            </div>
            <div class="item">
              <div
                class="link-item dropdown-btn"
                @click="dropdownOpen[6] = !dropdownOpen[6]"
              >
                <div class="left">{{ t("message.Footer-AboutUs") }}</div>
                <div class="right"><i
                    class="fas fa-chevron-right"
                    :class="{ rotated: dropdownOpen[6] }"
                  ></i></div>
              </div>
              <transition name="dropdown">
                <div
                  class="dropdown-container"
                  v-show="dropdownOpen[6]"
                >
                  <div
                    @click="toRouter('/detail/detail', false, { article: 'about' })"
                  >{{ t("message.Footer-aboutus") }}</div>
                  <div
                    @click="toRouter('/detail/detail', false, { article: 'privacy' })"
                  >{{ t("message.Footer-PrivacyPolicy-text") }}</div>
                  <div
                    @click="toRouter('/detail/detail', false, { article: 'terms' })"
                  >{{ t("message.Footer-TermsOfService") }}</div>
                  <div
                    @click="toRouter('/detail/detail', false, { article: 'responsible' })"
                  >
                    {{ t("message.Footer-ResponsibleBetting") }}</div>
                  <!-- 執照聲明拿掉 -->
                  <!-- <div @click="toRouter('/detail/detail', false, { article: 'license'})">{{ t("message.Footer-License") }}</div> -->
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 公告彈窗 -->
    <!-- <PopupSimple
      :height="'90%'"
      v-model:show="showPop"
    >
      <ActiveListSec />
    </PopupSimple> -->
  </div>
</template>

<style lang="scss" scoped>
.sideBar-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: var(--bg-color);


  .header {
    margin-top: .5rem;
    // height: 6.66667rem;
    height: 100%;
    overflow-y: scroll;

    &-box {
      padding: 0.13333rem 0.53333rem 0;
      // padding: 0 1rem 0;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      flex-wrap: nowrap;

      img {
        height: 35px;
      }
    }

    &-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
}


.menu-wrapper {
  width: 100%;
  height: calc(100% - 6.6667rem);
}

.link-items {
  padding: .18rem .43rem;
  margin-top: .4rem;
  background: var(--bg-light-color);
  border-radius: .16rem;

  .item {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: center;
    // border-bottom: 1px solid #3c3c44;
    min-height: 1rem;

    &:last-child {
      border-bottom: none;
    }
  }

  .link-item {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-right: .2rem;

    .left {
      font-size: .45rem;
      font-weight: 600;
    }

    .right {
      font-size: .45rem;

      i {
        color: var(--font-dark-color);
        transition: transform .4s cubic-bezier(0.4, 0, 0.2, 1.8);
      }

      i.rotated {
        transform: rotate(90deg);
      }
    }
  }


  .dropdown-container {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 100%;

    div {
      display: flex;
      align-items: center;
      width: 90%;
      background-color: var(--bg-other);
      border-radius: 10px;
      padding: 5px 20px;
      margin: 4px;
      color: var(--font-color);
      font-size: .45rem;
      font-weight: 500;
      letter-spacing: 2px;

      &:first-child {
        margin-top: 10px;
      }
    }

    .img-icon {
      max-width: 28px;
      max-height: 100%;
      margin-right: .25rem;
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>
