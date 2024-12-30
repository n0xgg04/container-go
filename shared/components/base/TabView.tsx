import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import {
  SceneMap,
  TabBar,
  TabView as TabViewNative,
} from 'react-native-tab-view';
import { useTheme } from '@/shared/hooks';
import { Fonts } from '@/shared/constants/themes';
import { Spacing } from '@/shared/constants/spacing';
import { Box } from '@/shared/components/base/Box';

type Props = {
  tabs: {
    key: string;
    label: string;
    numberColor?: string | undefined;
    number?: string | number | undefined;
    node: () => React.JSX.Element;
  }[];
  fit?: boolean;
};

export default function TabView({
  tabs,
  style,
  fit = false,
  ...props
}: Props &
  Omit<
    React.ComponentProps<typeof TabViewNative>,
    'navigationState' | 'renderScene' | 'onIndexChange' | 'onTabChange'
  >) {
  const layout = useWindowDimensions();
  const { colors } = useTheme();

  const renderScene = React.useMemo(() => {
    let result = {};
    tabs.forEach(({ key, node }) => {
      Object.assign(result, {
        [key]: node,
      });
    });
    return SceneMap(result as { [k: string]: any });
  }, [tabs]);

  const [index, setIndex] = React.useState(0);

  const routes = React.useMemo(() => {
    return tabs.map(({ label, key }) => ({
      key,
      title: label,
    }));
  }, [tabs]);

  return (
    <Box>
      <TabViewNative
        {...props}
        swipeEnabled={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => {
          return (
            <TabBar
              {...props}
              style={{
                backgroundColor: 'transparent',
              }}
              activeColor={colors.primaryBlack}
              labelStyle={{
                color: colors.textDarkGray,
                fontFamily: Fonts.Bold,
                textTransform: 'none',
              }}
              indicatorStyle={{
                backgroundColor: colors.primaryBackground,
                paddingTop: 0,
                marginBottom: Spacing.SPACING_12,
              }}
              tabStyle={{
                width: !fit ? 'auto' : undefined,
              }}
              scrollEnabled={!fit}
              key={props.navigationState.index}
            />
          );
        }}
      />
    </Box>
  );
}
