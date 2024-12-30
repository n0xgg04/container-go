import * as React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useTransition } from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { Card, Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import DoneDelivery from '@/assets/images/svg/DoneDelivery';
import { useTheme } from '@/shared/hooks';
import PickUpInfo from '@/shared/components/ui/review/PickUpInfo';
import SignInfo from '@/shared/components/ui/review/SignInfo';
import SimpleButton from '@/shared/components/base/SimpleButton';
import PhotoReviewList from '@/shared/components/ui/review/PhotoReviewList';
import NoticeCard from '@/shared/components/ui/pick/NoticeCard';
import ErrorIcon from '@/assets/images/svg/ErrorIcon';
import useTakePhotoState from '@/states/hooks/useTakePhotoState';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';
import useContainerDetail from '@/shared/services/queries/dashboard/useContainerDetail';
import moment from 'moment';
import DeliveryPhotoList from '@/shared/components/ui/delivery/DeliveryPhotoList';
import useDeliveryTakePhotoState from '@/states/hooks/useDeliveryTakePhotoState';
import FailedIcon2 from '@/assets/images/svg/FailedIcon2';

type SearchParams = {
  container_id: string;
  message: string;
  type: 'success' | 'rejected';
  page?: 'pickup' | 'delivery';
};

export default React.memo(function () {
  const router = useRouter();
  const {
    container_id,
    message,
    type = 'success',
    page = 'pickup',
  } = useLocalSearchParams<SearchParams>();
  const [{ photos }, setPhoto] = useTakePhotoState();
  const [{}, setPhotoDelivery] = useDeliveryTakePhotoState();

  const [pending, startTransition] = useTransition();
  const [, setOverlay] = useAppOverlayState();
  const { data, isLoading } = useContainerDetail({ container_id });

  const { colors } = useTheme();
  const handleBack = useCallback(() => {
    router.replace(`/container_detail/${container_id}?back=home` as any);
  }, [container_id, router]);

  const handleGoDetail = React.useCallback(() => {
    startTransition(() => {
      setPhotoDelivery((pre) => ({ ...pre, photos: [] }));
      setPhoto((pre) => ({ ...pre, photos: [] }));
    });
    router.replace(`/container_detail/${container_id}?back=home` as any);
  }, [router, container_id, setPhotoDelivery, setPhoto]);

  useEffect(() => {
    setOverlay((pre) => ({ ...pre, isLoading: false }));
  }, [setOverlay]);

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        {page === 'pickup' ? 'Lấy hàng' : 'Giao hàng'}
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <Stack gap={Spacing.SPACING_24} direction="column">
          {type === 'success' ? (
            <>
              <NoticeCard
                type="success"
                message={
                  page === 'pickup'
                    ? 'Lấy hàng thành công'
                    : 'Giao hàng thành công'
                }
                icon={<DoneDelivery />}
                subtitle="Thông tin vận chuyển đã được gửi lên hệ thống!"
              />
              <PickUpInfo>
                {moment(data?.shipmentStarted)
                  .format('hh:mm A - DD.MM.YYYY')
                  .toString()}
              </PickUpInfo>
            </>
          ) : (
            <>
              <NoticeCard
                type="error"
                message="Lấy hàng thất bại"
                icon={<ErrorIcon />}
                subtitle="Thông tin vận chuyển đã được gửi lên hệ thống!"
              />
              <PickUpInfo
                failed
                icon={<FailedIcon2 />}
                label="Không giao được hàng :"
              >
                {moment(data?.pickupSubmittedTime)
                  .format('hh:mm A - DD.MM.YYYY')
                  .toString()}
              </PickUpInfo>
            </>
          )}
          {page === 'pickup' ? <PhotoReviewList /> : <DeliveryPhotoList />}
          {type === 'success' && (
            <SignInfo title="Người gửi đã ký xác nhận">
              08:32 AM - 16.01.2024
            </SignInfo>
          )}
          <Card
            style={{
              backgroundColor: colors.cardGray,
            }}
            insetPadding={Spacing.SPACING_12}
          >
            <Typography
              fontSize={FontSize.FONT_SIZE_12}
              weight="bold"
              color="textDarkGray"
            >
              GHI CHÚ
            </Typography>
            <Typography
              fontSize={FontSize.FONT_SIZE_12}
              weight="bold"
              color="black"
            >
              {message}
            </Typography>
          </Card>
          <SimpleButton
            onPress={handleGoDetail}
            style={{
              borderColor: colors.textOceanBlue,
              borderWidth: Spacing.SPACING_1,
              padding: Spacing.SPACING_16,
              borderRadius: Spacing.SPACING_8,
            }}
            labelColor="textOceanBlue"
          >
            Chi tiết container
          </SimpleButton>
        </Stack>
      </Scaffold.MainBox>
    </Scaffold>
  );
});
