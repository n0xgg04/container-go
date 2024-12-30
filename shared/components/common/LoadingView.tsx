import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'moti';

const LoadingView = React.memo(() => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <ActivityIndicator size="small" animating={true} />
    </View>
  );
});

export default LoadingView;
