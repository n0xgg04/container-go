import * as React from 'react';
import { PICK_STEP } from '@/states/recoil/atoms/PickLocationAtom';
import { AnimatePresence, MotiView } from 'moti';
import { Spacing } from '@/shared/constants/spacing';
import SimpleButton from '@/shared/components/base/SimpleButton';
import { Stack, Typography } from '@/shared/components/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontSize from '@/shared/constants/font-scale';
import LocationCheckin from '@/assets/images/svg/LocationCheckin';

type Props = {
  handlePressTakePhotoStep?: () => void;
  handlePressCantPickup?: () => void;
  handlePressCheckIn: () => void;
  step?: PICK_STEP;
  loading?: boolean;
  label1?: string;
  label2?: string;
  hideRetry?: boolean;
};
export default function BottomActionButton({
  handlePressTakePhotoStep,
  handlePressCheckIn,
  handlePressCantPickup,
  step,
  loading,
  label1 = 'Lấy hàng',
  label2 = 'Không lấy được hàng',
  hideRetry = false,
}: Props) {
  return (
    <AnimatePresence>
      {step === PICK_STEP.RECEIVE_LOCATION && (
        <MotiView
          from={{
            opacity: 0,
            transform: [
              {
                translateY: Spacing.SPACING_20,
              },
            ],
          }}
          animate={{
            opacity: 1,
            transform: [
              {
                translateY: 0,
              },
            ],
          }}
          exit={{
            opacity: 0,
            transform: [
              {
                translateY: Spacing.SPACING_20,
              },
            ],
          }}
        >
          <SimpleButton
            onPress={handlePressTakePhotoStep}
            containerStyle={{
              borderRadius: Spacing.SPACING_8,
            }}
            style={{
              width: '100%',
              height: Spacing.SPACING_51,
            }}
            bgColor="primary"
            labelColor="white"
          >
            <Typography weight="bold">{label1}</Typography>
          </SimpleButton>
          <Stack
            style={{
              marginTop: Spacing.SPACING_10,
            }}
            className="items-center justify-center"
          >
            {!hideRetry && (
              <TouchableOpacity onPress={handlePressCantPickup}>
                <Typography
                  fontSize={FontSize.FONT_SIZE_14}
                  weight="bold"
                  color="warn"
                >
                  {label2}
                </Typography>
              </TouchableOpacity>
            )}
          </Stack>
        </MotiView>
      )}
      {step === PICK_STEP.CHECKIN && (
        <MotiView
          from={{
            opacity: 0,
            transform: [
              {
                translateY: Spacing.SPACING_20,
              },
            ],
          }}
          animate={{
            opacity: 1,
            transform: [
              {
                translateY: 0,
              },
            ],
          }}
          exit={{
            opacity: 0,
            transform: [
              {
                translateY: Spacing.SPACING_20,
              },
            ],
          }}
        >
          <SimpleButton
            disabled={loading}
            onPress={handlePressCheckIn}
            style={{
              width: '100%',
              height: Spacing.SPACING_51,
              borderRadius: Spacing.SPACING_8,
            }}
            bgColor="warn"
            labelColor="white"
          >
            <Typography weight="bold">
              <LocationCheckin
                style={{
                  marginRight: Spacing.SPACING_10,
                }}
              />

              {loading ? 'Checkin...' : 'Checkin'}
            </Typography>
          </SimpleButton>
        </MotiView>
      )}
    </AnimatePresence>
  );
}
