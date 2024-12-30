import * as React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'moti';
import PopupPod from '@/shared/components/ui/container-page/PopupPOD';
import MainContent from '@/shared/components/ui/container_detail/MainContent';

type SearchParams = {
  container_id: string;
  action?: 'submit';
  back?: 'home';
};

export default React.memo(function ContainerDetail() {
  const { container_id, action, back } = useLocalSearchParams<SearchParams>();
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {showPopup && (
        <PopupPod closePopup={setShowPopup} container_id={container_id} />
      )}
      <MainContent
        setShowPopup={setShowPopup}
        container_id={container_id}
        action={action as string}
        back={back as string}
      />
    </View>
  );
});
