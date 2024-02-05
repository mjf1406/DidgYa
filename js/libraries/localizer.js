const userLang = getUserLanguage();
const lang = await fetchLocalJson(`assets/localization/${userLang}`);
console.log("🚀 ~ lang:", lang);
