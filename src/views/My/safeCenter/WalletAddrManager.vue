<script setup>
import { inject, reactive, watch, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { showToast } from 'vant';
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconTemplate from '@/components/Icons/IconTemplate.vue';
import successIcon from "@/assets/img/success_01.webp"
import TopBoxPopup from '@/components/Utilities/TopBoxPopup.vue';
import IconClose from '@/components/Icons/icon-close.vue';


const common = inject("common")
const { t, locale } = useI18n()


const state = reactive({
  thirdPaymentList: {},
  walletList: [],
})


const withdrawInterface = async () => { 
  try {
    common.loading = true
    let res = await common.baseAjax("GET", "/user/user-withdraw")
    common.loading = false
    if (res.code == 1) {
      state.thirdPaymentList = res.data.third_payment
      state.walletList = res.data.user_wallet_withdraw
      common.balanceInit();  
    } else {
      if (res.code == 4) {
        common.user = {}
        common.toRouter("/login")
      }
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  }
}

withdrawInterface();


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

// for Icons
const web = [
  {
    label: 'tron',
    icon: IconTemplate,
    iconProps: {
      iconWidth: '20px',
      iconHeight: '20px',
      iconClass: 'icon-trx'
    },
    iconProps_big: {
      iconWidth: '24px',
      iconHeight: '24px',
      iconClass: 'icon-trx'
    }
  },
]

const copy = async (addr) => {
  try {
    await navigator.clipboard.writeText(addr)
    showToast({
      message: t("message.Copied"),
      icon: successIcon,
    })
  } catch (error) {
    console.log(error)
    common.alert("fail", t("message.CopyFailed"))
  }
}


const showDelete = ref(false)   
const deleteId = ref(null)  

const deletePopup = (id) => {
  showDelete.value = true;
  deleteId.value = id
}

const delWallet = async (id) => {
  try {
    let form = {
      id: id,
      action: "delete"
    }
    common.loading = true;
    let res = await common.baseAjax("POST", "/user/wallet-manage", form)
    if (res.code == 1) {
      common.loading = false;
      common.alert("", res.msg)
      window.location.reload();
    } else {
      if (res.code == 4) {
        common.alert("fail", res.msg)
        common.toRouter('/')
      }
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  } finally { }
}

</script>


<template>
  <div class="walletAddrManager-wrapper">
    <div class="main">
      <HeaderCross :text="t('message.WalletAddress')" />
      <div class="content">
        <div class="content-box">
          <div class="top-box-wrapper">
            <!-- <TopBox>
              <template #left></template>
<template #up>幣種</template>
<template #down>USDT</template>
</TopBox> -->
            <!-- <TopBox>
              <template #left>
                <IconTemplate
                  :iconWidth="'24px'"
                  :iconHeight="'24px'"
                  :iconClass="'icon-trx'"
                />
              </template>
              <template #up>網路</template>
              <template #down>TRC20</template>
            </TopBox> -->

            <TopBoxPopup
              :height="'30%'"
              :options="currency"
            >
              <template #up>
                {{ t("message.Currency") }}
              </template>
            </TopBoxPopup>

            <TopBoxPopup
              :height="'30%'"
              :options="web"
            >
              <template #up>
                {{ t("message.Network") }}
              </template>
            </TopBoxPopup>
          </div>

          <div class="item-title">{{ t("message.WalletAddress") }}</div>
          <div
            class="item-cell"
            v-for="(item, index) in state.walletList"
          >
            <div class="item-left">
              <span class="left-text2"></span>
            </div>
            <div class="item-right">
              <div class="addr-bg">
                <span>{{ item.withdraw_info.addr.slice(0, 5) }}
                  .....
                  {{ item.withdraw_info.addr.slice(-5) }}
                </span>

                <div
                  class="copy-bg"
                  @click="copy(item.withdraw_info.addr)"
                >
                  <IconTemplate
                    :iconWidth="'16px'"
                    :iconHeight="'16px'"
                    :iconClass="'icon-copy-addr'"
                  />
                </div>

                <div
                  class="delete-bg"
                  @click="deletePopup(item.id)"
                >
                  <IconTemplate
                    :iconWidth="'13px'"
                    :iconHeight="'14px'"
                    :iconClass="'icon-delete-addr'"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div
          class="no-data"
          v-if="!state.walletList"
        >
          <div class="no-data-img">
            <IconTemplate
              :iconWidth="'55px'"
              :iconHeight="'55px'"
              :iconClass="'icon-no-address'"
            />
          </div>
          <span class="no-data-desc">{{
            t("message.NoWalletAddressHasBeenAddedYet")
            }}</span>
        </div>

        <div
          class="add"
          @click="common.toRouter('/safeCenter/addcryptoaddr')"
        >
          <IconTemplate
            :iconWidth="'20px'"
            :iconHeight="'20px'"
            :iconClass="'icon-add'"
          />
          {{ t("message.AddWalletAddress") }}
        </div>

        <van-popup
          v-model:show="showDelete"
          position="bottom"
          :style="{ height: '30%' }"
          style="background-color: var(--bg-color) ;border-radius: 0.16rem;"
        >
          <div
            class="close"
            style="top:19px; right: 18px;"
            @click="showDelete = false"
          >
            <IconClose />
          </div>
          <div class="pop-title">{{ t("message.DeleteAddress") }}</div>
          <div class="pop-content">{{ t("message.DoYouWantToDeleteWallet") }}
          </div>
          <div class="pop-btn-box"><span @click="delWallet(deleteId)">{{
            t("message.Delete") }}</span>
          </div>
        </van-popup>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.walletAddrManager-wrapper {
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
  padding: .1867rem .2667rem;

  .content-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: .64rem .32rem;
    border-radius: .16rem;
    background: var(--bg-light-color);
    box-sizing: border-box;
  }

  .top-box-wrapper {
    width: 100%;
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

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: .64rem;
    background-color: var(-bg-light-color);

    &-img {
      margin-top: .64rem;
    }

    &-desc {
      margin-top: 14;
      color: var(--font-dark-color);
      font-size: .37333rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .item-title {
    width: 100%;
    color: var(--font-dark-color);
    font-size: .37333rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: .32rem;
  }

  .item-cell:not(:first-child) {
    margin-top: .3733rem;
  }

  .item-cell {
    box-sizing: border-box;
    padding: .26667rem .29333rem .34667rem .29333rem;
    border-radius: .21333rem;
    background: var(--bg-color);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item-left {
      display: flex;
      align-items: center;

      .left-text2 {
        margin-left: .16rem;
        color: var(--font-color);
        font-size: .3733rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }

    .item-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .item-right .addr-bg {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span {
        color: var(--font-color);
        font-size: .37333rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        word-break: break-all;
        margin-right: .5rem;
        letter-spacing: .08rem;
      }

      .copy-bg {
        margin: 0 .213rem;
        padding: .16rem .213rem;
        border-radius: .133rem;
        background: var(--bg-light-color);
      }

      .delete-bg {
        padding: .16rem .2133rem;
        border-radius: .1333rem;
        background: var(--bg-light-color);
      }
    }
  }

  .add {
    padding: .64rem 0;
    margin-top: .32rem;
    border-radius: .21333rem;
    background: var(--bg-other);
    color: var(--theme-color);
    text-align: center;
    font-size: .42667rem;
    font-style: normal;
    font-weight: 650;
    line-height: normal;
    letter-spacing: .00853rem;
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
  }
}

.van-popup {
  box-sizing: border-box;
  padding: .64rem .32rem .533rem .32rem;

  @media screen and (min-width:600px) {
    max-width: 11rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .close {
    top: .37333rem;
    right: .32rem;
    position: absolute;
  }

  .pop-title {
    text-align: center;
    font-size: .4267rem;
    font-weight: 700;
  }

  .pop-content {
    margin: .85333rem;
    color: var(--font-color);
    text-align: center;
    // font-family: PingFang SC;
    font-size: .37333rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .pop-btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.28rem;
    color: var(--font-dark-theme-color);
    text-align: center;
    font-size: .42667rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: .13333rem;
    background: #c9fc01;
    box-shadow: 0 .1067rem 0 0 #89a617, inset 0 0 .16rem .1067rem #bbfc01, 0 0 .1067rem .1333rem rgba(252, 197, 1, .07);
  }
}
</style>