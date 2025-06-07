import { createI18n } from 'vue-i18n';
import message from './common.json';

// default locale
const DEFAULT_LOCALE = 'zh';
let locale = DEFAULT_LOCALE;

if (localStorage.getItem('i18nLang')) {
    const localeData = localStorage.getItem('i18nLang');
    locale = localeData !== null ? localeData : DEFAULT_LOCALE;
} else {
    localStorage.setItem('i18nLang', locale);
}

const i18n = new createI18n({
    locale,
    messages: message,
    fallbackLocale: 'zh',
});

export { i18n };
