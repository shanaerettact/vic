<script setup>
import { inject, reactive, computed, watch, ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n';
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconTemplate from '@/components/Icons/IconTemplate.vue';
import TopBoxPopup from '@/components/Utilities/TopBoxPopup.vue';


const common = inject("common")
const { t, locale } = useI18n()


const currency = [
  {
    label: 'USDT',
    icon: IconTemplate,
    iconProps: {
      iconWidth: '20px',
      iconHeight: '20px',
      iconClass: 'icon-usdt'
    },
    iconProps_big: {
      iconWidth: '24px',
      iconHeight: '24px',
      iconClass: 'icon-usdt'
    }
  },
]



const iconClassTrans = { 
  "tron": "icon-trx", 
  "eth": "icon-eth"
}

const webIcon = shallowRef([])

const genArray = () => { 
  webIcon.value.push({ 
    label: '',
    icon: IconTemplate,
    iconProps: {
      iconWidth: '20px',
      iconHeight: '20px',
      iconClass: ''
    },
    iconProps_big: {
      iconWidth: '24px',
      iconHeight: '24px',
      iconClass: ''
    }
  })
}


const state = reactive({
  thirdPayment: [],
  walletWithdraw: [],
})

const optionReady = ref(false)  

const wl_name = ref('')  
const wl_nameFocused = ref(false)

const wl_addr = ref('')
const wl_addrFocused = ref(false)


const activeLabel = ref(null)

async function walletManage() { 
  common.loading = true
  try {
    let res = await common.baseAjax("GET", "/user/wallet-manage");
    if (res.code == 1) {
      state.thirdPayment = res.data.third_payment; 
      state.walletWithdraw = res.data.user_wallet_withdraw
      for (let i = 0; i < state.thirdPayment.length; i++) {
        genArray();
        webIcon.value[i].label = state.thirdPayment[i].third_code
        let className = iconClassTrans[webIcon.value[i].label]
        webIcon.value[i].iconProps.iconClass = className
        webIcon.value[i].iconProps_big.iconClass = className
      }
      optionReady.value = true
      common.loading = false
    } else {
      if (res.code == 4) {
        common.user = {};
        common.toRouter("/")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
      common.loading = false
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  } finally { }
}

walletManage().then(() => {
  activeLabel.value = webIcon.value[0]?.label || null
});


const submit = async () => { 
  if (wl_name.value.length > 100) {
    common.alert("fail", t('message.addr-WalletNameIsTooLong'))
    return false
  }
  let form = {};
  let pattern = ''
  if (wl_name.value && wl_addr.value) {
    form = {
      third_code: activeLabel.value,
      action: "new",
      name: wl_name.value,
      withdraw_info: wl_addr.value,
    }
    if (form.third_code == 'tron') {
      pattern = /^T[0-9a-zA-Z]{33}$/
      let isValid = pattern.test(form.withdraw_info)
      if (!isValid) {
        common.alert("fail", t('message.addr-WalleAddrFormatIsIncorrect'))
        return false
      }
    }
  }

  try {
    common.loading = true
    let res = await common.baseAjax("POST", "/user/wallet-manage", form);
      if (res.code == 1) {
      common.loading = false
      common.alert("", res.msg)
      setTimeout(() => {
        history.back();
      }, 500);
    } else {
      if (res.code == 4) {
        common.user = {}
        common.toRouter("/")
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      common.loading = false
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  } finally { }
}

</script>


<template>
  <div class="addcryptoaddr-wrapper">
    <div class="main">
      <HeaderCross :text="t('message.WalletAddress')" />
      <div class="content">
        <div class="content-box">
          <div class="top-box-wrapper">
            <TopBoxPopup
              :height="'30%'"
              :options="currency"
            >
              <template #up>
                {{ t("message.Currency") }}
              </template>
            </TopBoxPopup>

            <TopBoxPopup
              v-if="optionReady"
              :height="'30%'"
              :options="webIcon"
              @response="(msg) => { activeLabel = msg.label }"
            >
              <template #up>
                {{ t("message.Network") }}
              </template>
            </TopBoxPopup>
          </div>

          <div class="item-cell">
            <h4>{{ t("message.WalletName") }}</h4>
            <div
              class="common"
              style="background-color: rgb(32,33,37); border-radius: 5px;"
            >
              <van-field
                v-model="wl_name"
                center
                @focus="wl_nameFocused = true"
                @blur="wl_nameFocused = false;"
                :class="wl_nameFocused ? 'focus' : ''"
                style="border-radius:6px"
              />
            </div>
          </div>
          <div class="item-cell">
            <h4>{{ t("message.WalletAddress") }}</h4>
            <div
              class="common"
              style="background-color: rgb(32,33,37); border-radius: 5px;"
            >
              <van-field
                v-model="wl_addr"
                center
                @focus="wl_addrFocused = true"
                @blur="wl_addrFocused = false;"
                :class="wl_addrFocused ? 'focus' : ''"
                style="border-radius:6px"
              />
            </div>
          </div>

          <div
            :class="['com-btn', 'submit', wl_name && wl_addr ? '' : 'gray']"
            @click="submit"
          >
            {{ t("message.Create") }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.addcryptoaddr-wrapper {
  display: flex;
  flex-direction: column;
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
  position: relative;
  flex: 1;
}

.main .content {
  padding: .1867rem .2667rem;

  .content-box {
    padding: .64rem .32rem;
    border-radius: .16rem;
    background: var(--bg-light-color);
  }

  .top-box-wrapper {
    display: grid;
    gap: .32rem;
    grid-template-columns: 1fr 1fr;

    :deep(.left_text_up) {
      color: var(--font-color);
      font-size: .3467rem;
      font-weight: normal;
    }

    :deep(.top-box) {
      margin-bottom: 0;
    }
  }

  .item-cell:not(:last-child) {
    margin-bottom: .48rem;
  }

  .item-cell {
    margin-top: .64rem;

    h4 {
      margin-bottom: .2667rem;
      padding-left: .054rem;
    }

    .van-cell {
      height: 1.17333rem;
      padding: 0 .4rem;
      border-radius: .13333rem;
      background: none;
    }
  }

  .gray {
    pointer-events: none;
    opacity: .5;
  }

  .submit {
    height: 1.28rem;
    font-style: normal;
    line-height: normal;
    color: var(--bg-range-dark);
    text-align: center;
    font-size: .4267rem;
    font-weight: 650;
  }

}

.common {
  position: relative;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  flex-direction: column;
  -webkit-flex-direction: column;
  flex-wrap: nowrap;
  -webkit-flex-wrap: nowrap;

  .van-cell.default {
    border: .0267rem solid var(--bg-color) !important;
  }

  .van-cell.focus {
    border: .0267rem solid var(--theme-color);
  }
}

.com-btn {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
  flex-direction: row;
  -webkit-flex-direction: row;
  flex-wrap: nowrap;
  -webkit-flex-wrap: nowrap;
  min-width: 2.08rem;
  height: .85333rem;
  font-size: .33787rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--font-dark-theme-color);
  border-radius: .13333rem;
  background: var(--theme-color);
  box-shadow: 0 .10667rem 0 0 #89a617, inset 0 0 .16rem .10667rem #bbfc01, 0 0 .10667rem .13333rem rgba(252, 197, 1, .07);
}
</style>