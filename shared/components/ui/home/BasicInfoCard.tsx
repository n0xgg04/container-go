import * as React from 'react';
import { Typography } from '@/shared/components/base';
import DistanceIcon from '@/assets/images/svg/DistanceIcon';
import PlateIcon from '@/assets/images/svg/PlateIcon';
import ContIcon from '@/assets/images/svg/ContIcon';
import { useTheme } from '@/shared/hooks';
import { Spacing } from '@/shared/constants/spacing';
import { View } from 'react-native';

type Props = {
  distance: string;
  plate: string;
  type: string;
};
const BasicInfoCard = React.memo(({ distance, type, plate }: Props) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.cardGray,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: Spacing.SPACING_1,
        borderColor: colors.borderGray,
        borderRadius: Spacing.SPACING_8,
        paddingVertical: Spacing.SPACING_6,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          alignItems: 'center',
          gap: Spacing.SPACING_1,
        }}
      >
        <DistanceIcon />
        <Typography fontSize={Spacing.SPACING_14} color="black" weight="bold">
          {distance}km
        </Typography>
      </View>
      <View
        style={{
          flexGrow: 1,
          alignItems: 'center',
          gap: Spacing.SPACING_4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <PlateIcon />
        <Typography
          style={{
            paddingTop: Spacing.SPACING_3,
          }}
          fontSize={Spacing.SPACING_14}
          color="black"
          weight="bold"
        >
          {plate}
        </Typography>
      </View>
      <View
        style={{
          width: '33%',
          alignItems: 'center',
          gap: Spacing.SPACING_4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ContIcon />
        <Typography
          fontSize={Spacing.SPACING_14}
          numberOfLines={1}
          color="black"
          weight="bold"
        >
          {type}
        </Typography>
      </View>
    </View>
  );
});

export default BasicInfoCard;
