import * as React from 'react';
import { Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import IconButton from '@/shared/components/base/IconButton';
import InfoIcon from '@/assets/images/svg/InfoIcon';
import { GestureResponderEvent, View } from 'react-native';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  id: string;
  onPress:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
};
const ContainerInfoHeader = React.memo(({ id, onPress }: Props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: Spacing.SPACING_5,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          fontSize={FontSize.FONT_SIZE_12}
          color="textDarkGray"
          style={{
            paddingBottom: Spacing.SPACING_1,
            textTransform: 'uppercase',
          }}
        >
          CONTAINER ID:
        </Typography>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: Spacing.SPACING_5,
          }}
        >
          <Typography
            color="textDarkGray"
            fontSize={FontSize.FONT_SIZE_14}
            weight="bold"
          >
            #{id}
          </Typography>
        </View>
      </View>
      <IconButton onPress={onPress} size={40}>
        <InfoIcon />
      </IconButton>
    </View>
  );
});

export default ContainerInfoHeader;
