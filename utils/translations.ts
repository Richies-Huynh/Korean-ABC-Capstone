export type Language = 'english' | 'korean';

export interface Translations {
  [key: string]: string;
}

export interface LanguageData {
  [language: string]: Translations;
}

// Define all text keys and their translations
const translations: LanguageData = {
  english: {
    // Home screen
    'scan_item': 'Scan Item',
    'select_country': 'Select a Country',
    'object_recognized': 'Object Recognized',
    'confidence': 'Confidence',
    'recycling_info': 'Recycling Information',
    
    // Settings screen
    'settings': 'Settings',
    'language': 'Language',
    
    // Common
    'cancel': 'Cancel',
    'close': 'Close',
    'ok': 'OK',
    'error': 'Error',
    'loading': 'Loading...',
    'source': 'Source',
    
    // Object recognition
    'plastic_bottle': 'Plastic Bottle',
    'aluminum_can': 'Aluminum Can',
    'glass_bottle': 'Glass Bottle',
    'paper': 'Paper',
    'cardboard': 'Cardboard',
    'metal_can': 'Metal Can',
    'pringles_can': 'Pringles Can',
    'to_go_box': 'To-Go Box',
    'coat_hanger': 'Coat Hanger',
    'umbrella': 'Umbrella',
    'usa': 'USA',
    'korea': 'Korea',
    
    // Recycling messages
    'recycle_plastic': 'This item can be recycled. Please empty and rinse before placing in your recycling bin.',
    'recycle_aluminum': 'This item can be recycled. Please empty and rinse before placing in your recycling bin.',
    'recycle_glass': 'This item can be recycled. Please empty and rinse before placing in your recycling bin.',
    'recycle_paper': 'This item can be recycled. Please ensure it is clean and dry.',
    'recycle_cardboard': 'This item can be recycled. Please flatten and ensure it is clean and dry.',
    'recycle_metal': 'This item can be recycled. Please empty and rinse before placing in your recycling bin.',
    'recycle_unknown': 'Recycling information not available for this item.',
    // how to recycle in USA, English
    'recycle_pringles_can_usa': 'In the USA, if the can is mostly cardboard (not shiny foil inside), you can put the cardboard part in the recycling bin. Remove the metal bottom and plastic lid and throw them in the trash. The foil lining is not recyclable. Throw the rest in the trash.',
    'recycle_to_go_box_usa': 'In the USA, if the to-go box is clean and made of paper or cardboard, recycle it. If it is coated with plastic or is soiled with food, throw it in the trash.',
    'recycle_coat_hanger_usa': 'In the USA, metal hangers can often be recycled at scrap metal facilities or returned to dry cleaners. Plastic and wooden hangers are usually not accepted in curbside recycling. Reuse or throw in the trash.',
    'recycle_umbrella_usa': 'In the USA, separate the metal parts from the fabric. Recycle the metal at a scrap metal facility. Throw the fabric and plastic parts in the trash.',
    // how to recycle in Korea, English
    'recycle_pringles_can_korea': 'In Korea, if the Pringles can is mostly made of paper, separate the paper part and put it in the recycling bin. The metal bottom, plastic lid, and inner foil lining should be thrown in the trash.',
    'recycle_to_go_box_korea': 'In Korea, if the disposable to-go box is made of paper or cardboard and is clean, put it in the recycling bin. If it has a plastic coating or is soiled with food, throw it in the trash.',
    'recycle_coat_hanger_korea': 'In Korea, metal hangers should be disposed of as scrap metal. Plastic or wooden hangers are difficult to recycle, so throw them in the trash.',
    'recycle_umbrella_korea': 'In Korea, metal hangers should be disposed of as scrap metal. Plastic or wooden hangers are difficult to recycle, so throw them in the trash.',
  },
  korean: {
    // Home screen
    'scan_item': '물건 스캔',
    'select_country': '국가 선택',
    'object_recognized': '물체 인식됨',
    'confidence': '신뢰도',
    'recycling_info': '재활용 정보',
    
    // Settings screen
    'settings': '설정',
    'language': '언어',
    
    // Common
    'cancel': '취소',
    'close': '닫기',
    'ok': '확인',
    'error': '오류',
    'loading': '로딩 중...',
    'source': '출처',
    
    // Object recognition
    'plastic_bottle': '플라스틱 병',
    'aluminum_can': '알루미늄 캔',
    'glass_bottle': '유리 병',
    'paper': '종이',
    'cardboard': '골판지',
    'metal_can': '금속 캔',
    'pringles_can': '프링글스 캔',
    'to_go_box': '토-고 박스',
    'coat_hanger': '코트 후크',
    'umbrella': '우산',
    'usa': '미국',
    'korea': '대한민국',
    // Recycling messages
    'recycle_plastic': '이 물건은 재활용할 수 있습니다. 재활용함에 넣기 전에 비우고 헹구어 주세요.',
    'recycle_aluminum': '이 물건은 재활용할 수 있습니다. 재활용함에 넣기 전에 비우고 헹구어 주세요.',
    'recycle_glass': '이 물건은 재활용할 수 있습니다. 재활용함에 넣기 전에 비우고 헹구어 주세요.',
    'recycle_paper': '이 물건은 재활용할 수 있습니다. 깨끗하고 건조한 상태로 보관해 주세요.',
    'recycle_cardboard': '이 물건은 재활용할 수 있습니다. 펴서 깨끗하고 건조한 상태로 보관해 주세요.',
    'recycle_metal': '이 물건은 재활용할 수 있습니다. 재활용함에 넣기 전에 비우고 헹구어 주세요.',
    'recycle_unknown': '이 물건에 대한 재활용 정보를 사용할 수 없습니다.',
    // how to recycle in USA, Korean
    'recycle_pringles_can_usa': '프링글스 캔이 대부분 종이로 되어 있다면, 종이 부분만 분리하여 재활용함에 넣으세요. 금속 바닥과 플라스틱 뚜껑, 내부 은박 코팅은 일반 쓰레기로 버리세요.',
    'recycle_to_go_box_usa': '종이 또는 골판지로 된 일회용 도시락 용기는 깨끗하면 재활용함에 넣으세요. 플라스틱 코팅이 있거나 음식물로 오염된 경우 일반 쓰레기로 버리세요.',
    'recycle_coat_hanger_usa': '금속 옷걸이는 고철로 분리 배출하거나 세탁소에 반납하세요. 플라스틱이나 나무 옷걸이는 일반적으로 재활용이 어렵습니다. 재사용하거나 일반 쓰레기로 버리세요.',
    'recycle_umbrella_usa': '우산의 금속 부분은 고철로 분리 배출하고, 천과 플라스틱 부분은 일반 쓰레기로 버리세요.',
    // how to recycle in Korea, Korean
    'recycle_pringles_can_korea': '프링글스 캔이 대부분 종이로 되어 있다면, 종이 부분만 분리하여 재활용함에 넣으세요. 금속 바닥과 플라스틱 뚜껑, 내부 은박 코팅은 일반 쓰레기로 버리세요.',
    'recycle_to_go_box_korea': '종이 또는 골판지로 된 일회용 도시락 용기는 깨끗하면 재활용함에 넣으세요. 플라스틱 코팅이 있거나 음식물로 오염된 경우 일반 쓰레기로 버리세요.',
    'recycle_coat_hanger_korea': '금속 옷걸이는 고철로 분리 배출하세요. 플라스틱이나 나무 옷걸이는 재활용이 어려우니 일반 쓰레기로 버리세요.',
    'recycle_umbrella_korea': '우산의 금속 부분은 고철로 분리 배출하고, 천과 플라스틱 부분은 일반 쓰레기로 버리세요.',
  },
};

