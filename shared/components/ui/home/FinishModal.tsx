import * as React from 'react';
import { Dimensions, Modal, View } from 'react-native';
import { Typography } from '@/shared/components/base';

export default function FinishModal() {
  return (
    <Modal
      animationType="slide"
      visible={true}
      style={{
        backgroundColor: 'rgba(0,0,0,0.42)',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        height: Dimensions.get('window').height,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 99,
      }}
    >
      <View>
        <Typography color="black">
          Để hoàn tất vận chuyển yêu cầu upload tất cả POD và Biên bản trả
          container rỗng.
        </Typography>
      </View>
    </Modal>
  );
}
