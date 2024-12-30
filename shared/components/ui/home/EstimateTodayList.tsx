import * as React from 'react';
import { FlatList, View } from 'react-native';
import DeliveringCard from '@/shared/components/ui/home/DeliveringCard';
import { Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';

type Props = {};

type ItemData = {
  id: string;
  plate: string;
  type: string;
  distance: string;
  date: string;
  address: string;
};

const DATA: ItemData[] = [
  {
    id: 'BAQENPX-24FT',
    plate: '51E1-32124',
    type: 'Cont lạnh',
    distance: '12,3km',
    date: '16.01.2024',
    address: '27B QLA1, Linh Xuân, Thủ Đức, Hồ Chí Minh',
  },
  {
    id: 'MLAE123-24FT',
    plate: '29C1-32424',
    type: 'Cont nóng',
    distance: '10km',
    date: '16.01.2024',
    address: '27B QLA1, Linh Xuân, Thủ Đức, Hồ Chí Minh',
  },
];

export default function EstimateTodayList() {
  const renderItem = ({ item }: { item: ItemData }) => (
    <DeliveringCard item={item as any} />
  );

  return (
    <View
      style={{
        marginTop: Spacing.SPACING_30,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        style={{
          marginBottom: Spacing.SPACING_30,
        }}
        weight="bold"
        color="textDarkGray"
        className="mb-4"
      >
        Đang vận chuyển
      </Typography>
      <FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        horizontal={true}
      />
    </View>
  );
}
