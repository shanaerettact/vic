<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n';
import IconDepositTabberIcon1 from '@/components/Icons/icon-deposit-tabber-icon1.vue'
import IconDepositTabberIcon1Gr from '@/components/Icons/icon-deposit-tabber-icon1-gr.vue';
import IconDepositTabberIcon2 from '@/components/Icons/icon-deposit-tabber-icon2.vue'
import IconDepositTabberIcon2Gr from '@/components/Icons/icon-deposit-tabber-icon2-gr.vue'
import IconDepositTabberIcon4 from '@/components/Icons/icon-deposit-tabber-icon4.vue'
import IconDepositTabberIcon4Gr from '@/components/Icons/icon-deposit-tabber-icon4-gr.vue'


const active = ref(0)

const { t, locale } = useI18n();

const state = reactive({
  activeItem: null,
})

</script>


<template>
  <!-- <div>Hello</div> -->
  <div class="deposit-tabbar">
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/deposit">
        <span>{{ t("message.Deposit") }}</span>
        <template #icon="props">
          <div v-if="props.active">
            <IconDepositTabberIcon1Gr />
          </div>
          <div v-else>
            <IconDepositTabberIcon1 />
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/withdraw">
        <span>{{ t("message.wal-Withdraw") }}</span>
        <template #icon="props">
          <div v-if="props.active">
            <IconDepositTabberIcon2Gr />
          </div>
          <div v-else>
            <IconDepositTabberIcon2 />
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/transrecord">
        <span>{{ t("message.Transaction") }}</span>
        <template #icon="props">
          <div v-if="props.active">
            <IconDepositTabberIcon4Gr />
          </div>
          <div v-else>
            <IconDepositTabberIcon4 />
          </div>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<style lang="scss" scoped>
.van-tabbar {
  height: 1.6rem !important;
  border-radius: .32rem .32rem 0 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-lighter-color2) !important;
}

@media (min-width: 600px) {
  .van-tabbar {
    max-width: 12rem;
    left: 50%;
    transform: translateX(-50%) !important;
    bottom: 0;
  }
}

[class*=van-hairline]:after {
  border: none;
}

.van-tabbar-item--active {
  color: var(--theme-color)!important;
  background-color: var(--bg-lighter-color2) !important;
  border-radius: .32rem .32rem 0 0;
}

.van-tabbar-item {
  font-size: .32rem;
  font-weight: 650;
  color: var(--font-dark-color);
  letter-spacing: .04rem;
}
</style>