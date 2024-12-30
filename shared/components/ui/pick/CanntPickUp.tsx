import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Select, SelectItem } from '@ui-kitten/components';
import { Spacing } from '@/shared/constants/spacing';
import useCanntPickUpState from '@/states/hooks/useCanntPickUpState';
import Input from '@/shared/components/base/Input';
import { useTheme } from '@/shared/hooks';
import SimpleButton from '@/shared/components/base/SimpleButton';
import useGetReasons from '@/shared/services/queries/pick/useGetReasons';
import { ActivityIndicator, Alert } from 'react-native';
import useRejectPickup from '@/shared/services/mutations/pick/useRejectPickup';
import usePickLocationState from '@/states/hooks/usePickLocationState';
import { useRouter } from 'expo-router';

export default function CanntPickUp() {
  const { colors } = useTheme();
  const router = useRouter();
  const [{ container_id }] = usePickLocationState();
  const [state, setState] = useCanntPickUpState();
  const { data, isLoading } = useGetReasons({ type: 'PICKUP' });
  const { mutateAsync: reject, isPending } = useRejectPickup();

  const selected = React.useMemo(() => {
    return data?.find((item) => item.id === state.reason)?.name;
  }, [data, state.reason]);

  const handleReject = React.useCallback(() => {
    if (isPending) return;
    reject({
      message: state.note,
      reasonId: state.reason,
      container_id,
    })
      .then(() => {
        router.replace({
          pathname: `/pickup-result/${container_id}` as any,
          params: {
            type: 'rejected',
            message: state.note,
          },
        });
      })
      .catch((e) => {
        const reason = e.response.data.reason;
        Alert.alert('Đã có lỗi xảy ra', reason, [
          { text: 'OK', onPress: () => {} },
        ]);
      });
  }, [container_id, isPending, reject, router, state.note, state.reason]);

  return (
    <Stack direction="column" gap={Spacing.SPACING_10}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.primaryBackground} />
      ) : (
        <>
          <Typography weight="bold" color="textGray">
            Lý do
          </Typography>
          <Select
            size="large"
            value={selected}
            style={{
              height: Spacing.SPACING_60,
            }}
            onSelect={(item) => {
              if (!Array.isArray(item)) {
                setState((pre) => ({ ...pre, reason: data![item.row].id }));
              }
            }}
            placeholder="Chọn lý do..."
          >
            {data?.map((item, index) => (
              <SelectItem title={item.name} key={index} />
            ))}
          </Select>
          <Typography weight="bold" color="textGray">
            Ghi chú
          </Typography>
          <Input
            onChange={(e) =>
              setState((pre) => ({ ...pre, note: e.nativeEvent.text }))
            }
            textArea
            value={state.note}
            containerStyle={{
              borderWidth: 1,
              borderColor: colors.borderGray,
              height: Spacing.SPACING_99,
            }}
          />
          <SimpleButton
            onPress={handleReject}
            style={{
              backgroundColor: colors.warn,
              height: Spacing.SPACING_51,
              borderRadius: Spacing.SPACING_8,
              marginTop: Spacing.SPACING_16,
            }}
            labelColor="white"
          >
            {isPending ? 'Đang xử lý' : 'Gửi'}
          </SimpleButton>
        </>
      )}
    </Stack>
  );
}
