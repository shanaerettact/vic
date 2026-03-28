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
    <!-- Decorative top band -->
    <div class="login-topband">
      <div class="login-topband-inner">
        <span class="star-deco">&#10022;</span>
        <span class="band-label">CREATE ACCOUNT</span>
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
          <van-form>
            <h2 class="form-title">{{ t("message.Register") }}</h2>
            <p class="form-subtitle">Join us and start playing today</p>

            <!-- Section: Account -->
            <div class="section-label">
              <span class="section-pip"></span>
              Account Info
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.reg-Account') }}</div>
              <van-field
                v-model="state.form.account"
                :placeholder="t('message.reg-Account')"
                class="styled-field"
              />
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.reg-Password') }}</div>
              <van-field
                v-model="state.form.password"
                :type="state.passwordVisible ? 'text' : 'password'"
                :placeholder="t('message.reg-Password')"
                right-icon="eye-o"
                class="styled-field"
                @click-right-icon="state.passwordVisible = !state.passwordVisible"
              />
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.reg-PasswordCheck') }}</div>
              <van-field
                v-model="state.form.password_check"
                :type="state.passwordCheckVisible ? 'text' : 'password'"
                :placeholder="t('message.reg-PasswordCheck')"
                right-icon="eye-o"
                class="styled-field"
                @click-right-icon="state.passwordCheckVisible = !state.passwordCheckVisible"
              />
            </div>

            <!-- Section: Personal -->
            <div class="section-label">
              <span class="section-pip"></span>
              Personal Details
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.reg-NickName') }}</div>
              <van-field
                v-model="state.form.name"
                :placeholder="t('message.reg-NickName')"
                class="styled-field"
              />
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.reg-Mobile') }}</div>
              <van-field
                v-model="state.form.phone"
                :placeholder="t('message.reg-Mobile')"
                class="styled-field"
              />
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.reg-LineId') }}</div>
              <van-field
                v-model="state.form.field1"
                :placeholder="t('message.reg-LineId')"
                class="styled-field"
              />
            </div>

            <!-- Section: Optional -->
            <div class="section-label">
              <span class="section-pip"></span>
              Optional
            </div>

            <div class="field-group">
              <div class="field-label">{{ t('message.reg-InvitationCode') }}</div>
              <van-field
                v-model="state.form.invite"
                :placeholder="t('message.reg-InvitationCode')"
                class="styled-field"
                :disabled="state.cookieInvite"
              />
            </div>

            <div class="field-group captcha-group">
              <div class="field-label">{{ t('message.reg-VerificationCode') }}</div>
              <van-field
                v-model="state.form.captcha"
                :placeholder="t('message.reg-VerificationCode')"
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

            <!-- Agreement -->
            <div class="check-age-area">
              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  v-model="state.check_age"
                />
                <span class="checkbox-box">
                  <span
                    v-if="state.check_age"
                    class="checkbox-tick"
                  >&#10003;</span>
                </span>
                <span class="checkbox-text">
                  <i18n-t
                    keypath="message.AgreeToUserAgreement"
                    tag="span"
                  >
                    <template #agreement>
                      <span class="agreement-link">{{ t("message.UserAgreement") }}</span>
                    </template>
                  </i18n-t>
                </span>
              </label>
            </div>

            <!-- Submit -->
            <button
              class="login-btn shimmer"
              @click="submitRegister"
            >
              <span class="btn-text">{{ t("message.reg-Register") }}</span>
              <span class="btn-arrow">&#8594;</span>
            </button>

            <!-- Login link -->
            <div class="login-divider">
              <span class="divider-line"></span>
              <span class="divider-icon">&#10022;</span>
              <span class="divider-line"></span>
            </div>

            <div class="login-form-register">
              <span class="reg-prompt">{{ t("message.AlreadyHaveAccount") }}</span>
              <span
                class="reg-link"
                @click="common.toRouter('/login')"
              >{{ t("message.Login") }}</span>
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
    height: 3.4rem;
    background: radial-gradient(ellipse at 50% 0%, rgba(240, 205, 79, 0.1) 0%, transparent 70%);

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
      padding-top: 0.16rem;
    }
  }

  .logo-badge {
    width: 1.86rem;
    height: 1.86rem;
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
    width: 1.2rem;
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
    margin-bottom: 0.48rem;
    letter-spacing: 0.02rem;
  }

  // ── Section labels ───────────────────────────────────────
  .section-label {
    display: flex;
    align-items: center;
    gap: 0.16rem;
    font-size: 0.27rem;
    font-weight: 800;
    letter-spacing: 0.08rem;
    text-transform: uppercase;
    color: var(--theme-color);
    opacity: 0.75;
    margin-bottom: 0.32rem;
    margin-top: 0.1rem;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(240, 205, 79, 0.3), transparent);
    }
  }

  .section-pip {
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    background: var(--theme-color);
    flex-shrink: 0;
  }

  .field-group {
    margin-bottom: 0.32rem;

    &.captcha-group {
      margin-bottom: 0.48rem;
    }
  }

  .field-label {
    font-size: 0.27rem;
    font-weight: 700;
    color: var(--font-dark-color);
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    margin-bottom: 0.14rem;
    padding-left: 0.08rem;
  }

  // ── Custom checkbox ──────────────────────────────────────
  .check-age-area {
    margin-bottom: 0.48rem;
  }

  .custom-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 0.24rem;
    cursor: pointer;

    input[type=checkbox] {
      display: none;
    }

    .checkbox-box {
      width: 0.48rem;
      height: 0.48rem;
      flex-shrink: 0;
      border-radius: 0.08rem;
      border: 2px solid rgba(240, 205, 79, 0.5);
      background: rgba(240, 205, 79, 0.06);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.04rem;
      transition: all 0.2s ease;
    }

    .checkbox-tick {
      color: var(--theme-color);
      font-size: 0.3rem;
      line-height: 1;
    }

    .checkbox-text {
      font-size: 0.3rem;
      color: var(--font-dark-color);
      line-height: 1.5;
    }

    .agreement-link {
      color: var(--theme-color);
      font-weight: 700;
    }
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

  // ── Login link ─────────────────────────────────────────────
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

  :deep(.van-field--disabled) {
    opacity: 0.5;
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
