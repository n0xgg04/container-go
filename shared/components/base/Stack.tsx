import * as React from 'react';
import { View } from 'react-native';
import { VariantProps } from 'tailwind-variants';
import { cn } from '@/shared/utils';
import { tv } from '@/shared/instants';

const v = tv({
  base: 'flex',
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
  },
  defaultVariants: {
    direction: 'row',
  },
});

type StackVariants = VariantProps<typeof v>;
type Props = React.ComponentProps<typeof View> &
  React.PropsWithChildren &
  StackVariants & {
    gap?: number;
  };

const Stack = React.memo(
  ({ direction = 'row', children, className, gap, style, ...props }: Props) => {
    const cls = React.useMemo(() => {
      return cn(
        v({
          direction,
        }),
        className
      );
    }, [className, direction]);
    return (
      <View
        className={cls}
        style={[
          {
            gap,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

export { Stack };
