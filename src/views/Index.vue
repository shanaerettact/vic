<script setup>
import { reactive, inject, watch, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import Header from "../components/Header.vue";
import Footer from "@/components/Footer.vue";
import GameCategory from "../components/GameCategory.vue";
import IndexGameList from "../components/IndexGameList.vue";
import Rank from "../components/Rank.vue";
import NewGames from "@/components/Blocks/NewGames.vue";
import BulletinModal from "../components/BulletinModal.vue";


const modules = [Autoplay, Pagination];

const common = inject("common");

const state = reactive({
  banner: [],
  group: [],
  game: [],
  hall: [],
  activePage: "IndexGameList",
  gameCode: "",
});

const BULLETIN_NO_SHOW = "bulletin_no_show_date";
function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function getCookie(name) {
  const v = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return v ? v.pop() : "";
}

const homeInit = async () => {
  try {
    if (getCookie(BULLETIN_NO_SHOW) !== getTodayStr()) {
      common.showActive = true;
    }
    const res = await common.baseAjax("POST", "/site/home");
    if (res.code == 1) {
      state.banner = res.data.banner;
      state.group = res.data.group;
      state.hall = res.data.hall;
    }
  } catch (error) {
    console.log(error);
  }
};


homeInit();


</script>

<template>
  <div>
    <BulletinModal />

    <Header />

    <main>
      <div class="content">

        
        <div class="banner">
          <swiper
            :modules="modules"
            :pagination="{ clickable: true }"
            :autoplay="{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
          >
            <swiper-slide
              v-for="(item, index) in state.banner"
              :key="index"
            >
              <a
                :href="item.url"
                :target="item.blank == '2' ? '_blank' : '_self'"
              >
                <img
                  class="img-banner"
                  :src="common.baseUrl + item.img"
                />
              </a>
            </swiper-slide>
          </swiper>
        </div>

        
        <div v-if="common.activePage == 'IndexGameList'">
          <NewGames />
          <IndexGameList />
        </div>

        
        <div v-if="common.activePage == 'GameCategory'">
          <GameCategory :gameCode="common.gameCode" />
        </div>

        <div v-if="common.rankActive">
          <!-- <Rank />  -->
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
main {
  padding: 0.32rem 0.26667rem 0.53333rem;
  background-color: var(--bg-color);
}

:deep(.swiper) {
  position: relative;
  width: 100%;
  height: 100%;
}

:deep(.banner .swiper .swiper-wrapper) {
  height: 100%;
}

:deep(.banner .swiper .swiper-wrapper .swiper-slide) {
  width: 100%;
  overflow: hidden;
}

:deep(.banner .swiper .swiper-wrapper .swiper-slide .img-banner) {
  width: calc(100% - 0.02667rem);
  height: 100%;
}

:deep(.banner .swiper .swiper-pagination) {
  margin-bottom: 0.08rem;
}

:deep(.banner .swiper .swiper-pagination-bullets) {
  bottom: 0.10667rem !important;
}

:deep(.banner .swiper .swiper-pagination-bullet) {
  width: 0.34667rem;
  height: 0.16rem;
  border-radius: 0.50667rem;
  background: var(--swiper-pagination-bullet);
  opacity: 1;
  position: relative;
}

:deep(.banner .swiper .swiper-pagination-bullet-active) {
  width: 1.22667rem;
  height: 0.16rem;
  border-radius: 0.50667rem;
  background: var(--swiper-pagination-bullet);
}

:deep(.banner .swiper .swiper-pagination-bullet-active::before) {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 0.50667rem;
  background: var(--success-color);
  animation: move 6s linear;
}

@keyframes move {
  0% {
    width: 0;
  }

  to {
    width: 100%;
  }
}

:deep(.banner .swiper .swiper-wrapper .swiper-pre) {
  width: 0.34667rem;
  height: 0.16rem;
  border-radius: 0.50667rem;
  background: var(--success-color);
}

.img-banner {
  border-radius: .2133rem;
}

</style>
