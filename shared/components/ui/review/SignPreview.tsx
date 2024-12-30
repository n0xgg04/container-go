import * as React from 'react';
import { Image } from 'expo-image';
import useSignState from '@/states/hooks/useSignState';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';

export default function SignPreview() {
  const [{ signBase64, signFile }] = useSignState();
  const { colors } = useTheme();
  const [base64WithName, setBase64WithName] = React.useState('');

  return (
    <Image
      source={{ uri: `${signBase64}` }}
      style={{
        width: '100%',
        height: Spacing.SPACING_200,
        borderWidth: Spacing.SPACING_1,
        borderColor: colors.borderGray,
        borderRadius: Spacing.SPACING_8,
      }}
    />
  );
}
