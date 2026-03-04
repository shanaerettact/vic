<script setup>
import { inject, reactive } from "vue";
import { useI18n } from "vue-i18n";
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconCopyGray from "@/components/Icons/icon-copy-gray.vue"
import { showToast } from "vant";
import successIcon from "@/assets/img/success_01.webp"
import IconShareIm1 from "@/components/Icons/icon-share-im1.vue";
import IconShareIm6 from "@/components/Icons/icon-share-im6.vue";
import IconBrokerage from "@/components/Icons/icon-brokerage.vue";
import IconUsdt from "@/components/Icons/icon-usdt.vue";


const common = inject("common");
const { t, locale } = useI18n();

const state = reactive({
  optionActive: 1,
  league: {},
  url: "",
  code: "",
  team: {},
  rebate: "",
})

const league = async () => {
  common.loading = true;
  try {
    let res = await common.baseAjax("GET", "/user/league");
    common.loading = false
    if (res.code == 1) {
      state.league = res.data
      state.url = state.league.invite.url
      state.code = state.league.invite.code
      state.team = state.league.team
      state.rebate = state.league.rebate
    } else if (res.code == 4) {
      common.user = {};
      common.loading = false;
      common.alert("fail", res.msg)
      common.toRouter("/login")
    } else {
      common.loading = false
      common.alert("fail", res.msg)
      common.toRouter("/")
    }
  } catch (error) {
    console.log(error)
    common.alert("fail", error)
    common.toRouter("/")
  } finally { }
}

league();

const copyAddress = async (val) => {
  try {
    if (val == "url") {
      await navigator.clipboard.writeText(state.league.invite.url);
      showToast({
        message: t("message.Copied"),
        icon: successIcon,
      })
    }
    if (val == "code") {
      await navigator.clipboard.writeText(state.league.invite.code)
      showToast({
        message: t("message.Copied"),
        icon: successIcon,
      })
    }
  } catch (error) {
    console.log(error)
    common.alert("fail", t("message.CopyFailed"))
  } finally { }
}

</script>


