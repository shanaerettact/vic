<script setup>
import { inject, ref, reactive, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconDropDown from "@/components/Icons/icon-drop-down.vue";
import { noData } from "@/components/Images/base64.js";
import { usdtIcon } from "@/components/Images/base64.js";
import { primeCoinIcon } from "@/components/Images/base64";
import { trxIcon } from "@/components/Images/base64.js";
import IconClose from '@/components/Icons/icon-close.vue';
import IconActiveIcon from '@/components/Icons/icon-activeIcon.vue';
import IconInActiveIcon from '@/components/Icons/icon-InactiveIcon.vue';
import IconUsdt from "@/components/Icons/icon-usdt.vue";


const common = inject("common");
const { t, locale } = useI18n();

const showInterval = ref(false)
const showGametype = ref(false)
const showCurrency = ref(false)


const state = reactive({
  ActiveInterval: 4,
  ActiveGameItem: {},
  ActiveCurrency: 0, 
  betRecord: [],
  TypeList: [{ id: 'all', code: '', label: t("message.ALL") },], 
})


state.ActiveGameItem = state.TypeList[0] 


watch(() => common.menu, () => { 
  common.menu.forEach(item => {
    state.TypeList.push({
      id: item.id,
      code: item.code,
      label: item.title,
    })
  })
}, { immediate: true })


const IntervalText = [
  { label: t("message.Past90days") },
  { label: t("message.Past60days") },
  { label: t("message.Past30days") },
  { label: t("message.Past7days") },
  { label: t("message.Past24hours") },
];


const selectTime = async (val) => {
  common.loading = true

  let startTime;
  let endTime;

  const start = new Date();
  const end = new Date();

  switch (val) {
    case 0:   // 過去90天
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

  const form = {
    startTime,
    endTime,
    type: state.ActiveGameItem.code,
  };
  await fetchBetOrder(form);
}

const fetchBetOrder = async (form) => {
  try {
    const res = await common.baseAjax("POST", "/user/bet-order", form);
    if (res.code == 1) {
      state.betRecord = res.data.list;
      common.loading = false;
    } else {
      if (res.code == 4) {
        common.user = {};
        common.toRouter("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      common.loading = false;
      common.alert("fail", res.msg);
    }
  } catch (error) {
    console.log(error);
  }
}


const selectGame = (item) => {
  state.ActiveGameItem = item;
  selectTime(state.ActiveInterval)
}


const CurrencyText = [
  { label: common.primeCoinName, icon: usdtIcon },
  { label: 'TRX', icon: trxIcon },
]


watch(() => [state.ActiveInterval, state.ActiveCurrency, state.ActiveGameItem], () => {
  showInterval.value = false
  showGametype.value = false
  showCurrency.value = false
})

onMounted(() => {
  selectTime(4)
})

</script>

<template>
  <div class="betRecord-wrapper">
    <HeaderCross :text="t('message.GameRecords')" />
    <div class="main">
      <div class="content">

        <div class="top-box-wrapper">
          <div
            class="top-box top-box-1"
            @click="showInterval = true"
          >
            <div class="left">
              <span class="text">{{ IntervalText[state.ActiveInterval]?.label
              }}</span>
            </div>
            <div class="right">
              <IconDropDown />
            </div>
          </div>
          <div
            class="top-box top-box-2"
            @click="showCurrency = false"
          >
            <div class="left">
              <span class="text">{{ CurrencyText[state.ActiveCurrency]?.label
              }}</span>
            </div>
            <!-- <div class="right">
              <IconDropDown />
            </div> -->
          </div>
        </div>

        <div class="top-box-wrapper">
          <div
            class="top-box top-box-3"
            @click="showGametype = true"
          >
            <div class="left">
              <span class="text">{{ state.ActiveGameItem.label
              }}</span>
            </div>
            <div class="right">
              <IconDropDown />
            </div>
          </div>
        </div>


        <div class="card-box">
          <div class="hash-table-header">
            <div class="hash-header-item">{{ t("message.Game-list-title") }}
            </div>
            <div class="hash-header-item">{{ t("message.Profit") }}</div>
          </div>

          <div
            class="no-data"
            v-if="state.betRecord.length < 1"
          >
            <van-image :src="noData" />
            <span>{{ t("message.NoBetsYet") }}</span>
          </div>

          <div class="table-box">
            <van-list>
              <div
                class="table-row"
                v-for="(item, index) in state.betRecord"
              >
                <div class="cell title">
                  <div class="name">
                    <p>{{ item.name }}</p>
                  </div>
                  <div class="date">
                    {{ item.bet_time }}
                  </div>
                </div>
                <div class="cell state">
                  <span></span>
                  <div class="profit">
                    <span>{{ item.count }}x</span>
                    <div
                      class="number"
                      :class="item.win_money > 0 ? 'green' : 'red'"
                    >{{ item.win_money }} <div class="currency">
                        <IconUsdt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
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
          v-for="(item, index) in IntervalText"
          :key="index"
          :class="state.ActiveInterval == index ? 'popactive' : ''"
          @click="state.ActiveInterval = index; selectTime(index)"
        >
          <div class="pop-left">
            <span class="pop-text">{{ item.label }}</span>
          </div>
          <div v-if="state.ActiveInterval == index">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
      </div>
    </van-popup>


    <van-popup
      v-model:show="showGametype"
      position="bottom"
      :style="{ height: '55%' }"
      style="background-color: #202125 ;border-radius: 0.16rem;"
    >
      <div class="pop-header">
        <div
          class="pop-close"
          style="top:19px; right: 18px;"
          @click="showGametype = false"
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
          v-for="(item, index) in state.TypeList"
          :key="index"
          :class="state.ActiveGameItem.code == item.code ? 'popactive' : ''"
          @click="selectGame(item)"
        >
          <div class="pop-left">
            <span class="pop-text">{{ item.label }}</span>
          </div>
          <div v-if="state.ActiveGameItem.code == item.code">
            <IconActiveIcon />
          </div>
          <div v-else>
            <IconInActiveIcon />
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showCurrency"
      position="bottom"
      :style="{ height: '26%' }"
      style="background-color: #202125 ;border-radius: 0.16rem;"
    >
      <div class="pop-header">
        <div
          class="pop-close"
          style="top:19px; right: 18px;"
          @click="showCurrency = false"
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
          v-for="(item, index) in CurrencyText"
          :key="index"
          :class="state.ActiveCurrency == index ? 'popactive' : ''"
          @click="state.ActiveCurrency = index"
        >
          <div class="pop-left">
            <van-image
              :src="CurrencyText[index].icon"
              class="pop-image"
              style="width:22px; height: 22px;"
            />
            <span class="pop-text">{{ item.label }}</span>
          </div>
          <div v-if="state.ActiveCurrency == index">
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
.betRecord-wrapper {
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
  background: var(--bg-color);
}

.main .content {
  padding: .32rem .26667rem;
}

.main .content .top-box-wrapper {
  display: grid;
  gap: .16rem;
  grid-template-areas:
    "top-box-1 top-box-2"
    "top-box-3 top-box-3"
  ;
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

    .left .text {
      color: var(--font-color);
      font-size: .37333rem;
      font-style: normal;
      font-weight: 650;
      line-height: normal;
      letter-spacing: .00747rem;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
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

  .top-box-1 {
    grid-area: top-box-1;
  }

  .top-box-2 {
    grid-area: top-box-2;
  }

  .top-box-3 {
    grid-area: top-box-3;
  }

  @media screen and (min-width: 600px) {
    .van-popup--bottom {
      max-width: 11.4rem;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0 !important;
    }
  }
}

.main .content {
  .card-box {
    margin-top: .29333rem;
    flex: 1;
    overflow-y: scroll;

    .hash-table-header {
      border-radius: .16rem .16rem 0 0;
      padding: .34667rem .32rem;
      // margin-bottom: .10667rem;
      background: var(--bg-light-color);
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

      .hash-header-item:first-child {
        flex: 1.7;
        justify-content: flex-start;
      }

      .hash-header-item:last-child {
        justify-content: flex-end;
      }

      .hash-header-item {
        color: var(--font-color);
        text-align: center;
        // font-family: PingFang SC;
        font-size: .42rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        letter-spacing: .0064rem;
        text-transform: capitalize;
        display: flex;
        flex: 1;
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
        margin-top: 1.1467rem;
        width: 2.1333rem;
        height: 1.8713rem;
      }

      span {
        margin-top: .4rem;
        color: var(--font-color);
        text-align: center;
        font-size: .37333rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
        letter-spacing: .00747rem;
      }

    }

    .table-box {
      box-sizing: border-box;
    }

    .table-box .van-list {
      background-color: var(--bg-range-light);
      border-radius: 0 0 .16rem .16rem;

      .table-row {
        padding: .21333rem .05333rem .21333rem .08rem;
        border-bottom: .02667rem solid var(--bg-lighter-color2);
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

      .table-row .cell {
        //flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        flex-direction: column;
        -webkit-flex-direction: column;
        color: var(--font-color);
        font-size: .473rem;
        font-weight: 650;
        letter-spacing: .0064rem;
      }

      .table-row .title {
        flex: 2;
        display: flex;
        align-items: flex-start;
        text-align: center;
        padding-left: .3rem;
        gap: 8px;
      }

      .table-row .date {
        color: var(--font-dark-color);
        font-weight: normal;
        font-size: .4rem;
      }

      .table-row .state {
        flex: 1;
        letter-spacing: .0064rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-right: .3rem;

        .profit {
          display: flex;
          flex-direction: column;
          gap: 5px;

          span {
            text-align: end;
          }

          span:first-child {
            font-size: .42rem;
            ;
          }

          .number {
            display: flex;
            flex-direction: row;
            font-size: .45rem;
            gap: 3px;
          }

          .number.red {
            color: var(--error-color-dark);
          }

          .number.green {
            color: var(--success-color);
          }

          .number .currency {
            margin-left: .15rem;
            transform: translateY(-2px)
          }
        }
      }
    }
  }
}


.betRecord-wrapper {
  .van-popup {
    background-color: var(--bg-color) !important;
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

      .pop-left .pop-image {
        margin-right: .24rem;
        ;
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