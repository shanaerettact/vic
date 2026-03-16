<script setup>
import { reactive, inject, ref } from "vue"
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import Withdraw_Tron from '../components/Pages/Withdraw_Tron.vue';
import Deposit_Tabbar from "@/components/Blocks/Deposit_Tabbar.vue";
import IconArrowR from '@/components/Icons/icon-arrow-r.vue'
import IconTemplate from '@/components/Icons/IconTemplate.vue'
import { useI18n } from "vue-i18n";
import { treasureChest } from '@/components/Images/base64'

const common = inject("common")
const { t, locale } = useI18n();

// 假資料，完成後刪除
const mockData = {
  "third_payment": [
    {
      "name": "波場區塊鍊",
      "third_code": "tron",
      "status": "1",
      "wd_ratio": "1.00",
      "sys_wd_prate": "0.00",
      "sys_wd_frate": "3.00",
      "third_wd_prate": "0.00",
      "third_wd_frate": "0.00",
      "wd_min": "5.00",
      "wd_max": "10000.00",
      "img": null,
      "sort": "1"
    },
    {
      "name": "其他鍊",
      "third_code": "other",
      "status": "1",
      "wd_ratio": "2.00",
      "sys_wd_prate": "1.00",
      "sys_wd_frate": "4.00",
      "third_wd_prate": "0.00",
      "third_wd_frate": "2.00",
      "wd_min": "10.00",
      "wd_max": "20000.00",
      "img": null,
      "sort": "2"
    }
  ],
  "user_wallet_withdraw": [
    {
      "id": "1",
      "type": "tron",
      "name": "Cha的TRON錢包地址1",
      "withdraw_info": {
        "addr": "TT4TxPMUwmaAC5eXsDTfeG7tfHRmoKR39X"
      }
    },
    {
      "id": "2",
      "type": "tron",
      "name": "Cha的TRON錢包地址2",
      "withdraw_info": {
        "addr": "TYnp79SpTDMYSdSDCaEFeuUcYgWAaydYhQ"
      }
    },
    {
      "id": "3",
      "type": "tron",
      "name": "Cha的TRON錢包地址3",
      "withdraw_info": {
        "addr": "TEjrnfTzScuDsHT2FKFAUEPac3xdTWW4BX"
      }
    },
    {
      "id": "4",
      "type": "other",
      "name": "Cha的TRON錢包地址4",
      "withdraw_info": {
        "addr": "TEjrnfTzScuDsHT2FKFAUEPac3xdTWW4BX"
      }
    },
    {
      "id": "5",
      "type": "other",
      "name": "Cha的TRON錢包地址5",
      "withdraw_info": {
        "addr": "TEjrnfTzScuDsHT2FKFAUEPac3xdTWW4BX"
      }
    },
  ],
  "balance": 30,
}

// Dama 假資料 (res.data.list)
const mockDama = [
  {
    "id": "27",
    "dama_number": "UD2512121823",
    "user_id": "18",
    "status": "1",
    "type": "12",
    "from_way": null,
    "hall_group": null,
    "hall": null,
    "game": null,
    "amount": "1000.0000",
    "dama_limit": "1000.0000",
    "odds": "1.00",
    "dama_value": "0.0000",
    "remark": "sysadmin 後台調整",
    "start_time": null,
    "end_time": null,
    "create_time": "2025-12-12 01:14:43",
    "modify_time": null
  },
]




const state = reactive({
  pageMode: "choosing",
  third_payment: [],    // 三方提現管道列表(third_code列表)
  wallet_withdrawData: [],  // 整理後的第三方資料和錢包列表
  activeThirdPaymentData: "", // 當前三方資料
  balance: "",          // 使用者餘額
  money: null,                // 使用者輸入出款金額
  damaList: [],   // 打碼任務列表
})

