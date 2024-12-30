import * as React from 'react';
import { Box, Typography } from '@/shared/components/base';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Input from '@/shared/components/base/Input';
import FontSize from '@/shared/constants/font-scale';
import { Pressable, StyleSheet } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import EyeIcon from '@/assets/images/svg/EyeIcon';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';

type Props = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  error?: string;
  name: string;
  placeholder?: string;
  label: string;
  leftIcon?: React.ReactNode;
  rightSection?: React.ReactNode;
  secureTextEntry?: boolean;
  labelColor?: string;
  password?: boolean;
};

const LoginInputField = React.memo(
  ({
    control,
    setValue,
    error,
    name,
    placeholder,
    label,
    leftIcon,
    secureTextEntry = false,
    rightSection,
    labelColor = 'white',
    password = false,
  }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const PasswordRightSection = React.useMemo(() => {
      return (
        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          {!isPasswordVisible ? (
            <EyeIcon />
          ) : (
            <Entypo name="eye-with-line" size={24} color="black" />
          )}
        </Pressable>
      );
    }, [isPasswordVisible, setIsPasswordVisible]);

    return (
      <Box style={styles.inputGap}>
        <Typography
          color={labelColor}
          style={{
            marginLeft: Spacing.SPACING_12,
          }}
          weight="bold"
          className="pl-2"
        >
          {label}
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
              onChange={(e) => {
                setValue(name, e.nativeEvent.text);
              }}
              value={value}
              containerStyle={[styles.inputGap, styles.shadow]}
              placeholder={placeholder}
              leftSection={leftIcon}
              rightSection={password ? PasswordRightSection : rightSection}
              secureTextEntry={password ? !isPasswordVisible : secureTextEntry}
            />
          )}
          name={name}
        />
        {error && (
          <Typography
            fontSize={FontSize.FONT_SIZE_14}
            color="warn"
            style={{
              marginLeft: Spacing.SPACING_12,
              marginTop: Spacing.SPACING_8,
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    );
  }
);

export default LoginInputField;

const styles = StyleSheet.create({
  inputGap: {
    marginTop: Spacing.SPACING_12,
  },
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
