<script setup>
import { reactive, ref, inject, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconTemplate from "@/components/Icons/IconTemplate.vue"

const common = inject("common")
const { t, locale } = useI18n();


// 活動列表 API, 由於 API 現在還沒有內容, 先預寫擱著 (暫時用不到)
// const ActiveInit = async () => {
//   try {
//     common.loading = true
//     const res = await common.baseAjax("POST", "/site/activity")
//     if (res.code == 1) {
//       // .. do some thing
//     } else {
//       common.alert("fail", res.msg)
//     }
//   } catch (error) {
//     console.log(error)
//   }
//   common.loading = false
// }

// 公告 API (bulletin) 
const BulletInit = async () => {
  try {
    common.loading = true
    const res = await common.baseAjax("POST", "/site/bulletin")
    if (res.code == 1) {
      state.bulletContents = res.data.bulletin
      state.bulletContents.forEach(item => {
        state.showInfoSpread[item.id] = false
      })
    } else {
      common.alert("fail", res.msg)
    }
  } catch (error) {
    console.log(error)
  }
  common.loading = false
}




// 先用假的活動()
const bulletin = [    // 公告列表 /site/bulletin -> 改成 /site/activity
  {
    id: "1",
    contents: {
      id: "1",
      title: "第一個公告標題",
      content1: "第一個公告內容1",
      content2: "第一個公告內容2",
      content3: "第一個公告內容3",
    },
    images: [
      {
        id: "1",
        img: "https://testfront.vic999.vip/file/banner/1748917382731.png",
      },
    ],
    category: ["打碼", "充值"]      // 暫定分類(沒有 API)
  },
  {
    id: "2",
    contents: {
      id: "2",
      title: "第二個公告標題",
      content1: "第二個公告內容1",
      content2: "第二個公告內容2",
      content3: "第二個公告內容3",
    },
    images: [
      {
        id: "2",
        img: "https://testfront.vic999.vip/file/banner/1748917393236.png",
      }
    ],
    category: ["充值"]    // 暫定分類(沒有 API)
  },
  // {
  //   id: "3",
  //   contents: {
  //     id: "3",
  //     title: "第三個公告標題",
  //     content1: "第三個公告內容1",
  //     content2: "第三個公告內容2",
  //     content3: "第三個公告內容3",
  //   },
  //   images: [
  //     {
  //       id: "3",
  //       img: "https://testfront.vic999.vip/file/banner/1748917399857.png",
  //     }
  //   ],
  //   category: ["體育"]    // 暫定分類(API 沒有)
  // },
]




const state = reactive({
  bulletContents: [],          // 公告內容
  activeView: {},
  category: ["全部 ", "賭場", "體育"],
  //category2: computed(() => {       // 篩選出分類
  //  let bul = state.allBulletin
  //  let res = []
  //  bul.forEach((ele) => ele.category.forEach((item) => res.push(item)))
  //  let unique = res.filter((ele, index) => res.indexOf(ele) == index)
  //  return unique
  //}),
  //activeCategory: "",   // 當前分類
  showInfoSpread: {},   // 顯示展開 個別內容 true or false

})


// showInfoSpread 改由 BulletInit 取得 API 後依 bulletContents 初始化

state.allBulletin = bulletin     // 模擬 call API 將資料放到 state
// state.allBulletin = mockBulletin

const getView = (val) => {    // 顯示展開or彈窗+指派詳情內容
  state.showInfoSpread = {
    ...state.showInfoSpread,
    [val]: !state.showInfoSpread[val]
  }
}

onMounted(() => {
  BulletInit()
})
</script>

<template>
  <div class="list-box safe-area-bottom">

    <!-- 分類選項先不用，先拿掉 -->
    <!-- <div class="tab-box">
      <van-tabs
        v-model:active="state.activeCategory"
        :ellipsis="false"
        @change="selectCat"
      >
        <van-tab
          v-for="(item, index) in state.category"
          :key="index"
          :name="item"
        >
          <template #title>
            <span>{{ item }}</span>
          </template>
</van-tab>
</van-tabs>
</div> -->

    <div class="category-list">
      <div
        class="category-item"
        v-for="(item, index) in state.bulletContents"
        :key="item.id"
      >
        <div class="progressive">
          <!-- 公告圖片預覽, 先取消 -->
          <!-- <img
            v-for="(ListItem, ListIndex) in item.images"
            class="preview"
            :src="ListItem.img"
          /> -->
        </div>
        <div class="category-bottom">
          <div class="first-line">
            
            <div class="flag-box">
              <div
                class="flag"
                v-for="(ListItem, ListIndex) in item.category"
                :key="ListIndex"
              >{{ ListItem }}</div>
              <!-- <div class="flag">體育</div> -->
            </div>
          </div>
          <div class="middle-line-wrap">
            <div class="middle-line title-color flex flex-col gap-1"
              v-for="(content, cIdx) in item.contents"
              :key="content.id || cIdx"
            >
              <div class="text-[aqua] text-[12px]">
                截止時間: {{ item.end_time }}
              </div>
              <div class="text-[18px]">
                {{ content.title }}
              </div>
              <div class="text-[14px]">
                {{ content.subtitle }}
              </div>
              <div
                v-for="(it, Key, Idx) in item.images"
                :key="it.id || Key"
              >
                <img :src="it.img" />
              </div>
            </div>
          </div>
          <div class="last-line" @click="getView(item.id)">
            <span>{{ state.showInfoSpread[item.id] ? '詳情收合' : '詳情展開' }}</span>
            <span
              class="expand-arrow"
              :class="{ 'expand-arrow--open': state.showInfoSpread[item.id] }"
            >
              <svg class="h-[22px] w-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11H8V13H12V16L16 12L12 8V11Z"></path></svg>
            </span>
          </div>



          <!-- 詳情展開, activityView 是假資料 -->
          <div
            class="slide-wrapper"
            :class="{ 'slide-wrapper--open': state.showInfoSpread[item.id] }"
          >
            <div class="betRebate infoWrapper">
            <div class="rContent">
              <div class="intro"
                v-for="(content, cIdx) in item.contents"
                :key="content.id || cIdx"
              >
                <div class="acTitle">
                  {{ content.title }}
                </div>
                <div class="limit">
                  <div>開始時間: {{ item.start_time }}</div>
                  <div>結束時間: {{ item.end_time }}</div>
                </div>
                <div class="bonus">
                </div>
                <div class="acContents">
                  <div class="content" v-html="content.content1">
                  </div>
                  <div class="content" v-html="content.content2">
                  </div>
                  <div class="content" v-html="content.content3">
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- 展開結束 -->
        </div>
      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped>
// :deep(.van-nav-bar__title) {
//   color: #fff !important;
//   font-weight: 650;
//   font-size: .42667rem !important;
//   max-width: 60%;
//   margin: 0 auto;
// }

.list-box {
  flex: 1;
}

.safe-area-bottom {
  /* CSS本身提供的環境變數， 
    支援有「瀏海」或「圓角」螢幕（如 iPhone X 以上）而設計，以取得底部安全區域的高度。 */
  padding-bottom: calc(1.50rem + env(safe-area-inset-bottom));
}

.tab-box {
  margin: .2667rem .2667rem 0;
  padding: .16rem;
  padding-bottom: 0;
  border-radius: .16rem;
  background-color: var(--bg-light-color);

  :deep(.van-tabs__nav--line) {
    background-color: var(--bg-light-color);
    // height: .96rem;
    overflow: hidden;
    padding: 0;
  }

  .van-tab {
    height: .96rem;
    width: 33.33%;
    flex: none;
    border-radius: .16rem;
  }

  :deep(.van-tab) {
    height: .96rem;
    font-size: .4rem;
    color: var(--font-primary-color);
  }

  :deep(.van-tab--active) {
    font-weight: 500;
    background: var(--theme-color);
    color: var(--primary-btn-font-color) !important;
    border-radius: .16rem;
  }



}

.list-box .category-list {
  margin-top: .2667rem;
  padding: 0 .2667rem;
  box-sizing: border-box;

  .category-item {
    margin-bottom: .3733rem;
    width: 100%;
    flex-shrink: 0;
    border-radius: .2667rem;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;

    .progressive {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: .2667rem;
      display: block;
      overflow: hidden;
    }

    .progressive .preview {
      width: 100%;
      height: 100%;
      filter: none;
      transform: scale(1)
    }

    .progressive img {
      width: 100%;
      height: 100%
    }

    .category-bottom {
      padding: .16rem;
      border-radius: .2667rem;
      background-color: var(--bg-light-color);
    }

    .first-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }

    .first-line .finish-time {
      color: var(--font-primary-color);
      text-align: center;
      font-size: .3733rem;
      font-weight: 500;
      line-height: 114%;
      text-transform: capitalize;
    }

    .first-line .flag-box {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    .first-line .flag {
      margin-right: .1067rem;
      color: var(--font-color);
      text-align: center;
      font-size: .32rem;
      font-weight: 500;
      line-height: .56rem;
      border-radius: 2.667rem;
      background: var(--gold-color-dark);
      align-content: center;
      width: 1.44rem;
      height: .56rem;
      flex-shrink: 0;
    }

    .middle-line {
      margin-top: .1867rem;
      color: var(--font-color);
      font-size: .4267rem;
      font-weight: 650;
      line-height: 114%;
      text-transform: capitalize;
    }

    .last-line {
      margin-top: .1867rem;
      color: var(--theme-color);
      text-align: start;
      font-weight: 500;
      line-height: 114%;
      text-transform: capitalize;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: .16rem;

      .expand-arrow {
        display: inline-flex;
        transition: transform 0.2s ease;
        &.expand-arrow--open {
          transform: rotate(90deg);
        }
      }
    }
  }
}

.progressive img.preview {
  filter: blur(2vw);
  transform: scale(1.05);
}

.progressive img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border: 0 none;
}

