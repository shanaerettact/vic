<script setup>
import { useRoute } from "vue-router"
import { inject } from "vue"
import { showToast } from "vant"

const route = useRoute()
const common = inject("common")

const depositResult = route.query

const finishBtn = () => {
  common.toRouter("/")
}

const copyBankCode = () => {
  navigator.clipboard.writeText(depositResult.bank_code)
  showToast({
    message: "銀行代碼複製成功",
    icon: 'https://cdn360.w0zuv.live/images/success.01e42bae.webp'
  })
}

const copyBankAccount = () => {
  navigator.clipboard.writeText(depositResult.bank_account)
  showToast({
    message: "銀行帳號複製成功",
    icon: 'https://cdn360.w0zuv.live/images/success.01e42bae.webp'
  })
}

</script>


<template>
  <div class="depositResult-wrapper">
    <div class="content">
      <div class="item">
        <span>付款銀行代碼: </span>
        <div class="bank-code-box">
          <span>{{ depositResult.bank_code }}</span>
          <span 
          @click="copyBankCode"
          class="copy-btn">複製</span>
        </div>
      </div>
      <div class="item">
        <span>付款銀行帳號: </span>
        <div class="bank-account-box">
          <span>{{ depositResult.bank_account }}</span>
          <span 
          @click="copyBankAccount"
          class="copy-btn">複製</span>
        </div>
      </div>
      <div class="item">
        <span>訂單有效時間: </span>
        <span>{{ depositResult.expired_time }}</span>
      </div>
      <div
        class="btn-box"
        @click="finishBtn"
      >轉帳完成/回首頁</div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.depositResult-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-color);
}

.content {
  margin-top: 2rem;
  padding: 1rem;

  .item {
    display: flex;
    justify-content: space-between;
    span {
      line-height: 2.5;
      letter-spacing: 0.05em;
    }
  }
}

.btn-box {
  height: 1.1733rem;
  border-radius: 0;
  border-radius: .133rem;
  background: var(--theme-color);
  box-shadow: inset 0 -.0533rem 0 0 #89a617, 0 0 .0533rem .0533rem rgba(139, 2552, 1, .07);
  color: var(--primary-btn-font-color);
  text-align: center;
  margin-top: .64rem;
  font-family: 'Geogrotesque-Md';
  font-size: .3733rem;
  font-style: normal;
  font-weight: 650;
  line-height: 1.1733rem;
}
.copy-btn {
  color: #000;
  font-size: 0.32rem;
  line-height: 1.1733rem;
  cursor: pointer;
  margin-left: 0.133rem;
  border: 1px solid var(--theme-color);
  background: var(--theme-color);
  border-radius: 0.133rem;
  padding: 0.053rem 0.133rem;
}
</style>