<script setup>
import { reactive, inject, watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import { online_number } from "../Images/base64";
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import { newGameImg } from "@/components/Images/base64";

const { t, locale } = useI18n();

const common = inject("common");

const modules = [Autoplay]


const state = reactive({
  gameData: [],
  gameInit: async () => {
    try {
      const res = await common.baseAjax("POST", "/site/special-game");
      if (res.code == 1) {
        state.gameData = res.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
});

state.gameInit();

const randomNumber = () => {
  return Math.floor(Math.random() * 900) + 100
}

</script>

<template>
  <div class="newGames-wrapper">

    <div class="newGamesScrollView">
      <div class="title">
        <div class="left">
          <span>{{ state.gameData.title }}</span>
        </div>
        <div class="all-par"></div>
      </div>
      <div class="new-info">
        <swiper
          v-if="state.gameData.list"
          class="swiper-container"
          :slides-per-view="'auto'"
          :modules="modules"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :loop="true"
        >
          <SwiperSlide
            v-for="(item, index) in state.gameData.list"
            :key="index"
          >
            <div class="swiper-item"
            @click="common.toGame(item.code, item.url)">
              <div class="item-body">
                <img
                  :src="item.image"
                  class="van-image"
                />
                <!-- 取消'新遊戲'字樣圖片 -->
                <!-- <img
                  :src="newGameImg"
                  class="grid-item-icon"
                /> -->
                <div class="item-text">
                  <div>{{ item.title }}</div>
                  <span>{{ item.sub_title }}</span>
                </div>
              </div>
              <div class="online">
                <img
                  :src="online_number"
                  style="width:8.5px; height:9.5px; "
                />
                <div class="online-number">{{ randomNumber() }}</div>
              </div>
            </div>
          </SwiperSlide>
        </swiper>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss" scoped>
.newGames-wrapper:first-child {
  margin-top: 0.4rem;
}

.newGames-wrapper {
  position: relative;
  // margin-top: .4rem;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
  align-items: flex-start;
  -webkit-align-items: flex-start;
  flex-direction: column;
  -webkit-flex-direction: column;
  flex-wrap: nowrap;
  -webkit-flex-wrap: nowrap;
}


.title {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  flex-direction: row;
  -webkit-flex-direction: row;
  flex-wrap: nowrap;
  -webkit-flex-wrap: nowrap;
  margin-bottom: .26667rem;
  justify-content: space-between;
  -webkit-justify-content: space-between;

  .left {
    font-size: .48rem;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .left span {
    text-transform: uppercase;
    font-weight: 700;
    font-size: .48rem;
    margin-left: .08rem;
  }
}

.new-info {
  width: 100%;
}

.swiper-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}

.newGamesScrollView {
  width: 100%; // 給予固定寬

  .swiper-slide {
    width: calc(25% - .06rem);
    overflow: hidden;
    margin-right: .09rem;
  }

  .swiper-slide .swiper-item {
    position: relative;
    overflow: hidden;
  }

  .swiper-slide .swiper-item {

    .item-body {
      position: relative;
      overflow: hidden;

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(to top, black 4%, transparent 35%);
        z-index: 0;
        border-radius: .213rem;
      }
    }

    .van-image {
      width: 100%;
      min-height: 3.253rem;
      border-radius: .213rem;
      overflow: hidden;
    }

    .grid-item-icon {
      position: absolute;
      border-radius: 0;
      top: .1333rem;
      left: .133rem;
      height: .4rem;
    }

    .item-text {
      position: absolute;
      width: 100%;
      bottom: .2rem;
      font-size: .26rem;
      text-align: center;
      line-height: 1.3;
      z-index: 1;
    }

    .online {
      margin-top: .08rem;
      margin-left: .08rem;
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

      .online-number {
        margin-left: .10667rem;
        color: var(--font-color);
        text-align: center;
        font-size: .32rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
}

</style>