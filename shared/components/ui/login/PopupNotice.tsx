import * as React from 'react';
import Popup from '@/shared/components/common/Popup';
import { AnimatePresence } from 'moti';

type Props = {
  isError: boolean;
  reset: () => void;
  isSuccess: boolean;
};
const PopupNotice = React.memo(({ isError, reset, isSuccess }: Props) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isError && (
        <Popup
          onClose={reset}
          visible={!isSuccess}
          title="Đăng nhập thất bại!"
        />
      )}
    </AnimatePresence>
  );
});

export default PopupNotice;
