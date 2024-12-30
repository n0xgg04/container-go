import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import StatusItem from './StatusItem';
import { Box } from '../../base';
import { Spacing } from '@/shared/constants/spacing';

export interface StatusItemData {
  id: string;
  status: 'success' | 'fail';
  title: string;
  time: string;
  description: string;
  containerInfo: string;
  type: '1' | '2' | '3';
}

interface PropNotificationList {
  index: number;
}

const NotificationList = ({ index }: PropNotificationList) => {
  const data: StatusItemData[] = [
    {
      id: '1',
      status: 'success',
      title: 'Lấy hàng',
      time: '1:30 AM - 17.03.2024',
      description: 'Lấy hàng thành công',
      containerInfo:
        'Container #B4N1135 đã được giao cho tài xế Nguyen Cong Doanh',
      type: '1',
    },
    {
      id: '2',
      status: 'fail',
      title: 'Lấy hàng',
      time: '1:30 AM - 17.03.2024',
      description: 'Lấy hàng thất bại',
      containerInfo:
        'Container #B4N1135 đã được giao cho tài xế Nguyen Cong Doanh',
      type: '1',
    },
    {
      id: '2dsd',
      status: 'fail',
      title: 'Reward',
      time: '',
      description: 'Nhận thưởng',
      containerInfo:
        'Chúc mừng tài xế Nguyễn Công Doanh đã nhận được phần thưởng',
      type: '2',
    },
    {
      id: '2wdsd',
      status: 'fail',
      title: 'Reward',
      time: '',
      description: 'Nhận thưởng',
      containerInfo:
        'Chúc mừng tài xế Nguyễn Công Doanh đã nhận được phần thưởng',
      type: '2',
    },
    {
      id: '2ddssd',
      status: 'fail',
      title: 'Reward',
      time: '',
      description: 'Cập nhật',
      containerInfo: 'Cập nhật tính năng mới',
      type: '3',
    },
    {
      id: '2wdsered',
      status: 'fail',
      title: 'Reward',
      time: '',
      description: 'Cập nhật',
      containerInfo: 'Cập nhật tính năng mới',
      type: '3',
    },
  ];

  const renderItem: ListRenderItem<StatusItemData> = ({ item }) => (
    <StatusItem item={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={data.filter((e) => +e.type === index + 1)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Box width={Spacing.SPACING_10} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginTop: 15,
  },
});

export default NotificationList;
