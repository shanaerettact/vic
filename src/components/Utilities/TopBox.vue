<script setup>
import IconDropdown from '@/components/Icons/icon-drop-down.vue';
import usdtWebp from '@/assets/img/USDT-fromWeb.webp'


</script>

<template>
  <div class="top-box">
    <div class="left">
      <slot name="left">
        <!-- 預設 USDT 圖標 -->
        <!-- <van-image
          width="24px"
          height="24px"
          lazy-load
          src="https://cdn-img.w0zuv.live/image/2024-07-22/bfbecda097f74f41bb582adeb2fd88f8.webp"
        /> -->
        <van-image
          width="24px"
          height="24px"
          lazy-load
          :src="usdtWebp"
        />
      </slot>
      <div class="left_text">
        <span class="left_text_up">
          <slot name="up" />
        </span> <!-- 幣種 -->
        <span class="left_text_down">
          <slot name="down" />
        </span> <!-- USDT -->
      </div>
    </div>
    <div class="right">
      <IconDropdown />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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