import { Fonts } from '@/shared/constants/themes';
import { useTheme } from '@/shared/hooks';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CirtsxcleIcon from './CirtsxcleIcon';
import FontSize from '@/shared/constants/font-scale';
import { Spacing } from '@/shared/constants/spacing';

interface IProps {
  tabName: string;
  focusedTab: any;
  onTabPress: any;
  routes: {
    key: string;
    title: string;
  }[];
  summaries?: any[];
}

const TabBarHeader = memo(
  ({ summaries, tabName, focusedTab, onTabPress, routes }: IProps) => {
    const { colors } = useTheme();

    const num = React.useMemo(
      () =>
        summaries?.find(
          (e) => e?.status === routes.find((el) => el.title === tabName)?.key
        )?.amount ?? 0,
      [routes, summaries, tabName]
    );

    return (
      <TouchableOpacity
        style={{
          borderBottomColor: focusedTab === tabName ? '#0A9345' : 'transparent',
          borderBottomWidth: 2,
        }}
        onPress={() => {
          onTabPress(tabName);
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color:
                focusedTab === tabName ? colors.textGray : colors.textDarkGray,
              fontFamily: Fonts.Bold,
              textTransform: 'none',
              fontSize: FontSize.FONT_SIZE_14,
              marginBottom: Spacing.SPACING_3,
            }}
          >
            {tabName}
          </Text>

          <CirtsxcleIcon num={num} />
        </View>
      </TouchableOpacity>
    );
  }
);

export default TabBarHeader;
