<script setup>
import { inject, ref, reactive, computed, watch, watchEffect } from "vue";
import IconClose from '@/components/Icons/icon-close.vue';
import { useI18n } from "vue-i18n";
import IconActiveIcon from '@/components/Icons/icon-activeIcon.vue';
import IconInActiveIcon from '@/components/Icons/icon-InactiveIcon.vue';


const common = inject("common");
const { t, locale } = useI18n();

// 本組件使用方式，應在父組件如下使用 (其中 height 為彈出高度，address 為要帶入的陣列)，
// (v-model:show="showPop" 是要 binding 是否 show 的狀態 boolean 值):
//
// const showPop = ref(false)
// 
//    <Popup
//      :height="'30%'"
//      :options="adddress"
//      v-model:show="showPop"
//    />



const props = defineProps({
  height: String,   // 彈出 Popup 的高度 
  options: Array,
  show: Boolean,    // 是否顯示 Popup
})

const emit = defineEmits(['response', 'update:show'])    // 當選項被選中, 傳到父組件的資料
const sendMsg = (val) => {
  emit('response', val)
}

const showOptions = ref(props.show)    // binding show 狀態

const state = reactive({
  ActiveOption: 0,
})


const OptionsData = props.options


watch(() => state.ActiveOption, () => {     // 換選項會收回 Popup
  showOptions.value = false
})

watch(() => props.show, () => {       // 父組件改變狀態, Popup 狀態跟著變
  showOptions.value = props.show
})


watch(showOptions, () => {   // 本組件改變 show 狀態, 父組件也更新
  emit('update:show', showOptions.value)
})

</script>


<template>

  <van-popup
    v-model:show="showOptions"
    position="bottom"
    :style="{ height: height }"
    style="background-color: var(--bg-color) ;border-radius: 0.16rem;"
  >
    <div class="pop-header">
      <div
        class="pop-close"
        style="top:19px; right: 18px;"
        @click="showOptions = false"
      >
        <IconClose />
      </div>
      <div
        class="pop-title"
        style="padding: 19px 0px;"
      >選擇</div>
    </div>
    <div class="pop-content">
      <div
        class="pop-item"
        v-for="(item, index) in OptionsData"
        :key="index"
        :class="state.ActiveOption == index ? 'popactive' : ''"
        @click="state.ActiveOption = index; sendMsg(item)"
      >
        <div class="pop-left">
          <component
            :is="item.icon"
            v-bind="item.iconProps"
            class="pop-image"
          />
          <span class="pop-text">{{ item.label }}</span>
        </div>
        <div v-if="state.ActiveOption == index">
          <IconActiveIcon /> <!-- active 狀態下的圓 icon -->
        </div>
        <div v-else>
          <IconInActiveIcon /> <!-- Inactive 狀態下的圓 icon -->
        </div>
      </div>
    </div>
  </van-popup>
</template>


<style lang="scss" scoped>
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
      font-weight: 700;
    }

    &_down {
      color: var(--font-color);
      font-size: .4267rem;
      font-weight: 650;
    }
  }

  .right {
    color: var(--theme-color);
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
</style>