<template>
  <div class="inviteFriends-wrapper">
    <HeaderCross :text="t('message.InviteFriends')" />
    <div class="main safe-area-bottom">
      <div class="content">
        <div class="invite-friend-card">
          <div class="card-info-box">
            <div class="head">
              <!-- <div class="head-left">
                <div class="usdt-box">
                  <span
                    @click="state.optionActive = 1"
                    :class="state.optionActive == 1 ? 'active' : ''"
                  >{{ common.primeCoinName }}</span>
                  <span>TRX</span>
                </div>
              </div> -->
            </div>
            <div class="card-info-cell">
              <p>{{ t("message.ReferralLink") }}</p>
              <div
                class="copy-value-cell"
                style="background: var(--bg-range-light); margin: 11px 0 px 17px;"
              >
                <p style="font-size: 12px;">
                  <!-- {{ state.league.invite.url ? "hello" : "" }} -->
                  {{ state.url }}
                </p>
                <div
                  class="copy"
                  style="background: var(--bg-switch-btn-lighter); color: rgb(255, 255, 255);"
                  @click="copyAddress('url')"
                >
                  <IconCopyGray />
                </div>
              </div>
            </div>
            <div class="card-info-cell">
              <p>{{ t("message.ReferralCode") }}</p>
              <div
                class="copy-value-cell"
                style="background: var(--bg-range-light); margin: 11px 0px 17px;"
              >
                <p style="font-size: 12px;">{{ state.code }}</p>
                <div
                  class="copy"
                  style="background: var(--bg-switch-btn-lighter); color: rgb(255, 255, 255);"
                  @click="copyAddress('code')"
                >
                  <IconCopyGray />
                </div>
              </div>
            </div>

            <!-- 此區塊沒用到，先隱藏 -->
            <!-- <div class="share card-info-cell">
              <p>分享透過</p>
              <div class="share-obj">
                <span>
                  <IconShareIm1 />
                </span>
                <span>
                  <IconShareIm6 />
                </span>
              </div>
            </div> -->

            <div class="table-data">
              <div class="data-cell">
                <div>
                  <p>{{ state.team.today }}</p>
                  <span>{{ t("message.NewDirectSubordinates") }}</span>
                </div>
                <div>
                  <p>{{ state.team.child }}</p>
                  <span>{{ t("message.DirectSubordinates") }}</span>
                </div>
              </div>

              <div class="data-cell">
                <div>
                  <p>{{ state.team.today_all }}</p>
                  <span>{{ t("message.NewTeamMember") }}</span>
                </div>
                <div>
                  <p>{{ state.team.child_all }}</p>
                  <span>{{ t("message.TotalTeamMember") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="invite-friend-card1">
          <div class="card-info-box">
            <div class="card-info-cell">
              <div class="name">
                <p>
                  <IconBrokerage />{{ t("message.CommissionRewards") }}
                </p>
              </div>
              <div class="info">
                <div
                  style="display: flex; align-items: center; padding-left: 10px;"
                >
                  <IconUsdt /><b class="fs20">{{ state.rebate }}</b>
                </div>
                <!-- <span class="receive">領取</span> -->
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.inviteFriends-wrapper {
  height: 100%; // 多這一層 my-wrapper，手動新增高度
}

// 
::v-deep(.van-nav-bar) {
  background: var(--bg-color);
}

:deep(.van-nav-bar__content) {
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 1.22667rem;
}

:deep(.van-nav-bar__title) {
  color: var(--font-color) !important;
  font-weight: 650;
  font-size: .42667rem !important;
  max-width: 60%;
  margin: 0 auto;
}

:deep(.van-hairline--bottom):after {
  border-bottom-width: 0px;
}

.safe-area-bottom {
  padding-bottom: calc(1.5008rem + env(safe-area-inset-bottom));
}

.main {
  position: relative;
  flex: 1;
  background: var(--bg-light-color);

  .content {
    padding: .267rem .32rem;

    .invite-friend-card {
      position: relative;
      margin-bottom: .37333rem;
      border-radius: .08rem;
      background: var(--bg-range-dark);
      overflow: hidden;

      .card-info-box {
        padding: .24rem .2933rem .24rem;
      }

      .head {
        margin-bottom: .32rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .head-left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .usdt-box {
        display: flex;
        width: 3.73333rem;
        height: 1.06667rem;
        border-radius: .08rem;
        background: var(--bg-switch-btn-dark);
        margin-right: .69333rem;
      }

      .usdt-box span {
        font-family: Geogrotesque-Md;
        padding-left: .10667rem;
        font-size: .37333rem;
        color: var(font-dark-color);
        width: 1.86667rem;
        height: 1.06667rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .usdt-box .active {
        font-weight: 700;
        color: var(--font-color);
        border-radius: .08rem;
        background: var(--bg-switch-btn-light);
      }

      .card-info-box {
        .card-info-cell {
          margin-bottom: .48rem;
        }

        .card-info-cell p {
          font-size: .33rem;
          margin-bottom: .29333rem;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          flex-wrap: nowrap;
        }


        .card-info-cell .share-obj span {
          display: inline-block;
        }

        .card-info-cell .share-obj span:not(:last-child) {
          margin-right: .533rem;
        }

        .table-data {
          border-radius: .08rem;
          background: var(--bg-range-light)
          
        }

        .table-data .data-cell {
          position: relative;
          display: flex;
          min-height: 1.73333rem;
          gap: .13333rem;
        }

        .table-data .data-cell:not(:last-child):after {
          content: "";
          width: 94%;
          height: .02667rem;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%);
          background: var(--other-color);
        }


        .table-data .data-cell div {
          flex: 1;
          padding: .13333rem 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          flex-wrap: nowrap;

          &:first-child {
            padding-left: .8rem;
          }

          p {
            font-size: .533rem;
          }

          span {
            flex: 1;
            color: var(--font-darker-color)
          }
        }


        .table-data .data-cell:last-child p {
          color: var(--gold-text);
        }
      }
    }

    .fs20 {
      font-size: .5333rem;
    }

    b {
      color: var(--gold-text);
    }
  }

  .content .invite-friend-card .card-info-box .copy-value-cell {
    height: 1.28rem;
    border-radius: .08rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    p {
      display: inline;
      padding: 0;
      padding-left: .13333rem;
      max-width: 76%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-wrap: break-word;
      margin: 0px;
    }

    .copy {
      width: 1.6rem;
      height: 100%;
      font-size: .32rem;
      border-radius: .08rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }



  .invite-friend-card1 {
    position: relative;
    margin-bottom: .37333rem;
    border-radius: .08rem;
    background: var(--bg-range-dark);
    overflow: hidden;


    .card-info-box {
      padding: .24rem .29333rem .24rem;

      .card-info-cell {
        margin-bottom: 0 !important;
      }

      .card-info-cell .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;

      }

      .card-info-cell p {
        font-size: .33rem;
        margin-bottom: .29333rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .card-info-cell p .za-svg-icon {
        margin-right: .133rem;
      }

      .card-info-cell .info {
        height: 1.06667rem;
        border-radius: .08rem;
        background: var(--bg-range-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;

        span {
          font-size: .32rem;
        }
      }

      .card-info-cell .info .receive {
        width: 1.6rem;
        height: 1.06667rem;
        border-radius: .08rem;
        background: var(--bg-switch-btn-light);
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .card-info-cell .info b {
        padding-left: .32rem;
      }
    }

  }
}
</style>