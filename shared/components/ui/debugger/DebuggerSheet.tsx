import * as React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, Typography } from '@/shared/components/base';
import RNShake from 'react-native-shake';
import FontSize from '@/shared/constants/font-scale';
import CloseIcon from '@/assets/images/svg/CloseIcon';
import { Spacing } from '@/shared/constants/spacing';
import NetworkList from '@/shared/components/ui/debugger/NetworkList';
import { useDebuggerContext } from '@/shared/provider/DebuggerProvider';

const DebuggerSheet = React.memo(() => {
  const { BottomSheetModalRef } = useDebuggerContext();
  React.useEffect(() => {
    const subscription = RNShake.addListener(() => {
      BottomSheetModalRef?.current?.present();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        opacity={0}
        style={{ backgroundColor: 'transparent' }}
        {...props}
      />
    ),
    []
  );

  const handleClose = React.useCallback(() => {
    BottomSheetModalRef?.current?.close();
  }, []);

  return (
    <BottomSheetModal
      stackBehavior="push"
      snapPoints={['80%']}
      enableDynamicSizing
      ref={BottomSheetModalRef}
      enableDismissOnClose
      enablePanDownToClose
      detached
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Stack direction="column" className="flex-1">
          <Stack
            style={{
              marginBottom: Spacing.SPACING_10,
            }}
            className="justify-center relative items-center"
          >
            <Typography
              fontSize={FontSize.FONT_SIZE_16}
              weight="bold"
              color="textGray"
            >
              Network DevTool
            </Typography>
            <TouchableOpacity onPress={handleClose} style={styles.close}>
              <CloseIcon
                height={Spacing.SPACING_24}
                width={Spacing.SPACING_24}
              />
            </TouchableOpacity>
          </Stack>
          <NetworkList />
        </Stack>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DebuggerSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  close: {
    position: 'absolute',
    top: -Spacing.SPACING_2,
    right: Spacing.SPACING_16,
  },
});
