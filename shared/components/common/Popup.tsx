import * as React from 'react';
import { Card, Stack, Typography } from '@/shared/components/base';
import PopupInfoIcon from '@/assets/images/svg/PopupInfoIcon';
import { Spacing } from '@/shared/constants/spacing';
import SimpleButton from '@/shared/components/base/SimpleButton';
import { MotiView } from 'moti';
import { Dimensions } from 'react-native';

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  action?: React.ReactNode;
};

const Popup = React.memo(({ visible, title, onClose, action }: Props) => {
  return (
    <MotiView
      from={{
        transform: [
          {
            translateY: -Spacing.SPACING_24,
          },
        ],
        opacity: 0,
      }}
      exit={{
        opacity: 0,
        transform: [
          {
            translateY: -Spacing.SPACING_24,
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
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 2,
        left: 0,
        right: 0,
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        style={{
          backgroundColor: 'white',
          width: '90%',
        }}
      >
        <Stack
          direction="column"
          className="justify-center items-center"
          gap={Spacing.SPACING_20}
        >
          <PopupInfoIcon />
          <Typography weight="bold" color="black" className="text-center">
            {title}
          </Typography>
          {action ? (
            action
          ) : (
            <SimpleButton
              onPress={onClose}
              containerStyle={{
                width: Spacing.SPACING_80,
              }}
              bgColor="primary"
              labelStyle={{
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Đóng
            </SimpleButton>
          )}
        </Stack>
      </Card>
    </MotiView>
  );
});

export default Popup;
