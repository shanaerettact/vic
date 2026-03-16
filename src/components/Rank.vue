<script setup>
import { ref, reactive, inject } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";

const modules = [Autoplay, Pagination];

const common = inject("common");

const state = reactive({
  rank: 1,
  rankList: [
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0,
      Amount: 1,
      RewardAmount: -1,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:30:00+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 0,
      Amount: 0.06,
      RewardAmount: -0.06,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:58+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0.4,
      Amount: 1,
      RewardAmount: -0.6,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:56+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 0,
      Amount: 0.06,
      RewardAmount: -0.06,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:55+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0,
      Amount: 1,
      RewardAmount: -1,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:55+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0,
      Amount: 1,
      RewardAmount: -1,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:54+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 0,
      Amount: 0.06,
      RewardAmount: -0.06,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:53+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 0,
      Amount: 0.06,
      RewardAmount: -0.06,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:49+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 4.166667,
      Amount: 0.06,
      RewardAmount: 0.19,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:46+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 3.85,
      Amount: 1,
      RewardAmount: 2.85,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:45+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 0,
      Amount: 0.06,
      RewardAmount: -0.06,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:43+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 1.1,
      Amount: 1,
      RewardAmount: 0.10000000000000009,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:42+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 0,
      Amount: 0.06,
      RewardAmount: -0.06,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:40+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0.25,
      Amount: 1,
      RewardAmount: -0.75,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:39+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0,
      Amount: 1,
      RewardAmount: -1,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:38+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 0,
      Amount: 0.06,
      RewardAmount: -0.06,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:37+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0,
      Amount: 1,
      RewardAmount: -1,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:35+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/b2366548207348b08b53640d4b4b3281.webp",
      EIcon: "/images/edfc4f48a42a4347857ea05108657c3e.webp",
      Name: "聚宝盆",
      EName: "TreasureBowl",
      UserId: "51630366",
      RewardRate: 4.166667,
      Amount: 0.06,
      RewardAmount: 0.19,
      Symbol: "usdt",
      GameType: 100,
      GameId: "jdb-treasurebowl",
      RewardTime: "2025-05-09T16:29:34+08:00",
      VipLevel: 1,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0,
      Amount: 1,
      RewardAmount: -1,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:33+08:00",
      VipLevel: 5,
    },
    {
      Icon: "/images/71da5ddebc76401c9a25775cc38f1025.webp",
      EIcon: "/images/a4f4ab38bc71401c9c0c8c014a90db23.webp",
      Name: "超級王牌",
      EName: "SuperAce",
      UserId: "29736319",
      RewardRate: 0,
      Amount: 1,
      RewardAmount: -1,
      Symbol: "usdt",
      GameType: 100,
      GameId: "49",
      RewardTime: "2025-05-09T16:29:31+08:00",
      VipLevel: 5,
    },
  ],
  dayList: [
    {
      Rank: 1,
      UserId: "34424326",
      Amount: 1212785,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 2,
      UserId: "21417896",
      Amount: 192957.174136,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 3,
      UserId: "38799071",
      Amount: 71650,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 4,
      UserId: "56658946",
      Amount: 62018,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 5,
      UserId: "33386405",
      Amount: 44027,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 6,
      UserId: "68409929",
      Amount: 21453.6,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 7,
      UserId: "38895528",
      Amount: 19296.32,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 8,
      UserId: "67157568",
      Amount: 9848.5,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 9,
      UserId: "68280767",
      Amount: 9263.5,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 10,
      UserId: "29736319",
      Amount: 3215.87,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 11,
      UserId: "37547811",
      Amount: 2512.6,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 12,
      UserId: "12481541",
      Amount: 2151,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 13,
      UserId: "47984586",
      Amount: 2100,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 14,
      UserId: "74548322",
      Amount: 2005,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 15,
      UserId: "47707400",
      Amount: 1759,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 16,
      UserId: "59450274",
      Amount: 1753.03,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 17,
      UserId: "91137303",
      Amount: 6938,
      Symbol: "trx",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 18,
      UserId: "TAxCEUNumQspuGmQEYqeyvU6SyAEwcwhBn",
      Amount: 1680.06,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 19,
      UserId: "52420318",
      Amount: 1644,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 20,
      UserId: "86898921",
      Amount: 1560,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
  ],
  weekList: [
    {
      Rank: 1,
      UserId: "34424326",
      Amount: 5900445,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 2,
      UserId: "51233570",
      Amount: 1256226,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 3,
      UserId: "84806195",
      Amount: 961873,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 4,
      UserId: "56658946",
      Amount: 633281,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 5,
      UserId: "93759259",
      Amount: 625617.2,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 6,
      UserId: "23940465",
      Amount: 382682,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 7,
      UserId: "21417896",
      Amount: 296174.237235,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 8,
      UserId: "33386405",
      Amount: 291469,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 9,
      UserId: "98466641",
      Amount: 273067,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 10,
      UserId: "38895528",
      Amount: 236680.32,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 11,
      UserId: "38799071",
      Amount: 231830,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 12,
      UserId: "48310159",
      Amount: 155450,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 13,
      UserId: "72593732",
      Amount: 120104.2,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 14,
      UserId: "13085616",
      Amount: 87456.7,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 15,
      UserId: "66073176",
      Amount: 79500,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 16,
      UserId: "37547811",
      Amount: 74534.6,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 17,
      UserId: "92477697",
      Amount: 57140,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 18,
      UserId: "89176567",
      Amount: 227085,
      Symbol: "trx",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 19,
      UserId: "95567198",
      Amount: 52413,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 20,
      UserId: "98823052",
      Amount: 47228,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
  ],
  monthList: [
    {
      Rank: 1,
      UserId: "34424326",
      Amount: 7008987,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 2,
      UserId: "21417896",
      Amount: 5199808.915963,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 3,
      UserId: "84806195",
      Amount: 3051059,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 4,
      UserId: "51233570",
      Amount: 2091018.56,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 5,
      UserId: "98466641",
      Amount: 1788388.4,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 6,
      UserId: "56658946",
      Amount: 1477187,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 7,
      UserId: "67030216",
      Amount: 1295153,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 8,
      UserId: "97677431",
      Amount: 1135433.66022,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 9,
      UserId: "49299544",
      Amount: 995955.115857,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 10,
      UserId: "38799071",
      Amount: 847320,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 11,
      UserId: "57739113",
      Amount: 3030317.1,
      Symbol: "trx",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 12,
      UserId: "33386405",
      Amount: 735670,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 13,
      UserId: "83873953",
      Amount: 703246.7,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 14,
      UserId: "93759259",
      Amount: 629950.696,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 15,
      UserId: "36517190",
      Amount: 526390,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 16,
      UserId: "48310159",
      Amount: 414560,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 17,
      UserId: "59450274",
      Amount: 410180.88,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 18,
      UserId: "23940465",
      Amount: 382682,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 19,
      UserId: "58222107",
      Amount: 374134.29,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
    {
      Rank: 20,
      UserId: "17907735",
      Amount: 344168.951146,
      Symbol: "usdt",
      GameType: 0,
      GameId: "",
      RewardTime: "",
      VipLevel: 0,
    },
  ],
});

</script>

<template>
  <div class="rank">
    <div class="rank-header">
      <div class="rank-title">
        <span>最新投注</span>
      </div>
      <div class="rank-menu">
        <div
          class="rank-menu-item"
          :class="{ active: state.rank == 1 }"
          @click="state.rank = 1"
        >
          最新
        </div>
        <div
          class="rank-menu-item"
          :class="{ active: state.rank == 2 }"
          @click="state.rank = 2"
        >
          日榜
        </div>
        <div
          class="rank-menu-item"
          :class="{ active: state.rank == 3 }"
          @click="state.rank = 3"
        >
          週榜
        </div>
        <div
          class="rank-menu-item"
          :class="{ active: state.rank == 4 }"
          @click="state.rank = 4"
        >
          月榜
        </div>
      </div>
    </div>
    <div class="rank-content">
      <div class="rank-table">
        <div
          v-if="state.rank == 1"
          class="new-table-header"
        >
          <div class="new-table-header-item">遊戲</div>
          <div class="new-table-header-item">玩家</div>
          <div class="new-table-header-item">倍數</div>
          <div class="new-table-header-item">返獎</div>
        </div>
        <div
          v-else
          class="rank-table-header"
        >
          <div class="rank-table-header-item">排名</div>
          <div class="rank-table-header-item">玩家</div>
          <div class="rank-table-header-item">投注</div>
        </div>
        <swiper
          v-if="state.rank == 1"
          class="new-table-content"
          :modules="[Autoplay]"
          :slides-per-view="8"
          :autoplay="{
            delay: 1000,
            disableOnInteraction: false,
          }"
          :direction="'vertical'"
        >
          <swiper-slide
            v-for="(item, index) in state.rankList"
            :key="index"
          >
            <div>
              <img :src="common.baseUrl + item.Icon" />
              <span>{{ item.Name }}</span>
            </div>
            <div>{{ item.UserId }}</div>
            <div>{{ item.RewardRate }}x</div>
            <div>
              <span>{{ item.RewardAmount }}</span>
              <img
                class="icon"
                src="../assets/img/usdt-icon.webp"
              />
            </div>
          </swiper-slide>
        </swiper>
        <swiper
          v-else
          class="rank-table-content"
          :modules="[Autoplay]"
          :slides-per-view="8"
          :autoplay="{
            delay: 1000,
            disableOnInteraction: false,
          }"
          :direction="'vertical'"
        >
          <swiper-slide
            v-for="(item, index) in state.rankList"
            :key="index"
          >
            <div>
              <img :src="common.baseUrl + item.Icon" />
              <span>{{ item.Name }}</span>
            </div>
            <div>{{ item.UserId }}</div>
            <div>{{ item.RewardRate }}x</div>
            <div>
              <span>{{ item.RewardAmount }}</span>
              <img
                class="icon"
                src="../assets/img/usdt-icon.webp"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper) {
  position: relative;
  width: 100%;
  height: 100%;
}

