import * as React from 'react';
import { Image } from 'expo-image';
import { Spacing } from '@/shared/constants/spacing';
import { FlatList, StyleSheet } from 'react-native';
import { Box } from '@/shared/components/base';
import CloseIcon from '@/assets/images/svg/CloseIcon';
import { AnimatePresence } from 'moti';
import { useTransition } from 'react';
import useDeliveryTakePhotoState from '@/states/hooks/useDeliveryTakePhotoState';

const DeliveryPhotoList = React.memo(() => {
  const [{ photos }, setState] = useDeliveryTakePhotoState();
  const [isPending, startTransition] = useTransition();

  const removePhoto = React.useCallback(
    (index: number) => {
      const newPhotos = [...photos];
      newPhotos.splice(index, 1);
      startTransition(() =>
        setState((state) => ({ ...state, photos: newPhotos }))
      );
    },
    [photos]
  );

  return (
    <AnimatePresence>
      <FlatList
        style={{
          opacity: isPending ? 0.5 : 1,
        }}
        nestedScrollEnabled={true}
        data={photos}
        horizontal
        scrollEnabled
        keyExtractor={(item, index) => item.length + '' + index}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Box
            style={{
              width: Spacing.SPACING_12,
            }}
          />
        )}
        renderItem={({ item, index }) => {
          return (
            <Box
              from={{
                opacity: 0,
                transform: [
                  {
                    scale: 0,
                  },
                ],
              }}
              animate={{
                opacity: 1,
                transform: [
                  {
                    scale: 1,
                  },
                ],
              }}
              exit={{
                opacity: 0,
                transform: [
                  {
                    scale: 0,
                  },
                ],
              }}
              className="overflow-visible"
              style={{
                padding: Spacing.SPACING_8,
              }}
            >
              <Box className="relative">
                <Image
                  style={styles.image}
                  source={{ uri: 'file://' + item }}
                />
                <CloseIcon
                  onPress={() => removePhoto(index)}
                  width={Spacing.SPACING_16}
                  height={Spacing.SPACING_16}
                  style={styles.deleteBtn}
                />
              </Box>
            </Box>
          );
        }}
      />
    </AnimatePresence>
  );
});

const styles = StyleSheet.create({
  image: {
    width: Spacing.SPACING_44,
    height: Spacing.SPACING_44,
    borderRadius: Spacing.SPACING_4,
    position: 'relative',
    overflow: 'hidden',
  },
  deleteBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 999,
    transform: [
      {
        translateY: -Spacing.SPACING_8,
      },
      {
        translateX: Spacing.SPACING_8,
      },
    ],
  },
});

export default DeliveryPhotoList;
