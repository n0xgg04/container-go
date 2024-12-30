import * as React from 'react';
import { CollapsibleRef, Tabs } from 'react-native-collapsible-tab-view';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import useFilterDateState from '@/states/hooks/useFilterDateState';
import useGetDashboardInfoByDate from '@/shared/services/mutations/home/getDashboardInfoByDate';
import { useLocalSearchParams } from 'expo-router';
import { useTransition } from 'react';
import InTransit from '@/shared/components/ui/container-page/InTransit';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';
import MapTab from '@/shared/components/ui/container-page/TabHeader';
import { TabBarProps } from 'react-native-collapsible-tab-view/src/types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';

const ContainerPage = React.memo(() => {
  const tabsRef = React.useRef<CollapsibleRef>(null);
  const [{ from, to }] = useDashboardInfoState();
  const [{ fromDate, toDate }] = useFilterDateState();
  const [dateTime, setDateTime] = React.useState({
    fromDate: from,
    toDate: to,
  });

  React.useEffect(() => {
    if (fromDate && toDate) {
      setDateTime({ fromDate, toDate });
    }
  }, [fromDate, toDate]);

  React.useEffect(() => {
    if (from && to) {
      setDateTime({ fromDate: from, toDate: to });
    }
  }, [from, to]);

  const { data: dashboardData } = useGetDashboardInfoByDate({
    from: dateTime.fromDate,
    to: dateTime.toDate,
  });

  const { id, name } = useLocalSearchParams();
  const [pending, startTransition] = useTransition();

  const setActiveTab = React.useCallback((indexTab: number) => {
    if (tabsRef.current) {
      const currenIndex = tabsRef.current?.getCurrentIndex();
      if (currenIndex !== indexTab) {
        tabsRef.current?.setIndex(indexTab);
      }
    }
  }, []);

  const mapTitle = React.useMemo(
    () => ({
      IN_PROGRESS: 'Đang vận chuyển',
      NOT_STARTED: 'Chờ vận chuyển',
      COMPLETED: 'POD Pending',
    }),
    []
  );

  const routes = React.useMemo(
    () => [
      { key: 'NOT_STARTED', title: mapTitle['NOT_STARTED'] },
      { key: 'IN_PROGRESS', title: `${mapTitle['IN_PROGRESS']}` },
      { key: 'COMPLETED', title: mapTitle['COMPLETED'] },
    ],
    [mapTitle]
  );

  React.useEffect(() => {
    if (id && name) {
      startTransition(() => setActiveTab(Number(id)));
    }
  }, [id, name, setActiveTab]);

  const renderTabBar = React.useCallback(
    ({ onTabPress, tabNames }: TabBarProps) => {
      return (
        <MapTab
          summaries={dashboardData?.summaries as any}
          routes={routes}
          onTabPress={onTabPress}
          tabNames={tabNames}
        />
      );
    },
    [dashboardData?.summaries, routes]
  );

  return (
    <Tabs.Container
      lazy
      ref={tabsRef}
      containerStyle={{
        backgroundColor: '#FAFAFA',
        marginBottom: 100,
        height: Dimensions.get('window').height,
      }}
      headerContainerStyle={{
        backgroundColor: '#FAFAFA',
        shadowColor: 'transparent',
      }}
      renderTabBar={renderTabBar}
    >
      <Tabs.Tab name={routes[0].title}>
        <View style={styles.height}>
          <InTransit summariesStatus={routes[0].key as SummariesStatus} />
        </View>
      </Tabs.Tab>
      <Tabs.Tab name={routes[1].title}>
        <View style={styles.height}>
          <InTransit summariesStatus={routes[1].key as SummariesStatus} />
        </View>
      </Tabs.Tab>
      <Tabs.Tab name={routes[2].title}>
        <View style={styles.height}>
          <InTransit summariesStatus={routes[2].key as SummariesStatus} />
        </View>
      </Tabs.Tab>
    </Tabs.Container>
  );
});

const styles = StyleSheet.create({
  height: {
    paddingTop: Spacing.SPACING_20,
    maxHeight: Dimensions.get('window').height,
  },
});
export default ContainerPage;
