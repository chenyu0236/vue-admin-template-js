import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en.js' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN.js'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import eventBus from '@/utils/eventBus'

Vue.use(VueI18n)

const messages = {
  en: {
    app: {},
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    app: {},
    ...zhLocale,
    ...elementZhLocale
  }
}


export function getLanguage() {
  const sessionLanguage = sessionStorage.getItem('language')
  if (sessionLanguage) return sessionLanguage

  // if has not choose language
  let language = "en";
  const browserLanguage = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (browserLanguage.indexOf(locale) > -1) {
      language = locale
    }
  }
  return language
}


export function fillApp(customLanguage) {
  Object.keys(customLanguage).forEach(langKey => {
    let theLanguage = customLanguage[langKey]
    let currentLanguage = messages[langKey]

    currentLanguage = Object.assign(currentLanguage, theLanguage);
  })
}

export const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

eventBus.$on("setLanguage", res => {
  i18n.locale = res;
});