.new {
  margin-top: 0.93333rem;
  margin-bottom: 0.66667rem;

  &-table {
    width: 100%;
    margin-top: 0.13333rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
    gap: 0.08rem;

    &-header {
      width: 100%;
      height: 1.22667rem;
      font-size: 0.34667rem;
      background: var(--bg-light-color);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--card-glow);
      margin: 0.06667rem 0;
      border-radius: 0.16rem;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      &-item {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        color: var(font-dark-color);
        font-weight: 650;
        font-size: 0.37333rem;
        justify-content: start;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:first-of-type {
          flex: 0 0 30%;
          min-width: 2.66667rem;
          margin-left: 0.21333rem;
        }

        &:nth-of-type(2) {
          flex: 0 0 25%;
          min-width: 2.13333rem;
          margin-left: 0.21333rem;
        }

        &:nth-of-type(3) {
          flex: 0 0 13%;
          min-width: 0.8rem;
        }

        &:last-of-type {
          justify-content: end;
          flex: 0 0 25%;
          min-width: 1.86667rem;
          margin-right: 0.21333rem;
        }
      }
    }

    &-content {
      :deep(.swiper-slide) {
        width: 100%;
        height: 1.22667rem;
        font-size: 0.34667rem;
        background: var(--bg-light-color);
        margin: 0.06667rem 0;
        border-radius: 0.08rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;

        &>div {
          flex: 1;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: row;
          flex-wrap: nowrap;
          font-size: 0.37333rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          justify-content: start;
          height: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:first-of-type {
            flex: 0 0 30%;
            min-width: 2.66667rem;
            margin-left: 0.21333rem;

            img {
              width: 26px;
              height: 26px;
              object-fit: cover;
              margin-right: 2px;
              border-radius: 3px;
            }

            span {
              margin-left: 2px;
            }
          }

          &:nth-of-type(2) {
            flex: 0 0 25%;
            min-width: 2.13333rem;
            margin-left: 0.21333rem;
          }

          &:nth-of-type(3) {
            flex: 0 0 13%;
            min-width: 0.8rem;
            color: var(--primary-color);
          }

          &:last-of-type {
            justify-content: end;
            flex: 0 0 25%;
            min-width: 1.86667rem;
            margin-right: 0.21333rem;

            span {
              color: var(font-dark-color);
              margin-right: 3px;
            }

            img {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }
}

.rank {
  margin-top: 0.93333rem;
  margin-bottom: 0.66667rem;

  &-header {
    justify-content: space-between;
    margin-bottom: 0.13333rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  &-title {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;

    span {
      text-transform: uppercase;
      font-size: 0.48rem;
      font-weight: 700;
      margin-left: 0.08rem;
    }
  }

  &-menu {
    position: relative;
    border-radius: 0.16rem;
    padding: 0.16rem;
    background: var(--bg-light-color);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 1.38667rem;
      min-height: 0.96rem;
      font-size: 0.32rem;
      text-align: center;
      color: var(--font-primary-color);
      font-weight: 650;
      line-height: 115%;
      word-break: break-all;
      word-wrap: break-word;

      &.active {
        font-weight: 700;
        color: var(--primary-btn-font-color);
        font-size: 0.36rem;
        border-radius: 0.16rem;
        // background: #31343b;
        background-image: linear-gradient(135deg,
            #d4af37 0%,
            #f9f295 45%,
            #e6be8a 50%,
            #f9f295 55%,
            #d4af37 100%);
        background-color: transparent;
        border: 1px solid #b8860b;
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.4);
      }
    }
  }

  &-content {
    :deep(.swiper-wrapper) {
      height: 9.46667rem;
      width: 100%;
      font-size: 0.32rem;
    }
  }

  &-table {
    width: 100%;
    margin-top: 0.13333rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
    gap: 0.08rem;

    &-header {
      width: 100%;
      height: 1.22667rem;
      font-size: 0.34667rem;
      background: var(--bg-light-color);
      margin: 0.06667rem 0;
      border-radius: 0.08rem;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      &-item {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        color: var(font-dark-color);
        font-weight: 650;
        font-size: 0.37333rem;
        justify-content: start;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:first-of-type {
          flex: 0 0 30%;
          min-width: 2.66667rem;
          margin-left: 0.21333rem;
        }

        &:nth-of-type(2) {
          flex: 0 0 25%;
          min-width: 2.13333rem;
          margin-left: 0.21333rem;
        }

        &:nth-of-type(3) {
          flex: 0 0 13%;
          min-width: 0.8rem;
        }

        &:last-of-type {
          justify-content: end;
          flex: 0 0 25%;
          min-width: 1.86667rem;
          margin-right: 0.21333rem;
        }
      }
    }

    &-content {
      :deep(.swiper-slide) {
        width: 100%;
        height: 1.22667rem;
        font-size: 0.34667rem;
        background: var(--bg-light-color);
        margin: 0.06667rem 0;
        border-radius: 0.08rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;

        &>div {
          flex: 1;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: row;
          flex-wrap: nowrap;
          font-size: 0.37333rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          justify-content: start;
          height: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:first-of-type {
            flex: 0 0 30%;
            min-width: 2.66667rem;
            margin-left: 0.21333rem;

            img {
              width: 26px;
              height: 26px;
              object-fit: cover;
              margin-right: 2px;
              border-radius: 3px;
            }

            span {
              margin-left: 2px;
            }
          }

          &:nth-of-type(2) {
            flex: 0 0 25%;
            min-width: 2.13333rem;
            margin-left: 0.21333rem;
          }

          &:nth-of-type(3) {
            flex: 0 0 13%;
            min-width: 0.8rem;
            color: var(--primary-color);
          }

          &:last-of-type {
            justify-content: end;
            flex: 0 0 25%;
            min-width: 1.86667rem;
            margin-right: 0.21333rem;

            span {
              color: var(font-dark-color);
              margin-right: 3px;
            }

            img {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
