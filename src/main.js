import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import { Lazyload } from "vant";
import i18n from "./lang/lang";
import "./style.css";
import "vant/lib/index.css";



createApp(App).use(router).use(Vant).use(Lazyload).use(i18n).mount("#app");






