import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("../views/Index.vue"),
      meta: {
        depth: 0,
        hideFooter: false,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/game",
      name: "Game",
      component: () => import("../views/Game.vue"),
      meta: {
        depth: 1,
      },
    },
    
    {
      path: "/deposit",
      name: "deposit",
      component: () => import("../views/Deposit.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/depositResult",
      name: "depositresult",
      component: () => import("../views/DepositResult.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: () => import("../views/Withdraw.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/my",
      name: "my",
      component: () => import("../views/My/My.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/vip",
      name: "vip",
      component: () => import("../views/My/Vip.vue"),
      meta: {
        depth: 1,
        hideFooter: false,
      },
    },
    {
      path: "/bankAccount",
      name: "bankaccount",
      component: () => import("../views/My/BankAccount.vue"),
      meta: {
        depth: 1,
        hideFooter: false,
      },
    },
    {
      path: "/inviteFriends",
      name: "invitefriends",
      component: () => import("../views/My/InviteFriends.vue"),
      meta: {
        depth: 1,
        hideFooter: false,
      },
    },
    {
      path: "/transrecord",
      name: "transrecord",
      component: () => import("../views/My/TransRecord.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/betrecord",
      name: "betrecord",
      component: () => import("../views/My/BetRecord.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/settingbar",
      name: "settingbar",
      component: () => import("../views/My/SettingBar.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/safeCenter",
      name: "safecenter",
      component: () => import("../views/My/SafeCenter.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/SafeCenter/walletaddrmanager",
      name: "walletaddrmanager",
      component: () => import("../views/My/SafeCenter/WalletAddrManager.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/safeCenter/addCryptoAddr",
      name: "addCryptoAddr",
      component: () => import("../views/My/safeCenter/AddCryptoAddr.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/safeCenter/identityVerify",
      name: "identityverify",
      component: () => import("../views/My/safeCenter/IdentityVerify.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/safeCenter/modLoginPwd",
      name: "modloginpwd",
      component: () => import("../views/My/safeCenter/ModLoginPwd.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/learn/learn",
      name: "learn",
      component: () => import("../views/Learn/Learn.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/detail/detail",
      name: "detail",
      component: () => import("../views/detail/Detail.vue"),
      meta: {
        depth: 1,
        hideFooter: true,
      },
    },
    {
      path: "/activelist",
      name: "ActiveList",
      component: () => import("@/components/Pages/ActiveList.vue"),
      meta: {
        depth: 1,
        hideFooter: false,
      },
    },
    {
      path: "/promotionlist",
      name: "PromotionList",
      component: () => import("@/components/Pages/PromotionList.vue"),
      meta: {
        depth: 1,
        hideFooter: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.previousRoute = from;
  next();
})


export default router;
