import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Stack, Typography } from '../../base';
import { useTheme } from '@/shared/hooks';
import ActiveIcon from '@/assets/images/svg/ActiveIcon';
import moment from 'moment';
import FontSize from '@/shared/constants/font-scale';

interface PropsOrderStatus {
  shipmentHistories: IshipmentHistories[];
}

interface IshipmentHistories {
  id: string;
  event: string;
  timestamp: string;
  executedBy: string;
  location: unknown;
}

interface StatusItemProps
  extends Pick<IshipmentHistories, 'event' | 'timestamp'> {
  isLast: boolean;
}

const OrderStatus = React.memo(({ shipmentHistories }: PropsOrderStatus) => {
  const { colors } = useTheme();

  return (
    <Stack
      style={{
        width: Dimensions.get('window').width - 44,
        backgroundColor: colors.cardPrimaryBackground,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0.5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 0.8,
        // padding: 10,
      }}
      className="flex flex-col border-[1px] rounded-md border-gray-200 px-4 py-5"
    >
      {shipmentHistories.map((e, i) => (
        <StatusItem
          event={e.event}
          timestamp={e.timestamp}
          key={e.id}
          isLast={shipmentHistories.length === i + 1}
        />
      ))}
    </Stack>
  );
});

const StatusItem: React.FC<StatusItemProps> = ({
  timestamp,
  event,
  isLast,
}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftColumn}>
        <ActiveIcon />
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.rightColumn}>
        <Typography
          fontSize={FontSize.FONT_SIZE_14}
          weight="bold"
          color="black"
          style={[styles.title, styles.completedText]}
          numberOfLines={3}
        >
          {event}
        </Typography>
        <Text style={styles.time}>
          {moment(timestamp).format('h:mm A - DD.MM.YYYY')}
        </Text>
      </View>
      <Text className="italic" style={styles.status}>
        Hoàn thành
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    overflow: 'scroll',
    // marginBottom: 10,
  },
  leftColumn: {
    alignItems: 'center',
    width: 30,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  completedAllCircle: {
    backgroundColor: 'green',
  },
  completedCircle: {
    backgroundColor: 'green',
  },
  pendingCircle: {
    backgroundColor: 'gray',
  },
  line: {
    flex: 1,
    width: 1,
    height: 40,
    backgroundColor: '#00AD4B',
  },
  lineCompleted: {
    flex: 1,
    width: 1,
    height: 20,
    backgroundColor: '#E2E2E2',
  },
  title: {
    fontSize: FontSize.FONT_SIZE_14,
    fontWeight: 'bold',
  },
  completedText: {
    width: '72.2%',
  },
  pendingText: {
    color: 'gray',
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
  status: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'gray',
  },
});

export default OrderStatus;
