<script setup>
import { inject, reactive, computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { showToast } from "vant";
import QrcodeVue from "qrcode.vue";
import IconComService from '@/components/Icons/icon-com-service.vue';
import IconLeftBack from '@/components/Icons/icon-leftBack.vue';
import IconDropdown from '@/components/Icons/icon-drop-down.vue';
import IconTrx from '@/components/Icons/icon-trx.vue';
import IconCopyWhite1 from '@/components/Icons/icon-copy-white1.vue';
import IconNotice from '@/components/Icons/icon-notice.vue';
import IconClose from '@/components/Icons/icon-close.vue';
import IconSearch from '@/components/Icons/icon-search.vue';
import IconActiveIcon from '@/components/Icons/icon-activeIcon.vue';
import TopBoxPopup from '@/components/Utilities/TopBoxPopup.vue'
import IconTemplate from '@/components/Icons/IconTemplate.vue'
import Deposit_Tabbar from "@/components/Blocks/Deposit_Tabbar.vue";
import IconArrowR from '@/components/Icons/icon-arrow-r.vue'
import { baseAjax } from "../api";


const { t, locale } = useI18n();

const common = inject("common");

const state = reactive({
  qrcode: computed(() => common.qrcode),
  activeContent: "choosing", 
  thirdPayment: [], 
  activePaymentData: "",
  activeThirdCode: computed(() => state.activeContent),
  money: "", 
})

const showCurrency = ref(false);


const depositDataInit = async () => {
  try {
    common.loading = true
    let res = await common.baseAjax("GET", "/user/user-recharge")
    common.loading = false
    if (res.code == 1) {
      common.qrcode = res.data?.recharge_address?.field1 ?? ""
      state.thirdPayment = res.data?.third_payment ?? []
    } else if (res.code == 4) {
      common.alert("fail", res.msg);
      common.toRouter("/login")
    }
  } catch (error) {
    console.log(error)
  }
}

depositDataInit()

const toPayment = (item) => {
  state.activeContent = item.third_code
  state.money = ""
  state.activePaymentData = ""
  state.activePaymentData = item
}


const currencyPop = () => { 
  showCurrency.value = true;
}

const closeCurrencyPop = () => {
  showCurrency.value = false;
}

const webOptions = [
  {
    label: 'TRC20',
    icon: IconTemplate,
    iconProps: {
      iconWidth: '22px',
      iconHeight: '22px',
      iconClass: 'icon-trx'
    },
    iconProps_big: {
      iconWidth: '24px',
      iconHeight: '24px',
      iconClass: 'icon-trx'
    }
  }
]

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(state.qrcode);
    showToast({
      message: t("message.Copied"),
      icon: 'https://cdn360.w0zuv.live/images/success.01e42bae.webp'
    })
  } catch (error) {
    console.log(error)
    common.alert("fail", t("message.CopyFailed"))
  }
}

const qrcodeParts = computed(() => {
  const code = state.qrcode;
  if (code.length < 8) {
    return { head: code, middle: '', tail: '' };
  }
  return {
    head: code.slice(0, 4),
    middle: code.slice(4, -4),
    tail: code.slice(-4)
  }
})


const onClickLeft = () => {
  if (window.previousRoute.name) {
    history.back();
  } else {
    common.toRouter("/")
  }
}



const validator = (val) => {
  return /^\d+$/.test(val); 
}

const formRef = ref(null) 

const submit = async () => {
  try { 
    await formRef.value.validate();
  } catch (error) {
    console.log(error)
    return 
  }

  let form = {
    "money": state.money,
    "third_code": state.activeThirdCode,
  }

  try {
    common.loading = true
    const res = await baseAjax("POST", `/third-pay/${state.activeThirdCode}`, form)
    if (res.code == 1) {
      common.toRouterArg("/depositResult", res.data)
    }else {
      common.alert("fail", res.msg)
    }
    // common.toRouterArg("/depositResult", mock)
    common.loading = false
  } catch (error) {
    console.log(error)
    common.loading = false
  }
}

</script>


