<script setup>
import MissionImage_1 from "@/assets/img/MissionImages/MissionImage_1.webp"
import MissionImage_2 from "@/assets/img/MissionImages/MissionImage_2.webp"
import MissionImage_3 from "@/assets/img/MissionImages/MissionImage_3.webp"
import MissionImage_4 from "@/assets/img/MissionImages/MissionImage_4.webp"
import IconTips3 from "@/components/Icons/icon-tips3.vue"
import { useI18n } from "vue-i18n"

const { t, locale } = useI18n();

const props = defineProps({
  msg: Object,
  vip: Object,
})

</script>


<template>
  <div class="levelSystemSlide">
    <div class="levelSlideHead">
      <van-image
        class="levelSlideImage"
        :src="props.msg.image"
      />
      <div class="levelSlideHeadInfo">
        <!-- VIP 字樣取消 -->
        <!-- <div>
          VIP
          <span class="levelSlideHeadFromTo">
            <span>{{ props.msg.HeadFromTo }}</span>
          </span>
        </div> -->

        <!-- <div>{{ props.msg.HeadFromToText }}</div> -->
        {{ props.msg.HeadFromToText }}
        <!-- {{ common.user.vips }} -->
      </div>
    </div>
    <div class="levelSlideMissions">

      <div class="levelSlideMission">
        <van-image
          class="levelSlideMissionImage"
          :src="MissionImage_1"
        />
        <div class="levelSlideMissionContentWrapper">
          <span class="levelSlideMissionTitle">
            <span>升級紅利</span>
            <!-- <span>{{ t("message.PlayerCashbackRate") }}</span> -->
            <!-- <IconTips3 /> -->
          </span>
          <span class="levelSlideMissionContent">
            <!-- {{ props.vip.rebate_user0 }}% -->
              {{ props.msg.m_money.bonus }}
          </span>
        </div>
      </div>

      <div class="levelSlideMission">
        <van-image
          class="levelSlideMissionImage"
          :src="MissionImage_2"
        />
        <div class="levelSlideMissionContentWrapper">
          <span class="levelSlideMissionTitle">
            <span>每周紅包</span>
            <!-- <span>{{ t("message.PromoRate") }}</span> -->
            <!-- <IconTips3 /> -->
          </span>
          <span class="levelSlideMissionContent">
            <!-- {{ props.vip.rebate_user1 }}% -->
              {{ props.msg.m_money.w_money }}
          </span>
        </div>
      </div>

      <div class="levelSlideMission">
        <van-image
          class="levelSlideMissionImage"
          :src="MissionImage_3"
        />
        <div class="levelSlideMissionContentWrapper">
          <span class="levelSlideMissionTitle">
            <span>生日禮金</span>
            <!-- <span>{{ t("message.MonthlyGift") }}</span> -->
            <!-- <IconTips3 /> -->
          </span>
          <span class="levelSlideMissionContent">
            {{ props.msg.m_money.birth_money }}
          </span>
        </div>
      </div>

      <div class="levelSlideMission">
        <van-image
          class="levelSlideMissionImage"
          :src="MissionImage_4"
        />
        <div class="levelSlideMissionContentWrapper">
          <span class="levelSlideMissionTitle">
            <span>電子返水</span>
            <!-- <span>{{ t("message.FreeWithdrawal") }}</span> -->
            <!-- <IconTips3 /> -->
          </span>
          <span class="levelSlideMissionContent">
            <!-- {{ t("message.word-first") }} <p>3</p> {{ t("message.TimesFree") }} -->
              {{ props.msg.m_money.ele_free }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.levelSystemSlide {
  margin-right: .21333rem;
  border-radius: .21333rem;
  background: var(--bg-range-light);
  padding: .32rem .21333rem .21333rem .21333rem;
}

.levelSlideHead {
  display: flex;
}

.levelSlideImage {
  width: 2.0608rem;
  height: 1.22667rem;
  margin-left: .24rem;
  margin-right: .32rem;
}

.levelSlideHeadInfo {
  display: flex;
  flex-direction: column;
  font-size: .4rem;
  line-height: .50667rem;
  font-weight: 700;
  justify-content: center;
}

.levelSlideHeadFromTo {
  color: var(--gold-text);
  line-height: .5067rem;
  font-weight: 700;
}

.levelSlideMissions {
  display: flex;
  flex-direction: column;
  gap: .21333rem;
  margin-top: .32rem;
}

.levelSlideMission {
  background: var(--bg-lighter-color2);
  border-radius: .16rem;
  padding: .26667rem .21333rem;
  display: flex;
  align-items: center;
  gap: .26667rem;
}

.levelSlideMissionImage {
  width: 1.227rem;
  height: 1.227rem;
}

.levelSlideMissionContentWrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.levelSlideMissionTitle {
  display: flex;
  align-items: center;
  gap: .1067rem;
  font-weight: 550;
}

.levelSlideMissionContent {
  margin-top: .10667rem;
  margin-bottom: .05333rem;
  color: var(--font-color);
  font-size: .32rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: capitalize;

  p {
    display: inline;
    color: var(--gold-text);
  }
}
</style>