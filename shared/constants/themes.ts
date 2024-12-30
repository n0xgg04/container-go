import { createTheme } from '@shopify/restyle';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';

export const insetPadding = Spacing.SPACING_17;

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  primary: '#02BE53',
  warn: '#FD5D57',
  error: '#F44336',
  bgDarkEFE: '#EFEFEF',
  successBorder: '#00AD4B',
  successBackground: '#E8F8EF',
  darkGreen: '#0b9346',
  secondaryGreen: '#00AD4B',

  lightBackground: '#FAFAFA',
  textGray: '#3D3D3D',
  textYellow: '#F4A100',
  textOceanBlue: '#1699C2',
  textGreen: '#0A9345',
  textDarkGray: '#808080',
  primaryBlack: '#3D3D3D',
  secondaryGray: 'rgb(119,114,114)',
  tipBackground: '#F1F1F1',
  mapLine: '#146FB1',
  mapMark: '#02BE53',
  mapCircleIn: 'rgba(95,194,226,0.45)',
  mapCircleIn2: 'rgba(95,194,226,0.25)',

  buttonGray: '#F1F1F1',
  buttonGray2: '#ECECEC',

  cardGray: '#FAFAFA',
  gray: '#808080',

  borderGray: '#E2E2E2',
  btnGray: '#E2E2E2',

  dropdownBackground: '#F2F3FB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#3D3D3D',
  white: '#FFFFFF',
  pink: '#F62E56',
  blue: '#1699C2',
};

export const Fonts = {
  Regular: 'Inter_400Regular',
  Bold: 'Inter_600SemiBold',
};

const lightTheme = createTheme({
  colors: {
    mainBackground: palette.lightBackground,
    primaryBackground: palette.darkGreen,
    cardPrimaryBackground: palette.white,
    buttonBackground: palette.primary,
    textPrimary: palette.purplePrimary,
    textButtonFilled: palette.white,
    ...palette,
  },
  spacing: {
    s: Spacing.SPACING_5,
    m: Spacing.SPACING_16,
    l: Spacing.SPACING_24,
    xl: Spacing.SPACING_40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: FontSize.FONT_SIZE_36,
    },
    body: {
      fontSize: FontSize.FONT_SIZE_16,
      lineHeight: FontSize.FONT_SIZE_24,
    },
    defaults: {},
  },
  roundedVariant: {
    defaults: {
      borderRadius: undefined,
    },
    small: {
      borderRadius: Spacing.SPACING_4,
    },
    medium: {
      borderRadius: Spacing.SPACING_8,
    },
    large: {
      borderRadius: Spacing.SPACING_12,
    },
    xl: {
      borderRadius: Spacing.SPACING_16,
    },
    full: {
      borderRadius: 999,
    },
  },
});

export type Theme = typeof lightTheme;

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
  },
};

export { lightTheme, darkTheme };
