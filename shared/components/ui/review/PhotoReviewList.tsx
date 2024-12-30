import * as React from 'react';
import { FlatList } from 'react-native';
import useTakePhotoState from '@/states/hooks/useTakePhotoState';
import { Image } from 'expo-image';
import { Spacing } from '@/shared/constants/spacing';
import { Box } from '@/shared/components/base';

// eslint-disable-next-line react/display-name
const PhotoReviewList = React.memo(() => {
  const [{ photos }] = useTakePhotoState();
  if (photos.length === 1)
    return (
      <Image
        source={{ uri: 'file://' + photos[0] }}
        style={{
          width: '100%',
          height: Spacing.SPACING_200,
          borderRadius: Spacing.SPACING_8,
        }}
      />
    );

  return (
    <FlatList
      nestedScrollEnabled
      data={photos}
      horizontal
      snapToInterval={Spacing.SPACING_300}
      decelerationRate={'fast'}
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

export default PhotoReviewList;
