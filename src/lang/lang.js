import { createI18n } from "vue-i18n";
import tw from './tw.json'
import en from './en.json'
import cn from './cn.json'

let locale = "tw"

if(localStorage.getItem("lang")){
  locale = localStorage.getItem("lang")
}

const i18n = createI18n({
  legacy: false,
  locale,
  messages: {
    tw: {
      message: tw
    },
    en: {
      message: en
    },
    cn: {
      message: cn
    }
  }
})

export default i18n