<script setup>
import { reactive, inject, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const common = inject("common");

const userData = reactive({
  id: computed(() => {
    return common.user.id;
  }),

  name: computed(() => {
    return common.user.name;
  }),

  data: computed(() => {
    return common.user
  }),

  betmoney: "",
  rechargeMoney: "",
})

if (common.user.betmoney == null) {
  userData.betmoney = t("message.NoData");
} else {
  userData.betmoney = common.user.betmoney;
}

const state = reactive({
  swiper: {
    el: null,
    isBeginning: true,
    isEnd: false,
  },
});

const walletData = reactive({
  wallet: {}
})

async function getWallet() {
  let res;
  try {
    res = await common.baseAjax("POST", "/user/wallet")
    if (res.code == 1) {
      walletData.wallet = res.data
    } else if (res.code == 4) {
      common.loading = true
      walletData.wallet = {};
      common.toRouter("/")
      common.loading = false;
      common.alert("fail", res.msg).then(() => {
        // common.toRouter("/")
      })
    }
  } catch (error) {
    console.log(error)
  } finally {

  }
}

getWallet();

const onSlideChange = (swiper) => {
  state.swiper.isBeginning = swiper.isBeginning;
  state.swiper.isEnd = swiper.isEnd;
};

onMounted(() => {
  state.swiper.el = document.querySelector(".list-cards");
});

</script>


<template>
  <div class="info-wrapper">
    <span
      class="closeBtn"
      @click="common.toRouter('/')"
    >&times;</span>
    <div class="user-data-box">
      <img src="../assets/img/info-rank-0.svg" />
      <div class="user-info">
        <div><b>暱稱:</b><span>{{ userData.name }}</span></div>
        <div><b>邀請碼:</b><span>{{ userData.data.invite }}</span></div>
        <div><b>{{ t("message.Last3MonthsDeposits") }}:</b>
          {{ userData.betmoney == null ? t("message.NoData") : userData.betmoney
          }}</div>
        <div><b>{{ t("message.Last3MonthsBettingVolume") }}:</b><span>0</span></div>

      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.info-wrapper {
  margin: .5rem 0;
  padding: 0 .5rem;
  display: flex;
  flex-direction: column;
}

.closeBtn {
  margin-left: 94%;
  font-size: 25px;
}

.user-data-box {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: .5rem;
  padding: .5rem;
  background-color: rgba(45, 45, 52);
  border-radius: 8px;

  img {
    max-width: 2rem;
  }

  .user-info {
    div {
      margin-bottom: 5px;
      font-size: initial;
    }
    span {
      margin-left: .2rem;
    }
  }
}

// @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

// .my-3 {
//     margin-top: 1rem !important;
//     margin-bottom: 1rem !important
// }

// .mx-auto {
//     margin-right: auto !important;
//     margin-left: auto !important
// }

// .container-lg {

// }

.max-100vw-1005 {
  max-width: min(1005px + 1.875rem, 100vw);
}

.bg-secondary-subtle {
  background-color: #1a2c38 !important;
}

.max-25vw {
  max-width: 25vw;
}

.text-primary-bold {
  font-weight: 600;
  color: white;
}

.img-logo-vip {
  background-image: url("../assets/img/logos/_logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

}

.w-40 {
  width: 40%;
}

@media (min-width: 1200px) {
  .w-xl-40 {
    width: 40%;
  }
}

</style>
