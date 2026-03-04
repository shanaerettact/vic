<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";

const common = inject("common");
const { t, locale } = useI18n();

const openFooterRules = (type) => {
  common.footerRulesType = type;
  common.showFooterRules = true;
};
</script>

<template>
  <div class="footer">
    <div class="footer-service">
      <div class="footer-service-item">
        <div class="footer-service-title">{{ t("message.SupportLegal") }}</div>
        <div class="footer-service-group justify-center">
          <span @click="openFooterRules('Footer-FAQ')" class="cursor-pointer text-center">{{ t("message.Footer-FAQ") }}</span>
          <span @click="openFooterRules('ResponsibleGambling')" class="cursor-pointer text-center">{{ t("message.ResponsibleGambling") }}</span>
          <span @click="openFooterRules('Footer-TermsOfService')" class="cursor-pointer text-center">{{ t("message.Footer-TermsOfService") }}</span>
          <span @click="openFooterRules('Footer-PrivacyPolicy-text')" class="cursor-pointer text-center">{{ t("message.Footer-PrivacyPolicy-text") }}</span>
        </div>
      </div>
    </div>
    <div class="footer-line"></div>
    <!-- 社群入口, 先隱藏 -->
    <!-- <div class="footer-service">
      <div class="footer-service-item">
        <div class="footer-service-title">{{ t("message.JoinOurCommunity") }}</div>
        <div class="footer-service-images">
          <img src="../assets/img/telegram-icon.webp" alt="" />
          <img src="../assets/img/facebook-icon.webp" alt="" />
          <img src="../assets/img/youtube-icon.webp" alt="" />
          <img src="../assets/img/twitter-icon.webp" alt="" />
          <img src="../assets/img/instagram-icon.webp" alt="" />
          <img src="../assets/img/discord-icon.webp" alt="" />
          <img src="../assets/img/tiktiok-icon.webp" alt="" />
        </div>
      </div>
    </div> -->

    <!-- 用不到的幣種, 先隱藏 -->
    <!-- <div class="footer-service">
      <div class="footer-service-item">
        <div class="footer-service-title">{{ t("message.SupportedCryptocurrencies") }}</div>
        <div class="footer-service-images">
          <img src="../assets/img/usdt-icon.webp" alt="" />
           <img src="../assets/img/tron-icon.webp" alt="" />
          <img src="../assets/img/ethereum-icon.webp" alt="" />
          <img src="../assets/img/bitcoin-icon.webp" alt="" />
          <img src="../assets/img/litecoin-icon.webp" alt="" />
          <img src="../assets/img/bnbcoin-icon.webp" alt="" />
          <img src="../assets/img/solana-icon.webp" alt="" /> 
        </div>
      </div>
    </div> -->
    <div class="footer-service sponsor">
      <div class="footer-service-item">
        <div class="footer-service-title">{{ t("message.PartnersAndIndustryAssociations") }}</div>
        <div class="footer-service-images">
          <img class="sponsor" src="../assets/img/sponsor.png" alt="" />
          <img src="../assets/img/18+.webp" alt="" />
        </div>
      </div>
    </div>
    <div class="footer-line"></div>
    <div class="footer-copyright">
      <img src="../assets/img/vic_logo.png" />
      <p>
        {{ t("message.FooterCopyRight2") }}
      </p>
      <p>{{ t("message.FooterCopyRight3") }}</p>
      <p>{{ t("message.FooterCopyRight4") }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 0.74667rem 0 0.93333rem;
  padding-bottom: 2rem;
  border-radius: 8px;
  background: #17181b;
  background: var(--bg-lighter-color);

  &-service {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0 0.42667rem;

    &.sponsor {
      .footer-service-images {
        margin: 0;
        justify-content: flex-start;
        gap: 0.4rem;

        .sponsor {
          width: 100px;
          height: 57px;
        }
      }
    }

    &-item {
      width: 100%;
    }

    &-title {
      font-size: 0.48rem;
      font-style: normal;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.45333rem;
    }

    &-group {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      span {
        flex: 1;
        font-size: 0.32rem;
        font-style: normal;
        font-weight: 500;
        color: var(--info-color-light);
        text-align: left;
        word-break: normal;
        cursor: pointer;

        &:nth-child(2),
        &:nth-last-child(2) {
          flex: 1.2;
        }
      }
    }

    &-images {
      margin-bottom: 0.58667rem;
      margin-left: -0.08rem;
      margin-right: -0.08rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 0.02667rem;

      img {
        width: 48px;
        height: 48px;
      }
    }
  }

  &-line {
    height: 0.02667rem;
    margin: 0.66667rem 0 0.66667rem;
    background: #25272b;
  }

  &-copyright {
    padding: 0 0.42667rem;

    img {
      height: 35px;
    }

    p {
      color: var(--font-dark-color);
      font-size: 0.29333rem;
      font-style: normal;
      font-weight: 400;
      line-height: 0.50667rem;
      margin-top: 0.08rem;
    }
  }
}
</style>
