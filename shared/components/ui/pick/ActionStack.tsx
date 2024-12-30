import * as React from 'react';
import { Stack } from '@/shared/components/base';
import { useId } from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from '@/shared/components/ui/pick/ActionButton';

type Props = {
  actions: {
    label: string;
    icon: React.ReactNode;
    onPress: () => void;
  }[];
};

const ActionStack = React.memo(
  ({
    actions,
    style,
    ...props
  }: Props & React.ComponentProps<typeof Stack>) => {
    const idPrefix = useId();
    return (
      <Stack
        className="justify-center"
        style={[
          {
            paddingHorizontal: Spacing.SPACING_4,
          },
          style,
        ]}
        {...props}
      >
        {actions.map(({ icon, label, onPress }, i) => {
          return (
            <TouchableOpacity onPress={onPress} key={idPrefix + i}>
              <ActionButton icon={icon} label={label} />
            </TouchableOpacity>
          );
        })}
      </Stack>
    );
  }
);

export default ActionStack;