const arrangeWallet = (data) => {   // 整理錢包列表
  state.balance = data.balance
  let arr = []
  data.third_payment.forEach((e, i) => {
    state.third_payment.push(e.third_code)
    let obj = {
      "third_payment": "",
      "wallets": [],
      "rule": {}
    }
    obj.rule = e
    data.user_wallet_withdraw.forEach((ele, idx) => {
      obj.third_payment = ele.third_code
      if (e.third_code == ele.type) {
        obj.wallets.push(ele)
      }
    });
    arr.push(obj)
  });
  state.wallet_withdrawData = arr
  // setTimeout(() => {
  //   console.log(arr)
  // }, 1000);
  // 最後整理成:
  // [
  //   { third_payment: tron, rule: {規則}, wallets: [...]},
  //   { third_payment: other, rule: {規則}, wallets: [...]},
  //   ...
  // ]
}



const withdrawInterface = async () => {  // 取得提款錢包資料
  try {
    common.loading = true
    let res = await common.baseAjax("GET", "/user/user-withdraw")
    if (res.code == 1) {
      arrangeWallet(res.data)   // 整理三方資料和錢包
      //arrangeWallet(mockData)
    } else {
      common.userController(res.code, res.msg)
      // if (res.code == 4) {
      //   common.user = {}
      //   common.toRouter("/")
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 600);
      // }
      // common.loading = false
      // common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  } finally {
    common.loading = false
  }
}

withdrawInterface();


const toThirdPayment = (item) => {
  // state.pageMode = item.third_payment
  state.pageMode = item.rule.third_code
  state.activeThirdPaymentData = item
}

const validator = (val) => {
  return /^\d+$/.test(val);   // return boolean
}

const formRef = ref(null)   // 接收 vant-form 表單驗證


// 打碼任務列表 API
const damaList = async () => {
  try {
    let date = new Date();
    date.setDate(date.getDate() - 90)   // 預設帶入90天前的日期
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

const submit = async () => {
  try {
    await formRef.value.validate()
  } catch (error) {
    console.log(error)
    return
  }

  common.loading = true
  try {
    let form = {
      "money": state.money,
      "third_code": state.activeThirdPaymentData.rule.third_code,
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
        }, 1000)
      }
      // switch (res.code) {    // 已寫在全域 API，這段取消(code == 4 || 5 的情況)
      //   case 4:
      //     common.user = {}
      //     common.toRouter("/")
      //     setTimeout(() => {
      //     window.location.reload()
      //   }, 1000);
      //   case 5:
      //     common.toRouter("/safeCenter")
      //     break;
      //   case 6:
      //     common.toRouter("/bankAccount")
      //     break;
      // }
      common.loading = false
      common.alert("fail", res.msg)
      return false
    }
  } catch (error) {
    console.log(error)
    common.loading = false
    common.alert("fail", "其他錯誤")
  }
}

</script>


