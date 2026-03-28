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
    <!-- Decorative top band -->
    <div class="login-topband">
      <div class="login-topband-inner">
        <span class="star-deco">&#10022;</span>
        <span class="band-label">WELCOME BACK</span>
        <span class="star-deco">&#10022;</span>
      </div>
    </div>

    <!-- Header -->
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
          <div class="logo-badge">
            <img
              src="../assets/img/vic_logo.png"
              class="logo-img"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Main content card -->
    <div class="login-main">
      <div class="login-card">
        <!-- Gold accent bar -->
        <div class="card-accent-bar"></div>

        <div class="login-form">
          <van-form autocomplete="off">
            <h2 class="form-title">{{ t("message.Login") }}</h2>
            <p class="form-subtitle">Enter your credentials to continue</p>

            <div class="field-group">
              <div class="field-label">{{ t('message.login-Account') }}</div>
              <van-field
                v-model="state.form.account"
                :placeholder="t('message.login-Account')"
                class="styled-field"
              />
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.login-Password') }}</div>
              <van-field
                v-model="state.form.password"
                :type="state.passwordVisible ? 'text' : 'password'"
                :placeholder="t('message.login-Password')"
                right-icon="eye-o"
                class="styled-field"
                @click-right-icon="state.passwordVisible = !state.passwordVisible"
              />
            </div>

            <div class="field-group captcha-group">
              <div class="field-label">{{ t('message.login-VerifyCode') }}</div>
              <van-field
                v-model="state.form.captcha"
                :placeholder="t('message.login-VerifyCode')"
                class="styled-field"
              >
                <template #button>
                  <van-image
                    :src="state.captchaSrc"
                    class="captcha-img"
                    @click="changeCaptcha"
                  />
                </template>
              </van-field>
            </div>

            <button
              class="login-btn shimmer"
              @click="submitLogin"
            >
              <span class="btn-text">{{ t("message.Signin") }}</span>
              <span class="btn-arrow">&#8594;</span>
            </button>

            <div class="login-divider">
              <span class="divider-line"></span>
              <span class="divider-icon">&#10022;</span>
              <span class="divider-line"></span>
            </div>

            <div class="login-form-register">
              <span class="reg-prompt">{{ t("message.NoAccountYet") }}</span>
              <span
                class="reg-link"
                @click="common.toRouter('/register')"
              >{{ t("message.reg-CreateAnAccount") }}</span>
            </div>
          </van-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: var(--bg-color);
  overflow-y: auto;

  // ── Decorative top band ──────────────────────────────────
  &-topband {
    width: 100%;
    background: linear-gradient(90deg, #4a3000 0%, #c9922a 30%, #f0cd4f 50%, #c9922a 70%, #4a3000 100%);
    padding: 0.14rem 0;
    text-align: center;

    &-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.32rem;
    }
  }

  .star-deco {
    color: #0a0a12;
    font-size: 0.28rem;
    opacity: 0.7;
  }

  .band-label {
    font-size: 0.24rem;
    font-weight: 900;
    letter-spacing: 0.12rem;
    color: #0a0a12;
    text-transform: uppercase;
  }

  // ── Header ───────────────────────────────────────────────
  &-header {
    height: 3.8rem;
    background: radial-gradient(ellipse at 50% 0%, rgba(240, 205, 79, 0.12) 0%, transparent 70%);

    &-box {
      padding: 0.2rem 0.53333rem 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &-top {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .closeBtn {
        font-size: 0.6rem;
        color: var(--font-dark-color);
        padding: 0.2rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: all 0.25s ease;

        &:active {
          background: rgba(240, 205, 79, 0.15);
          color: var(--theme-color);
        }
      }
    }

    &-bottom {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding-top: 0.2rem;
    }
  }

  .logo-badge {
    width: 2.13rem;
    height: 2.13rem;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, rgba(240, 205, 79, 0.18) 0%, rgba(10, 10, 18, 0.9) 100%);
    border: 2px solid rgba(240, 205, 79, 0.45);
    box-shadow:
      0 0 0 4px rgba(240, 205, 79, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-img {
    width: 1.4rem;
    height: auto;
  }

  // ── Main card ────────────────────────────────────────────
  &-main {
    flex: 1;
    padding: 0 0.4rem 1.6rem;
    margin-top: -0.4rem;
  }

  &-card {
    background: rgba(16, 14, 22, 0.92);
    border: 1px solid rgba(240, 205, 79, 0.2);
    border-radius: 0.32rem;
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  .card-accent-bar {
    height: 3px;
    background: linear-gradient(90deg, transparent 0%, #BF953F 15%, #FCF6BA 35%, #f0cd4f 50%, #FCF6BA 65%, #BF953F 85%, transparent 100%);
  }

  // ── Form ─────────────────────────────────────────────────
  &-form {
    padding: 0.53rem 0.64rem 0.64rem;
  }

  .form-title {
    font-size: 0.64rem;
    font-weight: 900;
    color: var(--font-color);
    text-align: center;
    letter-spacing: 0.04rem;
    margin-bottom: 0.12rem;
    background: linear-gradient(135deg, #fff 0%, #f0cd4f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .form-subtitle {
    font-size: 0.29rem;
    color: var(--font-darker-color);
    text-align: center;
    margin-bottom: 0.53rem;
    letter-spacing: 0.02rem;
  }

  .field-group {
    margin-bottom: 0.37rem;

    &.captcha-group {
      margin-bottom: 0.48rem;
    }
  }

  .field-label {
    font-size: 0.28rem;
    font-weight: 700;
    color: var(--font-dark-color);
    letter-spacing: 0.06rem;
    text-transform: uppercase;
    margin-bottom: 0.16rem;
    padding-left: 0.08rem;
  }

  // ── Submit button ────────────────────────────────────────
  .login-btn {
    width: 100%;
    height: 1.12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.24rem;
    border: none;
    border-radius: 0.16rem;
    background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
    box-shadow:
      0 4px 16px rgba(191, 149, 63, 0.4),
      0 0 0 1px rgba(240, 205, 79, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 0.42rem;

    &:active {
      transform: translateY(2px);
      box-shadow:
        0 2px 8px rgba(191, 149, 63, 0.35),
        0 0 0 1px rgba(240, 205, 79, 0.25);
    }

    .btn-text {
      font-size: 0.4rem;
      font-weight: 900;
      color: #0a0a12;
      letter-spacing: 0.08rem;
      text-transform: uppercase;
    }

    .btn-arrow {
      font-size: 0.45rem;
      color: #0a0a12;
      font-weight: 700;
    }
  }

  // ── Divider ──────────────────────────────────────────────
  .login-divider {
    display: flex;
    align-items: center;
    gap: 0.24rem;
    margin-bottom: 0.42rem;

    .divider-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(240, 205, 79, 0.25), transparent);
    }

    .divider-icon {
      color: var(--theme-color);
      font-size: 0.3rem;
      opacity: 0.6;
    }
  }

  // ── Register link ─────────────────────────────────────────
  &-form-register {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.16rem;
    flex-wrap: wrap;

    .reg-prompt {
      color: var(--font-darker-color);
      font-size: 0.32rem;
    }

    .reg-link {
      color: var(--theme-color);
      font-size: 0.35rem;
      font-weight: 800;
      cursor: pointer;
      border-bottom: 1px solid rgba(240, 205, 79, 0.4);
      padding-bottom: 1px;
      transition: color 0.2s ease, border-color 0.2s ease;

      &:active {
        color: #fff;
        border-color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  // ── Vant field overrides ─────────────────────────────────
  :deep(.van-field) {
    padding: 0.32rem 0.48rem;
    border-radius: 0.16rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &:focus-within {
      border-color: rgba(240, 205, 79, 0.5) !important;
      box-shadow: 0 0 0 3px rgba(240, 205, 79, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    &:after {
      content: initial;
    }

    &.error {
      border-color: var(--error-color) !important;
    }

    input {
      color: var(--font-color);
      font-size: 0.37rem;
    }

    input[type=password] {
      font-size: 0.5rem;

      &::placeholder {
        font-size: 0.32rem;
      }
    }

    ::placeholder {
      color: var(--font-darker-color);
      font-size: 0.32rem;
    }

    .van-field__right-icon {
      color: var(--font-dark-color);
    }

    img {
      width: 2.1667rem;
      border-radius: 0.08rem;
    }
  }

  :deep(.van-field__button) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// Shimmer animation
.shimmer {
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      105deg,
      transparent 20%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 80%
    );
    animation: shimmerMove 3s 1.5s infinite;
  }
}

@keyframes shimmerMove {
  0% { left: -60%; }
  100% { left: 140%; }
}
</style>