<template>
  <div class="deposit-wrapper">
    <van-nav-bar
      :title="t('message.Deposit-title')"
      @click-left="onClickLeft"
    >
      <template #left>
        <IconLeftBack />
      </template>
      <template #right>
        <IconComService />
      </template>
    </van-nav-bar>


    <div
      v-if="state.activeContent == 'choosing'"
      class="content-box safe-area-bottom choosing-area"
    >
      <van-cell-group :border="false">
        <div class="content-head">請選擇儲值方式</div>
        <van-cell
          v-for="(item, index) in state.thirdPayment"
          :key="index"
          :border="false"
          @click="toPayment(item)"
        >
          <template #title>
            <!-- <p>
              <component :is="item.icon" />
            </p> -->
            <span>{{ item.name }}</span>
          </template>
          <template #right-icon>
            <IconArrowR />
          </template>
        </van-cell>
      </van-cell-group>
    </div>



    <div
      v-if="state.activeContent == 'tron'"
      class="content-box safe-area-bottom"
    >
      <div class="wallet-address">
        <div class="top-box-wrapper">
          <div
            class="top-box"
            @click="currencyPop"
          >
            <div class="left">
              <van-image
                width="24px"
                height="24px"
                lazy-load
                src="https://cdn-img.w0zuv.live/image/2024-07-22/bfbecda097f74f41bb582adeb2fd88f8.webp"
              />
              <div class="left_text">
                <span class="left_text_up">{{ t("message.Currency") }}</span>
                <span class="left_text_down">{{ common.primeCoinName }}</span>
              </div>
            </div>
            <div class="right">
              <IconDropdown />
            </div>
          </div>
          <TopBoxPopup
            :height="'30%'"
            :options="webOptions"
          >
            <template #up>{{ t("message.Network") }}</template>
          </TopBoxPopup>
        </div>


        <div class="code-box">
          <div class="qrq-box">
            <qrcode-vue
              :value="state.qrcode"
              :size="120"
              level="H"
            ></qrcode-vue>
          </div>
          <div class="address-area">
            <div class="address">{{ t("message.WalletAddress") }}</div>
            <div class="address-text">
              <span class="address-test-span">{{ qrcodeParts.head }}</span>
              <span>{{ qrcodeParts.middle }}</span>
              <span class="address-test-span">{{ qrcodeParts.tail }}</span>
            </div>
            <div class="copy-box">
              <IconCopyWhite1 />
              <span @click="copyAddress">{{ t("message.CopyAddress") }}</span>
            </div>
          </div>
        </div>

        <div class="notice-box">
          <IconNotice />
          <span>{{ t("message.Deposit-notice") }}</span>
        </div>


        <van-popup
          v-model:show="showCurrency"
          position="bottom"
          :style="{ height: '50%' }"
          style="background-color: var(--bg-color);border-radius: 0.16rem;"
        >

          <div class="pop-header">
            <div class="pop-close">
              <div @click="closeCurrencyPop">
                <IconClose />
              </div>
            </div>
            <div class="pop-title">{{ t("message.Choose") }}</div>
            <div class="search-box">
              <div class="search-icon">
                <IconSearch />
              </div>
              <van-field :placeholder="t('message.Search')" />
            </div>
          </div>

          <div class="pop-content">
            <div class="pop-item popactive">
              <div class="pop-left">
                <van-image
                  width="24px"
                  height="24px"
                  class="pop-image"
                  style="width:22px; height:22px;"
                  lazy-load
                  src="https://cdn-img.w0zuv.live/image/2024-07-22/bfbecda097f74f41bb582adeb2fd88f8.webp"
                />
                <span class="pop-text">{{ common.primeCoinName }}</span>
              </div>
              <div>
                <IconActiveIcon />
              </div>
            </div>
          </div>
        </van-popup>


      </div>
    </div>


    <div
      v-if="state.activeContent !== 'choosing' && state.activeContent !== 'tron'"
      class="content-box safe-area-bottom"
    >
      <div class="wallet-address">

        <!-- <div class="code-box">
          <div class="qrq-box">
            <qrcode-vue
              :value="state.qrcode"
              :size="120"
              level="H"
            ></qrcode-vue>
          </div>
          <div class="address-area">
            <div class="address">{{ t("message.WalletAddress") }}</div>
            <div class="address-text">
              <span class="address-test-span">{{ qrcodeParts.head }}</span>
              <span>{{ qrcodeParts.middle }}</span>
              <span class="address-test-span">{{ qrcodeParts.tail }}</span>
            </div>
            <div class="copy-box">
              <IconCopyWhite1 />
              <span @click="copyAddress">{{ t("message.CopyAddress") }}</span>
            </div>
          </div>
        </div> -->
        <div style="font-size: .5rem; margin-bottom: 5px;">
          <span>儲值方式:</span>
          <span style="color: var(--theme-color); margin-left: 5px;">
            {{ state.activePaymentData.name }}
          </span>
        </div>
        <div class="deposit-form">
          <van-form ref="formRef">
            <div class="payment-data">
              <div>最小入金: {{ state.activePaymentData.rc_min }}</div>
              <div>最大入金: {{ state.activePaymentData.rc_max }}</div>
              <div>入金比值: {{ state.activePaymentData.rc_ratio }}</div>
            </div>
            <div class="form-item">
              <van-field
                placeholder="請輸入金額"
                v-model="state.money"
                :rules="[{ validator, message: '请输入正确内容' }]"
              />
              <div class="deposit-tip">
                <span>儲值金額 = 入金 * 入金比值</span>
                <span>{{ state.money * state.activePaymentData.rc_ratio
                  }}</span>
              </div>
            </div>
            <div
              class="btn-box"
              @click.prevent="submit"
            >提交</div>
          </van-form>
        </div>
      </div>

    </div>


    <br /><br /><br /><br />

    <Deposit_Tabbar />
  </div>
