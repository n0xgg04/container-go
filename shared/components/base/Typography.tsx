import * as React from 'react';
import { Text } from 'react-native';
import { VariantProps } from 'tailwind-variants';
import FontSize from '@/shared/constants/font-scale';
import { cn } from '@/shared/utils';
import { tv } from '@/shared/instants';
import { Fonts } from '@/shared/constants/themes';
import { useTheme } from '@/shared/hooks';

const v = tv({
  base: 'text-md',
  variants: {
    variant: {
      h1: `text-[${FontSize.FONT_SIZE_48}px]`,
      h2: `text-[${FontSize.FONT_SIZE_36}px]`,
      h3: `text-[${FontSize.FONT_SIZE_30}px]`,
      h4: `text-[${FontSize.FONT_SIZE_24}px]`,
      h5: `text-[${FontSize.FONT_SIZE_20}px]`,
      h6: `text-[${FontSize.FONT_SIZE_18}px]`,
      content: `text-[${FontSize.FONT_SIZE_16}px]`,
      sm: `text-[${FontSize.FONT_SIZE_14}px]`,
      xs: `text-[${FontSize.FONT_SIZE_12}px]`,
    },
    weight: {
      bold: 'font-bold',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
});

type Variants = VariantProps<typeof v>;
type Props = Variants &
  React.PropsWithChildren & {
    color?: string;
  };
const FONT_SIZE = {
  h1: FontSize.FONT_SIZE_48,
  h2: FontSize.FONT_SIZE_36,
  h3: FontSize.FONT_SIZE_30,
  h4: FontSize.FONT_SIZE_24,
  h5: FontSize.FONT_SIZE_20,
  h6: FontSize.FONT_SIZE_18,
  content: FontSize.FONT_SIZE_16,
  sm: FontSize.FONT_SIZE_14,
  xs: FontSize.FONT_SIZE_12,
};

type ExtendedProps = {
  fontSize?: number;
};

const Typography = React.memo(
  ({
    variant = 'content',
    weight,
    className,
    style,
    fontSize,
    color,
    ...props
  }: Props & React.ComponentProps<typeof Text> & ExtendedProps) => {
    const { colors } = useTheme();
    const colorMemo = React.useMemo(() => {
      return color && Object.keys(colors).includes(color)
        ? colors[color as keyof typeof colors]
        : 'white';
    }, [color, colors]);

    const fontSizeMemo = React.useMemo(() => {
      return fontSize || FONT_SIZE[variant] || FontSize.FONT_SIZE_16;
    }, [fontSize, variant]);

    const fontFamilyMemo = React.useMemo(() => {
      return weight === 'bold' ? Fonts.Bold : Fonts.Regular;
    }, [weight]);

    const cls = React.useMemo(() => {
      return cn(v({ variant, weight }), className);
    }, [className, variant, weight]);

    return (
      <Text
        className={cls}
        style={[
          {
            color: colorMemo,
            fontSize: fontSizeMemo,
            fontFamily: fontFamilyMemo,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

export { Typography };