.van-popup {
  background: transparent;

  @media screen and (min-width: 600px) {
    max-width: 11rem;
    left: 50%;
    transform: translateX(-50%);
    transition: transform 1.3s;
  }
}


.slide-wrapper {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.25s ease;
  &.slide-wrapper--open {
    max-height: 1200px;
    opacity: 1;
  }
}

.infoWrapper {
  width: 100%;
  // height: calc(100% - 1.44rem);
  height: 100%;
  border-radius: .4rem .4rem 0 0;
  background: var(--bg-light-color);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 1s;

  .close {
    position: absolute;
    top: .48rem;
    right: .4rem;
    z-index: 15;
  }

  .rContent {
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    text-align: center;
    align-items: center;
    position: relative;

    .imgTitleBg {
      width: 100%;
      height: 5rem;
    }

    .intro {
      width: 100%;
      padding: .25rem;
      text-align: left;
      padding-bottom: 1rem;
    }

    .intro .bonus {
      margin-top: .4rem;
    }

    .intro .acTitle {
      font-size: .5rem;
      font-weight: 500;
      margin-bottom: .2rem;
    }

    .intro .acContents {
      margin-top: .4rem;

      .content {
        color: var(--font-dark-color)
      }
    }

    .gift {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: .6rem;

      div {
        width: 3rem;
      }
    }
  }

}
</style>