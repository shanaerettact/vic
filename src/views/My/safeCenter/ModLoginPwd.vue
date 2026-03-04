<script setup>
import { inject, reactive, computed, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconTemplate from '@/components/Icons/IconTemplate.vue';
import { h } from 'vue'

const common = inject("common")
const { t, locale } = useI18n()

const isLogin = (async () => { 
  let loginCheck = await common.userInit();
  if (!loginCheck) {
    common.alert("fail", t("message.Not-login"))
    common.toRouter("/")
  }
})()


const icon_pwd_eyes_hide = () => h(
  IconTemplate,
  {
    iconWidth: '20px',
    iconHeight: '20px',
    iconClass: 'icon-pwd-eyes-hide'
  })

const icon_pwd_eyes_show = () => h(
  IconTemplate,
  {
    iconWidth: '20px',
    iconHeight: '20px',
    iconClass: 'icon-pwd-eyes-show'
  }
)



const old_pwd = ref('') 
const old_pwdFocused = ref(false)  
const old_pwd_checkFalse = ref(false)  
const new_pwd = ref('')
const new_pwdFocused = ref(false)
const pwd_check = ref('')
const pwd_checkFocused = ref(false)
const pwd_checkFalse = ref(false)

const old_pwd_hide = ref(true)  
const pwd_hide = ref(true)  
const pwd_check_hide = ref(true)

const old_pwd_style = () => { 
  old_pwdFocused.value = false;
  if (old_pwd.value) {
    old_pwd_checkFalse.value = false;
  }else{
    old_pwd_checkFalse.value = true;
  }
}


const pwd_check_style = () => { 
  pwd_checkFocused.value = false;
  if (new_pwd.value !== pwd_check.value) {
    pwd_checkFalse.value = true
  } else {
    pwd_checkFalse.value = false
  }
}

const canSubmit = ref(false)  

const beforeSubmit = () => { 
  if (old_pwd.value && pwd_check.value
    && new_pwd.value == pwd_check.value 
  ) {
    canSubmit.value = true
  } else {
    canSubmit.value = false
  }
}


const onSubmit = async () => { 
  let form = {
    PasswordForm: {
      old: old_pwd.value,
      new1: new_pwd.value,
      new2: pwd_check.value,
    }
  }
  if (!canSubmit.value) {
    return false
  }

  if (form.PasswordForm.old && pwd_check.value 
  && form.PasswordForm.new1 == form.PasswordForm.new2) {
    try {
      common.loading = true
      let res = await common.baseAjax("POST", "/user/password", form)
      if (res.code == 1) {
        common.loading = false
        common.alert("", res.msg)
        common.toRouter("/")
      } else {
        common.loading = false
        if (res.code == 4) {
          common.user == {}
          common.toRouter('/')
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        common.alert("fial", res.msg)
        return false
      }
    } catch (error) {
      console.log(error)
    } finally { }
  } else {
  }
};

</script>


<template>
  <div class="modloginpwd-wrapper">
    <div class="main">
      <HeaderCross :text="t('message.ChangeLoginPassword')" />
      <div class="content">

        <van-form>
          <div class="item-cell">
            <h4>{{ t("message.OriginalLoginPassword") }}</h4>
            <div class="common">
              <van-field
                v-model="old_pwd"
                center
                :type="old_pwd_hide ? 'password' : 'text'"
                autocomplete="on"
                :placeholder="t('message.PleaseEnterTheOriginalPassword')"
                @focus="old_pwdFocused = true"
                @blur="old_pwd_style"
                @input="beforeSubmit"
                :class="{
                  focus: old_pwdFocused,
                  error: old_pwd_checkFalse
                }"
                style="border-radius:6px;"
              >
                <template #right-icon>
                  <div @click="old_pwd_hide = !old_pwd_hide">
                    <div v-if="old_pwd_hide">
                      <component :is="icon_pwd_eyes_hide" />
                    </div>
                    <div v-else>
                      <component :is="icon_pwd_eyes_show" />
                    </div>
                  </div>
                </template>
              </van-field>
            </div>
          </div>

          <div class="item-cell">
            <h4>{{ t("message.NewLoginPassword") }}</h4>
            <div class="common">
              <van-field
                v-model="new_pwd"
                center
                :type="pwd_hide ? 'password' : 'text'"
                autocomplete="on"
                :placeholder="t('message.PleaseEnterAnewPassword')"
                @focus="new_pwdFocused = true"
                @blur="new_pwdFocused = false"
                :class="new_pwdFocused ? 'focus' : ''"
                @input="beforeSubmit"
                style="border-radius:6px;"
              >
                <template #right-icon>
                  <div @click="pwd_hide = !pwd_hide">
                    <div v-if="pwd_hide">
                      <component :is="icon_pwd_eyes_hide" />
                    </div>
                    <div v-else>
                      <component :is="icon_pwd_eyes_show" />
                    </div>
                  </div>
                </template>
              </van-field>
            </div>
          </div>

          <div class="item-cell">
            <h4>{{ t("message.ConfirmLoginPassword") }}</h4>
            <div class="common">
              <van-field
                v-model="pwd_check"
                center
                :type="pwd_check_hide ? 'password' : 'text'"
                autocomplete="on"
                :placeholder="t('message.PleaseConfirmYourLoginPasswordAgain')"
                @focus="pwd_checkFocused = true"
                @blur="pwd_check_style"
                :class="{
                  focus: pwd_checkFocused,
                  error: pwd_checkFalse
                }"
                @input="beforeSubmit"
                style="border-radius:6px;"
              >
                <template #right-icon>
                  <div @click="pwd_check_hide = !pwd_check_hide">
                    <div v-if="pwd_check_hide">
                      <component :is="icon_pwd_eyes_hide" />
                    </div>
                    <div v-else>
                      <component :is="icon_pwd_eyes_show" />
                    </div>
                  </div>
                </template>
              </van-field>
            </div>
          </div>
          <div
            :class="{ 'com-btn': true, 'submit': true, 'gray': !canSubmit }"
            @click="onSubmit"
          >
            {{ t("message.Submit") }}
          </div>
        </van-form>
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>
.modloginpwd-wrapper {
  display: flex;
  flex-direction: column;
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



.main {
  position: relative;
  flex: 1;
}

.main .content {
  padding: .64rem .32rem;

  .content-box {
    padding: .64rem .32rem;
    border-radius: .16rem;
    background: var(--bg-light-color);
  }

  .van-cell {
    color: var(--font-dark-color) !important;
  }

  .item-cell:not(:last-child) {
    margin-bottom: .2133rem;
  }

  .item-cell h4 {
    margin-bottom: .3467rem;
    padding-left: .0533rem;
  }

  .item-cell .van-cell {
    padding: .2933rem .4rem;
    border: .0267rem solid var(--border-input);
    border-radius: .08rem;
    background: none;
    margin-bottom: .2667rem;
  }

  .submit {
    height: 1.067rem;
    color: var(--bg-range-dark);
    font-weight: 700;
  }

  .gray {
    pointer-events: none;
    opacity: .5;
  }
}

.common {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: nowrap;
  position: relative;
  align-items: center;

  .van-cell.error {
    border: .0267rem solid var(--error-color-dark) !important;
  }

  .van-cell.focus {
    border: .0267rem solid var(--theme-color) !important;
  }
}



:deep(.van-field__control) {
  // color: red !important;
  background-color: transparent;
}

:deep(.van-field__control::placeholder) {
  color: var(--mod-pwd-placeholder);
}

.com-btn {
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
  min-width: 2.08rem;
  height: .85333rem;
  font-size: .36rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--bg-back-icon);
  border-radius: .13333rem;
  background: var(--theme-color);
  // box-shadow: 0 .10667rem 0 0 #89a617, inset 0 0 .16rem .10667rem #bbfc01, 0 0 .10667rem .13333rem rgba(252, 197, 1, .07);
}
</style>