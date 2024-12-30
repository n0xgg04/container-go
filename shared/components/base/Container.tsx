import * as React from 'react';
import { Box } from '@/shared/components/base/Box';
import { useTheme } from '@/shared/hooks';
import { SafeAreaView, ScrollView } from 'moti';
import { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAnimatedScrollHandler } from 'react-native-reanimated';
import { useScaffoldContext } from '@/shared/provider/ScaffordContextProvider';

type Props = {
  containerStyle?: React.ComponentProps<typeof Box>['style'];
  bgColor?: string;
  safeArea?: boolean;
  disableScroll?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
};

const Container = React.memo<
  React.PropsWithChildren<Props> &
    React.ComponentProps<typeof ScrollView> &
    React.ComponentProps<typeof Box>
>(function ({
  containerStyle,
  children,
  bgColor = 'mainBackground',
  safeArea = false,
  disableScroll = false,
  isRefreshing = false,
  onRefresh,
  ...props
}) {
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { offsetY } = useScaffoldContext();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    offsetY.value = event.contentOffset.y;
  });

  const render = useMemo(() => {
    return (
      <ScrollView
        horizontal={false}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        refreshControl={
          onRefresh ? (
            <RefreshControl
              tintColor="white"
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          ) : undefined
        }
        scrollEnabled={!disableScroll}
        style={{
          flex: 1,
          backgroundColor: colors[bgColor as keyof typeof colors],
        }}
        {...props}
        bounces={false}
        bouncesZoom={false}
      >
        <Box
          style={[
            {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              paddingTop: safeAreaInsets.top,
              minHeight: '100%',
              backgroundColor: colors[bgColor as keyof typeof colors],
            },
            containerStyle,
          ]}
          {...props}
        >
          {children}
        </Box>
      </ScrollView>
    );
  }, [
    scrollHandler,
    onRefresh,
    isRefreshing,
    disableScroll,
    colors,
    bgColor,
    props,
    safeAreaInsets.top,
    containerStyle,
    children,
  ]);

  if (safeArea) {
    return <SafeAreaView>{render}</SafeAreaView>;
  }
  return render;
});
Container.displayName = 'Container';
export { Container };
