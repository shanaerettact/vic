<script setup>
import { inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import Responsible_tw from '@/lang/article/Responsible-tw.html?raw'
import Responsible_en from '@/lang/article/Responsible-en.html?raw'
import Responsible_cn from "@/lang/article/Responsible-cn.html?raw"
import About_tw from '@/lang/article/About-tw.html?raw'
import About_en from '@/lang/article/About-en.html?raw'
import About_cn from "@/lang/article/About-cn.html?raw"
import Privacy_tw from '@/lang/article/Privacy-tw.html?raw'
import Privacy_en from '@/lang/article/Privacy-en.html?raw'
import Privacy_cn from "@/lang/article/Privacy-cn.html?raw"
import Terms_tw from '@/lang/article/Terms-tw.html?raw'
import Terms_en from '@/lang/article/Terms-en.html?raw'
import Terms_cn from "@/lang/article/Terms-cn.html?raw";
import License_tw from '@/lang/article/License-tw.html?raw'
import License_en from '@/lang/article/License-en.html?raw'
import License_cn from "@/lang/article/License-cn.html?raw"


const common = inject("common");
const route = useRoute();  

const { t } = useI18n();
const locale = useI18n().locale;

let content = {
  "responsible": {
    tw: Responsible_tw,
    en: Responsible_en,
    cn: Responsible_cn
  },
  "about": {
    tw: About_tw,
    en: About_en,
    cn: About_cn
  },
  "privacy": {
    tw: Privacy_tw,
    en: Privacy_en,
    cn: Privacy_cn
  },
  "terms": {
    tw: Terms_tw,
    en: Terms_en,
    cn: Terms_cn,
  },
  "license": {
    tw: License_tw,
    en: License_en,
    cn: License_cn,
  },

}



content = content[route.query.article][locale.value];  

const title = computed(() => {  
  switch (route.query.article) {
    case 'responsible':
      return t('message.ResponsibleBetting')
    case 'about':
      return t('message.Footer-AboutUs')
    case 'privacy':
      return t('message.Footer-PrivacyPolicy-text')
    case 'terms':
      return t('message.Footer-TermsOfService')
    case 'license':
      return t('message.Footer-License')
    default:
      return "not match!"
  }
})

common.loading = false;
</script>

<template>
  <div class="responsible-wrapper">

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
    }

  }
}
</style>
