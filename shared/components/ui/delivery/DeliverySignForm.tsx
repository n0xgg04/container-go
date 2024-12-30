import * as React from 'react';
import { Button, Stack, Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import signValidator from '@/shared/validators/sign.z';
import Input from '@/shared/components/base/Input';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { Spacing } from '@/shared/constants/spacing';
import SimpleButton from '@/shared/components/base/SimpleButton';
import { View } from 'moti';
import SignatureScreen, {
  SignatureViewRef,
} from 'react-native-signature-canvas';
import { createRef, useEffect, useState, useTransition } from 'react';
import { Fonts } from '@/shared/constants/themes';
import useSignState from '@/states/hooks/useSignState';
import { useRouter } from 'expo-router';
import useUploadS3 from '@/shared/services/queries/home/useUploadS3';
import { useMutation } from '@tanstack/react-query';
import uuid from 'react-native-uuid';
import _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import moment from 'moment';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';

type FormInputs = {
  sender_name: string;
};

const imgHeight = Spacing.SPACING_300;
const style = `.m-signature-pad {box-shadow: none; border: none; width: 100%; }
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: 100%; height: ${imgHeight}px;}`;

export default function DeliverySignForm() {
  const { colors } = useTheme();
  const signRef = createRef<SignatureViewRef>();
  const [{ signBase64 }, setState] = useSignState();
  const [pending, startTransition] = useTransition();
  const [isSigned, setIsSigned] = useState(false);
  const router = useRouter();
  const { mutateAsync: getUploadLink } = useUploadS3();

  const [, setOverlay] = useAppOverlayState();

  const { mutateAsync: UploadSign, isPending } = useMutation({
    mutationFn: async () => {
      const name = (uuid.v4() as string) + _.random(1, 10000) + '.jpeg';
      try {
        const { url } = await getUploadLink({
          fileType: 'SIGNATURE',
          fileName: name,
        });
        await FileSystem.writeAsStringAsync(
          `${FileSystem.cacheDirectory}/${name}`,
          signBase64.replace('data:image/png;base64,', ''),
          {
            encoding: 'base64',
          }
        );
        const result = await FileSystem.uploadAsync(
          url,
          `${FileSystem.cacheDirectory}/${name}`,
          {
            httpMethod: 'PUT',
            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          }
        );
        if (result.status === 200) {
          FileSystem.deleteAsync(`${FileSystem.cacheDirectory}/${name}`);
          setState((pre) => ({ ...pre, signFile: name }));
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    },
  });

  useEffect(() => {
    setOverlay((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending, setOverlay]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(signValidator),
  });

  const handleClearSign = React.useCallback(() => {
    signRef.current?.clearSignature();
    setIsSigned(false);
  }, [signRef]);

  const handleEnd = () => {
    signRef.current?.readSignature();
  };

  const onSubmit = React.useCallback(
    (data: FormInputs) => {
      signRef.current?.getData();
      setState((pre) => ({
        ...pre,
        sender_name: data.sender_name,
        signAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }));
      UploadSign().then((success) => {
        if (success) {
          router.push('/delivery/review');
        } else {
          toast('Xử lý thất bại! Hãy thử lại', {
            duration: 4000,
            position: ToastPosition.BOTTOM,
            icon: '',
            styles: {
              pressable: {
                backgroundColor: colors.warn,
              },
            },
          });
        }
      });
    },

    [router, setState, signRef]
  );

  return (
    <Stack direction="column" gap={Spacing.SPACING_10}>
      <Stack direction="column" gap={Spacing.SPACING_10}>
        <Typography
          weight="bold"
          color="black"
          fontSize={FontSize.FONT_SIZE_16}
        >
          Người nhận
        </Typography>
        {errors.sender_name?.message && (
          <Typography fontSize={FontSize.FONT_SIZE_14} color="warn">
            {errors.sender_name.message}
          </Typography>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, value } }) => (
            <Input
              autoCapitalize="none"
              onBlur={onBlur}
              onChange={(e) => {
                setValue('sender_name', e.nativeEvent.text);
              }}
              value={value}
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.borderGray,
              }}
            />
          )}
          name="sender_name"
        />
      </Stack>
      <Stack className="justify-between items-center">
        <Typography weight="bold" color="secondaryGray">
          Chữ ký <Typography color="warn">( Bắt buộc )</Typography>
        </Typography>
        <SimpleButton
          onPress={handleClearSign}
          style={{
            paddingHorizontal: Spacing.SPACING_10,
            borderRadius: Spacing.SPACING_8,
          }}
          bgColor="warn"
        >
          <Typography weight="bold">Đặt lại</Typography>
        </SimpleButton>
      </Stack>
      <View style={{ width: '100%', height: imgHeight }}>
        <SignatureScreen
          imageType="image/png"
          ref={signRef}
          onEnd={handleEnd}
          onOK={(base64) => {
            setIsSigned(true);
            setState((pre) => ({ ...pre, signBase64: base64 }));
          }}
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
          }}
          webStyle={style}
        />
      </View>
      <Button
        onPress={isSigned && !isPending ? handleSubmit(onSubmit) : () => {}}
        style={styles.btn}
        labelStyle={styles.btnLabel}
      >
        {isPending ? 'Đang xử lý...' : 'Xác nhận chữ ký'}
      </Button>
    </Stack>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btn: {
    marginTop: Spacing.SPACING_20,
    height: Spacing.SPACING_51,
    borderRadius: Spacing.SPACING_10,
    color: 'primary',
  },
  btnLabel: {
    textAlign: 'center',
    fontSize: FontSize.FONT_SIZE_16,
    color: 'white',
    fontFamily: Fonts.Bold,
  },
});
