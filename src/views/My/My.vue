<script setup>
import { inject, reactive, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n';
import IconClose from '@/components/Icons/icon-close.vue';
import IconVip from '@/components/Icons/icon-vip.vue'
import IconMySubmenu0 from '@/components/Icons/icon-my-submenu0.vue'
import IconMySubmenu1 from '@/components/Icons/icon-my-submenu1.vue'
import IconMySubmenu2 from '@/components/Icons/icon-my-submenu2.vue'
import IconMySubmenu3 from '@/components/Icons/icon-my-submenu3.vue';
import IconMySubmenu4 from '@/components/Icons/icon-my-submenu4.vue';
import IconMySubmenu5 from '@/components/Icons/icon-my-submenu5.vue';
import IconMySubmenu6 from '@/components/Icons/icon-my-submenu6.vue';
import IconMySubmenu7 from '@/components/Icons/icon-my-submenu7.vue';
import IconMySubmenu8 from '@/components/Icons/icon-my-submenu8.vue';
import IconMySubmenu9 from '@/components/Icons/icon-my-submenu9.vue';
import IconArrowR from '@/components/Icons/icon-arrow-r.vue'
import HeadShot from '@/components/Blocks/HeadShot.vue';

const common = inject("common")

const { t, locale } = useI18n();


const isLogin = async () => {
  let loginCheck = await common.userInit();
  if (!loginCheck) {
    common.alert("fail", t("message.Not-login"))
    common.toRouter("/login")
  }
}

isLogin();

const state = reactive({
  user: computed(() => common.user),
  vip: computed(() => common.vip || { id: "1" }),
  dama_limit: "",
  nextlevel: computed(() => {
    let next = state.vip.next_title || "n";
    return next.slice(-1)
  }),
  vips: computed(() => common.vips || []),
})

const progressPercentage = computed(() => {
  const current = Number(state.vip.dama_now) || 0;
  const limit = Number(state.vip.next_limit) || 0;
  if (limit <= 0) return 0;
  return Math.min(100, (current / limit) * 100);
})

watch(() => common.vips, () => {
  const vips = common.vips || [];
  const nextLevel = vips.filter((item) => {
    const nextId = Number(state.vip.id) + 1 > vips.length ? Number(state.vip.id) : Number(state.vip.id) + 1;
    return item.id == nextId;
  });
  state.dama_limit = nextLevel[0]?.dama_limit?.slice(0, -2) ?? "";
}, { immediate: true })


const cells = [
  { id: 1, text: t("message.wal-Wallet"), icon: IconMySubmenu9, to: "/deposit" },
  { id: 2, text: t("message.VIPclub"), icon: IconMySubmenu1, to: "/vip" },
  { id: 3, text: "設定銀行帳戶", icon: IconMySubmenu3, to: "/bankAccount" },
  // { id: 4, text: t("message.AlliancePlan"), icon: IconMySubmenu2, to: "/inviteFriends" },
  { id: 5, text: t("message.Record"), icon: IconMySubmenu4, to: "/transrecord" },
  { id: 6, text: t("message.GameRecords"), icon: IconMySubmenu5, to: "/betrecord" },
  { id: 7, text: t("message.Settings"), icon: IconMySubmenu5, to: "/safeCenter" },
  // { id: 6, text: "資料統計", icon: IconMySubmenu6, to: "/" },
  // { id: 7, text: t("message.Settings"), icon: IconMySubmenu7, to: "/settingbar" },
]



function openModal() {
  var logoutModal = document.getElementsByClassName("logout-modal")[0];
  logoutModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  var logoutModal = document.getElementsByClassName("logout-modal")[0];
  logoutModal.style.display = "none";
  document.body.style.overflow = "auto";
}

onMounted(() => {
  var logoutModal = document.getElementsByClassName("logout-modal")[0];

  window.onclick = function (event) {
    if (event.target == logoutModal) {
      logoutModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
})

</script>


<template>
  <div class="my-wrapper">
    <div class="main">
      <div
        class="close"
        @click="common.toRouter('/')"
      >
        <IconClose />
      </div>
      <div class="user-info">
        <div class="info-left">
          <div class="info-head">

            <HeadShot
              :level="Number(state.vip.id)"
              :userId="state.user.id"
            />
          </div>
          <div class="info-vip">
            <!-- <IconVip /> -->
            {{ common.vip.title }}
          </div>
          <div class="info">
            <p>{{ state.user.name }}</p>
            <div></div>
          </div>
        </div>
      </div>
      <div class="vip-card">
        <div class="notes">
          <div class="vip-left">
            <!-- <IconVip /> -->
            <span>{{ state.vip.title }}</span>
          </div>
          <div class="vip-right">
            <!-- <IconVip /> -->
            {{ state.vip.next_title }}
          </div>
        </div>
        <div class="progressBar">
          <div class="levelProgressWrapper">
            <div class="flex justify-between mt-1">
              <p class="levelProgressTitle">{{ t("message.DepositMoney") }}</p>
              <p class="levelTargeTitle">目標金額</p>
            </div>
            <van-progress
              :percentage="progressPercentage"
              stroke-width="8"
              :show-pivot="false"
              color="#fec11a"
            />
            <div class="levelProgressNumbers">
              <span class="levelProgressNumber">$ {{ state.vip.dama_now ?? 0 }} </span>
              <span class="levelProgressNumber">$ {{ state.vip.next_limit ?? 0}} </span>
            </div>
          </div>
        </div>

      </div>
      <!-- exchange-item 省略 -->
      <div
        class="exchange-item"
        style="margin-top: 12px"
      ></div>

      <br />

      <van-cell-group :border="false">
        <van-cell
          v-for="(item, index) in cells"
          :key="index"
          :border="false"
          :to="item.to"
        >
          <template #title>

            <span>{{ item.text }}</span>
          </template>
          <template #right-icon>
            <IconArrowR />
          </template>
        </van-cell>
      </van-cell-group>


      <div style="margin-top:12px"></div>


      <div class="logout-item">
        <van-cell
          :border="false"
          @click="openModal"
        >
          <template #title>
            <p>
              <component :is="IconMySubmenu8" />
            </p>
            <span>{{ t("message.Logout") }}</span>
          </template>
        </van-cell>
      </div>

    </div>

    <div class="logout-modal">
      <div class="logout-wrap">
        <div class="logout-header">
          <div class="logout-title">{{ t("message.Logout") }}</div>
          <span
            class="close-modal-btn"
            @click="closeModal"
          >
            <IconClose />
          </span>
          <!-- <span>&times; </span> -->
        </div>
        <div class="tips">{{ t("message.BeforeLogoutTip") }}</div>
        <div class="btns">
          <div
            class="btn-logout"
            @click="common.logout"
          >{{
            t("message.ConfirmLogout") }}</div>
          <div
            class="btn-logout base-button"
            @click="closeModal"
          >{{ t("message.Cancel") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-wrapper {
  height: 100%;
}

.main {
  position: relative;
  flex: 1;
  padding-top: .61333rem;
  padding-right: .26667rem;
  padding-left: .26667rem;
  background-color: var(--bg-color);
  height: 100%;

  .close {
    position: absolute;
    top: .26667rem;
    right: .35653rem;
  }

  .user-info {
    margin-bottom: .28453rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    .info-left {
      display: flex;
      flex-direction: column;
      align-items: center;

      .info {
        margin-top: .46803rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .info-head {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 2.02667rem;
        height: 2.02667rem;
        background: url(data:image/webp;base64,UklGRtAWAABXRUJQVlA4WAoAAAAQAAAA5AAA4wAAQUxQSIgMAAAB8FZre95m27YJghjsghAGMYOGgcMgZeAw8I7g8IngDIOawR4GFYOawbL8kOx+JfLfiJiA8BzT4XwZpmme8/o8z9M4XE5dDDswdpfxlhVFUQWso4L323jqYqvF7nLLilIRVSxBEUQRwfvt0rVWPI93LAFLEJQCNyMqlsxj10zddRasogB+sgaigKJUVObLoXliNy6KG3EVRSqioGAdKliIeexaphs/UNbAVUQQV1FEpVKCiiqieTq0SbouooJ1BFFxdQ1RRaWCqIK4ivc+NcdpVkVEqai4jqKiwkodVVSxyoo6dS0RrwuqCIgbYQVFBUXFdVCoqYhb0dy3Qho/pFSsIitWUVFEBBFBLMHNuApima+pAbobVrEEwQJVxHJ5v03j0Pcvx/W+H8bb2z9FhBoKiiqWqMuUntxhxs24iiVonob+EMM3xmM/zhlBEUVUUayCTumJpUkVEZECxRLN0+UYww+Nx2FeVLDEKpVqvqYnFa+LIpZYiIDi8l//J/z4w+W2qKIoKFKgkvun9PqhhYh1rM/DIfza45gtcTuW+eXpdLNIRUBFEHm7xPDLD5fsKgWWKP6Xnkr8i4qigoWI9yGGh3iYsuJGQFSW1yfSZayA4irLeAwP9OUGKBR1BHN6EvGvVgQLVPwYYniwacrqpjrXp9Bl11RQ0fkYHnE8Z+VTmtPj+4uCKkV9PoaHfc6q1FABl9cHl+4K1hFF52N46OesSiGW6BQf2WlRsQ6W8zE8/HN2HRXB9/S4/qogCKrocgnPMA2KFIgILK8PKs5uXRlieJJpUrEKinp9SCmjrIk6H8ITPWdUFMHqLT6ebsE6iupyCc81DqJFiep7ejRnVAFUROcUnm7KhSCqaE6P5YqKWFGXS3jKg6BgFVlOj+SqYh3QewpPusuIBShq/zj+IkCBKmN43ulmFazi9VH8DwFXcTmFpz4AiEKF62P4n1iiIryn8ORP2c3I9RH8z1VQ4RbD008ZpADL6++7UgFEYQgtGG+ooFL4+tuuorgKl9CIg6KoItr/rqsVkGI5hWYcAAWxpPtNryrg6nIIDTm4FV0Ov6dTQRDEnEJTnmsgKu/pt6QPt+cUGvOsoljP8XekLDVUcgrNeUbB9dvvmFVRLHMKDXpGC1T0+huuKljBnEKTnlERsex/3llcRT4OoVFfEXXlI/20tCgqAngKzTqIiAh6jz8si4pVLqFhR1FRRcafdUWBAhxC085uRE8/6YSKVryFto25QERZ0s9JWUUVNcfGCWmprM4/Z8ISFXMKzXsqgAqvP+VsvXYKDTwqIoUf6WekjIL1ITTxDIogOv+MSXGVHNo4LdZRff0JSQRU8CM1UjitiPgRf0B2I15CM48qiOX4fWcKRHQK7RzfxY3dd6WsFGVODRU6YMP8XROqqGIfmnp0i933JEAK9C20dVwQqL1/z4QqApgaK5xdR4fvSCIKgkNo7hmpCEv8hgkVqzm2V2eJ1eHrkoJV6EODj+L6Er9sUqViDi0eF0sKhq9KiljiscnCAIqKfsQvmlQB0Tm0eVzEKnD5miQgqnhstDBYReTf10wq1ufQ6nGpiGr3JRlVED02WxgUS3T+ijOI9bfQ7vFDBRRJXzBbImjfcGEorA+fS66iObR8VERBPuKnpgoUfdOFmyqK2n0qy9oS265TVBTmz5xQUdQpNP6MCqLGT0wogOKh9S6uApdPLFYB76H14yIVYd52ch375gs364hx07SGpvbrlJpeNn0oFZ3DDlwUEXTe0imu9ntgBEvUuGG0Dpr2QGeJii8b7lRQ38IejIugCI5rya39LggTrue1s1RQ0j44i4KAf1YmpVBz2IdRUSz7lUyB6LQTwl1FUaZaEld52Qujoqi+107IimkvnKwiEiujG/+FvRipCPpSmUUqTLshZBUQGSuLVdR+P0yoonorDiCiymE/XEQE9b3oLBE17McDloUxhHBBQIV/OyIqoqCHEMINUVRvOyJkUEToQwizitXLnrhZojqGED5QoXjZEyNK1VsI0RIVD3viDILlPYSDSkXDnjyJKMoSQicqosuuSIhiGcNZEVHedkWwCsifMBT1277IFUGPYRSVYtwXdxUU6MNkFXXYF7N1tA+zCipe9sWkIqpDmBFL7HcGhVTuKIp63BeDIgpMISuKsktULFCs7owLlqhTyFIBD/viLCogtyCu/9kZgFjOgQqwP7SCvgVRVGR3oII6hw9RRdwdKirMISui4mFvYBULVESP+2KwBOW/kLHOLsHyv5BVRPVlh4joFGYEq/2+mIRCHMJNURQv++KmiihDmFRRdNgXc02lD6MiqE774q5YfwkXEQtu+2JRUYFjOCtWue8LFRD1T+ikgiy74oBqhRCSJSrGPdGpYrmEEFUUkcOeuBQqOIcQsoKo9ntiLLC8hRDuVlEve2IuBGUIIUwilkx7IleqLyGEi2A974holeIYQjiJoqJxP3S1agwhRBVF9bAfLkoF/oVyUUHRy364iSrqrXJTBdVpP2Tr6FAZBa3k3ZAoUOFYOSmign/2wslVNFaioIrY74WJFb2HelaxOu2F7MZpZVRUkWUnJEVqLytnBbE87IOz65hWoluHfTBv8F9Yn5EKzrsgunXaMIAUatwDpw143NBhAcplD0yy4hK2LqCgOu+BxTp62zQqKIqx/c6qYNlv6lSxOrTfLK6nTeED1nLzJdw4h+2jooLatd65AkX/iQ5VFL21XhbVSvxEWIoqS2y7DlUsp/DZoQDLoe1uFRU5fiqCWF+aLgk1zeHzsyoF9C03WVIZvqDDEtG54ZLCWvqCsFBU6dptUgXLKXzlQKmIc7OlrCCIHr8kLoqrXatd3fovfO2gIiLOjZYWQaTovyiKVdRTm02uYw5fPUGB4nuTJZWa9l+WVFEFhxaboAbm8PWTKFaX2F6dWAf7b0i4kbG9MoIKmsN3jio17VrrVbAK9t8SF6sU98ZKCwqK8B6+d6ggqq9tNYkbj98Us4iCuKSWOqsCokzhu0+WWJ0bKuVCsEzfFuZi/bWdJkUV0CF8f9oEh1Z6tQqqOfzEAREVMcc2Sipr9D8iZtfRqYliVsX6FH5mJ4pQ+NpCf60j+J5+SBhVsL4c2ueVFRX68FNjdvN7ap2D26fwcw8VFMF746SsFCDm9IPCa1FHpqaJ79ZR5Rh+9EwFFb22zM111CH87JRZK1/b5S+siW/hp3coSs2+Va4qK5jTjwuvbmY5tMnVregh/ML/1ShkObTI1ZICdQi/Md5VEEVdDu1xZYs6ht+ZMqKK5XJojasqNXQOvzUtFUTE5dAWV1Fcz+nXhK6yivYtcbXckFP4xWdXseTaDn9dpbKk8KuHApWK10aIN0sUUJdD+OWDoNTUMbZAuotU6qfw6wcRq6Dk9PwO7yJu7cMDHMQSBTUfnt2rILChDw9xUEVBFbw+tfgXEC0Q6cODHFzH6pSeV8qKm5dTeJiDUpFS8+FZvS5Yh8pyCA/0rBQgVq9PKd5wM5pTeKiHRUURUDCn53NaXAdBcgoPNmUVcBW8Ppl0s6QAFecYHm66o25Rc/9MXj9EKaA2hoc8okqBgjilZ9HNllgF1Ut40K+KKgrWr+kZpJuiIiKo5mN42Ckj4jpq7h9evC4gqGKJzik88DQpoiiu5v6hxesi1lGxHMODf9UKKoCouX9Y8boobi7yMTz8lK1iifXcp0cUr4tYoghWbzE8wwFElRqILlN6NN1sibgRWU7hSaaMVSxRRZ37BxKvd5RKHRW9xfA8hw/wCzFP3UOI3bwgUIgU1XwMTzVNsgEFV/PU/bLYjQuiqCIKKuAQw7N9ySIq1lEsydMp/pZ4vi2qyJpifU7hGZ+zJUoFVbA6D92Pi6fxroqi1kSkuB/Dk05DFrejgoDCPJ4OPyQeLlNWEbEKbs99eOJpcjtuBBX1fhtOXfy6dDiPUxY3rigiFZYhhueepqyoIFZRRCxBRfN8m4bhcl69DON0u2cBN6KiCpYg6jLE8PzTOavomgCWqIifR0UES1aUAgVQUeY+tOL57ioiuLLOFiogVlEKVFxHRHU+hpY8TApuRKSC8inAVdy8CdFliKE143lGUahYQcVVFCsqAgWoFFWKcj6GNk2Xu2ohoFintoogqmCVggIF9O0SQ8Omyx2pqKL4WayCiJ9EFZf5EkPzpvNtkQqqKAgrIlaxZAUVzONLDK18uPx/8VspRdyep8uf0NqHl3H+2ISoFACKCqi43MaXGJr9cLyMcy6wolK4urzfxssxhl3453jsh2GabvP8Ns/z29t/0zRc+pdDDM8RVlA4ICIKAADwNACdASrlAOQAPjEYiUMiIaEUmeTsIAMEpu4MCjKo+NPC36AfxjFANIalr8AP0A1AD8AP0AtP/yAbK3+AfgBeLveRWEC+oflR7MdP/oX4N/sf7edC1Tfn8eJ/n3+l/v37yf6r3q/2D8mfk/5gH8Q/h3+w/vv5D9xD+PegD9b//R/oveQ/wH9J/oHuA/rn+K9gD+gf3b/3+0B/xfYO9Ab+ff6D1Vv9Z+y/wJft5+5f/n+Q79dP/r7AH/39QD9/+xf6w/wD8AP0d/Gfv8LfqU9wfJRxPzowxJPteQz1IDfJqMv5EhEm7NCLBKBftfRpwigQ9ZDwm0UVb5PPYslyihHASJn7G/apW0Sr/LFZ1Z09+RDp/ATSA4snxdwjXabUjs1HPl2fwLFa74F3CNdsLNbn5tEeRz1IRGI2yCM6SqqRz1IRp/QHWiwjyOepCJGLYudJW0Ua7UmJXnzIV6YFW9d3kNSohR4+yIxAt7fHXx1uem2TR07gu4RpVI1gPnFjxJhmtLXo04W4I7aIqCZMOLuIYrjYbjSJnX/fUPSUVfdN2rKRSPBW3Cubq5hvZqAlNgAA/vI9ZLTyJl/3i4wDnWfn+t9unLzXdo/hLx3kv94DzBDPeyODIDgCdjiVzDgBLCorMiVfp5N2L+6zTGh4u9xgipReNnQBYyzqAT93ViB36UYUUzYvpfJ3U7SHe2Cjo2Xbtd6/KjgbfFF1HLsV1dmsb6ok6qgVNaMYgujnk+UU/NBV9wziy9TdPkWWa5RaaCxrjXkpmImteYbRO1+Aj+jTB19iUXBzp3ycKW3OO+/6wf/w0vvVjSuHYfiTCxGLVuvuDiLEajrlwuKOIVqjzNrO/VarZFb3QJQdVerclF/rybydkOlOE2XrGiiMxb1ZQCf/OwqbWg+aYfYHE0IvPirqUnjv1FB5cH1HvSayXPKAvN9sL7yuKBssItEl8qlbJ6UvLGtSF+0HsDjIjdwInhKTxKhdP2pjz9kitQoXq/Lg+Rs3XEPERaqr4McV4seOAAABmD//EmE/pKZcRTnp16FuzVZqS5Ccw8oBp1L5Y2X8zvkZc6aiaKnghSfIB1wkiY4vcP9XUm8/hsNSNhyBmcFBcdLdoAX3vuk7LWa3wE386RL7fnhPfh4d4G8EZQej+mjOgpFiUid8uVfIKx9UmoDj4UVxfnwutlNO/rZ6xcHno99HjtUCDWmprLNR6tfO8T4+5LRduAjS3748oESoZHZqVhZ41ILe22R+KFHk6Cjjw5p6ojLTBt/rYdjIfFthzKQ2H8r5ycUl2b9N8txkYgsEIlyopMAAAAQn+9XKTkkMMUgXbI0bxPsgErwwAhhr3Lj0r5zvjvrCLrCxtxNz6AD1sJTsruKwKKMs14s+IxULCrIWGC/tqFthACMz7s9/AcXlEccEOLecsSiWzfEqgFc2g2XuqE3SsZdr3AJyu6dPM9/wnnC2xKvPv/sW8SPelj1YVC2Yna/Fxghxkx2FCE3CRBDklZAAAAGnpMCB0E/gy4w5Lqmd5SOg9p5FjwAoNSwik+2wZrKB4oGY7pFZE9lCJq8jwat8P/y6BQw/QY4gQE0EevkXQj0/5n/aokgK8lwAPAPYo9kAEegPcTu0LLg+jpF6kKoCUt/dgmlbkHkceJu+FSv/U2gqrS1diCNROsdR3sM/NsWxXuPiBl97Y8xENEegHgM6/VYwAC/ZvUT2yubPRYJdqThdIiM//4fUIVpa8BMl/W5LA7nJR4Xt0sp3ifX/0E9V5aTDX4fgmFH8djVvHweoYAZwwhJsiCj6dn96RsDPJgCJyutQEGYtVPfGffU2deONwZYwF++tZ1dDrarbV7MngANwPcVdBO0mb7USpqq4Z9wgW8oDsBGq811DVaqmx8HqpCdhCpPNcZAxJxfS6xK5xaNiqfgx53nwRN1FrxVhgNNwepycanUHEM6cW839cmFQRdDYb+kAAANCbkPQznKX6ylRBx1ljVtaCb1ptGdAoAB9QnTglC1z/ds91AY9hhSB1QFD9A6kuoAADpqgm4BHt6IBP9VWOVwEIHgCPjiC03XNK8mHrSB6q3sfXyaYlXRcpEJVj/efdQxY9+6Tnx95i0XL9/dgYY5yJmJG2/YMFl/lfAs3t3jXd4Il1/r9kApAYACx0ONwTvm/JBsH/xsQT86BwZbbVdqPJJ/n5LaUg6PL4Acq8nZ2sA7vHjURCYh+4BwMYgJNWUkhZSCgxavqWTpzn0jAdNLOM2w6lq7/FP0NpVblPYd8b2ANp3C+r4gpXAjoo8vk8Z1wwLyZrBgSG19z4EA094Ek7xIc4o4b93Th6C26d91uiJtZwuOGLm2PBTeKBjHBW6ZYxZjvEhNnUdOXns1Lt240Sw+rezpU3EVtHLliigZ5iWKkxz5LNmd1YP6ozzsWXUzWux+lGt/5TCAdbVUEOVJg9jbk2ShalBJZ6jX5fjaqAPgy84KOIhphlhuj0+IBTe+UoWpE8OrZug2Q/8qcF2ehmzHaQeXrrVfUL2qQgSpAaZiAcZTrvuxZnG9VrSFZwqA/+Bo2g5LUxnYNHEmJl7sYQJShZHzEeSJeHvpjeoSVAJTeM/nRyPOs+hk6I3vbvgID/B0QSsqxFhc6ewIC1Se6EP//fZAoSLrp0jZRGcFskPduvOsW/DCrnwfrb5+0MseHEjhR+FwT+fpNHE46qcwivXAm8JwFgOVsCMQDy7Ks1+u5TGD6M6FDYMCPkDDOCqBy+fPW6m1EuUmoaL1ObA1m9n0yttv2opp9x7qThSuVeRqxZzB+8qnGeVIbEJBfxzxYt7r+z2VaQF/MTl38I+WwtB5Obld+c9dTnMUK6eYy+TS50MOvcr6izMPF08o9OBE4xkXTX6FZE3PY2f4lB2QVfiOT83cERe9aV//+coLYMgKdjE9KKRRxz06uXRHUgWlrCjrFe5Z74KJ0wE6LUIvd0SI3TslcQv4acH04mlhG9cG9rIlnsEajhorF/KBuAVmVLut3XWoyeNJik4r95m442CBtQSxFKg6irDXSzLmOV2TfK4VDSjoQ1/GeXnlXkN3Kv6b3ODtQAAhlf//nUPrzFWh3PshH98Q+Pq7BDbLD169rLVG4mrgqnRHOaOCp0O/qFaCGqzcpz45rmnCX81Pnz5INoodjKyRe8wc/plEiELFnjuPc0E53lASMs1Fki+avWeKJSVkocdoVKo1wvWC1v9AZipbvnI+ULE/ju1v0DcY/qPjJmzwt+/jhBhwFliNhflwmb7LNWxjEZtgym4zdL1JEPvCRMvaZVuYZDLPZEiVsok/u70UtnsTmxk0edPHErmRQt1q4x0SS64EX6Rp09TkmKiRGA2KvIyx71ngWbZaTeiAKl71CAAASvIPpAdmyvERILh7ZNlvYF+axHcxQcy5KatbRuse9S2CTsy4YwBNFo4eW+4wJfs3ls6lwbXaWb/dxL+Y6c3vot9hZThMAAAAAAA==) no-repeat 50%;
        background-size: cover;
      }
    }

    .info-vip {
      position: absolute;
      top: 2.36136rem;
      width: 1.52597rem;
      height: .60136rem;
      background: url(data:image/webp;base64,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) no-repeat 50%;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }

  .vip-card {
    position: relative;
    width: 100%;
    margin-bottom: .21333rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;

    .notes {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      height: .58133rem;
      justify-content: space-between;

      .vip-left {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-left: .26667rem;
        justify-content: center;
        align-items: center;
      }
      .vip-right {
        margin-right: .26667rem;
      }
    }

    .progressBar {
      width: 100%;
      border-radius: .21333rem;
      margin-top: .10667rem;
      background: var(--bg-light-color);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--card-glow);
      padding: 0 .21333rem .26667rem;

      .levelProgressWrapper {
        display: flex;
        flex-direction: column;
        gap: .16rem;
      }

      .levelProgressTitle {
        font-size: 12px;
        line-height: .45333rem;
        color: var(--gold-text);
      }
      .levelTargeTitle {
        font-size: 12px;

      }

      .levelProgressNumbers {
        display: flex;
        justify-content: space-between;
        gap: .1067rem;
      }

      .levelProgressNumber:first-child {
        color: var(--gold-text);
      }

      .levelProgressNumber {
        font-size: .3733rem;
        font-weight: 650;
        color: var(--font-color);
      }

      .van-progress {
        width: 100%;
      }

    }
  }


  .van-cell-group {
    padding: .26667rem;
    background: var(--bg-light-color);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-glow);
    border-radius: .21333rem;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: var(--neon-glow);
    }

    .van-cell {
      padding: .16rem;
      background: transparent;

      :deep(.van-cell__title) {
        display: flex;
      }

      &__title p {
        width: .8rem;
        height: .64rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      &__title span {
        font-size: .37333rem;
        color: var(--font-color);
        font-weight: 650;
      }
    }

    .van-cell__title {
      display: flex;
    }

    .van-cell::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: .42667rem;
      bottom: 0;
      left: .42667rem;
      transform: scaleY(.5);
    }

    .van-cell:last-child:after {
      display: none;
    }
  }

  .logout-item {
    margin-bottom: .32rem;
    padding: .26667rem;
    border-radius: .21333rem;
    background: var(--bg-light-color);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-glow);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: var(--neon-glow);
    }

    .van-cell {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      padding: .16rem;
      background: transparent;

      :deep(.van-cell__title) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      :deep(.van-cell__title p) {
        width: .8rem;
        height: .64rem;
      }

      :deep(.van-cell__title span) {
        font-size: .37333rem;
        color: var(--font-color);
        font-weight: 650;
      }
    }
  }
}

.logout-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: 1rem;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 40%);
  z-index: 889;
}



.logout-wrap {
  position: absolute;
  bottom: .1rem;
  width: 100%;
  z-index: 1;
  background: var(--bg-light-color);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
  font-size: .4rem;
  border-radius: .42667rem;
  font-weight: 550;

  @media (min-width: 600px) {
    max-width: 11.4rem;
    left: 50%;
    transform: translate(-50%);
  }

  .logout-header {
    padding: .43rem .53rem 0px .56rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
  }

  .logout-title {
    color: white;
  }

  .close-modal-btn {
    font-size: 1rem;
  }

  .tips {
    padding: 0px .35rem;
    margin-top: .7rem;
    text-align: center;
    color: var(--font-darker-color)
  }

  .btns {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: .53rem 1rem 1.4rem;
    justify-content: space-between;
    // width:70%;
  }

  .btns .btn-logout {
    display: flex;
    align-items: center;
    flex-flow: row;
    width: 3rem;
    height: 1.1rem;
    border-radius: .13rem;
    background: var(--bg-other);
    justify-content: center;
  }


  .btn-logout:last-child {
    height: 1.1rem;
  }
}
</style>
