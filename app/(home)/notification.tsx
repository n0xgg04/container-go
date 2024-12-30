import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { Fonts } from '@/shared/constants/themes';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import NotificationList from '@/shared/components/ui/notifications/NotificationList';
import { Dimensions } from 'react-native';
type Props = {};
export default function Notification(props: Props) {
  const { colors } = useTheme();
  const [index, setIndex] = React.useState(0);

  const identity = (v: number): string => {
    return v + '';
  };
  function generateUniqueKey() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  const TabarHead = (
    tabName: string,
    focusedTab: any,
    onTabPress: any,
    indexTab: any
  ) => {
    return (
      <TouchableOpacity
        key={generateUniqueKey()}
        style={{
          borderBottomColor:
            focusedTab.value === tabName ? '#0A9345' : 'transparent',
          borderBottomWidth: 2,
          paddingHorizontal: 10,
        }}
        onPress={() => {
          onTabPress(tabName);
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Text
            style={{
              color:
                focusedTab.value === tabName
                  ? colors.textGray
                  : colors.textDarkGray,
              fontFamily: Fonts.Bold,
              textTransform: 'none',
              fontSize: 14,
            }}
          >
            {tabName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const MapTab = (props: any) => {
    return (
      <View style={styles.tabBarContainer} key={generateUniqueKey()}>
        {props.tabNames.map((e: any) =>
          TabarHead(e, props.focusedTab, props.onTabPress, props.index)
        )}
      </View>
    );
  };

  return (
    <Scaffold>
      <Scaffold.AppBar>Thông báo</Scaffold.AppBar>
      <Scaffold.MainBox>
        <Tabs.Container
          onTabChange={(e) => setIndex(e.index)}
          containerStyle={{
            backgroundColor: '#FAFAFA',
            // width: '90%',
          }}
          headerContainerStyle={{
            backgroundColor: '#FAFAFA',
            width: '90%',
            shadowColor: 'transparent',
          }}
          renderTabBar={(props) => (
            <MaterialTabBar
              {...props}
              indicatorStyle={{
                borderBottomColor: '#0A9345',
                borderBottomWidth: 2,
              }}
              activeColor={colors.textGray}
              inactiveColor={colors.textDarkGray}
              width={Dimensions.get('screen').width - 30}
              labelStyle={{
                fontSize: 14,
                textTransform: 'capitalize',
                textAlign: 'center',
              }}
            />
          )}
        >
          <Tabs.Tab name={'Vận chuyển'}>
            <Tabs.FlatList
              data={[0]}
              renderItem={() => <NotificationList index={index} />}
              keyExtractor={identity}
            />
          </Tabs.Tab>
          <Tabs.Tab name={'Ưu đãi'}>
            <Tabs.FlatList
              data={[1]}
              renderItem={() => <NotificationList index={index} />}
              keyExtractor={identity}
            />
          </Tabs.Tab>
          <Tabs.Tab name={'Hệ thống'}>
            <Tabs.FlatList
              data={[2]}
              renderItem={() => <NotificationList index={index} />}
              keyExtractor={identity}
            />
          </Tabs.Tab>
        </Tabs.Container>
      </Scaffold.MainBox>
    </Scaffold>
  );
}
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
});
