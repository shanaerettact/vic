<script setup>
import { inject, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconTemplate from '@/components/Icons/IconTemplate.vue';
import IconArrowR from '@/components/Icons/icon-arrow-r.vue'


const common = inject("common")
const { t, locale } = useI18n()


const cells = [
  { id: 1, text: t("message.Security"), iconWidth: "20px", iconHeight: "20px", iconClass: "icon-my-setting2", to: "/safeCenter" },
  { id: 2, text: t("message.WalletAddress"), iconWidth: "20px", iconHeight: "20px", iconClass: "icon-my-setting3", to: "/walletaddrmanager" },
]
</script>


<template>
  <div class="settingbar-wrapper">
    <div class="main">
      <HeaderCross :text="t('message.Settings')" />

      <van-cell-group :border="false">
        <van-cell
          v-for="(item, index) in cells"
          :key="index"
          :border="false"
          :to="item.to"
        >
          <template #title>
            <p>
              <IconTemplate
                :iconWidth="item.iconWidth"
                :iconHeight="item.iconHeight"
                :iconClass="item.iconClass"
              />
            </p>
            <span>{{ item.text }}</span>
          </template>
          <template #right-icon>
            <IconArrowR />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.settingbar-wrapper {
  height: 100%; 
}

* {
  font-family: Geogrotesque-Md, sans-serif;
}

::v-deep(.van-nav-bar) {
  background: var(--bg-color);
}

:deep(.van-nav-bar__content) {
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 1.22667rem;
}

:deep(.van-nav-bar__title) {
  color: var(--font-color) !important;
  font-weight: 650;
  font-size: .42667rem !important;
  max-width: 60%;
  margin: 0 auto;
}

:deep(.van-hairline--bottom):after {
  border-bottom-width: 0px;
}


.main {
  width: 100%;
  height: 100%;
  position: relative;

  .van-cell-group {
    margin: .2667rem;
    padding: .2667rem;
    background: var(--bg-light-color);
    border-radius: .16rem;

    .van-cell {
      padding: .16rem;
      background: var(--bg-light-color) !important;
      color: var(--font-dark-color) !important;

      :deep(.van-cell__title) {
        display: flex;
        line-height: normal;
        flex-direction: row;
        align-items: center;
      }

      &__title p {
        width: .8rem;
        height: .64rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      &__title span {
        font-size: .37333rem;
        color: var(--font-color);
        font-weight: 650;
      }
    }

    .van-cell__title {
      display: flex;
    }

    .van-cell::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: .42667rem;
      bottom: 0;
      left: .42667rem;
      border-bottom: .02667rem solid var(--border-color);
      transform: scaleY(.5);
    }

    .van-cell:nth-child(n+2) {
      margin-top: .2667rem;
    }

    .van-cell:last-child:after {
      display: none;
    }
  }
}
</style>