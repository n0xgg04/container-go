import { DimensionValue } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';

declare global {
  type IconComponent = (props: SvgProps) => React.JSX.Element;
  type ExtendedDimensionProps = {
    p?: DimensionValue;
    pt?: DimensionValue;
    pb?: DimensionValue;
    pl?: DimensionValue;
    pr?: DimensionValue;
    px?: DimensionValue;
    py?: DimensionValue;
    mt?: DimensionValue;
    mb?: DimensionValue;
    ml?: DimensionValue;
    mr?: DimensionValue;
    my?: DimensionValue;
    mx?: DimensionValue;
    width?: DimensionValue;
    height?: DimensionValue;
  };

  type ExtendedStyleProps = {
    bgColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    minWidth?: DimensionValue;
    minHeight?: DimensionValue;
  };
}

export {};
