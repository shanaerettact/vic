<script setup>
import { inject, ref, reactive, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import iconDropDown from "@/components/Icons/icon-drop-down.vue";
import { noData } from "@/components/Images/base64.js";
import IconClose from '@/components/Icons/icon-close.vue';
import IconActiveIcon from '@/components/Icons/icon-activeIcon.vue';
import IconInActiveIcon from '@/components/Icons/icon-InactiveIcon.vue';
import IconUsdt from '@/components/Icons/icon-usdt.vue'


const common = inject("common");
const { t, locale } = useI18n();

const showInterval = ref(false)
const showActions = ref(false)

const state = reactive({
  ActiveAction: 1,
  ActiveInterval: 0,
  transRecord: [],
  statusText: {},
})


const IntervalText = [
  { label: t("message.Past90days") },
  { label: t("message.Past60days") },
  { label: t("message.Past30days") },
  { label: t("message.Past7days") },
  { label: t("message.Past24hours") },
];

const ActionText = [
  { label: t("message.Deposit-title") },
  { label: t("message.Withdraw_2") },
  { label: t("message.Cashback") },
];

watch(() => [state.ActiveAction, state.ActiveInterval], () => {
  showInterval.value = false;
  showActions.value = false;
})


const list = ref();
const error = ref(false);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      if (list.value.length >= state.transRecord.length) {
        finished.value = true
        return
      } else {

        list.value.push(state.transRecord[list.value.length])
      }
    }
    loading.value = false;
  }, 1000)
};


