<script setup>
import { ref, reactive, inject, onMounted, onUnmounted } from "vue";


const common = inject("common");

const state = reactive({
  banner: [],
  group: [],
  game: [],
  hall: [],
});

const homeInit = async () => {
  try {
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

const randomNumber = () => {
  // return Math.floor(Math.random() * 900) + 1000;
  return Math.floor(Math.random() * 1200 ) + 100;
};

homeInit();

const isDragging = ref(false);
let dragState = { startX: 0, scrollLeft: 0, moved: false, el: null };

const onMouseDown = (e) => {
  const el = e.currentTarget;
  isDragging.value = true;
  dragState = { startX: e.pageX, scrollLeft: el.scrollLeft, moved: false, el };
  el.style.cursor = "grabbing";
};
const onMouseMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const dx = e.pageX - dragState.startX;
  if (Math.abs(dx) > 3) dragState.moved = true;
  dragState.el.scrollLeft = dragState.scrollLeft - dx;
};
const onMouseUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  if (dragState.el) dragState.el.style.cursor = "grab";
};
const onClickCapture = (e) => {
  if (dragState.moved) {
    e.stopPropagation();
    e.preventDefault();
    dragState.moved = false;
  }
};

onMounted(() => {
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});
onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
});
</script>

<template>
  <div class="indexGameList-wrapper">
    <main>
      <div class="games">
        <div
          v-for="(item, index) in state.group"
          :key="index"
          class="games-items"
        >
          <div class="games-items-top">
            <div class="games-items-title">
              <span>{{ item.title }}</span>
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
                    <span class="games-item-cd">{{ gameItem.sub_title }}</span>
                  </div>
                  <van-image :src="gameItem.image" />
                </div>
                <div class="online">
                  <img
                    style="width: 9px; height: 10px;"
                    src="data:image/webp;base64,UklGRqQBAABXRUJQVlA4WAoAAAAQAAAAGQAAHQAAQUxQSI0AAAABcFBba958EiIBCZMQCXXQOGgdrA5SB5mDSoiESogEJHz7BU5nICImAH+ea2uLROTBr9U38feZHKIGVkejOdnUtpqE9naR5NhN6LZsK6YB58Og4sH+Q2/wl05St4RYSbhyXtrRfx51Mkind9y/zcrAIwEQxh4ARhBnFEYP9DBmjVsZv2ncvIWppDNICwAAVlA4IPAAAACQCACdASoaAB4APi0Sh0KhoQ3+qgAMAWJbACdMtB7X4B+IH4q84Zs32Awen2q3YD9dP6r1gN4A/gHqAeCB8Av6wftn7UIJSuTI2F9lAAD++fEDfLG7W/rcTg9GuT+PobkixJh+lAxdTcsjjwMUqe5p+1DcS9tHHJiE5qNI7d87i0Kh//82wLKrixeNkZuO+/zjpjUXVoKVfZtP8eZ2rpm+z5Ebz3Pismf4LdC7L/UKvRG4P17DqOu9Re9VN8Kwwz1T3nGqdaHMfv8xc0sZ1IXm5E5oK5uezgIHz7pff/j22ACMhLlohJgEuN/7AYAAAAA="
                  />
                  <div class="online-number">{{ randomNumber() }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<style lang="scss" scoped>

.games {
  margin-top: 0.37333rem;

  &-items {
    position: relative;
    margin-top: 0.4rem;
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
      gap: 0.16rem;
    }
  }

  &-item {
    position: relative;
    width: 2.93333rem;
    min-width: 2.93333rem;
    flex-shrink: 0;
    min-height: 4.16rem;
    overflow: visible;
    border-radius: 0.26667rem;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    // 毛玻璃卡片效果
    &::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 0.32rem;
      background: linear-gradient(135deg, rgba(240, 205, 79, 0.2) 0%, transparent 50%, rgba(174, 230, 248, 0.1) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }
    
    &:hover {
      transform: translateY(-6px) scale(1.02);
      
      &::before {
        opacity: 1;
      }
      
      .games-item-item {
        box-shadow: 
          0 12px 40px rgba(0, 0, 0, 0.4),
          0 0 30px rgba(240, 205, 79, 0.15);
      }
    }
    
    &:active {
      transform: translateY(-2px) scale(1.01);
    }

    &-item {
      display: block;
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--glass-border);
      overflow: hidden;
      position: relative;
      border-radius: 0.26667rem;
      box-shadow: var(--card-glow);
      transition: all 0.35s ease;

      // z-index: 0;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.7));
        border-radius: 0.26667rem;
        z-index: 0;
      }
      
      // 微光閃爍效果
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.12),
          transparent
        );
        z-index: 2;
        animation: cardShimmer 4s infinite;
        animation-delay: calc(var(--card-index, 0) * 0.3s);
      }
    }

    &:not(:last-child) {
      margin-right: 0;
    }

    .van-image {
      border-radius: 0.26667rem;
      overflow: hidden;
    }
  }
}

@keyframes cardShimmer {
  0% {
    left: -100%;
  }
  20%, 100% {
    left: 100%;
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

  .online {
    margin-top: .08rem;
    margin-left: .08rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    .online-number {
      margin-left: .1067rem;
      color: var(--font-color);
      text-align: center;
      font-size: .32rem;
      font-style: normal;
      font-weight: 700;
    }
  }

}
</style>
