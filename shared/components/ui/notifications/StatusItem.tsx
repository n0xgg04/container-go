import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

import { StatusItemData } from './NotificationList';
import { Typography } from '../../base';
import { useTheme } from '@/shared/hooks';
import RewardIcon from '@/assets/images/svg/RewardIcon';
import SystemIcon from '@/assets/images/svg/SystemIcon';

const StatusItem: React.FC<{ item: StatusItemData }> = ({ item }) => {
  const { colors } = useTheme();
  const isSuccess = item.status === 'success';

  return (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        {item.type === '1' && (
          <Ionicons
            name={isSuccess ? 'checkmark-circle' : 'alert-circle'}
            size={24}
            color={isSuccess ? '#4CAF50' : '#F44336'}
          />
        )}
        {item.type === '2' && <RewardIcon />}
        {item.type === '3' && <SystemIcon />}
      </View>
      <View style={styles.content}>
        <View className="flex flex-row">
          <Typography color="textDarkGray" fontSize={14}>
            {item.title}
          </Typography>
          <Entypo name="dot-single" size={14} color="black" />
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Typography
          color="primaryBlack"
          numberOfLines={1}
          fontSize={14}
          weight="bold"
          className="mb-1"
        >
          {item.description}
        </Typography>
        <Typography
          color="primaryBlack"
          numberOfLines={2}
          fontSize={12}
          weight="normal"
        >
          {item.containerInfo}
        </Typography>
      </View>
      <View style={styles.iconEnd}>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color={colors.textDarkGray}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 5,
    paddingVertical: 15,
    borderRadius: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 5,
  },
  iconEnd: {
    marginLeft: 5,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  containerInfo: {
    fontSize: 14,
    color: '#424242',
  },
});

export default StatusItem;
