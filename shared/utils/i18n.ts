import { getLocales } from 'expo-localization';

const deviceLanguage = getLocales()[0].languageCode;
export { deviceLanguage };
