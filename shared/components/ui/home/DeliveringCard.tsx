import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';
import BasicInfoCard from '@/shared/components/ui/home/BasicInfoCard';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import ContainerInfoHeader from '@/shared/components/ui/home/ContainerInfoHeader';
import PickupInfo from '@/shared/components/ui/home/PickupInfo';
import PickupAddress from '@/shared/components/ui/home/PickupAddress';
import DeliveryButton from '@/shared/components/ui/home/DeliveryButton';
import { Suspense } from 'react';

type DeliveringCardProps = {
  item: ItemData;
};

const DeliveringCard = React.memo(({ item }: DeliveringCardProps) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handleOnPress = React.useCallback(() => {
    router.push(`/container_detail/${item.container_id}`);
  }, [item.container_id, router]);

  return (
    <Suspense fallback={null}>
      <View
        style={[
          {
            backgroundColor: colors.cardPrimaryBackground,
            borderColor: colors.borderGray,
          },
          styles.card,
        ]}
      >
        <ContainerInfoHeader id={item.id} onPress={handleOnPress} />
        <BasicInfoCard
          type={item.type}
          plate={item.plate}
          distance={item.distance}
        />
        <PickupInfo
          date={item.date}
          location={{
            lat: item.pickupLocation?.lat,
            lng: item.pickupLocation?.lng,
          }}
        />
        <PickupAddress address={item.address} />
        <DeliveryButton onPress={handleOnPress} />
      </View>
    </Suspense>
  );
});

const styles = StyleSheet.create({
  btn: {
    height: Spacing.SPACING_43,
    borderRadius: Spacing.SPACING_8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.SPACING_5,
    marginTop: Spacing.SPACING_20,
  },
  card: {
    width: Spacing.SPACING_330,
    paddingHorizontal: Spacing.SPACING_18,
    paddingVertical: Spacing.SPACING_24,
    borderWidth: Spacing.SPACING_1,
    borderRadius: Spacing.SPACING_8,
    display: 'flex',
    flexDirection: 'column',
  },
});
export default DeliveringCard;