</template>


<style lang="scss" scoped>
// style for HeaderCross
::v-deep(.van-nav-bar) {
  background: var(--bg-color);
  // border-bottom: 1px solid rgb(7, 7, 8);
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


.content-box {
  flex: 1;
  margin: 0 .267rem;
}

.safe-area-bottom {
  padding-bottom: calc(1.6rem + env(safe-area-inset-bottom));
}


.choosing-area .van-cell-group {
  padding: .26667rem;
  background: var(--bg-light-color);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--card-glow);
  border-radius: .21333rem;
  transition: all 0.3s ease;

  .content-head {
    color: var(--font-color);
    font-size: .3733rem;
    font-weight: 650;
    margin-top: .2667rem;
    margin-bottom: .24rem;
    position: relative;
  }

  .content-head:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -.24rem;
    width: 100%;
    height: .0267rem;
    background-color: var(--bg-other);
  }

  .van-cell {
    background: transparent;

    &__title span {
      font-size: .37333rem;
      color: var(--font-color);
      font-weight: 650;
    }
  }
}

.deposit-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-color);
}

.wallet-address {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - .53333rem);
  background: var(--bg-light-color);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--card-glow);
  padding: .64rem .37333rem;
  border-radius: .21333rem;
  margin-bottom: 3.2rem;
  box-sizing: border-box;

  .top-box-wrapper {
    width: 100%;
    display: grid;
    gap: .32rem;
    grid-template-columns: 1fr 1fr;

    .top-box {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 100%;
      position: relative;
      min-height: 1.49333rem;
      border-radius: .10667rem;
      padding: .26667rem .13333rem;
      margin-bottom: .21333rem;
      box-sizing: border-box;
      gap: .10667rem;
      border-radius: .16rem;
      background: var(--bg-lighter-color2);
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
      }

      .left_text {
        display: flex;
        flex-direction: column;
        margin-left: .16rem;

        &_up {
          color: var(--font-dark-color);
          font-size: .3467rem;
          font-weight: 650;
        }

        &_down {
          color: var(--font-color);
          font-size: .3733rem;
          font-weight: 650;
        }
      }

      .right {
        // font-family: Geogrotesque-Md, PingFang SC;
        font-size: .37333rem;
        font-style: normal;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }
    }
  }


  .code-box {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border-radius: .12rem;
    padding: .64rem 0;
    box-sizing: border-box;
    width: 100%;

    .qrq-box {
      width: 3.52rem;
      height: 3.52rem;
      border-radius: .16rem !important;
      background: var(--qr-background);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-right: .26667rem;
    }

    .address-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: start;
      box-sizing: border-box;

      .address {
        color: var(--font-dark-color);
        text-align: left;
        font-size: .32rem;
        font-style: normal;
        font-weight: 500;
      }

      .address-text {
        flex: 1;
        width: 100%;
        padding: .24rem .16rem;
        margin-top: .16rem;
        border-radius: .16rem;
        background: var(--bg-color);
        font-size: .37333rem;
        font-style: normal;
        font-weight: 500;
        word-break: break-all;
        text-align: left;
        box-sizing: border-box;
      }

      .address-test-span {
        color: var(--theme-color);
      }

      .copy-box {
        width: 100%;
        min-height: 1.01333rem;
        margin-top: .18667rem;
        padding: .24rem .05333rem;
        flex-direction: column;
        flex-shrink: 0;
        border-radius: .16rem;
        background: var(--bg-other);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;

        span {
          margin-left: .16rem;
        }
      }
    }
  }

  .notice-box {
    margin-top: .26667rem;
    display: flex;
    padding: .16rem;
    align-items: flex-start;
    gap: .18667rem;
    align-self: stretch;
    border-radius: .16rem;
    background: var(--info-bg);

    span {
      color: var(--font-dark-color);
      font-size: .32rem;
      font-style: normal;
      font-weight: 500;
    }
  }
}

