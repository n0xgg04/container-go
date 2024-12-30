import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { ActivityIndicator, StyleSheet, AppState } from 'react-native';
import { Box, Stack, Typography } from '@/shared/components/base';
import { useTheme } from '@/shared/hooks';

type Props = {
  camRef: React.RefObject<Camera>;
  isLoading?: boolean;
};

const CameraZone = React.memo<Props>(({ camRef, isLoading = false }) => {
  const device = useCameraDevice('back');
  const { colors } = useTheme();
  const { hasPermission } = useCameraPermission();

  return (
    <Stack
      direction="column"
      style={{
        borderRadius: Spacing.SPACING_8,
        overflow: 'hidden',
        height: Spacing.SPACING_240 * 2,
        width: '100%',
        flexGrow: 1,
        position: 'relative',
      }}
    >
      {device ? (
        <>
          <Camera
            photo={true}
            style={{
              width: '100%',
              height: '100%',
            }}
            device={device}
            ref={camRef}
            isActive={AppState.currentState === 'active' && hasPermission}
          />
          {isLoading && (
            <Stack
              style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
              direction="row"
              className="flex flex-row justify-center items-center"
            >
              <ActivityIndicator
                size="large"
                color={colors.primaryBackground}
              />
            </Stack>
          )}
        </>
      ) : (
        <Box className="w-full h-full flex flex-row justify-center items-center">
          <Typography color="black">Hãy cấp quyền chụp ảnh</Typography>
        </Box>
      )}
    </Stack>
  );
});

export default CameraZone;
