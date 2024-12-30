import * as React from 'react';
import { Dropdown as DropdownOrigin } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { Typography } from '@/shared/components/base/Typography';
import { Stack } from '@/shared/components/base/Stack';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';
import { useState } from 'react';

type DropDownItem = {
  label: string;
  value: string;
};

type Props = {
  data: string[];
  mainLabel: string;
  containerStyle?: React.ComponentProps<typeof Stack>['style'];
};

export default function Dropdown({
  data,
  mainLabel,
  containerStyle,
  ...props
}: Props & React.ComponentProps<typeof DropdownOrigin>) {
  const { colors } = useTheme();
  const [value, setValue] = useState(null);

  return (
    <Stack
      className="items-center"
      style={[
        styles.container,
        {
          backgroundColor: colors.dropdownBackground,
        },
        containerStyle,
      ]}
    >
      <Typography
        fontSize={Spacing.SPACING_14}
        weight="bold"
        color="primaryBlack"
      >
        {mainLabel}
      </Typography>
      <Dropdown
        mainLabel={'Hi'}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        {...props}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.SPACING_12,
    paddingVertical: Spacing.SPACING_10,
    borderRadius: Spacing.SPACING_8,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
