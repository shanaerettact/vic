<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import About_tw from '@/lang/article/About-tw.html?raw'
import About_en from '@/lang/article/About-en.html?raw'
import About_cn from "@/lang/article/About-cn.html?raw"

const common = inject("common");


const { t } = useI18n();
const locale = useI18n().locale;

let content;

switch (locale.value) {
  case 'tw':
    content = About_tw;
    break;
  case 'en':
    content = About_en;
    break;
  case 'cn':
    content = About_cn;
    break;
  default:
    console.log("not match")
}

common.loading = false;
</script>

<template>
  <div class="responsible-wrapper">

    <div class="main">

      <HeaderCross :text="t('message.ResponsibleBetting')" />
      <div class="content">
        <div class="help-box">

          <div class="help-items">
            <div class="credit">
              <div
                class="credit-top"
                v-html="content"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>


<style lang="scss" scoped>
.responsible-wrapper {
  display: flex;
  flex-direction: column;
}

// 
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
  color: #fff !important;
  font-weight: 650;
  font-size: .42667rem !important;
  max-width: 60%;
  margin: 0 auto;
}

:deep(.van-hairline--bottom):after {
  border-bottom-width: 0px;
}



.main {
  position: relative;
  flex: 1;
}

.main .content {
  padding: 0 .32rem;
  margin-bottom: .6667rem;
  box-sizing: border-box;


  .help-box .help-items .credit {
    color: #fff;
    font-size: .3733rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &-top {
      border-radius: .1333rem;
      padding: .32rem;
      background: #2b2d34;
    }

    :deep(.wrapper p) {
      margin-bottom: .5rem;
    }

    :deep(.wrapper article) {
      color: #abbcd4;
    }

  }
}
</style>
