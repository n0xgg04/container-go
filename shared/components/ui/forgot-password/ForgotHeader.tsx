import * as React from 'react';
import { Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';

const ForgotHeader = React.memo(() => {
  return (
    <>
      <Typography
        weight="bold"
        fontSize={FontSize.FONT_SIZE_20}
        color="textGray"
      >
        Bạn quên mật khẩu?
      </Typography>
      <Typography
        style={{
          textAlign: 'center',
        }}
        fontSize={FontSize.FONT_SIZE_14}
        color="textGray"
      >
        Vui lòng nhập thông tin Email hoặc Số điện thoại đã đăng ký với
        Container Go! Chúng tôi sẽ gửi link khôi phục mật khẩu đến thiết bị của
        bạn !
      </Typography>
    </>
  );
});

export default ForgotHeader;
