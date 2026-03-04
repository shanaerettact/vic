<script setup>
import { reactive, inject, onMounted, ref } from "vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";


const { t, locale } = useI18n();

const common = inject("common");

// var isLogin = Object.keys(common.user).length

// 登入前禁止訪問
const isLogin = (val) => {
  if (val == 4) {
    // common.alert("fail", t("message.PleaseLoginFirst"))    
    alert("請先登入")
    common.loading = true
    common.toRouter("/")
    setTimeout(() => {
      common.loading = false
    }, 600);
  }
}

const selectRef = ref('toDay')

var showList = reactive([])       // 充值
var betOrderData = reactive({})   // 遊戲結果
var withdrawData = reactive({})   // 提現紀錄用
var incomeSelfData = reactive({})  // 返水紀錄
var incomeData = reactive({})  // 好友回饋分享

var tableLoading = reactive({ value: null });

const state = reactive({
  activeTable: 1,
  // 1:充值，2:遊戲結果，3:提現紀錄，4:返水紀錄，5:好友回饋分享
})

const changeTable = (event) => {
  state.activeTable = event.target.value * 1;
}


const selectTime = async (val) => {
  showList.length = 0
  betOrderData = {}
  withdrawData = {}
  incomeSelfData = {}
  incomeData = {}

  tableLoading.value = true
  let startTime;
  let endTime;

  const start = new Date();
  const end = new Date();

  let nows = start.getDay() || 7    // current day
  let form = {}
  var res;

  switch (val) {
    case 'toDay':                     // today
      end.setDate(end.getDate() + 1)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 00:00:00`
      break;

    case 'yesterDay':           // yesterDay
      start.setDate(start.getDate() - 1)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 00:00:00`
      break;

    case 'thisWeek':              // this week
      start.setDate(start.getDate() - (nows - 1) - 7)   // Monday
      end.setDate(end.getDate() + 1)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 00:00:00`
      break;

    case 'lastWeek':              // last week
      nows = start.getDay() || 7
      start.setDate(start.getDate() - (nows - 1) - 7)   // Monday
      end.setDate(end.getDate() - (nows - 1))
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 00:00:00`
      break;

    case 'thisMonth':
      start.setMonth(start.getMonth());   // this month
      end.setMonth(end.getMonth() + 1);
      start.setDate(1);
      end.setDate(1)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 00:00:00`
      break;

    case 'lastMonth':
      start.setMonth(start.getMonth() - 1);   // last month
      start.setDate(1);
      end.setDate(1)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 00:00:00`
      break;

    // case 'allTime':
    // do nothing
    // break;
    default:
      startTime = '';
      endTime = '';
      break;
  }

  form.startTime = startTime;
  form.endTime = endTime;

  switch (state.activeTable) {
    case 1:
      res = await common.baseAjax("POST", "/user/recharge-log", form)
      isLogin(res.code);
      console.log(res)
      showList.splice(0, showList.length, ...res.data.list.flat())
      break;
    case 2:
      res = await common.baseAjax("POST", "/user/bet-order", form)
      isLogin(res.code);
      betOrderData = res.data.list
      break;
    case 3:
      res = await common.baseAjax("POST", "/user/withdraw-log", form)
      isLogin(res.code);
      withdrawData = res.data.list
      break;
    case 4:
      res = await common.baseAjax("POST", "/user/income-self", form)
      isLogin(res.code);
      incomeSelfData = res.data
      break;
    case 5:
      res = await common.baseAjax("POST", "/user/income", form)
      isLogin(res.code);
      incomeData = res.data
      break;
    default:
      console.log("nothing selected")
  }

  tableLoading.value = false
}

// const getTodayData = () => {
//   document.getElementById("today").click();
// }


// onMounted(() => {
//   getTodayData(); // 預設帶入今日資料
// })

</script>

