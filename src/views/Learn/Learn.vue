<script setup>
import { inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import BuyUSDT_tw from '@/lang/article-learn/BuyUSDT-tw.html?raw'
import BuyUSDT_en from '@/lang/article-learn/BuyUSDT-en.html?raw'
import BuyUSDT_cn from "@/lang/article-learn/BuyUSDT-cn.html?raw"
import USDTintro_tw from '@/lang/article-learn/USDTintro-tw.html?raw'
import USDTintro_en from '@/lang/article-learn/USDTintro-en.html?raw'
import USDTintro_cn from '@/lang/article-learn/USDTintro-cn.html?raw'




const common = inject("common");
const route = useRoute();   // 獲取當前路由 query, 例如可能 route.query.article = "responsible"

const { t } = useI18n();
const locale = useI18n().locale;

let content = {
  "BuyUSDT": {
    tw: BuyUSDT_tw,
    en: BuyUSDT_en,
    cn: BuyUSDT_cn,
  },
  "USDTintro": {
    tw: USDTintro_tw,
    en: USDTintro_en,
    cn: USDTintro_cn,
  },

}


content = content[route.query.article][locale.value];  

const title = computed(() => { 
  switch (route.query.article) {
    case 'BuyUSDT':
      return t('message.Footer-BuyUSDT')
    case 'USDTintro':
      return t('message.Footer-USDTIntroduction')
    default:
      return "not match!"
  }
})

common.loading = false;
</script>

<template>
  <div class="learn-wrapper">

    <div class="main">

      <HeaderCross :text="title" />
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
.learn-wrapper {
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
  color: var(--font-color)!important;
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
    color: var(--font-color);
    font-size: .3733rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &-top {
      border-radius: .1333rem;
      padding: .32rem;
      background: var(--bg-light-color);
    }

    :deep(.wrapper p) {
      margin-bottom: .5rem;
    }

    :deep(.wrapper article) {
      color: var(--font-dark-color);

      li {
        margin-bottom: .2rem;
      }

      a {
        color: var(--theme-color);
      }
    }

  }
}
</style>