const action = async () => {
  common.loading = true

  list.value = [];
  finished.value = false;

  let startTime;
  let endTime;

  const start = new Date();
  const end = new Date();

  switch (state.ActiveInterval) {
    case 0:  
      start.setDate(start.getDate() - 90)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 23:59:59`
      break;
    case 1:  
      start.setDate(start.getDate() - 60)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 23:59:59`
      break;
    case 2:  
      start.setDate(start.getDate() - 30)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 23:59:59`
      break;
    case 3:  
      start.setDate(start.getDate() - 7)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} 00:00:00`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 23:59:59`
      break;
    case 4:  
      start.setDate(start.getDate() - 1)
      startTime = `${start.getFullYear()}-${(start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1}-${(start.getDate() + "").length < 2 ? "0" + start.getDate() : start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`
      endTime = `${end.getFullYear()}-${(end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1}-${(end.getDate() + "").length < 2 ? "0" + end.getDate() : end.getDate()} 23:59:59`
      break;

    default:
      startTime = '';
      endTime = '';
      break
  }

  let form = {};

  form.startTime = startTime;
  form.endTime = endTime;
  let res;

  try {
    switch (state.ActiveAction) {
      case 0:
        res = await common.baseAjax("POST", "/user/recharge-log", form)  // 獲取充值紀錄
        break;
      case 1:
        res = await common.baseAjax("POST", "/user/withdraw-log", form) // 獲取提現紀錄
        break;
      case 2:
        res = await common.baseAjax("POST", "/user/income-self", form)  // 返水紀錄
      default:
        break
    }
    if (res.code == 1) {
      state.transRecord = res.data.list
      if(!state.statusText) {  
        state.statusText = res.data.status
      }
      common.loading = false
      list.value = state.transRecord.slice(0, 5) 
      onLoad();
    } else {
      if (res.code == 4) {
        common.user = {};
      }
      common.loading = false;
      common.toRouter('/')
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  } finally { }
}

action();

</script>


<template>
  <div class="transRecord-wrapper">
    <HeaderCross :text="t('message.Record-title')" />
    <div class="main">
      <div class="content">
        <div class="top-box-wrapper">
          <div
            class="top-box"
            @click="showInterval = true"
          >
            <div class="left">{{ IntervalText[state.ActiveInterval]?.label }}
            </div>
            <div class="right">
              <iconDropDown />
            </div>
          </div>

          <div
            class="top-box"
            @click="showActions = true"
          >
            <div class="left">{{ ActionText[state.ActiveAction]?.label }}
            </div>
            <div class="right">
              <iconDropDown />
            </div>
          </div>

        </div>
        <div class="card-box">
          <div class="table-header">
            <div class="cell">{{ t("message.TransTime") }}</div>
            <div class="cell">{{ t("message.Type") }}</div>
            <div class="cell">{{ t("message.Quantity") }}</div>
            <div class="cell">{{ t("message.State") }}</div>
          </div>
          <div
            class="table-box"
            v-if="state.transRecord.length > 0"
          >
            <van-list
              v-model:loading="loading"
              v-model:error="error"
              :finished="finished"
              :finished-text="t('message.NoMore')"
              :error-text="t('message.RequestFailed')"
              @load="onLoad"
              :loading-text="t('message.Loading')"
            >

              <div
                class="table-row"
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="cell time">
                  {{ item.create_time || item.bet_time }}
                </div>
                <div class="cell type">
                  {{ ActionText[state.ActiveAction].label }}
                </div>
                <div class="cell amount">
                  <p>{{ item.money || item.bonus }}</p>
                  <IconUsdt style="margin-left: 4px;" />
                </div>
                <div class="cell state">
                  <span class="green">

                      {{ state.statusText[item.status] }}
                    &nbsp; 
                  </span>
                </div>
              </div>
            </van-list>
          </div>
          <div
            v-else
            class="no-data mt-4"
          >
            <!-- <van-image :src="noData" /> -->
            <img src="../../assets/img/no-data.png" class="max-w-[80px]" alt="">
            <span>{{ t("message.HaveNoTransactionsYet_1") }}</span>
            <span>{{ t("message.HaveNoTransactionsYet_2") }}</span>
          </div>

          <br />
        </div>

      </div>
    </div>


    <van-popup
      v-model:show="showInterval"
      position="bottom"
      :style="{ height: '52%' }"
      style="background-color: #202125 ;border-radius: 0.16rem;"
    >
      <div class="pop-header">
        <div
          class="pop-close"
          style="top:19px; right: 18px;"
          @click="showInterval = false"
        >
          <IconClose />
        </div>
        <div
          class="pop-title"
          style="padding: 19px 0px;"
        >{{ t("message.Choose") }}</div>
      </div>
      <div class="pop-content">
        <div
          class="pop-item"
          :class="state.ActiveInterval == 0 ? 'popactive' : ''"
          @click="state.ActiveInterval = 0; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Past90days") }}</span>
          </div>
          <div v-if="state.ActiveInterval == 0">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
        <div
          class="pop-item"
          :class="state.ActiveInterval == 1 ? 'popactive' : ''"
          @click="state.ActiveInterval = 1; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Past60days") }}</span>
          </div>
          <div v-if="state.ActiveInterval == 1 ? 'popactive' : ''">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
        <div
          class="pop-item"
          :class="state.ActiveInterval == 2 ? 'popactive' : ''"
          @click="state.ActiveInterval = 2; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Past30days") }}</span>
          </div>
          <div v-if="state.ActiveInterval == 2">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
        <div
          class="pop-item"
          :class="state.ActiveInterval == 3 ? 'popactive' : ''"
          @click="state.ActiveInterval = 3; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Past7days") }}</span>
          </div>
          <div v-if="state.ActiveInterval == 3">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
        <div
          class="pop-item"
          :class="state.ActiveInterval == 4 ? 'popactive' : ''"
          @click="state.ActiveInterval = 4; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Past24hours") }}</span>
          </div>
          <div v-if="state.ActiveInterval == 4">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showActions"
      position="bottom"
      :style="{ height: '52%' }"
      style="background-color: #202125 ;border-radius: 0.16rem;"
    >
      <div class="pop-header">
        <div
          class="pop-close"
          style="top:19px; right: 18px;"
          @click="showActions = false"
        >
          <IconClose />
        </div>
        <div
          class="pop-title"
          style="padding: 19px 0px;"
        >{{ t("message.Choose") }}</div>
      </div>
      <div class="pop-content">

        <div
          class="pop-item"
          :class="state.ActiveAction == 0 ? 'popactive' : ''"
          @click="state.ActiveAction = 0; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Deposit-title") }}</span>
          </div>
          <div v-if="state.ActiveAction == 0">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
        <div
          class="pop-item"
          :class="state.ActiveAction == 1 ? 'popactive' : ''"
          @click="state.ActiveAction = 1; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Withdraw_2") }}</span>
          </div>
          <div v-if="state.ActiveAction == 1">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
        <div
          class="pop-item"
          :class="state.ActiveAction == 2 ? 'popactive' : ''"
          @click="state.ActiveAction = 2; action()"
        >
          <div class="pop-left">
            <span class="pop-text">{{ t("message.Cashback") }}</span>
          </div>
          <div v-if="state.ActiveAction == 2">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
      </div>

    </van-popup>
  </div>
</template>


<style lang="scss" scoped>
.transRecord-wrapper {
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
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: none;
  box-sizing: border-box;
  background: var(--bg-color);
}

.main .content {
  padding: .32rem .29333rem .26667rem .32rem;
}

.main .content .top-box-wrapper {
  display: grid;
  gap: .16rem;
  grid-template-columns: 1fr 1fr;

  .top-box {
    width: 100%;
    position: relative;
    min-height: 1.2rem;
    border-radius: .16rem;
    background: var(--bg-light-color);
    padding: .26667rem .32rem;
    box-sizing: border-box;
    gap: .10667rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    .left {
      flex: 1;
      color: var(--font-color);
      font-size: .37333rem;
      font-style: normal;
      font-weight: 650;
      line-height: normal;
      letter-spacing: .00747rem;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }

    .right {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
}

.main .content {
  .card-box {
    margin-top: .29333rem;
    flex: 1;
    overflow-y: scroll;

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
        font-size: .37333rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        letter-spacing: .00747rem;
      }

      .cell:last-child {
        justify-content: flex-end;
      }
    }

    .table-box {
      box-sizing: border-box;
      background-color: #2c154487;
    }

    .table-box .van-list .table-row {
      padding: .2667rem .16rem;
      border-bottom: .0267rem solid var(--bg-lighter-color2);
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

      &:nth-last-child(3) {
        border-radius: 0 0 .1067rem .1067rem;
        border-bottom: none;
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
      }

      .time {
        color: var(--font-color);
        font-size: .32rem;
        font-weight: 650;
        text-align: start;
        font-style: normal;
        line-height: normal;
      }

      .type {
        color: var(--font-color);
        text-align: center;
        font-size: .32rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        letter-spacing: .0064rem;
        text-transform: capitalize;
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

      .state {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: var(--font-color);
        font-size: .32rem;
        font-weight: 650;
        line-height: 100%;
        letter-spacing: .0064rem;
      }

      .state .green {
        color: var(--success-color);
      }

      .state span {
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

    .no-data {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      flex-direction: column;
      -webkit-flex-direction: column;
      flex-wrap: nowrap;
      -webkit-flex-wrap: nowrap;

      .van-image {
        margin-top: 1.14667rem;
        width: 2.13333rem;
        height: 1.87133rem;
      }

      span:first-of-type {
        margin-top: .4rem;
        color: var(--font-color);
        text-align: center;
        font-size: .37333rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        letter-spacing: .00747rem;
      }

      span:nth-of-type(2) {
        margin-top: .13333rem;
        color: var(--font-dark-color);
        text-align: center;
        font-size: .32rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: .0064rem;
      }
    }

    :deep(.van-list__finished-text) {
      background: var(--bg-color);
    }
  }
}

.transRecord-wrapper {
  .van-popup {
    background-color: var(--bg-color)!important;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: .8rem;
  }

  @media screen and (min-width: 600px) {
    .van-popup--bottom {
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

    .pop-close {
      top: .37333rem;
      right: .32rem;
      position: absolute;
    }

    .pop-title {
      color: var(--font-color);
      text-align: center;
      font-size: .42667rem;
      font-style: normal;
      font-weight: 650;
      line-height: normal;
    }
  }

  .van-popup .pop-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    .pop-item {
      height: 1.01333rem;
      border-radius: .16rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 .32rem;
      padding: 0 .26667rem 0 .34667rem;
      box-sizing: border-box;

      .pop-left {
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

      .pop-left .pop-text {
        color: var(--font-color);
        font-size: .37333rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        letter-spacing: .018rem;
      }
    }

    .pop-item:not(:first-child) {
      margin-top: .16rem;
    }

    .popactive {
      background: var(--bg-nav-active-color) !important;
    }
  }
}
</style>