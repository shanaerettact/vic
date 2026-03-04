<script setup>
import { inject, reactive, computed, ref, watch, shallowRef } from "vue";
import { useI18n } from "vue-i18n";
import IconClose from '@/components/Icons/icon-close.vue';
import TopBoxPopup from '@/components/Utilities/TopBoxPopup.vue'
import IconTemplate from '@/components/Icons/IconTemplate.vue'
import { treasureChest } from "@/components/Images/base64";
import { useRoute } from "vue-router";
import IconUsdt from '@/components/Icons/icon-usdt.vue'

const route = useRoute();

const { t, locale } = useI18n();

const common = inject("common");

const state = reactive({
  thirdCodeList: [],
  thirdPaymentList: [{
    third_code: "",
  }],
  thirdPayment: {},  
  walletList: [],  
  selectWeb: 'tron',   
  active_wl_list: [],  
  currentWalletId: null, 
  fee: 0,   
  Min: 0,  
  Max: null,
  wd_num: 0, 
  dep_num: computed(() => { 
    let num = state.wd_num - state.fee
    num = parseFloat(num.toPrecision(12)) 
    return num < 0 ? 0 : num;
  }),
  damaList: [], 
})

const currentAddr = ref(null)

watch(() => state.walletList, () => {
  let list = state.walletList.filter((ele) => ele.type == state.selectWeb)
  currentAddr.value = currentAddr.value ? list[0].withdraw_info.addr : ""
  state.active_wl_list = list ? list : ""
  state.currentWalletId = list[0] ? list[0].id : ""
})


watch(() => [state.thirdPaymentList, state.selectWeb], () => {
  let thirdPaymentArr = state.thirdPaymentList.filter((ele) => ele.third_code == state.selectWeb) 
  let thirdPayment = thirdPaymentArr[0] || {}   
  state.thirdPayment = thirdPayment
  let balance = common.user.balance * 1 
  state.Max = thirdPayment.wd_max > balance ? balance : thirdPayment.wd_max
  state.Min = thirdPayment.wd_min > balance ? 0 : thirdPayment.wd_min
}, { immediate: true })



watch(() => state.wd_num, () => {
  let thirdPayment = state.thirdPayment 
  let wd_prate = thirdPayment.sys_wd_prate
  let wd_frate = thirdPayment.sys_wd_frate
  let fee = state.wd_num * wd_prate * 0.01 + wd_frate * 1 || 0
  fee = parseFloat(fee.toPrecision(12))
  state.fee = fee
}, { immediate: true })

function roundTo(val) { 
  let num = parseFloat(val.toPrecision(12))
  return Math.round(num)
}

function roundDown(val) { 
  let num = parseFloat(val.toPrecision(12))
  return Math.floor(num)
}

const thirdCodeLabelMap = {   
  "tron": "TRC20"      
}

const labelThirdCodeMap = { 
  "TRC20": "tron"
}

const iconClassTrans = {  
  "tron": "icon-trx",   
  "eth": "icon-eth"
}

const currencyOption = [ 
  {
    label: common.primeCoinName,  
    icon: IconTemplate,
    iconProps: {     
      iconWidth: '22px',
      iconHeight: '22px',
      iconClass: 'icon-usdt'
    },
    iconProps_big: {  
      iconWidth: '24px',
      iconHeight: '24px',
      iconClass: 'icon-usdt'
    }
  },
]

const webIcon = shallowRef([])


const genArray = () => {
  webIcon.value.push(
    {
      label: '',
      icon: IconTemplate,
      iconProps: {
        iconWidth: '22px',
        iconHeight: '22px',
        iconClass: ''
      },
      iconProps_big: {
        iconWidth: '24px',
        iconHeight: '24px',
        iconClass: ''
      }
    }
  )
}


const webIconReady = ref(false)

