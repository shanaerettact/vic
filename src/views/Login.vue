<script setup>
import { reactive, inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import { google_img } from "@/components/Images/base64";
import { telegram_img } from "@/components/Images/base64";

const common = inject("common");

const { t, locale } = useI18n();

const state = reactive({
  captchaSrc: `${common.baseUrl}/site/captcha?${Date.now()}`,
  passwordVisible: false,
  form: {
    account: "",
    password: "",
    captcha: "",
  },
  title: computed(() => {
    return localStorage.getItem("site_title");
  }),
});

if (Object.keys(common.user).length > 0) {
  common.loading = true
  common.alert("fail", t("message.YouAreLogin"))
  setTimeout(() => {
    common.toRouter("/")
    common.loading = false
  }, 2000)
}


const changeCaptcha = () => {
  state.captchaSrc = `${common.baseUrl}/site/captcha?${Date.now()}`;
};

const submitLogin = async () => {
  if (!state.form.account || !state.form.password || !state.form.captcha) {
    common.alert("fail", common.$t("message.ThereAreStillItemsUnfilled"));
    return false;
  }
  common.loading = true;
  try {
    let form = {
      LoginForm: {
        account: state.form.account,
        password: state.form.password,
        captcha: state.form.captcha,
      },
    };
    const res = await common.baseAjax("POST", "/site/login", form);
    if (res.code == 1) {
      common.alert("", res.msg);
      let lang = localStorage.getItem("lang")
      if (!lang) { 
        locale.value = res.data.language;
        localStorage.setItem("lang", locale.value)
      }
      common.toRouter("/");
      common.userInit();
      common.menuInit();
      common.homeInit();
    } else if (res.code == 4) {
      common.alert("fail", t("message.YouAreLogin"))
      setTimeout(() => {
        common.toRouter("/")
        window.location.reload();
      }, 1000);
    } else {
      common.alert("fail", res.msg);
      changeCaptcha();
      common.loading = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const thirdLogin = async (val) => { 
  if (val == 'telegram') {
    window.location.href = `/social/${val}`
    return; 
  }
  try {
    common.loading = true;
    let res = await common.baseAjax("GET", `/social/${val}`)
    if (res.data) {
      window.location.href = res.data.url
    } else {
      common.loading = false;
      common.alert("fail", res.msg);
    }
  } catch (error) {
    console.log(error);
    common.loading = false;
    common.alert("fail", "unexpected error")
  } finally { }
}

</script>

<template>
  <div class="login">
    <div class="login-header">
      <div class="login-header-box">
        <div class="login-header-top">
          <van-icon
            name="cross"
            class="closeBtn"
            @click="common.toBack()"
          />
        </div>
        <div class="login-header-bottom">
          <img
            src="../assets/img/vic_logo.png"
            class="w-20"
          />
        </div>
      </div>
    </div>
    <div class="login-main">
      <div class="login-form">
        <van-form autocomplete="off">
          <p>{{ t("message.Login") }}</p>
          <van-field
            v-model="state.form.account"
            :placeholder="t('message.login-Account')"
          />
          <van-field
            v-model="state.form.password"
            :type="state.passwordVisible ? 'text' : 'password'"
            :placeholder="t('message.login-Password')"
            right-icon="eye-o"
            @click-right-icon="state.passwordVisible = !state.passwordVisible"
          />
          <van-field
            v-model="state.form.captcha"
            :placeholder="t('message.login-VerifyCode')"
          >
            <template #button>
              <van-image
                :src="state.captchaSrc"
                @click="changeCaptcha"
              />
            </template>
          </van-field>
          <div
            class="base-button login-form-button"
            @click="submitLogin"
          >
            {{ t("message.Signin") }}
          </div>
          <div class="login-form-register">
            {{ t("message.NoAccountYet") }}
            <div @click="common.toRouter('/register')">{{
              t("message.reg-CreateAnAccount")
            }}</div>
          </div>
        </van-form>
      </div>

      <!-- <div class="login-method">
        <van-divider>{{ t("message.LoginWith") }}</van-divider>
        <div class="login-method-item">
          <van-image
            src="data:image/webp;base64,UklGRh4DAABXRUJQVlA4WAoAAAAQAAAAfQAAfQAAQUxQSAkCAAABkFXbdthGF4IY9EEQg4hBzCBmEDNQGXgYaBgYgiAIwoMgCPcjklvLT9+NiAnAZ0jKyZa0oCuZU1Zp+MpJVw9AKlnjA5P1iWQVQEkVTFiUzFhICqYslQyJTJh0JFMh/awCqSQxbTb/7uXX/VAlSS15f/uZuHeu/HE9XjKHkCt/OwX7Qual+rJNMi9PYthWOeJmlfvPQZMzSQqHLWKQKAdWZ0/h0MWcfxx8N2bh8MEWHU9NWXnDlyXaS6mjUckStaFRyRyb2smGeHYPYG95OFIg9cPDU9F2HQY7Yi8BsfUFkADWD0CYO74X7chXIJ5ZVFXZP+zQS5BPrDyvdvAapz0fY4za4wzkG/C10/RzYQDWc6tBekkVoLOoqrJf7DguYXG9leezHe9TIcYY9RRTz8cYo/bedoRTzeUct07T9cQO5E5xrY0vBPKJ7w8GbKzSkk6GIWuHVZsklaeVZNUmuy9LUDoDF5gSxhNbsI8WYQzyWDvMcWWkA/bAlXGKswjYRzkcbMJWh9gx7nCQNECEYYDPF9UHbAMk1QuywDwAz6S/tGPw2wCQZzz0J/rAPJrbud1hNtAT+sANDYkOM2I7C+55O9/QB+56u4Vkjbjv7QJzdJjX7f+MpWSYlSdLIuOsEpkCWWVOQvKJTKrMSJRUQCrJ5GcTvitZBYCvnHT1+BSdUxZ0n6nMRtMDnwBWUDgg7gAAABAMAJ0BKn4AfgA+LRKHQqGhDToADAFiWlu4MAAZakgRquLM6foLz46mOczixO+zcBszPEA4lKSqld9180ohGxOIEhSCibyERRvd36iZjij6WRn7ZgkA40ibd1RujQ6VwpjnNCKmOzvkAAD+qXP/9q4//alX//av//Nx9/QnyWoNmO+L6b83TnOMfSeRo6yckvle6eptXH50oo501PWHtyhiMp5bgdLHatle1///50zJ+KOGZq778gAA6f//87lAG53TUdCI+bHJi1IjkCRMVrs1AqNBFnXUxMcRaP/MgC/v4Q710A1kiufGS/joAAA="
            lazy-load
            @click="thirdLogin('line')"
          />
          <van-image
            :src="google_img"
            lazy-load
            @click="thirdLogin('google')"
          />
          <van-image
            :src="telegram_img"
            lazy-load
            @click="thirdLogin('telegram')"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #202327;
  background: var(--bg-color);

  &-header {
    height: 3.667rem;

    &-box {
      padding: 0.13333rem 0.53333rem 0;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      flex-wrap: nowrap;
    }

    &-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      .closeBtn {
        margin-left: 94%;
        font-size: 25px;
        top: 20px;
      }
    }

    &-bottom {
      text-align: center;
      align-self: center;

      b {
        color: var(--theme-color);
      }

      // span {
      //   font-size: 0.32rem;
      //   color: #9ba6b3;
      // }
    }
  }

  &-main {
    display: flex;
    flex-direction: column;
    height: calc(100% - 5.86667rem);
    position: relative;
    margin-top: -0.8rem;
  }

  &-form {
    flex: 1;
    padding: 0 0.53333rem;

    p {
      font-size: 0.48rem;
      font-weight: 900;
      text-align: left;
      margin-top: 0.178rem;
      text-align: center;
    }

    &-button {
      height: 1.01333rem;
      margin: 0.26667rem 0 0.26667rem;
      font-size: 0.37333rem;
      font-weight: 800;
      color: var(--primary-btn-font-color);
    }

    &-register {
      color: var(--font-dark-color);
      font-size: 0.37333rem;
      font-style: normal;
      font-weight: 650;
      line-height: normal;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      div {
        margin-left: 0.13333rem;
        color: var(--theme-color);
        font-size: 0.42667rem;
      }
    }
  }

  &-method {
    padding: 0 0.53333rem 0.8rem;

    &-item {
      display: flex;
      justify-content: center;
      gap: .8rem;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      .van-image {
        width: 1.0667rem;
        height: 1.0667rem;
      }
    }
  }


  :deep(.van-field) {
    padding: 0.32rem 0.53333rem;
    margin-bottom: 0.26667rem;
    border-radius: 6px;
    background: var(--bg-other);
    overflow: visible;
    margin-bottom: 0.4rem !important;

    input[type=password] {
      font-size: .5rem;

      &::placeholder {
        font-size: 14px;
      }

      // 舊版相容性
      &::-webkit-input-placeholder {
        font-size: 14px;
      }

      &::-ms-input-placeholder {
        font-size: 14px;
      }
    }

    &:after {
      content: initial;
    }

    &.error {
      border: 0.02667rem solid var(--error-color) !important;
    }

    img {
      width: 2.1667rem;
    }

    ::placeholder {
      color: var(--font-dark-color);
      opacity: 0.7;
    }
  }

  :deep(.van-field__button) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .van-divider {
    margin: 0.13333rem 0;
    padding: 0;
    font-size: 0.32rem;
    border-color: rgb(86, 95, 112);
    color: var(--font-secondary-color);
  }
}
</style>
