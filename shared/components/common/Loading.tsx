import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { IMAGES } from '@/shared/constants/assets';
import { Image } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';
import { AnimatePresence, MotiView } from 'moti';

const Loading = React.memo(() => {
  const [{ isLoading }] = useAppOverlayState();

  return (
    <AnimatePresence>
      {isLoading && (
        <MotiView
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.53)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: Spacing.SPACING_10,
          }}
        >
          <Image
            source={IMAGES.LOGIN.LOGO}
            style={{
              width: Spacing.SPACING_60,
              height: Spacing.SPACING_60,
            }}
          />
          <ActivityIndicator size="small" animating={true} />
        </MotiView>
      )}
    </AnimatePresence>
  );
});

export default Loading;
