import * as React from 'react';
import { FlatList } from 'react-native';
import { Image } from 'expo-image';
import { Spacing } from '@/shared/constants/spacing';
import { Box } from '@/shared/components/base';
import useDeliveryTakePhotoState from '@/states/hooks/useDeliveryTakePhotoState';

// eslint-disable-next-line react/display-name
const DeliveryPhotoList = React.memo(() => {
  const [{ photos }] = useDeliveryTakePhotoState();
  return (
    <FlatList
      nestedScrollEnabled
      data={photos}
      snapToInterval={Spacing.SPACING_300}
      decelerationRate={'fast'}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <Box
          style={{
            width: Spacing.SPACING_12,
          }}
        />
      )}
      renderItem={({ item }) => {
        return (
          <Image
            source={{ uri: 'file://' + item }}
            style={{
              width: Spacing.SPACING_300,
              height: Spacing.SPACING_200,
              borderRadius: Spacing.SPACING_8,
            }}
          />
        );
      }}
    />
  );
});

export default DeliveryPhotoList;
