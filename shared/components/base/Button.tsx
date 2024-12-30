import * as React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native-gesture-handler';
import { tv } from '@/shared/instants';
import { VariantProps } from 'tailwind-variants';
import { cn } from '@/shared/utils';
import { Spacing } from '@/shared/constants/spacing';
import { Typography } from '@/shared/components/base/Typography';
import { useTheme } from '@/shared/hooks';
import { Stack } from './Stack';
import {
  createVariant,
  createRestyleComponent,
  VariantProps as SkiaVariantProps,
} from '@shopify/restyle';
import { Theme } from '@/shared/constants/themes';
import { Href, useRouter } from 'expo-router';

type Props = {
  children: string;
  labelStyle?: React.ComponentProps<typeof Typography>['style'];
  leftSection?: React.JSX.Element;
  rightSection?: React.JSX.Element;
  gap?: number;
  href?: Href<string | object>;
};

const v = tv({
  variants: {
    variant: {
      filled: cn('bg-primary'),
    },
  },
});

type TwProps = VariantProps<typeof v>;

const variant = createVariant<Theme, 'roundedVariant'>({
  themeKey: 'roundedVariant',
  defaults: {
    borderRadius: 0,
  },
});

const RawButton = React.memo(function ({
  children,
  variant = 'filled',
  className,
  style,
  labelStyle,
  leftSection,
  href,
  gap = Spacing.SPACING_5,
  rightSection,
  disabled,
  ...props
}: TouchableOpacityProps & TwProps & Props) {
  const { colors } = useTheme();
  const router = useRouter();

  const handleHref = React.useCallback(() => {
    href && router.push(href);
  }, [href, router]);

  const cls = React.useMemo(() => {
    return cn(v({ variant }), className);
  }, [className, variant]);

  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={handleHref}
      disabled={disabled}
      activeOpacity={1}
      style={[
        {
          backgroundColor: isPressed
            ? colors.successBorder
            : colors.buttonBackground,
          padding: Spacing.SPACING_10,
          borderRadius: Spacing.SPACING_5,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={cls}
      {...props}
    >
      <Stack gap={gap} className="items-center h-full w-full">
        {leftSection}
        <Typography
          style={[
            {
              color: colors.textButtonFilled,
              flexGrow: 1,
            },
            labelStyle,
          ]}
        >
          {children}
        </Typography>
        {rightSection}
      </Stack>
    </TouchableOpacity>
  );
});

RawButton.displayName = 'RawButton';

const Button = createRestyleComponent<
  SkiaVariantProps<Theme, 'roundedVariant'> &
    React.ComponentProps<typeof RawButton>,
  Theme
>([variant], RawButton);

export { Button };
