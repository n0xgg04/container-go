import { useFonts } from 'expo-font';
import { FONT_FAMILIES } from '@/shared/constants/font-family';

export function useLoadFontFamily() {
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FONT_FAMILIES,
  });

  return { isLoading: !loaded };
}