.van-popup .pop-header {
  position: sticky;
  top: 0;
  background-color: var(--bg-color);
  z-index: 1;
  width: 100%;

  .pop-close {
    top: .37333rem;
    right: .32rem;
    position: absolute;
  }

  .pop-title {
    padding: .37333rem .32rem .53333rem .32rem;
    color: var(--font-color);
    text-align: center;
    font-size: .37333rem;
    font-style: normal;
    font-weight: 650;
    line-height: normal;
  }

  .search-box {
    border-radius: .10667rem;
    background: var(--bg-light-color);
    margin: 0 .32rem .53333rem .32rem;
    height: 1.17333rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    .van-cell {
      border-radius: 0 .10667rem .10667rem 0;
      height: 1.17333rem;
      background: var(--bg-light-color);
    }
  }

  .search-icon {
    margin-left: .42667rem;
    margin-right: .18667rem;
  }

  .van-cell {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    line-height: .64rem;
  }

  .van-cell--borderless:after,
  .van-cell:last-child:after {
    display: none;
  }

  .search-icon:after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 9.9rem;
    bottom: 0;
    left: 0.4267rem;
    border-bottom: .02rem solid var(--font-color);
    opacity: 0.2;
    transform: rotate(90deg) translate(-20px, -12px);
    z-index: 3;
  }

  .van-field {
    padding: .32rem .32rem .32rem 0 !important;
    font-size: .37333rem !important;
  }
}

@media screen and (min-width: 600px) {
  .van-popup--bottom {
    max-width: 11.4rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0 !important;
  }
}

.pop-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--bg-color);
  box-sizing: border-box;
  padding-bottom: .37333rem;

  .pop-item {
    height: 1.01333rem;
    border-radius: .16rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 .32rem;
    padding: 0 .37333rem 0 .34667rem;
    box-sizing: border-box;

    .pop-left {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      .pop-image {
        margin-right: .24rem;
        flex-shrink: 0;
      }

      .pop-text {
        color: var(--font-color);
        font-size: .42667rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        letter-spacing: .00747rem;
      }

    }
  }

  .pop-item.popactive {
    // background: #2f3339 !important;
    background: var(--bg-nav-active-color) !important;
  }
}

.deposit-form {
  width: 100%;

  .payment-data {
    display: flex;
    flex-direction: column;
    margin-bottom: .5rem;
    background-color: var(--info-bg);
    padding: .35rem;
    border-radius: .16rem;
    gap: .2rem;
    width: 80%;
  }

  :deep(.van-field) {
    padding: 0.32rem 0.53333rem;
    margin-bottom: 0.26667rem;
    border-radius: 6px;
    background: var(--bg-other);
    overflow: visible;
    margin-bottom: 0.4rem !important;
    width: 100%;

    ::placeholder {
      color: var(--font-dark-color);
      opacity: 0.7;
    }
  }

  :deep(.van-field__button) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-item {
    margin-top: .5rem;
  }

  .deposit-tip span:nth-child(2) {
    margin-left: .5rem;
    color: red
  }
}

.btn-box {
  height: 1.1733rem;
  border-radius: 0;
  border-radius: .133rem;
  background: var(--theme-color);
  box-shadow: inset 0 -.0533rem 0 0 #89a617, 0 0 .0533rem .0533rem rgba(139, 2552, 1, .07);
  color: var(--primary-btn-font-color);
  text-align: center;
  margin-top: .64rem;
  font-family: 'Geogrotesque-Md';
  font-size: .3733rem;
  font-style: normal;
  font-weight: 650;
  line-height: 1.1733rem;
}
</style>
