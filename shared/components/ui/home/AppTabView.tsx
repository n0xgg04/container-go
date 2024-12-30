import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Dimensions, FlatList, ListRenderItem, Pressable } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';
import FontSize from '@/shared/constants/font-scale';
import { useTransition } from 'react';
import { insetPadding } from '@/shared/constants/themes';

type Props = {
  tabs: {
    label: string;
    subtitle: string;
    amount: number;
  }[];
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
};
const AppTabView = React.memo(({ tabs, tabIndex, setTabIndex }: Props) => {
  const { colors } = useTheme();
  const [pending, startTransition] = useTransition();

  const render: ListRenderItem<{
    label: string;
    subtitle: string;
    amount: number;
  }> = React.useCallback(
    ({ item, index }) => (
      <TabButton
        setTabIndex={setTabIndex}
        tabIndex={tabIndex}
        key={index}
        label={item.label}
        subtitle={item.subtitle}
        amount={item.amount}
        colors={colors}
        index={index}
        pending={pending}
        startTransition={startTransition}
      />
    ),
    [colors, pending, setTabIndex, tabIndex]
  );

  const interval = React.useMemo(() => {
    return (
      (Dimensions.get('screen').width -
        insetPadding * 2 -
        Spacing.SPACING_5 * 2) /
      2
    );
  }, []);

  return (
    <Stack
      style={{
        borderWidth: Spacing.SPACING_1,
        borderColor: colors.borderGray,
        borderRadius: Spacing.SPACING_8,
        height: Spacing.SPACING_64,
        overflow: 'hidden',
        opacity: pending ? 0.5 : 1,
      }}
      direction="row"
    >
      <FlatList
        contentContainerStyle={{
          padding: Spacing.SPACING_4,
        }}
        snapToInterval={interval}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(it) => it.label}
        initialNumToRender={3}
        horizontal
        data={tabs}
        renderItem={render}
      />
    </Stack>
  );
});

type TabButtonProps = {
  label: string;
  index: number;
  startTransition: Function;
  setTabIndex: (index: number) => void;
  tabIndex: number;
  colors: any;
  amount: number;
  subtitle: string;
  pending: boolean;
};
const TabButton = React.memo(
  ({
    label,
    index,
    startTransition,
    setTabIndex,
    tabIndex,
    colors,
    amount,
    subtitle,
    pending,
  }: TabButtonProps) => {
    return (
      <Pressable
        disabled={pending}
        key={label + index}
        onPress={() => startTransition(() => setTabIndex(index))}
        style={{
          backgroundColor:
            tabIndex === index ? colors.textOceanBlue : 'transparent',
          borderRadius: Spacing.SPACING_4,
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          width:
            (Dimensions.get('screen').width -
              insetPadding * 2 -
              Spacing.SPACING_5 * 2) /
            2,
          height: '100%',
        }}
      >
        <Stack direction="column" className="items-center">
          <Typography
            color={tabIndex !== index ? 'black' : 'transparent'}
            weight="bold"
          >
            {label} ({amount})
          </Typography>
          {subtitle && (
            <Typography
              color={tabIndex !== index ? 'black' : 'transparent'}
              fontSize={FontSize.FONT_SIZE_14}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Pressable>
    );
  }
);
export default AppTabView;
