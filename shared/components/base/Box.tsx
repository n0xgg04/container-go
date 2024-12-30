import * as React from 'react';
import { View } from 'moti';
import { cn } from '@/shared/utils';

const Box = React.memo(
  ({
    mt,
    pr,
    pt,
    p,
    my,
    mb,
    ml,
    mr,
    mx,
    height,
    pb,
    pl,
    px,
    py,
    width,
    children,
    className,
    style,
    borderColor,
    bgColor,
    borderWidth,
    borderRadius,
    minWidth,
    minHeight,
    ...props
  }: React.PropsWithChildren<ExtendedDimensionProps> &
    React.ComponentProps<typeof View> &
    ExtendedStyleProps) => {
    const cls = React.useMemo(() => {
      return cn(className);
    }, [className]);

    return (
      <View
        style={[
          {
            padding: p,
            paddingLeft: pl,
            paddingBottom: pb,
            paddingTop: pt,
            paddingRight: pr,
            paddingHorizontal: px,
            paddingVertical: py,
            marginTop: mt,
            marginBottom: mb,
            marginLeft: ml,
            marginRight: mr,
            marginHorizontal: mx,
            marginVertical: my,
            width,
            backgroundColor: bgColor,
            height,
            borderWidth,
            borderRadius,
            borderColor,
            minWidth,
            minHeight,
          },
          style,
        ]}
        className={cls}
        {...props}
      >
        {children}
      </View>
    );
  }
);

export { Box };
