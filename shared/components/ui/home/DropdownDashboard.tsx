import * as React from 'react';
import { Select, SelectItem } from '@ui-kitten/components';
import { Spacing } from '@/shared/constants/spacing';
import useDropdownDashboardState from '@/states/hooks/useDropdownDashboardState';
import { useTheme } from '@/shared/hooks';
import { useEffect, useTransition } from 'react';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import moment from 'moment';
import { View } from 'react-native';

const DROP_DOWN = ['Hôm nay', 'Tuần này', 'Tháng này', 'Năm nay'];

const DropdownDashboard = React.memo(() => {
  const [selectedIndex, setSelectedIndex] = useDropdownDashboardState();
  const [, setState] = useDashboardInfoState();
  const [pending, startTransition] = useTransition();
  const [pending2, startTransition2] = useTransition();

  const today = React.useMemo(() => moment().format('YYYY-MM-DD'), []);
  const weekAgo = React.useMemo(
    () => moment().startOf('isoWeek').format('YYYY-MM-DD'),
    []
  );

  const weekEnd = React.useMemo(
    () => moment().endOf('isoWeek').format('YYYY-MM-DD'),
    []
  );

  const monthAgo = React.useMemo(
    () => moment().startOf('month').format('YYYY-MM-DD'),
    []
  );
  const monthEnd = React.useMemo(
    () => moment().endOf('month').format('YYYY-MM-DD'),
    []
  );
  const yearAgo = React.useMemo(
    () => moment().startOf('year').format('YYYY-MM-DD'),
    []
  );
  const yearEnd = React.useMemo(
    () => moment().endOf('year').format('YYYY-MM-DD'),
    []
  );

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        startTransition(() =>
          setState((pre) => ({
            ...pre,
            to: today,
            from: today,
          }))
        );
        break;

      case 1:
        startTransition(() =>
          setState((pre) => ({
            ...pre,
            to: weekEnd,
            from: weekAgo,
          }))
        );
        break;

      case 2:
        startTransition(() =>
          setState((pre) => ({
            ...pre,
            to: monthEnd,
            from: monthAgo,
          }))
        );
        break;

      case 3:
        startTransition(() =>
          setState((pre) => ({
            ...pre,
            to: yearEnd,
            from: yearAgo,
          }))
        );
    }
  }, [monthAgo, selectedIndex, setState, today, weekAgo, yearAgo]);
  const theme = useTheme();

  return (
    <Select
      disabled={pending}
      eva={{
        style: {
          backgroundColor: theme.colors.dropdownBackground,
        },
      }}
      style={{
        width: Spacing.SPACING_150,
        borderRadius: Spacing.SPACING_10,
        borderColor: theme.colors.primary,
      }}
      value={DROP_DOWN[selectedIndex]}
      multiSelect={false}
      onSelect={(index) => {
        if (!Array.isArray(index)) {
          startTransition2(() => setSelectedIndex(index.row));
        }
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.dropdownBackground,
        }}
      >
        <SelectItem title="Hôm nay" />
        <SelectItem selected title="Tuần này" />
        <SelectItem title="Tháng này" />
        <SelectItem title="Năm nay" />
      </View>
    </Select>
  );
});

export default DropdownDashboard;
