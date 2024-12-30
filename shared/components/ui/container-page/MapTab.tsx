import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import TabBarHeader from './TabBarHeader';

interface IProps {
  dashboardData: $DashboardInfoResponse | undefined;
  focusedTab: any;
  onTabPress: any;
  tabNames: any;
  routes: {
    key: string;
    title: string;
  }[];
}

const MapTab = ({
  dashboardData,
  focusedTab,
  onTabPress,
  tabNames,
  routes,
}: IProps) => {
  function generateUniqueKey() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  return (
    <View style={styles.tabBarContainer} key={generateUniqueKey()}>
      {tabNames.map((e: any) => (
        <TabBarHeader
          dashboardData={dashboardData}
          focusedTab={focusedTab}
          onTabPress={onTabPress}
          routes={routes}
          tabName={e}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    // width: '90%',
  },
});

export default memo(MapTab);
