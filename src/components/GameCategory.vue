<script setup>
import { reactive, inject, watch, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const common = inject("common");


const props = defineProps({
  gameCode: {
    type: String,
    default: "live_game", 
  },
});

const state = reactive({
  rank: 1,
  gameData: {},
  gameGroupData: {},
  idCodeMap: {},
  makeCodeMap: () => { 
    for (let i = 0; i < common.menu.length; i++) {
      state.idCodeMap[common.menu[i].code] = common.menu[i].id  // ex:live_game: 1
    }
  },
  gameInit: async () => {
    try {
      if (common.menu.length == 0) { 
        await common.menuInit();
      }

      state.makeCodeMap();
      const fetchGameData = async () => {
        let form = { id: state.idCodeMap[props.gameCode] }
        const res = await common.baseAjax("POST", "/site/game-by-group", form);
        if (res.code == 1) {
          state.gameGroupData = res.data.group;
          state.gameData = res.data.list;
        }
      };
      await fetchGameData(); 
    } catch (error) {
      console.log(error);
    }
  },
});

// watch(() => route.query.gameType, (newVal) => {
//   gameType.value = newVal;
//   state.gameInit();
// })


if (Object.keys(state.gameGroupData).length == 0) { 
  state.gameInit();
}

watch(() => props.gameCode, (newVal) => {
  state.gameInit();
});

const randomNumber = () => {
  return Math.floor(Math.random() * 900) + 1000
}

const isDragging = ref(false)
let dragState = { startX: 0, scrollLeft: 0, moved: false, el: null }

const onMouseDown = (e) => {
  const el = e.currentTarget
  isDragging.value = true
  dragState = { startX: e.pageX, scrollLeft: el.scrollLeft, moved: false, el }
  el.style.cursor = 'grabbing'
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const dx = e.pageX - dragState.startX
  if (Math.abs(dx) > 3) dragState.moved = true
  dragState.el.scrollLeft = dragState.scrollLeft - dx
}

const onMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  if (dragState.el) dragState.el.style.cursor = 'grab'
}

const onClickCapture = (e) => {
  if (dragState.moved) {
    e.stopPropagation()
    e.preventDefault()
    dragState.moved = false
  }
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})

</script>

<template>
  <div class="gamelist-wrapper">
    <div class="games">
      <div
        v-for="(item, index) in state.gameData"
        :key="index"
        class="games-items"
      >
        <div class="games-items-top">
          <div class="games-items-title">
            <span>{{ item.title }}</span>
          </div>
          <div class="games-items-online">
            <van-image
              width="18"
              height="18"
              src="data:image/webp;base64,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"
            />
            <div class="number">
              {{ randomNumber() }}
              <span>在玩</span>
            </div>
          </div>
        </div>

        <div
          class="games-items-bottom"
          @mousedown="onMouseDown"
          @click.capture="onClickCapture"
        >
          <div class="games-items-group">
            <div
              v-for="(gameItem, gameIndex) in item.game"
              :key="gameIndex"
              class="games-item"
              @click="common.toGame(gameItem.code, gameItem.url)"
            >
              <div class="games-item-item">
                <div class="games-item-text">
                  <div>{{ gameItem.title }}</div>
                  <span class="games-item-cd">{{ gameItem.code }}</span>
                </div>
                <van-image :src="gameItem.image">
                  <template #loading>
                    <div class="game-skeleton">
                      <div class="game-skeleton__shine"></div>
                      <div class="game-skeleton__icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16.5C21 17.33 20.33 18 19.5 18h-15C3.67 18 3 17.33 3 16.5v-9C3 6.67 3.67 6 4.5 6h15c.83 0 1.5.67 1.5 1.5v9z" stroke="currentColor" stroke-width="1.5"/>
                          <path d="M3 9h18M7 13h1m3 0h1m3 0h1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                      </div>
                      <div class="game-skeleton__bars">
                        <div class="game-skeleton__bar" style="width: 60%"></div>
                        <div class="game-skeleton__bar" style="width: 40%"></div>
                      </div>
                    </div>
                  </template>
                </van-image>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.gamelist-wrapper {
  margin-top: .5rem;
  overflow: auto;
  padding-bottom: 5em;
}


.games {

  &-items {
    position: relative;
    margin-top: 0.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;

    &-top {
      width: 100%;
      margin-bottom: 0.26667rem;
      justify-content: space-between;
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }

    &-title {
      margin-top: .4rem;
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      font-size: 0.48rem;
      font-weight: 400;
      justify-content: center;

      span {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.48rem;
        margin-left: 0.08rem;
      }
    }

    &-online {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 24%;
      justify-content: space-between;

      .number {
        font-size: .32rem;
        font-weight: 700;
      }

      span {
        margin-left: 0.08rem;
        color: var(--font-dark-color);
        font-weight: 650;
      }
    }

    &-bottom {
      position: relative;
      width: 100%;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      cursor: grab;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }

    &-group {
      width: max-content;
      min-width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }

  &-item {
    position: relative;
    width: 2.93333rem;
    min-width: 2.93333rem;
    flex-shrink: 0;
    min-height: 4.16rem;
    overflow: hidden;

    &-item {
      display: block;
      background: transparent;
      overflow: hidden;
      position: relative;
      // z-index: 0;
    }

    &:not(:last-child) {
      margin-right: 0.13333rem;
    }

    .van-image {
      border-radius: 0.2133rem;
      overflow: hidden;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(transparent 60%, #000);
      border-radius: .2133rem;
      z-index: 0;
    }
  }

  &-item-text {
    position: absolute;
    left: 0;
    right: 0;
    bottom: .2rem;
    text-align: center;
    line-height: 1;
    z-index: 1;
  }

  &-item-cd {
    font-size: .3rem;
  }
}

// 骨架屏樣式
.game-skeleton {
  width: 2.93333rem;
  height: 4.16rem;
  border-radius: 0.21333rem;
  background: linear-gradient(
    135deg,
    rgba(44, 27, 62, 0.9) 0%,
    rgba(58, 38, 80, 0.9) 50%,
    rgba(44, 27, 62, 0.9) 100%
  );
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.32rem;

  &__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(240, 205, 79, 0.12) 50%,
      rgba(255, 255, 255, 0.06) 55%,
      transparent 70%
    );
    animation: skeletonScan 1.8s ease-in-out infinite;
  }

  &__icon {
    width: 1.06667rem;
    height: 1.06667rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(240, 205, 79, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: skeletonPulse 1.8s ease-in-out infinite;

    svg {
      width: 0.56rem;
      height: 0.56rem;
      color: rgba(240, 205, 79, 0.35);
    }
  }

  &__bars {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.16rem;
    width: 80%;
  }

  &__bar {
    height: 0.21333rem;
    border-radius: 0.10667rem;
    background: rgba(255, 255, 255, 0.08);
    animation: skeletonPulse 1.8s ease-in-out infinite;
    margin: 0 auto;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }
  }
}

@keyframes skeletonScan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

@keyframes skeletonPulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
