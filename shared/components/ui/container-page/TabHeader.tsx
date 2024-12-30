import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import TabBarHeader from '@/shared/components/ui/container-page/TabBarHeader';
import { FlatList, StyleSheet, View } from 'react-native';
import { createRef } from 'react';
import { useFocusedTab } from 'react-native-collapsible-tab-view';

type MapTabProps = {
  onTabPress: (name: string) => void;
  routes: {
    key: string;
    title: string;
  }[];
  tabNames: string[];
  summaries: any[];
};

const MapTab = React.memo(
  ({ onTabPress, routes, tabNames, summaries }: MapTabProps) => {
    const focusedTab = useFocusedTab();
    const flatListRef = createRef<FlatList>();

    const handleClick = React.useCallback(
      (e: any, index: number) => {
        onTabPress(e);
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
        });
      },
      [flatListRef, onTabPress]
    );

    const renderItem = React.useCallback(
      ({ item, index }: any) => {
        return (
          <TabBarHeader
            summaries={summaries}
            focusedTab={focusedTab}
            onTabPress={(e: any) => {
              handleClick(e, index);
            }}
            routes={routes}
            tabName={item}
          />
        );
      },
      [focusedTab, handleClick, routes]
    );

    return (
      <FlatList
        horizontal
        nestedScrollEnabled
        bounces={false}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={tabNames}
        contentContainerStyle={{
          paddingRight: Spacing.SPACING_25,
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ width: Spacing.SPACING_8 }} />;
        }}
        renderItem={renderItem}
      />
    );
  }
);

export default MapTab;
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingRight: Spacing.SPACING_30,
  },
});
