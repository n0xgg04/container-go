import * as React from 'react';
import { Card, Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import UserInfoIcon from '@/assets/images/svg/UserInfoIcon';
import InfoLine from '@/shared/components/ui/account/InfoLine';
import NumberPhoneInfoIcon from '@/assets/images/svg/NumberPhoneInfoIcon';
import MailInfoIcon from '@/assets/images/svg/MailInfoIcon';
import SimpleButton from '@/shared/components/base/SimpleButton';
import { useUserData } from '@/states/recoil/atoms/AuthenticationAtom';
import { useRouter } from 'expo-router';

const UserInfoCard = React.memo(() => {
  const user = useUserData();
  const router = useRouter();

  const handleGoChangePassword = () => {
    router.push('/change-password');
  };

  return (
    <Stack direction="column" gap={Spacing.SPACING_10}>
      <Typography
        fontSize={FontSize.FONT_SIZE_14}
        weight="bold"
        color="textDarkGray"
      >
        Thông tin cá nhân
      </Typography>
      <Card insetPadding={Spacing.SPACING_12}>
        <Card.CardHeader>
          <Stack direction="column" gap={Spacing.SPACING_8}>
            <InfoLine
              icon={<UserInfoIcon />}
              label="Họ và Tên"
              value={user?.name}
              divide={false}
            />
            <InfoLine
              divide={false}
              icon={<NumberPhoneInfoIcon />}
              label="Điện thoại"
              value={user?.phone}
            />
            <InfoLine
              icon={<MailInfoIcon />}
              label="Email"
              divide={false}
              value={user?.email}
            />
          </Stack>
        </Card.CardHeader>
        <SimpleButton
          onPress={handleGoChangePassword}
          style={{
            marginTop: Spacing.SPACING_20,
          }}
          labelStyle={{
            fontSize: Spacing.SPACING_14,
          }}
          labelColor="black"
          bgColor="btnGray"
        >
          Đổi mật khẩu
        </SimpleButton>
      </Card>
    </Stack>
  );
});

export default UserInfoCard;
