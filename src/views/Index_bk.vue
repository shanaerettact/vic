<script setup>
import { ref, reactive, inject } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import Footer from "@/components/Footer.vue";
import FooterMenu from "@/components/FooterMenu.vue";
import GameCategory from "./GameCategory.vue";
import Rank from "../components/Rank.vue";


const modules = [Autoplay, Pagination];

const common = inject("common");

const state = reactive({
  banner: [],
  group: [],
  game: [],
  hall: [],
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

const homeInit = async () => {
  try {
    const res = await common.baseAjax("POST", "/site/home");
    if (res.code == 1) {
      state.banner = res.data.banner;
      state.group = res.data.group;
      state.hall = res.data.hall;
    }
  } catch (error) {
    console.log(error);
  }
};

const randomNumber = () => {
  return Math.floor(Math.random() * 900) + 1000;
};

homeInit();
</script>

<template>
  <div>
    <swiper
      :modules="modules"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
    >
      <swiper-slide
        v-for="(item, index) in state.banner"
        :key="index"
      >
        <a
          :href="item.url"
          :target="item.blank == '2' ? '_blank' : '_self'"
        >
          <img
            class="banner"
            :src="common.baseUrl + item.img"
          />
        </a>
      </swiper-slide>
    </swiper>

    <main>
      <!-- <GameCategory :gameTypeCode="'live_game'" /> -->

      <div class="games">
        <div
          v-for="(item, index) in state.group"
          :key="index"
          class="games-items"
        >
          <div class="games-items-top">
            <div class="games-items-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="games-items-online">
              <van-image
                width="18"
                height="18"
                src="data:image/webp;base64,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"
              />
              <div class="number">
                {{ randomNumber() }}
                <span>在玩</span>
              </div>
            </div>
          </div>

          <div class="games-items-bottom">
            <div class="games-items-group">
              <div
                v-for="(gameItem, gameIndex) in item.game"
                :key="gameIndex"
                class="games-item"
                @click="common.toGame(gameItem.code, gameItem.url)"
              >
                <div
                  class="games-item-item"
                >
                  <div class="games-item-text">
                    <div>{{ gameItem.title }}</div>
                    <span class="games-item-cd">{{ gameItem.code }}</span>
                  </div>
                  <van-image :src="gameItem.image" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

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

    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
main {
  padding: 0.32rem 0.26667rem 0.53333rem;
}

:deep(.swiper) {
  position: relative;
  width: 100%;
  height: 100%;
}

:deep(.swiper .swiper-wrapper) {
  height: 100%;
}

:deep(.swiper .swiper-wrapper .swiper-slide) {
  width: 100%;
  overflow: hidden;
}

:deep(.swiper .swiper-wrapper .swiper-slide .banner) {
  width: calc(100% - 0.02667rem);
  height: 100%;
}

:deep(.swiper .swiper-pagination) {
  margin-bottom: 0.08rem;
}

:deep(.swiper .swiper-pagination-bullets) {
  bottom: 0.10667rem !important;
}

:deep(.swiper .swiper-pagination-bullet) {
  width: 0.34667rem;
  height: 0.16rem;
  border-radius: 0.50667rem;
  background: rgba(0, 0, 0, 0.4);
  opacity: 1;
  position: relative;
}

:deep(.swiper .swiper-pagination-bullet-active) {
  width: 1.22667rem;
  height: 0.16rem;
  border-radius: 0.50667rem;
  background: rgba(0, 0, 0, 0.4);
}

:deep(.swiper .swiper-pagination-bullet-active::before) {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 0.50667rem;
  background: #36ba73;
  animation: move 6s linear;
}

@keyframes move {
  0% {
    width: 0;
  }

  to {
    width: 100%;
  }
}

:deep(.swiper .swiper-wrapper .swiper-pre) {
  width: 0.34667rem;
  height: 0.16rem;
  border-radius: 0.50667rem;
  background: #36ba73;
}

.games {
  margin-top: 0.37333rem;

  &-items {
    position: relative;
    margin-top: 0.4rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;

    &-top {
      width: 100%;
      margin-bottom: 0.26667rem;
      justify-content: space-between;
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
      font-size: 0.48rem;
      font-weight: 400;
      justify-content: center;

      span {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.48rem;
        margin-left: 0.08rem;
      }
    }

    &-online {
      margin-top: 0.08rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      .number {
        margin-left: 0.08rem;
        color: #fff;
        text-align: center;
        font-size: 0.32rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        span {
          margin-left: 0.08rem;
          color: #b7bbcc;
          font-weight: 650;
        }
      }
    }

    &-bottom {
      position: relative;
      width: 100%;
      display: flex;
      overflow-x: visible;
      overflow-y: hidden;
    }

    &-group {
      width: auto;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }

  &-item {
    position: relative;
    width: 2.93333rem;
    min-height: 4.16rem;
    overflow: hidden;

    &-item {
      display: block;
      background: transparent;
      overflow: hidden;
      position: relative;
      // z-index: 0;
    }

    &:not(:last-child) {
      margin-right: 0.13333rem;
    }

    .van-image {
      border-radius: 0.21333rem;
      overflow: hidden;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(transparent 60%, #000);
      z-index: 0;
    }
  }

  &-item-text {
    position: absolute;
    left: 0;
    right: 0;
    bottom: .2rem;
    text-align: center;
    line-height: 1;
    z-index: 1;
  }

  &-item-cd {
    font-size: .3rem;
  }
}

.new {
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
    background: #191a1c;
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
      color: #98a7b5;
      font-weight: 650;
      line-height: 115%;
      word-break: break-all;
      word-wrap: break-word;

      &.active {
        font-weight: 700;
        color: #fff;
        font-size: 0.36rem;
        border-radius: 0.16rem;
        background: #31343b;
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
      background: #24262b;
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
        color: #98a7b5;
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
        background: #24262b;
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
            color: #86f455;
          }

          &:last-of-type {
            justify-content: end;
            flex: 0 0 25%;
            min-width: 1.86667rem;
            margin-right: 0.21333rem;

            span {
              color: #98a7b5;
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
    background: #191a1c;
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
      color: #98a7b5;
      font-weight: 650;
      line-height: 115%;
      word-break: break-all;
      word-wrap: break-word;

      &.active {
        font-weight: 700;
        color: #fff;
        font-size: 0.36rem;
        border-radius: 0.16rem;
        background: #31343b;
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
      background: #24262b;
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
        color: #98a7b5;
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
        background: #24262b;
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
            color: #86f455;
          }

          &:last-of-type {
            justify-content: end;
            flex: 0 0 25%;
            min-width: 1.86667rem;
            margin-right: 0.21333rem;

            span {
              color: #98a7b5;
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
