<script setup>
import { inject, reactive, computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconArrowMore from '@/components/Icons/icon-arrow-more.vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css";
import "swiper/css/bundle";
// import { BannerLevel_1, BannerLevel_2 } from "@/components/Images/base64.js";
// import { BannerLevel_3, BannerLevel_4 } from "@/components/Images/base64.js";
// import { BannerLevel_5, BannerLevel_6 } from "@/components/Images/base64.js";
import BannerLevel_1 from "@/assets/img/LV-01.png";
import BannerLevel_2 from "@/assets/img/LV-02.png";
import BannerLevel_3 from "@/assets/img/LV-03.png";
import BannerLevel_4 from "@/assets/img/LV-04.png";
import BannerLevel_5 from "@/assets/img/LV-05.png";
import BannerLevel_6 from "@/assets/img/LV-06.png";
import LevelSystemItem from "@/components/Blocks/LevelSystemItem.vue";
import Footer from "@/components/Footer.vue";

const common = inject("common");
const { t, locale } = useI18n();

const state = reactive({
  user: computed(() => common.user),
  vip: computed(() => common.vip || { id: "1" }),  
  vips: computed(() => common.vips || [{ id: "1" }]),
  dama_limit: "",
})

setTimeout(() => {
  console.log(common.vips, "vips")
}, 2000);

const userInit = async () => { 
  await common.userInit()
  if (Object.keys(common.user).length < 1) {
    common.alert("fail", t("message.Not-login"))
    common.toRouter("/login")
  }
}

userInit();


watch(() => state.vips, () => {
  let nextLevel = state.vips.filter((item) => {    
    return item.id == (Number(state.vip.id) + 1 > state.vips.length ? Number(state.vip.id) : Number(state.vip.id) + 1)
  })
  state.dama_limit = nextLevel[0]?.dama_limit?.slice(0, -2) ?? ""
}, { immediate: true })

const progressPercentage = computed(() => {
  const current = Number(state.vip.dama_now) || 0;
  const limit = Number(state.vip.next_limit) || 0;
  if (limit <= 0) return 0;
  return Math.min(100, (current / limit) * 100);
})

const BannerImages = {
  "1": BannerLevel_1,
  "2": BannerLevel_2,
  "3": BannerLevel_3,
  "4": BannerLevel_4,
  "5": BannerLevel_5,
  "6": BannerLevel_6,
};

const bannerLevel_img = computed(() => {
  const id = String(state.vip?.id ?? "");
  return BannerImages[id] ?? null;
})

// const slideContent = [
//   { id: 1, HeadFromTo: "1", HeadFromToText: t("message.Bronze"), image: BannerLevel_1, m_money: "$0-$5" },
//   { id: 2, HeadFromTo: "2", HeadFromToText: t("message.Silver"), image: BannerLevel_2, m_money: "$10-$60" },
//   { id: 3, HeadFromTo: "3", HeadFromToText: t("message.Gold"), image: BannerLevel_3, m_money: "$80-$688" },
//   { id: 4, HeadFromTo: "4", HeadFromToText: t("message.Platinum"), image: BannerLevel_4, m_money: "$888-$2888" },
//   { id: 5, HeadFromTo: "5", HeadFromToText: t("message.Diamond"), image: BannerLevel_5, m_money: "$6888-$8888" },
//   { id: 6, HeadFromTo: "6", HeadFromToText: t("message.SpecialInvite"), image: BannerLevel_6, m_money: "$12888" },
// ]

var dataReady = false


const slideContent = []

const m_moneyList = [
  { "id": "1", "bonus":"0", "w_money": "588", "birth_money": "888", "ele_free": "0.6",},
  { "id": "2", "bonus":"1888", "w_money": "888", "birth_money": "1888", "ele_free": "0.7",},
  { "id": "3", "bonus":"5888", "w_money": "1688", "birth_money": "5888", "ele_free": "0.8",},
  { "id": "4", "bonus":"8888", "w_money": "2888", "birth_money": "8888", "ele_free": "0.9",},
  { "id": "5", "bonus":"10888", "w_money": "5888", "birth_money": "10888", "ele_free": "1.0",},
  { "id": "6", "bonus":"18888", "w_money": "8888", "birth_money": "88888", "ele_free": "1.2",},
]

common.vips.forEach((ele, index) => {
  let obj = {}
  obj.id = index + 1
  obj.HeadFromTo = index + 1
  obj.HeadFromToText = state.vips[index].title
  obj.image = BannerImages[ele.id]
  obj.m_money = m_moneyList[index]
  slideContent.push(obj) 
});


</script>


<template>
  <div class="vip-wrapper">
    <HeaderCross :text="t('message.VIPclub')" />
    <div class="vipContent">
      <div class="banner">
        <div>
          <div class="bannerContent">
            <div class="bannerColumn">
              <van-image
                :src="bannerLevel_img"
                class="levelImage"
              />
              <!-- 這邊存款先略過 -->
            </div>
            <div class="bannerColumn">
              <div class="levelTitleWrapper">
                <span class="levelTitle"> {{ state.vip.title }}</span>
                <span class="levelMore">{{ t("message.ViewUpgradeDetails") }}
                  <IconArrowMore />
                </span>
              </div>
            </div>
          </div>
          <div class="progressBar">
            <div class="levelProgressWrapper">
              <div class="flex justify-between mt-1">
                <p class="levelProgressTitle">{{ t("message.DepositMoney") }}</p>
                <p class="levelTargeTitle">目標金額</p>
              </div>
              <van-progress
                :percentage="progressPercentage"
                stroke-width="8"
                :show-pivot="false"
                color="#fec11a"
              />
              <div class="levelProgressNumbers">
                <span class="levelProgressNumber">$ {{ state.vip.dama_now }} </span>
                <span class="levelProgressNumber">$ {{ state.vip.next_limit }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="levelsSystem">
        <p class="levelsSystemTitle">{{ t("message.VipSystemLevel") }}</p>
        <div class="levelSystemSlider">
          <div class="swiper-container" v-if="slideContent.length > 1">
            <swiper
              :slides-per-view="1.5"
              v-if="state.vips.length > 1 || slideContent.length > 1 && dataReady"
            >
              <Swiper-Slide
                v-for="(item, index) in state.vips"
                :key="index"
              >
                <LevelSystemItem
                  :vip="item"
                  :msg="slideContent[index]"
                />
              </Swiper-Slide>
            </swiper>
          </div>
        </div>
      </div>

    </div>
    <Footer />

  </div>
</template>



<style lang="scss" scoped>
.vip-wrapper {
  height: 100%; 
}


.vipContent {
  padding: .2933rem .2667rem 0 .2667rem;
  box-sizing: border-box;
  background-color: var(--bg-color);
  overflow: hidden;
}

.banner {
  width: 100%;
  background: url(https://cdn360.w0zuv.live/images/vip-top-bg.fbb0bcf2.webp) no-repeat 50%;
  background-size: cover;
  border-radius: .32rem;

  .bannerContent {
    width: 100%;
    display: flex;
    gap: .69333rem;
    padding: .533rem .587rem .506rem .587rem;
    box-sizing: border-box;
  }

  .bannerColumn {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: .48rem;
  }

  .levelImage {
    width: 3.104rem;
    height: 1.847rem;
  }

  .levelTitleWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .levelTitle {
    color: var(--gold-text);
    font-size: .74667rem;
    line-height: .90667rem;
    font-weight: 700;
    margin-top: .21333rem;
  }

  .levelMore {
    font-size: .32rem;
    // line-height: .42667rem;
    font-weight: 650;
    margin-bottom: .32rem;
    display: flex;
    gap: .10667rem;
    align-items: center;
    color: var(--font-color-dark);
    font-family: PingFang SC;
    font-style: normal;
    line-height: normal;
    text-transform: capitalize;
    margin-right: .16rem;
  }

  .progressBar {
    width: 100%;
    border-radius: .13333rem;
    margin-top: .10667rem;
    background: var(--bg-light-color);
    padding: 0 .21333rem .26667rem;

    .levelProgressWrapper {
      display: flex;
      flex-direction: column;
      gap: .16rem;
    }

    .levelProgressTitle {
      font-size: 12px;
      line-height: .45333rem;
      color: var(--gold-text);
    }

    .levelTargeTitle {
      font-size: 12px;
    }

    .levelProgressNumbers {
      display: flex;
      justify-content: space-between;
      gap: .1067rem;
    }

    .levelProgressNumber:first-child {
      color: var(--gold-text);
    }

    .levelProgressNumber {
      font-size: .3733rem;
      font-weight: 650;
      color: var(--font-color);
    }

    .van-progress {
      width: 100%;
    }
  }
}

.levelsSystem {
  margin-top: .4267rem;

  .levelsSystemTitle {
    margin-bottom: .42667rem;
    color: var(--font-color);
    font-size: .42667rem;
    font-style: normal;
    font-weight: 650;
    line-height: normal;
    text-transform: uppercase;
  }

  .levelSystemSlider {
    position: relative;
    margin-right: -.42667rem;
  }

  .levelSystemSlider:after {
    z-index: 1;
    top: 0;
    right: 0;
    position: absolute;
    content: " ";
    width: 20%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--bg-color) 76%);
  }

}
</style>