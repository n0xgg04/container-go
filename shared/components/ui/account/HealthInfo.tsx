import * as React from 'react';
import { Card, Image, Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import InfoLine from '@/shared/components/ui/account/InfoLine';
import useDriverInfoState from '@/states/hooks/useDriverInfoState';
import moment from 'moment';
import DownloadIcon from '@/assets/images/svg/DownloadIcon';
import {
  Animated,
  Modal,
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SimpleButton from '../../base/SimpleButton';
import useGetImg from '@/shared/services/mutations/user/getImgByUrl';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ModalPopup = React.memo(({ visible, img, children }: any) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const toggleModal = React.useCallback(() => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [scaleValue, visible]);

  React.useEffect(() => {
    toggleModal();
  }, [toggleModal, visible]);

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              width: screenWidth * 0.9,
              height: screenHeight * 0.7,
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
});

const HealthInfo = React.memo(() => {
  const [{ healthCheckupExpiryDate, healthCheckupImageUrl }] =
    useDriverInfoState();

  const [visible, setVisible] = React.useState(false);
  const { data, isPending } = useGetImg({ url: healthCheckupImageUrl ?? '' });

  return (
    <Stack direction="column" gap={Spacing.SPACING_10}>
      <Stack direction="row" gap={Spacing.SPACING_170}>
        <Typography
          fontSize={FontSize.FONT_SIZE_14}
          weight="bold"
          color="textDarkGray"
        >
          Giấy khám sức khoẻ
        </Typography>
        <Pressable
          onPress={() => {
            setVisible(true);
          }}
        >
          <Stack
            direction="row"
            gap={Spacing.SPACING_2}
            className="items-center justify-between"
          >
            <DownloadIcon />
            <Typography
              fontSize={FontSize.FONT_SIZE_14}
              weight="normal"
              color="blue"
              style={{ textDecorationLine: 'underline' }}
            >
              Tải tệp
            </Typography>
          </Stack>
        </Pressable>
      </Stack>
      <Card insetPadding={Spacing.SPACING_12}>
        <Card.CardHeader>
          <Stack direction="column" gap={Spacing.SPACING_8}>
            <InfoLine
              divide={false}
              label="Ngày khám"
              value={
                healthCheckupExpiryDate !== '-'
                  ? moment(healthCheckupExpiryDate).format('DD/MM/YYYY')
                  : '-'
              }
            />
          </Stack>
        </Card.CardHeader>
      </Card>
      <ModalPopup visible={visible} img={data?.url}>
        <Stack direction="column" style={{ flex: 1 }}>
          <Stack
            direction="column"
            gap={Spacing.SPACING_20}
            style={{ flex: 1 }}
          >
            {isPending ? (
              <Typography color="textGray">Loading</Typography>
            ) : (
              <Image
                source={{
                  uri: data?.url,
                }}
                style={{ flex: 1 }}
                resizeMode="fit"
              />
            )}
          </Stack>
          <Stack style={styles.footer}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <SimpleButton
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
            </TouchableOpacity>
          </Stack>
        </Stack>
      </ModalPopup>
    </Stack>
  );
});

export default HealthInfo;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: Spacing.SPACING_20,
    paddingVertical: Spacing.SPACING_30,
    borderRadius: 20,
    elevation: 20,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.SPACING_10,
    marginTop: 'auto',
  },
});