<template>
  <div class="withdraw-wrapper">
    <HeaderCross :text="t('message.wal-Withdraw')" />

    <!-- 出款方式選擇頁 -->
    <div
      v-if="state.pageMode == 'choosing'"
      class="content-box safe-area-bottom choosing-area"
    >
      <van-cell-group :border="false">
        <div class="content-head">請選擇提現方式</div>
        <van-cell
          v-for="(item, index) in state.wallet_withdrawData"
          :key="index"
          :border="false"
          @click="toThirdPayment(item)"
        >
          <template #title>
            <span>{{ item.rule.name }}</span>
          </template>
          <template #right-icon>
            <IconArrowR />
          </template>
        </van-cell>
      </van-cell-group>
    </div>


    <!-- Tron 出款頁面 -->
    <div v-if="state.pageMode == 'tron'">
      <Withdraw_Tron />
    </div>

    <!-- 其他 出款頁面 -->
    <div
      v-if="state.pageMode !== 'choosing' && state.pageMode !== 'tron'"
      class="content-box safe-area-bottom"
    >
      <div class="wallet-address">
        <div style="font-size: .5rem; margin-bottom: 5px;">
          出款方式:
          <span style="color: var(--theme-color); margin-left: 5px;">
            {{ state.activeThirdPaymentData.rule.name }}
          </span>
        </div>
        <div class="withdraw-form">
          <van-form ref="formRef">
            <div class="payment-data">
              <div>出金比值: {{ state.activeThirdPaymentData.rule.wd_ratio }}</div>
              <div>提領方式最小出金: {{ state.activeThirdPaymentData.rule.wd_min }}
              </div>
              <div>提領方式最大出金: {{ state.activeThirdPaymentData.rule.wd_max }}
              </div>
              <div>
                提領手續費:
                {{
                  Number(state.activeThirdPaymentData.rule.sys_wd_prate * 0.01) +
                  Number(state.activeThirdPaymentData.rule.third_wd_frate)
                }}
              </div>
              <div>可用餘額: {{ state.balance }}</div>
            </div>
            <div class="form-item">
              <van-field
                placeholder="請輸入金額"
                v-model="state.money"
                :rules="[{ validator, message: '请输入正确内容' }]"
              />
              <div class="withdraw-tip">
                <span>預估出款金額 = 金額 * 出金比值</span>
                <span>{{ state.money *
                  state.activeThirdPaymentData.rule.wd_ratio
                }}</span>
              </div>
            </div>
            <div
              class="btn-box"
              @click.prevent="submit"
            >提交</div>
          </van-form>

          <!-- 打碼任務列表 -->
          <div class="missions">
            <div class="text-[16px] text-[#ffffff] mb-1">當前任務</div>
            <div class="table-header">
              <div class="cell">類型</div>
              <div class="cell">有效遊戲廳</div>
              <div class="cell">打碼量條件</div>
              <div class="cell">有效打碼量</div>
            </div>
            <van-list>
              <div
                v-for="(item, index) in state.damaList.slice().reverse()"
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
                    <!-- 錢幣圖案 先拿掉 -->
                    <!-- <IconTemplate
                      :iconWidth="'15px'"
                      :iconHeight="'15px'"
                      :iconClass="'icon-usdt'"
                      style="margin-left:4px;"
                    /> -->
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
                      <div v-if="item.percent == 100" class="flex items-end">
                        <img :src="treasureChest" class="w-3 h-3" />
                        <span class="success-text text-[12px] pb-1">已達成 !</span>
                        <!-- <img
                          :src="treasureChest"
                          width="35px"
                          height="35px"
                        /> -->

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

    </div>


    <!-- 底部選單 -->
    <Deposit_Tabbar />
  </div>

</template>


<style lang="scss" scoped>
// :deep(.van-nav-bar__title) {
//   color: #fff !important;
//   font-weight: 650;
//   font-size: .42667rem !important;
//   max-width: 60%;
//   margin: 0 auto;
// }


.withdraw-wrapper {
  display: flex;
  flex-direction: column;
  // height: 100%;
  background: var(--bg-color);

  .content-box {
    flex: 1;
    position: relative;
    margin: 0 .2667rem;
    /* CSS本身提供的環境變數， 
    支援有「瀏海」或「圓角」螢幕（如 iPhone X 以上）而設計，以取得底部安全區域的高度。 */
    padding-bottom: calc(1.6rem + constant(safe-area-inset-bottom));
    padding-bottom: calc(1.6rem + env(safe-area-inset-bottom));
  }

  .safe-area-bottom {
    padding-bottom: calc(1.6rem + env(safe-area-inset-bottom));
  }
}

// choosing Tab 內容樣式
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

.wallet-address {
  margin-top: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  // height: calc(100% - 1.5333rem);
  // background: var(--bg-light-color);
  background: #ffffff1d;
  padding: .64rem .3733rem;
  border-radius: .16rem;
  margin-bottom: 3.2rem;
  box-sizing: border-box;
}

.withdraw-form {
  width: 100%;

  .payment-data {
    display: flex;
    flex-direction: column;
    margin-bottom: .5rem;
    background-color: var(--info-bg);
    padding: .35rem;
    border-radius: .16rem;
    gap: .2rem;
  }

  :deep(.van-field) {
    padding: 0.32rem 0.53333rem;
    border-radius: 6px;
    background: #ffffff1d;
    overflow: visible;
    margin-bottom: 0.4rem !important;
    width: 100%;
    border: 1px solid #ffffff1d;
    &:after {
      border-bottom: 1px solid #ffffff1d;
    }


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

  .withdraw-tip span:nth-child(2) {
    margin-left: .5rem;
    color: red
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
}

// 打碼任務
.missions {
  margin-top: .7rem;

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

  // 打碼任務 進度條
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

// 打碼任務 table
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
}
</style>
