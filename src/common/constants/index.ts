export const MAIN_MODULES = {
  admin: 'Admin',
  customer: 'Customer',
  driver: 'Driver',
} as const;

export enum LANGUAGES {
  EN = 'en-US',
  AR = 'ar-SY',
  KU = 'ku',
}

export const DEFAULT_LANGUAGE = LANGUAGES.EN;