const withdrawInterface = async () => { 
  try {
    common.loading = true
    let res = await common.baseAjax("GET", "/user/user-withdraw")
    common.loading = false
    if (res.code == 1) {
      let thirdPaymentList = res.data.third_payment  
      state.thirdPaymentList = thirdPaymentList
      state.walletList = res.data.user_wallet_withdraw  
      thirdPaymentList.forEach(ele => { 
        if (!state.thirdCodeList.includes(ele.third_code)) {
          state.thirdCodeList.push(ele.third_code)
        }
      });
      for (let i = 0; i < thirdPaymentList.length; i++) {
        genArray();
        let label = thirdCodeLabelMap[state.thirdCodeList[i]]
        let className = iconClassTrans[state.thirdCodeList[i]]
        webIcon.value[i].label = label
        webIcon.value[i].iconProps.iconClass = className
        webIcon.value[i].iconProps_big.iconClass = className
      }
      webIconReady.value = true
      common.loading = false
    } else {
      if (res.code == 4) {
        common.user = {}
        common.toRouter("/")
        setTimeout(() => {
          window.location.reload()
        }, 600);
      }
      common.loading = false
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  }
}

withdrawInterface();



const submit = async () => {
  common.loading = true
  try {
    let form = {
      money: state.wd_num,
      third_code: state.thirdPayment.third_code,
      user_wallet_id: state.currentWalletId,
    }
    let res = await common.baseAjax("POST", "/user/user-withdraw", form)
    if (res.code == 1) {
      common.loading = false
      common.alert("", res.msg)
      common.toRouter("/transrecord")
    } else {
      if (res.code == 4) {
        common.user = {}
        common.toRouter("/")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
      common.loading = false
      common.alert("fail", res.msg)
      return false
    }
  } catch (error) {
    console.log(error)
  } finally { }
}


function itemClick(item) {  
  currentAddr.value = item.withdraw_info.addr
  state.currentWalletId = item.id
  common.addrBook = false
}


const damaList = async () => {
  try {
    let date = new Date();
    date.setDate(date.getDate() - 90) 
    let startTime = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + ((date.getDate() + "").length < 2 ? "0" + date.getDate() : date.getDate()) + " 00:00:00"
    let form = {
      startTime: startTime,
      page: 1,
    }
    let res = await common.baseAjax("POST", "/user/dama", form)
    if (res.code == 1) {
      state.damaList = res.data.list
      state.damaList.forEach((e, i) => {
        e.percent = Math.round((e.dama_value / e.dama_limit) * 100)
      })
      state.damaList.sort((a, b) => b.percent - a.percent)
    } else if (res.code == 4) {
      common.user = {}
      common.toRouter("/")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
      common.loading = false
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  } finally { }
}

damaList()



function damaListType(value) {
  switch (value) {
    case "1":
      return "會員入款"

    case "2":
      return "活動條件"

    case "3":
      return "活動獎勵"

    case "11":
      return "代理贈款"

    case "12":
      return "後台加款"

    default:
      break;
  }
}
</script>


<template>
  <div class="content-box safe-area-bottom">
    <div class="withdraw-usdt">
      <div class="top-box-wrapper">
        <TopBoxPopup
          :height="'30%'"
          :options="currencyOption"
        >
          <template #up>{{ t("message.Currency") }}</template>
        </TopBoxPopup>
        <TopBoxPopup
          v-if="webIconReady"
          :height="'30%'"
          :options="webIcon"
          @response="(msg) => state.selectWeb = labelThirdCodeMap[msg.label]"
        >
          <template #up>{{ t("message.Network") }}</template>
        </TopBoxPopup>
      </div>
      <div class="add-box">
        <span class="text">{{ t("message.WalletAddress") }}</span>
        <span
          class="add"
          @click="common.addrBook = !common.addrBook"
        >
          <IconTemplate
            iconWidth="14px"
            iconHeight="14px"
            iconClass="icon-address"
          />
          {{ t("message.AddressBook") }}
        </span>
      </div>
      <div class="select-box">
        <van-field
          v-model="currentAddr"
          class="address"
          center
        />
      </div>
      <div class="lable-text">
        <span>{{ t("message.WithdrawAmount") }}</span>
        <div class="right-tips">
          <span class="start">{{ t("message.MiniMum") }}</span>
          <span class="end">{{ state.thirdPayment.wd_min || 1 }} {{ common.primeCoinName }}</span>
        </div>
      </div>
      <van-field
        v-model="state.wd_num"
        class="amount"
        center
        alone
        inputmode="decimal"
      />
      <div class="quick-btn">
        <div
          class="quick-btn-box"
          @click="state.wd_num = state.Min"
        >{{
          t("message.MiniMum") }}</div>
        <div
          class="quick-btn-box"
          @click="state.wd_num = roundTo(state.Max * 0.25)"
        >
          25%</div>
        <div
          class="quick-btn-box"
          @click="state.wd_num = roundTo(state.Max * 0.5)"
        >
          50%</div>
        <div
          class="quick-btn-box"
          @click="state.wd_num = roundDown(state.Max)"
        >{{
          t("message.Highest") }}</div>
      </div>

      <div class="useable">
        {{ t("message.Available") }}： <span class="userable-amount">5
          {{ common.primeCoinName }}</span>
      </div>
      <div class="divider"></div>
      <div class="bottom-box">
        <span
          class="left-text"
          style="color: rgb(201,252,1)"
        >{{
          t("message.WithdrawAmount") }}:</span>
        <span
          class="right-text"
          style="color: rgb(201,252,1)"
        >{{ state.wd_num || 0 }}
          {{ common.primeCoinName }}</span>
      </div>
      <div class="fee-box">
        <div class="fee-left">
          <span class="fee-left-text">{{ t("message.Wd_Fee") }}</span>
          <div
            id="toolTips"
            class="tool-tips"
          >
            <IconTemplate
              iconWidth="14px"
              iconHeight="14px"
              iconClass="icon-teacher"
            />
          </div>
        </div>
        <span class="fee-right">{{ state.fee }} {{ common.primeCoinName }}</span>
      </div>
      <div class="bottom-box">
        <span class="left-text">{{ t("message.ReceivedAmount") }}：</span>
        <span class="right-text">{{ state.dep_num }} {{ common.primeCoinName }}</span>
      </div>
      <div
        :class="['btn-box', state.dep_num > 0 ? '' : 'gray']"
        @click="submit"
      >{{
        t("message.wal-Withdraw") }}
      </div>

      <!-- 資金密碼區塊暫時不用, 先註解 -->
      <!-- <div class="pwd-box">
          <div class="pwd-left">
            <IconTemplate
              iconWidth="16px"
              iconHeight="16px"
              iconClass="icon-green-tips"
              style="margin-right: 6px;"
            />
          </div>
        </div> -->

      <div class="tips-box">
        <span>{{ t("message.Withdraw-notice") }}</span>
      </div>


      <div class="missions">
        <div class="table-header">
          <div class="cell">類型</div>
          <div class="cell">有效遊戲廳</div>
          <div class="cell">打碼量條件</div>
          <div class="cell">有效打碼量</div>
        </div>
        <van-list>
          <div
            v-for="(item, index) in state.damaList"
            :key="index"
          >
            <div class="table-row">
              <div class="cell time">
                {{ damaListType(item.type) }}
              </div>
              <div class="cell type">
                <!-- {{ ActionText[state.ActiveAction].label }} -->
                {{ item.hall }}
              </div>
              <div class="cell amount">
                <p>{{ item.dama_limit }}</p>
                <!-- <IconTemplate
                  :iconWidth="'15px'"
                  :iconHeight="'15px'"
                  :iconClass="'icon-usdt'"
                  style="margin-left:4px;"
                /> -->
                <IconUsdt style="margin-left: 4px;" />
              </div>
              <div class="cell">
                <span class="green">
                  &nbsp; {{ item.dama_value }}
                </span>
              </div>
            </div>
            <div
              class="table-row"
              style="padding-top:0"
            >
              <div class="progressBar">
                <div class="mission-intro">
                  <span class="mission-name"></span>
                  <div v-if="item.percent == 100">
                    <span class="success-text">達成 !</span>
                    <img
                      :src="treasureChest"
                      width="35px"
                      height="35px"
                    />
                  </div>
                </div>
                <div class="progress-card">
                  <van-progress
                    :percentage="item.percent"
                    stroke-width="8"
                    :show-pivot="false"
                    color="linear-gradient(90deg, rgb(111, 242, 56) 0%, rgb(248, 178, 24) 50.5%, rgb(255, 76, 71) 100%)"
                  />
                  <span>{{ item.percent }} %</span>
                </div>
              </div>
            </div>

          </div>
        </van-list>
      </div>

    </div>
  </div>


  <van-popup
    v-model:show="common.addrBook"
    position="bottom"
    :style="{ height: '50%' }"
    style="background-color: #202125 ;border-radius: 0.16rem;"
  >
    <div class="pop-header">
      <div
        class="pop-close"
        @click="common.addrBook = false"
      >
        <IconClose />
      </div>
      <div
        class="title"
        style="padding: 5px 0px;"
      >{{ t("message.Choose") }}
      </div>
    </div>
    <div class="head-box">
      <div class="head-left">{{ t("message.Manage") }}</div>
      <div
        class="head-right"
        @click="common.toRouter('/SafeCenter/addCryptoAddr')"
      >
        <IconTemplate
          iconWidth="20px"
          iconHeight="20px"
          iconClass="icon-add-white"
        />
        {{ t("message.addr-Add") }}
      </div>
    </div>
    <div
      class="item addractive"
      v-if="state.active_wl_list"
      v-for="(item, index) in state.active_wl_list"
      @click="itemClick(item)"
    >
      <div class="left">
        <IconUsdt />
        <span class="text1">{{ item.name }}</span>
        <span class="text2">{{ item.type }}</span>
      </div>
      <span class="right">{{ item.withdraw_info.addr.slice(0, 12) }}...</span>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.withdraw-usdt {
  width: 100%;
  flex-shrink: 0;
  background: var(--bg-light-color);
  border-radius: .16rem;
  padding: .64rem .3733rem 2.3733rem;
  margin-bottom: .5333rem;
  box-sizing: border-box;

  .top-box-wrapper {
    display: grid;
    gap: .32rem;
    grid-template-columns: 1fr 1fr;
  }

  .add-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .3467rem 0 .16rem .0533rem;
    box-sizing: border-box;

    .text {
      color: var(--font-dark-color);
      font-family: 'Geogrotesque-Md';
      font-size: .34667rem;
      font-style: normal;
      font-weight: 650;
    }

    .add {
      color: var(--font-dark-color);
      font-size: .32rem;
      font-style: normal;
      font-weight: 650;
      display: flex;
      align-items: center;

      svg {
        margin-right: 4px;
      }
    }
  }

  .select-box {
    position: relative;

    .address {
      height: 1.733rem;
    }

    .van-cell {
      padding-left: .4267rem;
    }
  }

  .lable-text {
    display: flex;
    align-items: center;
    margin: .64rem 0 .26667rem 0;
    justify-content: space-between;
    color: var(--font-dark-color);
    font-family: 'Geogrotesque-Md';
    font-size: .34667rem;
    font-style: normal;
    font-weight: 650;
    box-sizing: border-box;
  }

  .lable-text .right-tips {
    text-align: center;

    .start {
      color: #abbcd4;
      font-size: .32rem;
      font-style: normal;
      font-weight: 500;
      margin-right: .1rem;
    }

    .end {
      color: var(--warning-color-dark);
      font-size: .32rem;
      font-style: normal;
      font-weight: 700;
    }
  }

  .amount {
    height: 1.173rem;
  }

  .quick-btn {
    margin-top: .2267rem;
    display: flex;
    gap: .1067rem;

    .quick-btn-box {
      display: flex;
      width: 25%;
      min-height: .85333rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: .12rem;
      background: var(--bg-lighter-color2);
      color: var(--font-dark-color);
      font-size: .32rem;
      font-style: normal;
      font-weight: 650;
      line-height: normal;
    }
  }

  .useable {
    margin-top: .64rem;
    color: var(--font-dark-color);
    font-size: .3467rem;
    font-style: normal;
    font-weight: 650;

    .userable-amount {
      color: var(--font-color);
      font-size: .3467rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .divider {
    margin-top: .32rem;
    height: .0267rem;
    background-color: rgb(86, 95, 112);
  }

  .bottom-box {
    margin-top: .32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-text {
      font-size: .3467rem;
      font-style: normal;
      font-weight: 400;
    }

    .right-text {
      font-size: .3467rem;
      font-style: normal;
      font-weight: 700;
    }
  }

  .fee-box {
    margin-top: .32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fee-box .fee-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 100%;

    .fee-left-text {
      color: var(--font-dark-color);
      font-size: .34667rem;
      font-style: normal;
      font-weight: 500;
    }

    .tool-tips {
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      -webkit-justify-content: flex-start;
      align-items: center;
      -webkit-align-items: center;
      flex-direction: row;
      -webkit-flex-direction: row;
      flex-wrap: nowrap;
      -webkit-flex-wrap: nowrap;
    }
  }

  .fee-box .fee-right {
    color: var(--font-color);
    font-weight: 700;
    font-size: .3467rem;
    font-style: normal;
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

  .gray {
    pointer-events: none;
    opacity: .5;
  }

  .tips-box {
    color: var(--font-dark-color);
    margin-top: .64rem;
    padding: .16rem;
    font-family: 'Geogrotesque-Md';
    font-size: .34rem;
    font-style: normal;
    font-weight: 300;
    border-radius: .16rem;
    background-color: var(--info-bg)
  }


  .missions {
    margin-top: 1.7rem;
  }

  .progressBar {
    width: 100%;
    border-radius: .13333rem;

    .mission-intro {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;

      .mission-name {
        font-size: .4rem;
      }

      .success-text {
        margin-right: .4rem;
        display: inline;
      }
    }

    .progress-card {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: .26667rem;
      height: .402rem;
      flex-wrap: nowrap;

      span {
        color: var(--font-color);
        text-align: center;
        font-size: .37333rem;
        font-style: normal;
        font-weight: 650;
        width: 1.2rem;
      }
    }

    .van-progress {
      width: 100%;
    }
  }
}

.table-header {
  border-radius: .16rem .16rem 0 0;
  padding: 0 .26667rem 0 .16rem;
  background: var(--bg-lighter-color2);
  height: 1.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;

  .cell:first-child {
    justify-content: flex-start;
  }

  .cell {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    color: var(--font-color);
    text-align: center;
    font-size: .3733rem;
    font-style: normal;
    font-weight: 650;
    line-height: normal;
    letter-spacing: .00747rem;
  }

  .cell:last-child {
    justify-content: flex-end;
  }
}

.van-list .table-row {
  padding: .2667rem .16rem;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
  align-items: center;
  -webkit-align-items: center;
  flex-direction: row;
  -webkit-flex-direction: row;
  flex-wrap: nowrap;
  -webkit-flex-wrap: nowrap;

  &:last-child {
    border-bottom: .0267rem solid var(--bg-lighter-color2);
  }


  .cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--font-color);
    font-size: .32rem;
    font-weight: 650;
    letter-spacing: .0064rem;
  }

  .cell:first-child {
    justify-content: flex-start;
    font-size: .35rem;
  }

  .amount {
    color: var(--font-color);
    text-align: center;
    font-size: .3733rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: .0075rem;
  }

  .green {
    color: var(--gold-text);
  }

  span {
    word-break: break-all;
    overflow-wrap: break-word;
    text-align: center;
    margin: 0 .05333rem;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    align-items: center;
    -webkit-align-items: center;
    flex-direction: row;
    -webkit-flex-direction: row;
    flex-wrap: nowrap;
    -webkit-flex-wrap: nowrap;
  }

  .cell:last-child {
    justify-content: flex-end;
  }
}


.van-cell {
  border-radius: .16rem;
  background: var(--bg-color) !important;
  color: var(--font-dark-color) !important;
}

.address.van-cell {
  padding: .256rem .24rem;
  box-sizing: border-box;
}

.amount.van-cell {
  padding: .08rem .08rem .08rem .4267rem;
}

.van-field__value {
  overflow: visible;
  color: var(--font-dark-theme-color);
  text-align: left;
}

// 地址簿彈窗
.van-popup {
  background-color: var(--bg-color) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem .32rem .533rem .32rem;

}

.van-popup--bottom.van-popup--round {
  border-radius: .4267rem .4267rem 0 0;
}

:deep(.van-popup--bottom) {
  bottom: 0;
  left: 0;
  width: 100%;
}

@media screen and (min-width: 600px) {
  :deep(.van-popup--bottom) {
    max-width: 11.4rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0 !important;
  }
}

.van-popup .pop-header {
  position: sticky;
  top: 0;
  background-color: var(--bg-color);
  z-index: 1;
  width: 100%;
  padding-top: .8rem;
}

.van-popup .title {
  text-align: center;
  font-size: .42667rem;
  font-weight: 700;
  margin-bottom: .5rem;
}

.van-popup .pop-close {
  position: absolute;
  right: .25rem;
}

.van-popup .head-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;


  .head-left {
    color: var(--font-color);
    text-align: center;
    font-size: .3733rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .head-right {
    color: var(--font-color);
    text-align: center;
    font-size: .3733rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: .00747rem;
    display: flex;
    padding: .16rem;
    align-items: center;
    gap: .0267rem;
    border-radius: .08rem;
    background: var(--bg-light-color);
  }
}

.van-popup .addractive {
  background: var(--bg-nav-active-color) !important;
}

.van-popup .item {
  border-radius: .16rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .32rem;
  padding: .32rem .13333rem;
  box-sizing: border-box;
  width: 100%;

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: .0533rem;
    gap: .08rem;

    .text1 {
      color: var(--font-color);
      font-size: .32rem;
      font-style: normal;
      font-weight: 700;
      text-transform: uppercase;
    }

    .text2 {
      color: var(--success-color-light);
      font-size: .32rem;
      font-style: normal;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
}
</style>