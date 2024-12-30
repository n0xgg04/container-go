import * as React from 'react';
import AppTabView from '@/shared/components/ui/home/AppTabView';
import EstimateList from '@/shared/components/ui/home/EstimateList';
import useSearchContainer from '@/shared/services/mutations/home/useSearchContainer';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';
import { useEffect, useId, useState } from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import useGetDashboardInfoByDate from '@/shared/services/mutations/home/getDashboardInfoByDate';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import moment from 'moment';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';

const DeliveringList = React.memo(() => {
  const [tabIndex, setTabIndex] = useState(0);
  const [{ from, to }] = useDashboardInfoState();
  const { data } = useGetDashboardInfoByDate({ from, to });

  const fromF = React.useMemo(() => {
    return moment().format('YYYY-MM-DD');
  }, []);

  const toF = React.useMemo(() => {
    return moment().format('YYYY-MM-DD');
  }, []);

  const {
    data: inProgressData,
    isPending,
    mutate: getData,
  } = useSearchContainer({
    from: fromF,
    to: toF,
    type: SummariesStatus.NOT_STARTED,
  });

  useEffect(() => {
    if (data?.waitingForShipment && data?.waitingForShipment.length > 0) {
      getData();
    }
  }, [data?.summaries, data?.waitingForShipment, getData]);

  const today = React.useMemo(() => {
    return `(${moment().format('DD/MM/YYYY')})`;
  }, []);

  const tomorrow = React.useMemo(() => {
    return `(${moment().add({ day: 1 }).format('DD/MM/YYYY')})`;
  }, []);

  const yesterday = React.useMemo(() => {
    return `(${moment().subtract({ day: 1 }).format('DD/MM/YYYY')})`;
  }, []);

  const targetDay = React.useMemo(() => {
    return moment(data?.waitingForShipment[tabIndex as any]?.date).format(
      'YYYY-MM-DD'
    );
  }, [data?.waitingForShipment, tabIndex]);

  const tabs = React.useMemo(() => {
    return data?.waitingForShipment.map((it) => {
      let label;
      let subtitle;
      const fm = moment(it?.date).format('DD.MM.YYYY');
      switch (fm) {
        case today:
          label = 'Hôm nay';
          subtitle = moment(it?.date).format('DD.MM.YYYY');
          break;

        case tomorrow:
          label = 'Ngày mai';
          subtitle = moment(it?.date).format('DD.MM.YYYY');
          break;

        case yesterday:
          label = 'Hôm qua';
          subtitle = moment(it?.date).format('DD.MM.YYYY');
          break;

        default:
          label = fm;
          subtitle = '';
      }

      return {
        label,
        subtitle,
        amount: it?.amount,
      };
    });
  }, [data?.waitingForShipment, today, tomorrow, yesterday]);

  return (
    <Stack
      direction="column"
      style={{
        marginTop: Spacing.SPACING_12,
      }}
    >
      <Typography
        style={{}}
        weight="bold"
        color="textDarkGray"
        className="mb-4"
      >
        Dự kiến vận chuyển
      </Typography>
      {tabs && tabs.length > 0 && (
        <>
          <AppTabView
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            tabs={tabs as any}
          />
          <ShowList day={targetDay} />
        </>
      )}
    </Stack>
  );
});

const ShowList = React.memo(({ day }: { day: string }) => {
  const id = useId();

  const renderItem: ListRenderItem<$SearchContainerData> = React.useCallback(
    ({ item }) => {
      return <EstimateList card_data={item.containers} />;
    },
    []
  );

  const {
    data: inProgressData,
    isPending,
    mutate: getData,
  } = useSearchContainer({
    from: day,
    to: day,
    type: SummariesStatus.NOT_STARTED,
  });

  useEffect(() => {
    getData();
  }, [day, getData]);

  if (isPending) {
    return (
      <ActivityIndicator
        style={{
          marginTop: Spacing.SPACING_24,
        }}
      />
    );
  }

  return (
    <Stack
      direction="column"
      style={{
        marginTop: Spacing.SPACING_30,
      }}
    >
      <FlatList
        keyExtractor={(item, index) => id + index.toString()}
        nestedScrollEnabled={true}
        data={inProgressData}
        renderItem={renderItem}
        windowSize={3}
        removeClippedSubviews={true}
        initialNumToRender={2}
        scrollEnabled={false}
      />
    </Stack>
  );
});

DeliveringList.displayName = 'DeliveringList';

export default DeliveringList;
