import * as React from 'react';
import { Box, Stack, Typography } from '@/shared/components/base';
import IconButton from '../../base/IconButton';
import InfoIcon from '@/assets/images/svg/InfoIcon';
import { Spacing } from '@/shared/constants/spacing';
import PickupStateIcon from '@/assets/images/svg/PickupStateIcon';
import { useTheme } from '@/shared/hooks';
import EstimatePersonalInfo from '@/shared/components/ui/home/EstimatePersonalInfo';
import ReceiveStateIcon from '@/shared/components/ui/home/ReceiveStateIcon';
import BasicInfoCard from '@/shared/components/ui/home/BasicInfoCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShippingWhiteIcon from '@/assets/images/svg/ShippingWhiteIcon';
import { Dimensions, StyleSheet } from 'react-native';
import { Href, useRouter } from 'expo-router';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  item: EstimateDeliverData;
  isGroup?: boolean;
};

const EstimateDeliveryCard = React.memo(({ item, isGroup = false }: Props) => {
  const router = useRouter();
  const { colors } = useTheme();

  const route = React.useMemo(
    () =>
      `/container_detail/${item.container_id}` as Href<`/container_detail/${string}`>,
    [item.container_id]
  );

  const handleGo = React.useCallback(
    (id: string) => {
      router.push(`/container_detail/${id}`);
    },
    [router]
  );

  return (
    <Stack
      gap={Spacing.SPACING_14}
      direction="column"
      style={[
        {
          borderColor: colors.borderGray,
          backgroundColor: colors.cardPrimaryBackground,
        },
        styles.card,
        isGroup && {
          width: Spacing.SPACING_330,
          marginBottom: Spacing.SPACING_6,
        },
      ]}
    >
      <Stack className="items-center justify-between">
        <InfoCard item={item} handleGo={handleGo} route={route} />
      </Stack>

      <BasicInfoCard
        type={item.type}
        plate={item.bill_id}
        distance={item.distance}
      />

      <EstimatePersonalInfo
        location={item.pickupLocation}
        date={item.send_date}
        name={item.sender_name}
        label={'LẤY HÀNG'}
        icon={<PickupStateIcon />}
        color="primaryBackground"
        address={item.pickupPosition || 'Lô 3A'}
        phone={item.sender_phone}
      />

      <Box
        className="w-full"
        style={{
          borderWidth: Spacing.SPACING_1,
          borderColor: colors.borderGray,
          borderStyle: 'dashed',
        }}
      />

      <EstimatePersonalInfo
        location={item.deliveryLocation}
        date={item.receive_date}
        name={item.receiver_name}
        label={'NHẬN HÀNG'}
        icon={<ReceiveStateIcon />}
        color="textOceanBlue"
        address={item.receiver_address}
        phone={item.receiver_phone}
      />
      <Stack
        style={{
          backgroundColor: colors.lightBackground,
          padding: Spacing.SPACING_12,
          borderRadius: Spacing.SPACING_4,
          borderColor: colors.borderGray,
          borderWidth: Spacing.SPACING_1,
        }}
        direction="column"
      >
        <Typography
          fontSize={FontSize.FONT_SIZE_12}
          weight="bold"
          color="textGray"
        >
          GHI CHÚ
        </Typography>
        <Typography
          fontSize={FontSize.FONT_SIZE_12}
          weight="bold"
          color="black"
        >
          {item.note}
        </Typography>
      </Stack>
    </Stack>
  );
});

export default EstimateDeliveryCard;

const HeaderCard = React.memo(({ id }: { id: string }) => {
  return (
    <Stack direction="column">
      <Typography
        className="uppercase"
        fontSize={FontSize.FONT_SIZE_12}
        color="textDarkGray"
      >
        Container ID:
      </Typography>
      <Stack direction="row" gap={Spacing.SPACING_5}>
        <Typography
          fontSize={FontSize.FONT_SIZE_14}
          className="text-gray-500"
          weight="bold"
        >
          #{id}
        </Typography>
      </Stack>
    </Stack>
  );
});

const InfoCard = React.memo(({ route, handleGo, item }: any) => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <Stack className="items-center justify-between">
      <Stack className="items-center justify-between w-full">
        <HeaderCard
          id={`${item.contNo}/\n${item.containerType}/\n${item.sealNo}`}
        />
        <Stack gap={Spacing.SPACING_4} className="items-center">
          <TouchableOpacity
            onPress={() => {
              router.push(route);
            }}
            style={[
              {
                backgroundColor: colors.buttonBackground,
                paddingHorizontal: Spacing.SPACING_8,
              },
              styles.btn,
            ]}
          >
            <ShippingWhiteIcon
              width={Spacing.SPACING_20}
              height={Spacing.SPACING_20}
            />

            <Typography
              fontSize={FontSize.FONT_SIZE_12}
              color="white"
              weight="bold"
            >
              Vận chuyển
            </Typography>
          </TouchableOpacity>
          <IconButton
            onPress={handleGo.bind(null, item.container_id)}
            size={36}
          >
            <InfoIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
});

const styles = StyleSheet.create({
  btn: {
    borderRadius: Spacing.SPACING_8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.SPACING_8,
    paddingHorizontal: Spacing.SPACING_8,
    paddingVertical: Spacing.SPACING_7,
  },
  card: {
    width: Dimensions.get('window').width - Spacing.SPACING_44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 0.8,
    borderWidth: Spacing.SPACING_1,
    borderRadius: Spacing.SPACING_5,
    paddingVertical: Spacing.SPACING_24,
    paddingHorizontal: Spacing.SPACING_18,
  },
});
