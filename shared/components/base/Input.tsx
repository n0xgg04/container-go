import * as React from 'react';
import { DimensionValue, StyleSheet, TextInput } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import { Stack } from '@/shared/components/base/Stack';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  backgroundColor?: string;
  height?: DimensionValue;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  containerStyle?: React.ComponentProps<typeof Stack>['style'];
  textArea?: boolean;
  ref?: React.MutableRefObject<TextInput>;
} & React.ComponentProps<typeof TextInput>;

const Input = React.memo(
  ({
    backgroundColor = 'white',
    height = Spacing.SPACING_56,
    leftSection,
    rightSection,
    containerStyle,
    textArea = false,
    ref,
    ...props
  }: Props) => {
    return (
      <Stack
        direction="row"
        style={[
          styles.input,
          {
            backgroundColor,
            height,
            borderRadius: Spacing.SPACING_10,
            alignItems: textArea ? 'flex-start' : 'center',
            paddingHorizontal: Spacing.SPACING_8,
            gap: Spacing.SPACING_15,
          },
          containerStyle,
        ]}
      >
        {leftSection}
        <TextInput
          ref={ref}
          style={{
            fontSize: FontSize.FONT_SIZE_16,
            flexGrow: 1,
            height: '100%',
            paddingTop: textArea ? Spacing.SPACING_10 : undefined,
          }}
          multiline={textArea}
          textAlignVertical={textArea ? 'top' : undefined}
          {...props}
        />
        {rightSection}
      </Stack>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  input: {},
});
