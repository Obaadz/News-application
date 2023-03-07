import Cookies from "js-cookie";

const MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export function getLocale() {
  return Cookies.get("locale");
}

export function setLocale(locale: string) {
  Cookies.set("locale", locale, { expires: MAX_AGE });
}

export function handleLocaleChange(locale: string, router: any) {
  setLocale(locale);
  router.push(router.asPath, router.asPath, { locale });
}
