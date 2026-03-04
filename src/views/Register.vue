<script setup>
import { reactive, inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import { google_img } from "@/components/Images/base64"
import { telegram_img } from "@/components/Images/base64";

const common = inject("common");

const { t, locale } = useI18n();

const state = reactive({
  captchaSrc: `${common.baseUrl}/site/captcha?${Date.now()}`,
  passwordVisible: false,
  passwordCheckVisible: false,
  cookieInvite: false,
  form: {
    account: "",
    password: "",
    password_check: "",
    field1: "", 
    name: "",
    phone: "",
    invite: "",
    captcha: "",
  },
  check_age: false,
  title: computed(() => {
    return localStorage.getItem("site_title");
  }),
});



if (document.cookie.includes("invite")) {
  state.cookieInvite = true
  let value = document.cookie.split(";")
  console.log(value, "value")
  let a = "";
  if (value.length > 0) {
    value.forEach((e, i) => {
      if (e.includes("invite")) a = value[i]
    });
  }
  value = a.split("=")
  const inviteVal = (value[1] || "").trim();
  common.invite = inviteVal;
  state.invite = inviteVal;
  state.form.invite = inviteVal;
}


const changeCaptcha = () => {
  state.captchaSrc = `${common.baseUrl}/site/captcha?${Date.now()}`;
};

const submitRegister = async () => {
  if (
    !state.form.account ||
    !state.form.password ||
    !state.form.name ||
    !state.form.phone ||
    !state.form.captcha
  ) {
    common.alert("fail", common.$t("message.ThereAreStillItemsUnfilled"));
    return false;
  }
  if (!state.check_age) {
    common.alert("fail", common.$t("message.AgreeToUserAgreementCheck"));
    return false
  }

  common.loading = true;
  try {
    let form = {
      RegisterForm: {
        account: state.form.account,
        password: state.form.password,
        password_check: state.form.password_check,
        field1: state.form.field1,
        name: state.form.name,
        phone: state.form.phone,
        invite: state.form.invite,
        captcha: state.form.captcha,
      },
    };

    const res = await common.baseAjax("POST", "/site/register", form);
    if (res.code == 1) {
      common.alert("", res.msg);
      common.userInit();
      common.toRouter("/");
    } else {
      common.alert("fail", res.msg);
      changeCaptcha();
    }
    common.loading = false;
  } catch (error) {
    console.log(error);
    common.alert("fail", error);
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
        <van-form>
          <p>{{ t("message.Register") }}</p>
          <van-field
            v-model="state.form.account"
            :placeholder="t('message.reg-Account')"
          />
          <van-field
            v-model="state.form.password"
            :type="state.passwordVisible ? 'text' : 'password'"
            :placeholder="t('message.reg-Password')"
            right-icon="eye-o"
            @click-right-icon="state.passwordVisible = !state.passwordVisible"
          />
          <van-field
            v-model="state.form.password_check"
            :type="state.passwordCheckVisible ? 'text' : 'password'"
            :placeholder="t('message.reg-PasswordCheck')"
            right-icon="eye-o"
            @click-right-icon="state.passwordCheckVisible = !state.passwordCheckVisible"
          />
          <van-field
            v-model="state.form.name"
            :placeholder="t('message.reg-NickName')"
          />
          <van-field
            v-model="state.form.phone"
            :placeholder="t('message.reg-Mobile')"
          />
          <van-field
            v-model="state.form.field1"
            :placeholder="t('message.reg-LineId')"
          />
          <van-field
            v-model="state.form.invite"
            :placeholder="t('message.reg-InvitationCode')"
            :disabled="state.cookieInvite"
          />
          <van-field
            v-model="state.form.captcha"
            :placeholder="t('message.reg-VerificationCode')"
          >
            <template #button>
              <van-image
                :src="state.captchaSrc"
                @click="changeCaptcha"
              />
            </template>
          </van-field>
          <div class="check-age-area">
            <input
              type="checkbox"
              for="check-age"
              v-model="state.check_age"
            >
            <span id="check-age">
              <i18n-t
                keypath="message.AgreeToUserAgreement"
                tag="span"
              >
                <template #agreement>
                  <span class="agreement-link">
                    {{ t("message.UserAgreement") }}
                  </span>
                </template>
              </i18n-t>
            </span>
          </div>
          <div
            class="base-button login-form-button"
            @click="submitRegister"
          >
            {{ t("message.reg-Register") }}
          </div>
          <div class="login-form-register">
            {{ t("message.AlreadyHaveAccount") }}
            <div @click="common.toRouter('/login')">{{ t("message.Login") }}
            </div>
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
  background: var(--bg-color);

  &-header {
    height: 3.667rem;
    // background: url("../assets/img/vic_login_bg.png") center 0px / 100% 100% no-repeat;

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
      text-align: center;
      font-size: 0.48rem;
      font-weight: 900;
      margin-top: 0.178rem;
    }

    &-button {
      height: 1.0133rem;
      margin: 0.7667rem 0 0.2667rem;
      font-size: 0.37333rem;
      font-weight: 800;
      color: var(--bg-range-dark);
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
      margin-bottom: 0.5556rem;

      div {
        margin-left: 0.13333rem;
        color: var(--theme-color);
        font-size: 0.42667rem;
      }
    }
  }

  .check-age-area {
    width: 100%;
    text-align: center;

    input[type=checkbox] {
      accent-color: var(--theme-color);
      transform: scale(1.3)
    }

    .agreement-link {
      color: var(--theme-color);
      font-weight: 700;
    }

    #check-age {
      margin-left: .35rem;
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
    border: 0.02667rem solid var(--bg-color) !important;

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
      border: 0.02667rem solid var(--warning-color-dark) !important;
    }

    img {
      width: 2.1667rem;
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
    color: rgb(151, 166, 180);
  }
}
</style>