// Global language state
let currentLanguage: Language = 'english';

/**
 * Set the current language for the app
 * @param language - The language to set
 */
export const setLanguage = (language: Language): void => {
  currentLanguage = language;
};

/**
 * Get the current language
 * @returns The current language
 */
export const getLanguage = (): Language => {
  return currentLanguage;
};

/**
 * Get a translated string for the current language
 * @param key - The translation key
 * @returns The translated string, or the key if translation not found
 */
export const t = (key: string): string => {
  const languageData = translations[currentLanguage];
  if (!languageData) {
    console.warn(`Language '${currentLanguage}' not found`);
    return key;
  }
  
  const translation = languageData[key];
  if (!translation) {
    console.warn(`Translation key '${key}' not found for language '${currentLanguage}'`);
    return key;
  }
  
  return translation;
};

/**
 * Get a translated string for a specific language
 * @param key - The translation key
 * @param language - The language to use
 * @returns The translated string, or the key if translation not found
 */
export const tForLanguage = (key: string, language: Language): string => {
  const languageData = translations[language];
  if (!languageData) {
    console.warn(`Language '${language}' not found`);
    return key;
  }
  
  const translation = languageData[key];
  if (!translation) {
    console.warn(`Translation key '${key}' not found for language '${language}'`);
    return key;
  }
  
  return translation;
};

/**
 * Get all available languages
 * @returns Array of available language codes
 */
export const getAvailableLanguages = (): Language[] => {
  return Object.keys(translations) as Language[];
};

/**
 * Check if a language is supported
 * @param language - The language to check
 * @returns True if the language is supported
 */
export const isLanguageSupported = (language: string): language is Language => {
  return language in translations;
}; 