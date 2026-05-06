import en from "./en.js";
import pt from "./pt.js";

const languages = {
  en,
  pt
};

export function getLang(lang) {
  return languages[lang] || languages["en"];
}

export function t(lang, key) {
  const dict = getLang(lang);
  return dict[key] || key;
}