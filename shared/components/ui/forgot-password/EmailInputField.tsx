import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { Stack, Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Input from '@/shared/components/base/Input';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from 'react-native';
import { useTheme } from '@/shared/hooks';

type Props = {
  control: Control<ForgotPasswordFormInputs>;
  setValue: UseFormSetValue<ForgotPasswordFormInputs>;
  errorMessage?: string;
};

const EmailInputField = React.memo(
  ({ control, setValue, errorMessage }: Props) => {
    const { colors } = useTheme();

    const handleValueChange = React.useCallback(
      (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setValue('email', e.nativeEvent.text);
      },
      [setValue]
    );

    return (
      <Stack
        style={{
          marginTop: Spacing.SPACING_20,
        }}
        direction="column"
        className="w-full"
        gap={Spacing.SPACING_10}
      >
        <Typography
          weight="bold"
          color="black"
          fontSize={FontSize.FONT_SIZE_16}
        >
          Nhập Email hoặc SĐT
        </Typography>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, value } }) => (
            <Input
              autoCapitalize="none"
              onBlur={onBlur}
              onChange={handleValueChange}
              value={value}
              placeholder="Example@email.com"
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.borderGray,
                ...styles.shadow,
              }}
            />
          )}
          name="email"
        />
        {errorMessage && (
          <Typography
            fontSize={FontSize.FONT_SIZE_16}
            color="error"
            className="mt-1 pl-2"
            weight="bold"
          >
            {errorMessage}
          </Typography>
        )}
      </Stack>
    );
  }
);

export default EmailInputField;

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
});
