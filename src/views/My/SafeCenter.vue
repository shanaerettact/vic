<script setup>
import { inject, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconTemplate from '@/components/Icons/IconTemplate.vue';

const common = inject("common")
const { t, locale } = useI18n()

const state = reactive({
  email: computed(() => common.user.email)
})

const isLogin = async () => {
  let loginCheck = await common.userInit();
  if (!loginCheck) {
    common.toRouter("/login")
    common.alert("fail", t("message.Not-login"))
  }
}

isLogin();

const verifyText = {
  1: "未審核",
  2: "待審核",
  3: "已驗證",
  4: "未通過",
}


</script>


<template>
  <div class="settingbar-wrapper">
    <div class="main">
      <HeaderCross :text="t('message.PersonalSettings')" />
      <div class="top">
        <div class="content-head">
          {{ t("message.PersonalSettings") }}
        </div>
        <div class="content">
          <div class="icon-line">
            <IconTemplate
              :iconWidth="'24px'"
              :iconHeight="'24px'"
              :iconClass="'icon-id-card'"
            />
            <!-- <IconTemplate
              :iconWidth="'20px'"
              :iconHeight="'20px'"
              :iconClass="'icon-finished'"
            /> -->
          </div>
          <div class="title">{{ t("message.IdentyVerification") }}</div>
          <div class="description">{{ t("message.IdentyVerification-advice") }}
          </div>
          <div
            class="update-gray-box"
            @click="common.toRouter('/safeCenter/identityVerify')"
          >
            <span>{{ t("message.VerifyNow") }}</span>
          </div>
          <p
            style="height: 1px; background-color: rgb(46, 49, 52); margin-top: 19px;">
          </p>
        </div>

        <div class="content">
          <div class="icon-line">
            <IconTemplate
              :iconWidth="'26px'"
              :iconHeight="'26px'"
              :iconClass="'icon-lock'"
            />
            <!-- <IconTemplate
              :iconWidth="'20px'"
              :iconHeight="'20px'"
              :iconClass="'icon-finished'"
            /> -->
          </div>
          <div class="title">{{ t("message.LoginPassword") }}</div>
          <div class="description">{{ t("message.LoginPassword-advice") }}</div>
          <div
            class="update-gray-box"
            @click="common.toRouter('/safeCenter/modLoginPwd')"
          >
            <span>{{ t("message.ChangePassword") }}</span>
          </div>
          <p
            style="height: 1px; background-color: rgb(46, 49, 52); margin-top: 19px;">
          </p>
        </div>

        <!-- <div class="content">
          <div class="icon-line">
            <IconTemplate
              :iconWidth="'26px'"
              :iconHeight="'26px'"
              :iconClass="'icon-lock'"
            />
            <IconTemplate
              :iconWidth="'20px'"
              :iconHeight="'20px'"
              :iconClass="'icon-not-finish'"
            />
          </div>
          <div class="title">資金密碼</div>
          <div class="description"> 為了安全起見，請建立您的資金密碼。 </div>
          <div class="update-box">
            <span>設定密碼</span>
          </div>
          <p
            style="height: 1px; background-color: rgb(46, 49, 52); margin-top: 19px;">
          </p>
        </div> -->

        <div class="content">
          <div class="icon-line">
            <IconTemplate
              :iconWidth="'26px'"
              :iconHeight="'26px'"
              :iconClass="'icon-email'"
            />
            <!-- <IconTemplate
              :iconWidth="'20px'"
              :iconHeight="'20px'"
              :iconClass="'icon-finished'"
            /> -->
          </div>
          <div class="title">{{ t("message.reg-EmailAddress") }}</div>
          <div
            v-if="common.user.verify == 3"
            class="description"
          >
            {{ t("message.Email-notice") }}
          </div>
          <div class="input-box">
            <span v-if="common.user.verify == 3">{{ state.email }}</span>
            <v-else>
              <span class="input-box"> </span>
            </v-else>
            <div class="right">
              <!-- 打勾圖示, 用不到先拿掉 -->
              <IconTemplate
                v-if="common.user.verify == 3"
                :iconWidth="'20px'"
                :iconHeight="'20px'"
                :iconClass="'icon-small-finished'"
              />
              <p>{{ verifyText[common.user.verify] }}</p>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>


<style lang="scss" scoped>
.settingbar-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}


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


.main {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  flex: 1;

  .top {
    margin: .373rem .32rem .32rem .32rem;
    padding: 0 .293rem 0 .3467rem;
    background: var(--bg-light-color);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-glow);
    border-radius: .21333rem;
    transition: all 0.3s ease;
  }

  .content-head {
    color: var(--font-color);
    font-size: .3733rem;
    font-weight: 650;
    margin-top: .2667rem;
    margin-bottom: .24rem;
    position: relative;
  }

  .content-head:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -.24rem;
    width: 100%;
    height: .0267rem;
    background-color: var(--bg-other);
  }

  .top .content {
    display: flex;
    flex-direction: column;
    color: var(--font-color);

    .icon-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .6667rem;
    }

    .title {
      margin-top: .32rem;
      font-size: .42667rem;
      font-weight: 650;
    }

    .description {
      margin-top: .32rem;
      font-size: .33rem;
      font-weight: 400;
    }

    .update-gray-box {
      flex-shrink: 0;
      margin-top: .37333rem;
      border-radius: .13333rem;
      background: var(--bg-color);
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      flex-direction: row;
      -webkit-flex-direction: row;
      flex-wrap: nowrap;
      -webkit-flex-wrap: nowrap;

      span {
        padding: .34667rem 0;
        color: var(--font-dark-color);
        text-align: center;
        // font-family: PingFang SC;
        font-size: .42667rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
      }
    }

    .input-box {
      display: flex;
      justify-content: space-between;
      margin-top: .56rem;
      border-radius: .13333rem;
      margin-bottom: .45333rem;
      background: var(--bg-color);

      span {
        color: var(--font-dark-color);
        font-size: .37333rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: .2933rem 0 .3733rem .3467rem;
      }

      .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: .2933rem;
      }

      p {
        color: var(--theme-color);
        text-align: center;
        font-size: .3rem;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        letter-spacing: .0059rem;
      }
    }
  }

}
</style>
