import * as React from 'react';
import { useTheme } from '@/shared/hooks';
import { Box, Container, Stack, Typography } from '@/shared/components/base';
import { StatusBar } from 'expo-status-bar';
import {
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import {
  ScaffoldContextProvider,
  useScaffoldContext,
} from '@/shared/provider/ScaffordContextProvider';
import { SafeAreaView } from 'moti';
import useLayoutState from '@/states/hooks/useLayoutState';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { insetPadding } from '@/shared/constants/themes';

type BodyProps = {
  disableScroll?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
};
const Body = React.memo<React.PropsWithChildren & BodyProps>(
  ({ children, disableScroll = false, isRefreshing, onRefresh }) => {
    const { colors } = useTheme();
    return (
      <View
        style={{
          position: 'relative',
          flex: 1,
        }}
      >
        <ScaffoldContextProvider>
          <Container
            isRefreshing={isRefreshing}
            onRefresh={onRefresh}
            disableScroll={disableScroll}
            bgColor="primaryBackground"
          >
            <StatusBar style="light" animated />
            {children}
          </Container>
        </ScaffoldContextProvider>
      </View>
    );
  }
);

Body.displayName = 'Body';

export const AppBarContent = React.memo<React.PropsWithChildren & AppBarProps>(
  ({ children, leftSection }) => {
    const [, setState] = useLayoutState();
    const onLayout = (e: LayoutChangeEvent) => {
      setState((pre) => ({
        ...pre,
        topBarHeight: e.nativeEvent.layout.height,
      }));
    };

    return (
      <Stack
        onLayout={onLayout}
        direction="row"
        className="justify-center relative items-center"
        style={{
          marginTop: Spacing.SPACING_15,
          marginBottom: Spacing.SPACING_20,
        }}
      >
        <Box
          style={{
            marginLeft: Spacing.SPACING_10,
            marginTop: -Spacing.SPACING_1,
          }}
          className="absolute top-0 left-0 flex justify-center items-center"
        >
          {leftSection}
        </Box>
        <Typography
          fontSize={FontSize.FONT_SIZE_18}
          weight="bold"
          className="text-center"
        >
          {children}
        </Typography>
      </Stack>
    );
  }
);

AppBarContent.displayName = 'AppBarContent';

type AppBarProps = {
  leftSection?: React.ReactNode;
};
const AppBar = React.memo<React.PropsWithChildren & AppBarProps>(
  ({ children, leftSection }) => {
    const { offsetY } = useScaffoldContext();
    return (
      <SafeAreaView>
        <AppBarContent leftSection={leftSection}>{children}</AppBarContent>
      </SafeAreaView>
    );
  }
);

AppBar.displayName = 'AppBar';

const MainBox = React.memo<React.PropsWithChildren>(({ children }) => {
  const theme = useTheme();
  const [{ topBarHeight }] = useLayoutState();
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  return (
    <Box
      style={[
        styles.mainBox,
        {
          minHeight: height - topBarHeight,
        },
      ]}
      bgColor={theme.colors.mainBackground}
      className="w-full"
    >
      {children}
    </Box>
  );
});

MainBox.displayName = 'MainBox';

const Scaffold = Object.assign(Body, {
  AppBar,
  MainBox,
});

Scaffold.displayName = 'Scaffold';

export default Scaffold;

const styles = StyleSheet.create({
  mainBox: {
    height: '100%',
    borderTopRightRadius: Spacing.SPACING_24,
    borderTopLeftRadius: Spacing.SPACING_24,
    paddingVertical: Spacing.SPACING_32,
    paddingHorizontal: insetPadding,
    flexGrow: 1,
  },
});