<template>
  <main class="max-100vw-1005 my-2 mx-auto">
    <div class="container-lg">
      <div class="border-bottom border-primary ">
        <h6 class="pb-2 mb-0 d-inline-block">{{ t("message.Record-title")}}</h6>
          <van-icon
            name="cross"
            size="25"
            class="d-inline-block closeBtn"
            @click="common.toBack()"
          />
      </div>
      <form class="form-record">
        <div
          class="d-none d-md-block overflow-hidden mb-4"
          role="drag"
        >
        </div>

        <!-------- RWD(手機板) -------------------->

        <div class="d-flex d-md-none gap-2 p-2 bg-secondary-color rounded-3 mb-2">
          <select
            class="form-select"
            data-target="type"
            @change="changeTable($event); selectTime('toDay'); selectRef = 'toDay'"
          >
            <option value="1">{{ t("message.Deposit") }}</option>
            <option value="2">{{ t("message.GameResults") }}</option>
            <option value="3">{{ t("message.WithDraw") }}</option>
            <option value="4">{{ t("message.CashbackRecord") }}</option>
            <option value="5">{{ t("message.CommissionCashback") }}</option>
            <option value="8">{{ t("message.OfferOther") }}</option>
          </select>
          <select
            class="form-select"
            data-target="date"
            @change="selectTime($event.target.value); selectRef = $event.target.value"
            v-model="selectRef"
          >
            <option value="toDay">{{ t("message.Today") }}</option>
            <option value="yesterDay">{{ t("message.Yesterday") }}</option>
            <option value="thisWeek">{{ t("message.ThisWeek") }}</option>
            <option value="lastWeek">{{ t("message.LastWeek") }}</option>
            <option value="thisMonth">{{ t("message.ThisMonth") }}</option>
            <option value="lastMonth">{{ t("message.LastMonth") }}</option>
            <!-- <option value="allTime">ALL</option> -->
          </select>
        </div>

        <!-------- 紀錄表格 -------------------->

        <div
          id="list-record"
          style="background-color: #2d2d34; margin-bottom:10rem;"
          class="p-3 rounded-3 mb-4"
        >

        <!-- 充值 table -->
          <div class="">
            <div
              v-if="state.activeTable == 1"
              class="d-sm-table w-100 text-nowrap"
            >
              <div
                class="d-none d-sm-table-header-group"
                role="drag"
                data-parent=".overflow-hidden"
              >
                <div class="d-sm-table-row">
                  <div class="createtime d-sm-table-cell">{{ t("message.Time") }}</div>
                  <div class="beforeamount d-sm-table-cell">{{ t("message.Balance") }}</div>
                  <div class="transcoin d-sm-table-cell">{{ t("message.Revenue") }}</div>
                  <div class="afteramount d-sm-table-cell">{{ t("message.ChangedBalance") }}</div>
                  <div class="kind d-sm-table-cell">{{ t("message.Type") }}</div>
                  <div class="hash d-sm-table-cell">{{ t("message.Detail") }}</div>
                </div>
              </div>

              <div
                v-if="tableLoading.value"
                style="position:relative; left:280%; z-index:100; top:6px"
              >
                <div
                  class="spinner-border text-light"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div
                v-else-if="showList.length > 0"
                class="d-sm-table-row border-bot w-100 list"
                v-for="(item, index) in showList"
                :key="index"
              >
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Time")'
                >
                  {{ item.create_time }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Balance")'
                >
                  {{ item.balance_before }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Revenue")'
                >
                  {{ item.money }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.ChangedBalance")'
                >
                  {{ item.balance_after }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Type")'
                >
                  {{ item.type }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Detail")'
                >
                  {{ item.remark }}
                </div>
              </div>

              <div
                v-if="!tableLoading.value && showList.length == 0"
                class="empty-table d-sm-table-row"
              >
                <div class="d-sm-table-cell"></div>
                <div class="d-sm-table-cell"></div>
                <div class="text-end">{{ t("message.NoData") }}</div>
                <div class="d-sm-table-cell"></div>
                <div class="d-sm-table-cell"></div>
                <div class="d-sm-table-cell"></div>
              </div>

            </div>
          </div>


          <!-- 遊戲結果 table -->
          <div
            v-if="state.activeTable == 2"
            class="d-sm-table w-100 text-nowrap"
          >
            <div
              class="d-none d-sm-table-header-group"
              role="drag"
              data-parent=".overflow-hidden"
            >
              <div class="d-table-row">
                <div class="createtime d-sm-table-cell">{{ t("message.GameName") }}</div>
                <div class="beforeamount d-sm-table-cell">{{ t("message.Interval") }}</div>
                <div class="beforeamount d-sm-table-cell">{{ t("message.Count") }}</div>
                <div class="transcoin d-sm-table-cell">{{ t("message.Validbet") }}</div>
                <div class="afteramount d-sm-table-cell">{{ t("message.BetAmount") }}</div>
                <div class="kind d-sm-table-cell">{{ t("message.Winlose") }}</div>
              </div>
            </div>

            <div
              v-if="tableLoading.value"
              style="position:relative; left:280%; z-index:100; top:6px"
            >
              <div
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div
              v-else-if="Object.keys(betOrderData).length > 0"
              class="d-sm-table-row border-bot w-100 list"
              v-for="(item, index) in betOrderData"
              :key="index"
            >
              <div
                class="d-sm-table-cell"
                data-label="遊戲"
              >
                 {{ item.name }}
              </div>
              <div
                class="d-sm-table-cell"
                data-label="計算區間"
              >
                <!-- {{ item.bet_time + "~" + item.bet_cal_time.substring(11) }} -->
                {{ item.bet_time }}
              </div>
                            <div
                class="d-sm-table-cell"
                data-label="投注筆數"
              >
                {{ item.count }}
              </div>
              <div
                class="d-sm-table-cell"
                data-label="有效投注金額"
              >
                {{ item.eff_money }}
              </div>
              <div
                class="d-sm-table-cell"
                data-label="投注金額"
              >
                {{ item.bet_money }}
              </div>
              <div
                class="d-sm-table-cell"
                data-label="輸贏"
              >
                {{ item.win_money }}
              </div>
            </div>
            <div
              v-if="!tableLoading.value && betOrderData.length == 0"
              class="empty-table p-3 d-sm-table-row"
            >
              <div class="d-sm-table-cell"></div>
              <div class="d-sm-table-cell"></div>
              <div class="text-center">{{ t("message.NoData") }}</div>
              <div class="d-sm-table-cell"></div>
            </div>
          </div>


          <!-- 提現紀錄 table -->
          <div
            v-if="state.activeTable == 3"
            class="d-sm-table w-100 text-nowrap"
          >
            <div
              class="d-none d-sm-table-header-group"
              role="drag"
              data-parent=".overflow-hidden"
            >
              <div class="d-sm-table-row">
                <div class="createtime d-sm-table-cell">{{ t("message.Wd_Time") }}</div>
                <div class="beforeamount d-sm-table-cell">{{ t("message.Balance_before") }}</div>
                <div class="transcoin d-sm-table-cell">{{ t("message.Wd_Amount") }}</div>
                <div class="afteramount d-sm-table-cell">{{ t("message.Wd_Fee") }}</div>
                <div class="kind d-sm-table-cell">{{ t("message.Balance_after") }}</div>
                <div class="hash d-sm-table-cell">{{ t("message.Type") }}</div>
                <div class="hash d-sm-table-cell">{{ t("message.Wd_status") }}</div>
                <div class="hash d-sm-table-cell">{{ t("message.Detail") }}</div>
              </div>
            </div>

            <div
              v-if="tableLoading.value"
              style="position:relative; left:280%; z-index:100; top:6px"
            >
              <div
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div
              v-else-if="withdrawData.length > 0"
              class="d-sm-table-row border-bot w-100 list"
              v-for="(item, index) in withdrawData"
              :key="index"
            >
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Wd_Time")'
              >
                {{ item.create_time }}
              </div>
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Balance_before")'
              >
                {{ item.balance_before }}
              </div>
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Wd_Amount")'
              >
                {{ item.money }}
              </div>
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Wd_Fee")'
              >
                {{ item.fee }}
              </div>
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Balance_after")'
              >
                {{ item.balance_after }}
              </div>
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Type")'
              >
                {{ item.type }}
              </div>
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Wd_status")'
              >
                {{ item.status }}
              </div>
              <div
                class="d-sm-table-cell"
                :data-label='t("message.Detail")'
              >
                {{ item.remark }}
              </div>
            </div>
            <div
              v-if="!tableLoading.value && withdrawData.length == 0"
              class="empty-table d-sm-table-row"
            >
              <div class="d-sm-table-cell"></div>
              <div class="d-sm-table-cell"></div>
              <div class="text-end">{{ t("message.NoData") }}</div>
              <div class="d-sm-table-cell"></div>
              <div class="d-sm-table-cell"></div>
            </div>
          </div>

          <!-- 返水紀錄 table -->
          <div class="overflow-hidden">
            <div
              v-if="state.activeTable == 4"
              class="d-sm-table w-100 text-nowrap"
            >
              <div
                class="d-none d-sm-table-header-group"
                role="drag"
                data-parent=".overflow-hidden"
              >
                <div class="d-sm-table-row">
                  <div class="createtime d-sm-table-cell">{{ t("message.BetOrderNumber") }}</div>
                  <div class="beforeamount d-sm-table-cell">{{ t("message.Hall") }}</div>
                  <div class="transcoin d-sm-table-cell">{{ t("message.Rebate") }}</div>
                  <div class="afteramount d-sm-table-cell">{{ t("message.BetAmount-") }}</div>
                  <div class="kind d-sm-table-cell">{{ t("message.SettlementAmount") }}</div>
                  <div class="hash d-sm-table-cell">{{ t("message.BettingTime") }}</div>
                </div>
              </div>

              <div
                v-if="tableLoading.value"
                style="position:relative; left:280%; z-index:100; top:6px"
              >
                <div
                  class="spinner-border text-light"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div
                v-else-if="incomeSelfData.list && incomeSelfData.list.length > 0"
                class="d-sm-table-row border-bot w-100 list"
                v-for="(item, index) in incomeSelfData.list"
                :key="index"
              >
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.BetOrderNumber")'
                >
                  {{ item.order_number }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Hall")'
                >
                  {{ item.hall }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Rebate")'
                >
                  {{ item.rebate }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.BetAmount-")'
                >
                  {{ item.amount }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.SettlementAmount")'
                >
                  {{ item.bonus }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.BettingTime")'
                >
                  {{ item.bet_time }}
                </div>
              </div>

              <div
                v-if="!tableLoading.value && incomeSelfData.list && incomeSelfData.list.length == 0"
                class="empty-table d-sm-table-row"
              >
                <div class="d-sm-table-cell"></div>
                <div class="d-sm-table-cell"></div>
                <div class="text-end">{{ t("message.NoData") }}</div>
                <div class="d-sm-table-cell"></div>
                <div class="d-sm-table-cell"></div>
              </div>
            </div>
          </div>


          <!-- 好友回饋分享 table -->
          <div class="overflow-hidden">
            <div
              v-if="state.activeTable == 5"
              class="d-sm-table w-100 text-nowrap"
            >
              <div
                class="d-none d-sm-table-header-group"
                role="drag"
                data-parent=".overflow-hidden"
              >
                <div class="d-sm-table-row">
                  <div class="createtime d-sm-table-cell">{{ t("message.Member") }}</div>
                  <div class="beforeamount d-sm-table-cell">{{ t("message.Rebate-") }}</div>
                  <div class="kind d-sm-table-cell">{{ t("message.BetAmount--") }}</div>
                  <div class="hash d-sm-table-cell">{{ t("message.Bonus") }}</div>
                  <div class="hash d-sm-table-cell">{{ t("message.BettingTime") }}</div>
                </div>
              </div>

              <div
                v-if="tableLoading.value"
                style="position:relative; left:280%; z-index:100; top:6px"
              >
                <div
                  class="spinner-border text-light"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div
                v-else-if="incomeData.length !== 0"
                class="d-sm-table-row border-bot w-100 list"
                v-for="(item, index) in incomeData.list"
                :key="index"
              >
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Member")'
                >
                  {{ item.bet_user_account }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Rebate-")'
                >
                  {{ item.rebate }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.BetAmount--")'
                >
                  {{ item.amount }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.Bonus")'
                >
                  {{ item.bonus }}
                </div>
                <div
                  class="d-sm-table-cell"
                  :data-label='t("message.BettingTime")'
                >
                  {{ item.bet_time }}
                </div>
              </div>

              <div
                v-if="!tableLoading.value && incomeData.list && incomeData.list.length == 0"
                class="empty-table d-sm-table-row"
              >
                <div class="d-sm-table-cell"></div>
                <div class="d-sm-table-cell"></div>
                <div class="text-end">{{ t("message.NoData") }}</div>
                <div class="d-sm-table-cell"></div>
                <div class="d-sm-table-cell"></div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

/* .container {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * .5);
    padding-left: calc(var(--bs-gutter-x) * .5);
    margin-right: auto;
    margin-left: auto
} */

.container-lg {
  /* all: unset; */
  /* padding-right: calc(--bs-gutter-x); */
}


</style>


<style lang="scss" scoped>

.closeBtn {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: .45rem;
}

.container-lg {
  overflow:auto;
}

.btn-record-type {
  background-color: #2C3D5B;
}

.form-select {    // fix bootstrap style
  // font-size: unset;
  font-size: initial;
  padding: .2rem .5rem;
}

.btn-record {
  white-space: nowrap;
}

.bg-secondary-color {
  background-color: var(--bg-secondary);
}

.bg-tertiary-color {
  background-color: var(--bg-tertiary);
}

.border-bot {
  border-bottom: 1px solid white !important;
}


@media (min-width: 576px) {
  .d-sm-table-header-group[role=drag] {
    cursor: e-resize;
  }
}

@media (min-width:576px) {
  .d-sm-table-header-group {
    display: table-header-group !important;
    font-weight: bold;
    position: relative;
  }
}

@media (min-width: 576px) {

  .d-sm-table-header-group::after,
  .d-sm-table-header-group::before {
    content: "";
    position: absolute;
    border: 1px solid #4D4D4D;
    width: 100%;
  }
}

@media (min-width: 576px) {
  .d-sm-table-header-group::before {
    top: 0;
  }
}

@media (min-width: 576px) {
  .d-sm-table-header-group::after {
    bottom: 0;
  }
}

.d-table-row {
  display: table-row !important;
  transition: 0.5s;
  border-radius: 0.5rem;
  line-height: 2.5rem;
}

@media (max-width: 576px) {
  .d-sm-table-cell {
    display: flex;
    -webkit-box-align: end;
    -ms-flex-aligh: end;
    align-items: end;
  }
}

@media (max-width: 576px) {
  .d-sm-table-cell::before {
    content: attr(data-label);
    margin-right: auto;
    font-size: 100%;
    opacity: 0.8;
    padding-right: 0.5rem;
  }
}
</style>
