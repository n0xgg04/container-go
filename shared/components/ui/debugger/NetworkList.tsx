import * as React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import useNetworkDevToolState from '@/states/hooks/useNetworkDevToolState';
import { ListRenderItem } from 'react-native';
import { useId } from 'react';
import RequestCard from '@/shared/components/ui/debugger/RequestCard';
import { Spacing } from '@/shared/constants/spacing';
import { Box } from '@/shared/components/base';

const NetworkList = React.memo(() => {
  const [state] = useNetworkDevToolState();
  const id = useId();
  const renderItem: ListRenderItem<NetworkDevToolItem> = React.useCallback(
    ({ item, index }) => {
      return <RequestCard request={item} />;
    },
    []
  );

  return (
    <BottomSheetFlatList
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingHorizontal: Spacing.SPACING_20,
      }}
      keyExtractor={(item, index) => id + index}
      data={state}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Box height={Spacing.SPACING_10} />}
    />
  );
});

export default NetworkList;
